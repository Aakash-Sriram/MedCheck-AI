import { AlertCircle, AlertTriangle, AlertOctagon } from 'lucide-react';

export interface Interaction {
  drug1: string;
  drug2?: string;
  food?: string;
  severity: 'low' | 'moderate' | 'high';
  description: string;
  recommendations: string[];
}

export const drugDrugInteractions: Interaction[] = [
  {
    drug1: 'Warfarin',
    drug2: 'Aspirin',
    severity: 'high',
    description: 'Combined use increases risk of bleeding significantly. Both medications affect blood clotting mechanisms.',
    recommendations: [
      'Avoid concurrent use unless specifically directed by healthcare provider',
      'Regular monitoring of INR levels required',
      'Watch for signs of bleeding'
    ]
  },
  {
    drug1: 'Fluoxetine',
    drug2: 'Tramadol',
    severity: 'high',
    description: 'Risk of serotonin syndrome when SSRIs are combined with opioids. Can cause confusion, high blood pressure, and tremors.',
    recommendations: [
      'Alternative pain medication should be considered',
      'Monitor for signs of serotonin syndrome',
      'Immediate medical attention if symptoms occur'
    ]
  },
  {
    drug1: 'Simvastatin',
    drug2: 'Clarithromycin',
    severity: 'moderate',
    description: 'Clarithromycin can increase simvastatin levels, raising risk of muscle damage (rhabdomyolysis).',
    recommendations: [
      'Consider temporary suspension of simvastatin',
      'Monitor for muscle pain or weakness',
      'Discuss alternative antibiotics with healthcare provider'
    ]
  },
  {
    drug1: 'Metformin',
    drug2: 'Furosemide',
    severity: 'moderate',
    description: 'Diuretics may affect blood sugar levels and kidney function, potentially altering metformin effectiveness.',
    recommendations: [
      'More frequent blood glucose monitoring',
      'Adjust metformin dosage if needed',
      'Stay well-hydrated'
    ]
  },
  {
    drug1: 'Levothyroxine',
    drug2: 'Calcium supplements',
    severity: 'low',
    description: 'Calcium can interfere with levothyroxine absorption, reducing its effectiveness.',
    recommendations: [
      'Take medications at least 4 hours apart',
      'Consider morning levothyroxine and evening calcium',
      'Regular thyroid function monitoring'
    ]
  }
];

export const drugFoodInteractions: Interaction[] = [
  {
    drug1: 'Warfarin',
    food: 'Green leafy vegetables',
    severity: 'high',
    description: 'Foods high in Vitamin K can reduce warfarin effectiveness and affect blood clotting.',
    recommendations: [
      'Maintain consistent intake of vitamin K-rich foods',
      'Regular INR monitoring',
      'Consult healthcare provider before major diet changes'
    ]
  },
  {
    drug1: 'MAO Inhibitors',
    food: 'Aged cheese',
    severity: 'high',
    description: 'Tyramine-rich foods can cause dangerous blood pressure elevation when combined with MAOIs.',
    recommendations: [
      'Avoid aged/fermented foods',
      'Follow MAOI diet restrictions strictly',
      'Seek immediate care if severe headache occurs'
    ]
  },
  {
    drug1: 'Tetracycline',
    food: 'Dairy products',
    severity: 'moderate',
    description: 'Calcium in dairy products binds to tetracycline, reducing antibiotic absorption.',
    recommendations: [
      'Take tetracycline 2 hours before or after dairy',
      'Consider alternative calcium sources',
      'Complete full course of antibiotics'
    ]
  },
  {
    drug1: 'Statins',
    food: 'Grapefruit juice',
    severity: 'moderate',
    description: 'Grapefruit juice can increase statin levels in blood, raising risk of side effects.',
    recommendations: [
      'Avoid grapefruit juice while taking statins',
      'Choose alternative citrus fruits',
      'Monitor for muscle pain symptoms'
    ]
  },
  {
    drug1: 'ACE Inhibitors',
    food: 'High-potassium foods',
    severity: 'low',
    description: 'ACE inhibitors can increase potassium retention, requiring monitoring with high-potassium foods.',
    recommendations: [
      'Moderate intake of high-potassium foods',
      'Regular blood potassium monitoring',
      'Discuss dietary changes with healthcare provider'
    ]
  }
];