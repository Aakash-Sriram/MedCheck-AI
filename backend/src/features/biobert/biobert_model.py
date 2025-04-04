from transformers import AutoTokenizer, AutoModel, pipeline
from typing import Dict, Any, List, Tuple
import torch
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

class BioBERTModel:
    def __init__(self):
        self.model_name = "dmis-lab/biobert-v1.1"
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
        self.model = AutoModel.from_pretrained(self.model_name)
        self.pipeline = pipeline("feature-extraction", model=self.model_name)
        # Initialize drug embeddings database (mock data for now)
        self.drug_embeddings = {}

    def encode_text(self, text: str) -> torch.Tensor:
        """Encode text using BioBERT model.

        Args:
            text (str): Input text to encode

        Returns:
            torch.Tensor: Encoded text representation
        """
        inputs = self.tokenizer(text, return_tensors="pt", padding=True, truncation=True)
        with torch.no_grad():
            outputs = self.model(**inputs)
        return outputs.last_hidden_state.mean(dim=1)

    def analyze_drug_interaction(self, drug1: str, drug2: str = None, food: str = None) -> Dict[str, Any]:
        """Analyze potential interactions between drugs or between a drug and food.

        Args:
            drug1 (str): First drug name
            drug2 (str, optional): Second drug name for drug-drug interaction
            food (str, optional): Food item for drug-food interaction

        Returns:
            Dict[str, Any]: Analysis results including interaction severity and recommendations
        """
        try:
            if drug2:
                query = f"interaction between {drug1} and {drug2}"
            elif food:
                query = f"interaction between {drug1} and {food}"
            else:
                raise ValueError("Either drug2 or food must be provided")

            # Extract features using BioBERT
            features = self.pipeline(query)
            embedding = np.mean(features[0], axis=0)

            # Analyze the embedding to determine interaction severity
            # This is a simplified version - in production, you'd want to use a trained classifier
            severity_score = np.mean(embedding)
            severity = self._determine_severity(severity_score)

            return {
                "query": query,
                "has_interaction": severity != "none",
                "severity": severity,
                "description": self._generate_description(severity, drug1, drug2, food),
                "recommendations": self._generate_recommendations(severity),
                "confidence_score": float(np.clip(abs(severity_score), 0, 1))
            }
        except Exception as e:
            return {
                "error": str(e),
                "query": query if 'query' in locals() else None,
                "has_interaction": False,
                "severity": "unknown",
                "confidence_score": 0.0
            }

    def get_similar_drugs(self, drug_name: str) -> List[Tuple[str, float]]:
        """Find similar drugs based on BioBERT embeddings.

        Args:
            drug_name (str): Name of the drug to find similarities for

        Returns:
            List[Tuple[str, float]]: List of similar drugs and their similarity scores
        """
        try:
            # Get embedding for the query drug
            query_embedding = self.encode_text(drug_name).numpy()

            # Compare with our drug database (mock data for now)
            similarities = []
            mock_drugs = [
                "Acetaminophen", "Ibuprofen", "Aspirin", 
                "Amoxicillin", "Penicillin", "Tetracycline"
            ]

            for drug in mock_drugs:
                if drug.lower() != drug_name.lower():
                    drug_embedding = self.encode_text(drug).numpy()
                    similarity = float(cosine_similarity(query_embedding, drug_embedding)[0][0])
                    similarities.append((drug, similarity))

            # Sort by similarity score in descending order
            return sorted(similarities, key=lambda x: x[1], reverse=True)[:3]

        except Exception as e:
            return [(str(e), 0.0)]

    def _determine_severity(self, score: float) -> str:
        """Determine interaction severity based on the score."""
        if score < 0.3:
            return "none"
        elif score < 0.5:
            return "mild"
        elif score < 0.7:
            return "moderate"
        else:
            return "severe"

    def _generate_description(self, severity: str, drug1: str, drug2: str = None, food: str = None) -> str:
        """Generate a description of the interaction."""
        if severity == "none":
            return "No significant interaction detected"

        subject = f"{drug1} and {drug2 if drug2 else food}"
        if severity == "mild":
            return f"Mild interaction potential between {subject}"
        elif severity == "moderate":
            return f"Moderate interaction detected between {subject}. Monitoring recommended"
        else:
            return f"Severe interaction warning for {subject}. Medical consultation required"

    def _generate_recommendations(self, severity: str) -> List[str]:
        """Generate recommendations based on severity."""
        if severity == "none":
            return ["No special precautions needed"]

        recommendations = ["Consult with healthcare provider"]
        if severity == "mild":
            recommendations.extend([
                "Monitor for mild side effects",
                "Take medications at different times if possible"
            ])
        elif severity == "moderate":
            recommendations.extend([
                "Monitor for adverse effects",
                "Consider alternative medications",
                "Adjust dosing schedule"
            ])
        else:  # severe
            recommendations.extend([
                "Seek immediate medical attention",
                "Do not take medications together",
                "Explore alternative treatment options"
            ])

        return recommendations