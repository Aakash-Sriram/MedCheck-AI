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

export function CheckInteractions() {
  const [medication, setMedication] = useState('');
  const [food, setFood] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleCheck = () => {
    if (medication && food) {
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
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Coffee size={48} className="mx-auto text-blue-600 mb-4" />
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Check Drug-Food Interactions
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Enter your medication and food item to check for potential interactions.
          </p>
        </div>

        <div className="mt-12 max-w-lg mx-auto">
          <div className="bg-white shadow sm:rounded-lg p-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="medication" className="block text-sm font-medium text-gray-700">
                  Medication Name
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