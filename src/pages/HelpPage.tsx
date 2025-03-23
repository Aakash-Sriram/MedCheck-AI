import React from 'react';
import { HelpCircle } from 'lucide-react';

export function HelpPage() {
  const sections = [
    {
      title: 'Getting Started',
      content: 'Welcome to the AI Drug Interaction Checker! This application helps you understand potential interactions between your medications and food items, ensuring safer medication use.'
    },
    {
      title: 'Check Drug-Food Interactions',
      content: 'Enter your medication name and a food item to check for any known interactions. The system will provide detailed information about the interaction severity, effects, and recommendations.'
    },
    {
      title: 'Scan Prescriptions',
      content: 'Use your device\'s camera or upload a photo of your prescription for instant analysis. Our system will extract medication information and help you understand potential interactions.'
    },
    {
      title: 'Real-Time Alerts',
      content: 'Set up your medication list in your profile to receive real-time alerts about potential interactions with common foods and other medications.'
    },
    {
      title: 'Safety Note',
      content: 'This application is for informational purposes only. Always consult your healthcare provider about potential drug interactions and dietary restrictions while taking medications.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <HelpCircle size={48} className="mx-auto text-blue-600 mb-4" />
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Help & Documentation
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Learn how to use our AI-powered drug interaction checker effectively.
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div
                key={index}
                className="bg-white shadow sm:rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {section.title}
                </h2>
                <p className="text-gray-600">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}