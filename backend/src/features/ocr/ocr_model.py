from transformers import pipeline
from typing import Dict, Any
from PIL import Image
import io

class OCRModel:
    def __init__(self):
        # Initialize OCR pipeline using Transformer's OCR model
        self.model = pipeline("image-to-text", model="microsoft/trocr-base-handwritten")

    def process_image(self, image_data: bytes) -> Dict[Any, Any]:
        """Process the prescription image and extract text.

        Args:
            image_data (bytes): Raw image data from the request

        Returns:
            Dict[Any, Any]: Extracted text and metadata from the prescription
        """
        try:
            # Convert bytes to PIL Image
            image = Image.open(io.BytesIO(image_data))
            
            # Generate text from image
            result = self.model(image)
            extracted_text = result[0]['generated_text']
            
            # Parse the extracted text to identify medications
            # This is a simple implementation - in production, you'd want more robust parsing
            medications = self._parse_medications(extracted_text)
            
            return {
                "success": True,
                "extracted_text": extracted_text,
                "medications": medications
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }

    def _parse_medications(self, text: str) -> list:
        """Parse medications from extracted text.
        
        Args:
            text (str): Extracted text from the prescription
            
        Returns:
            list: List of identified medications with their details
        """
        # TODO: Implement more sophisticated parsing logic
        # For now, we'll look for common patterns
        medications = []
        lines = text.split('\n')
        
        for line in lines:
            if any(keyword in line.lower() for keyword in ['mg', 'ml', 'tablet', 'capsule']):
                parts = line.split()
                if len(parts) >= 2:
                    medications.append({
                        "name": parts[0],
                        "dosage": next((p for p in parts if any(unit in p.lower() for unit in ['mg', 'ml'])), ""),
                        "frequency": " ".join(parts[2:]) if len(parts) > 2 else ""
                    })
        
        return medications

    def validate_prescription(self, text: str) -> Dict[str, Any]:
        """Validate the extracted prescription text.

        Args:
            text (str): Extracted text from the prescription

        Returns:
            Dict[str, Any]: Validation results and structured prescription data
        """
        required_fields = ['patient', 'doctor', 'date']
        warnings = []
        
        # Check for required fields
        for field in required_fields:
            if field not in text.lower():
                warnings.append(f"Missing {field} information")
        
        # Calculate confidence score based on warnings
        confidence_score = 1.0 - (len(warnings) * 0.2)
        confidence_score = max(0.0, min(confidence_score, 1.0))
        
        return {
            "is_valid": len(warnings) == 0,
            "confidence_score": confidence_score,
            "warnings": warnings
        }
        