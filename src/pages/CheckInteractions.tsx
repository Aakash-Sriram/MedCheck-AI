import React, { useState } from 'react';
import { Coffee } from 'lucide-react';
import { Button } from '../components/Button';

interface InteractionInfo {
  severity: string;
  effect: string;
  recommendation: string;
  details: string;
}

type FoodInteractions = {
  [key: string]: InteractionInfo;
};

type DrugInteractions = {
  [key: string]: FoodInteractions;
};

type DrugDrugInteractions = {
  [key: string]: {
    [key: string]: InteractionInfo;
  };
};

export function CheckInteractions() {
  const [medication, setMedication] = useState('');
  const [food, setFood] = useState('');
  const [secondMedication, setSecondMedication] = useState('');
  const [interactionType, setInteractionType] = useState<'food' | 'drug'>('food');
  const [result, setResult] = useState<string | null>(null);

  const handleCheck = () => {
    if (interactionType === 'food' && medication && food) {
      // Common drug-food interactions database (simplified for demo)
      const interactions: DrugInteractions = {
        'warfarin': {
          'green tea': {
            severity: 'High',
            effect: 'Green tea contains vitamin K which can decrease the effectiveness of warfarin.',
            recommendation: 'Avoid or limit green tea consumption while taking warfarin. Maintain consistent vitamin K intake.',
            details: 'The interaction between warfarin and green tea is well-documented. Green tea\'s high vitamin K content can interfere with warfarin\'s anticoagulant effects.'
          },
          'cranberry juice': {
            severity: 'Moderate',
            effect: 'Cranberry juice may increase warfarin\'s blood-thinning effect.',
            recommendation: 'Monitor INR levels closely if consuming cranberry juice regularly.',
            details: 'Some studies suggest cranberry juice might enhance warfarin\'s anticoagulant effect, potentially increasing bleeding risk.'
          }
        },
        'tetracycline': {
          'dairy': {
            severity: 'Moderate',
            effect: 'Dairy products can reduce tetracycline absorption.',
            recommendation: 'Take tetracycline 2 hours before or after consuming dairy products.',
            details: 'Calcium in dairy products binds to tetracycline, forming an insoluble compound that cannot be absorbed by the body.'
          }
        }
      };

      const med = medication.toLowerCase();
      const foodItem = food.toLowerCase();

      if (interactions[med] && interactions[med][foodItem]) {
        const info = interactions[med][foodItem];
        setResult(
          `Analysis Results:\n\n` +
          `Severity: ${info.severity}\n\n` +
          `Effect: ${info.effect}\n\n` +
          `Recommendation: ${info.recommendation}\n\n` +
          `Detailed Information:\n${info.details}\n\n` +
          `Note: This is for informational purposes only. Always consult your healthcare provider.`
        );
      } else {
        setResult(`No specific interaction data found between ${medication} and ${food}.\n\nWhile no known interactions are documented, always consult your healthcare provider about your diet while taking medications.`);
      }
    } else if (interactionType === 'drug' && medication && secondMedication) {
      // Common drug-drug interactions database (simplified for demo)
      const drugInteractions: DrugDrugInteractions = {
        'warfarin': {
          'aspirin': {
            severity: 'High',
            effect: 'Increased risk of bleeding when warfarin is combined with aspirin.',
            recommendation: 'Avoid concurrent use unless specifically directed by healthcare provider.',
            details: 'Both medications affect blood clotting through different mechanisms. Combined use significantly increases bleeding risk.'
          },
          'ibuprofen': {
            severity: 'High',
            effect: 'Increased risk of bleeding when warfarin is combined with ibuprofen.',
            recommendation: 'Consider alternative pain relievers like acetaminophen.',
            details: 'NSAIDs like ibuprofen can increase bleeding risk when combined with anticoagulants like warfarin.'
          }
        },
        'fluoxetine': {
          'tramadol': {
            severity: 'Moderate',
            effect: 'Increased risk of serotonin syndrome when combined.',
            recommendation: 'Monitor for signs of serotonin syndrome. Consider alternative pain medication.',
            details: 'Both medications increase serotonin levels, which may lead to a dangerous condition called serotonin syndrome.'
          }
        }
      };

      const med1 = medication.toLowerCase();
      const med2 = secondMedication.toLowerCase();

      const checkCombination = (med1: string, med2: string) => {
        if (drugInteractions[med1]?.[med2]) return drugInteractions[med1][med2];
        if (drugInteractions[med2]?.[med1]) return drugInteractions[med2][med1];
        return null;
      };

      const info = checkCombination(med1, med2);

      if (info) {
        setResult(
          `Analysis Results:\n\n` +
          `Severity: ${info.severity}\n\n` +
          `Effect: ${info.effect}\n\n` +
          `Recommendation: ${info.recommendation}\n\n` +
          `Detailed Information:\n${info.details}\n\n` +
          `Note: This is for informational purposes only. Always consult your healthcare provider.`
        );
      } else {
        setResult(`No specific interaction data found between ${medication} and ${secondMedication}.\n\nWhile no known interactions are documented, always consult your healthcare provider about combining these medications.`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Coffee size={48} className="mx-auto text-blue-600 mb-4" />
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Check Drug Interactions
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Check for potential interactions between medications and food items.
          </p>
        </div>

        <div className="mt-12 max-w-lg mx-auto">
          <div className="bg-white shadow sm:rounded-lg p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Interaction Type
                </label>
                <div className="flex space-x-4">
                  <button
                    className={`px-4 py-2 rounded-md ${interactionType === 'food' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => setInteractionType('food')}
                  >
                    Drug-Food
                  </button>
                  <button
                    className={`px-4 py-2 rounded-md ${interactionType === 'drug' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => setInteractionType('drug')}
                  >
                    Drug-Drug
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="medication" className="block text-sm font-medium text-gray-700">
                  First Medication Name
                </label>
                <input
                  type="text"
                  id="medication"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={medication}
                  onChange={(e) => setMedication(e.target.value)}
                  placeholder="Enter medication name"
                />
              </div>

              {interactionType === 'food' ? (
                <div>
                  <label htmlFor="food" className="block text-sm font-medium text-gray-700">
                    Food Item
                  </label>
                  <input
                    type="text"
                    id="food"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={food}
                    onChange={(e) => setFood(e.target.value)}
                    placeholder="Enter food item"
                  />
                </div>
              ) : (
                <div>
                  <label htmlFor="secondMedication" className="block text-sm font-medium text-gray-700">
                    Second Medication Name
                  </label>
                  <input
                    type="text"
                    id="secondMedication"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={secondMedication}
                    onChange={(e) => setSecondMedication(e.target.value)}
                    placeholder="Enter second medication name"
                  />
                </div>
              )}

              <Button
                onClick={handleCheck}
                variant="primary"
                className="w-full justify-center"
              >
                Check Interaction
              </Button>

              {result && (
                <div className="mt-4 p-4 bg-blue-50 rounded-md">
                  <p className="text-sm text-blue-700 whitespace-pre-line">{result}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}