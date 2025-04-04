import React from 'react';
import { Button } from './Button';
import { Check, X, AlertCircle, Upload, UserCircle, MessageSquare, Bell } from 'lucide-react';

interface PlanFeature {
  text: string;
  available: boolean;
  icon?: React.ReactNode;
  upgradePrompt?: string;
}

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  features: PlanFeature[];
  ctaText: string;
  ctaVariant: 'primary' | 'secondary';
  badge?: string;
  isPremium?: boolean;
}

function PricingCard({
  title,
  price,
  period,
  features,
  ctaText,
  ctaVariant,
  badge,
  isPremium
}: PricingCardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-8 ${isPremium ? 'border-2 border-blue-500' : ''}`}>
      {badge && (
        <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 ${isPremium ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
          {badge}
        </span>
      )}
      <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      <div className="mt-4 flex items-baseline">
        <span className="text-4xl font-extrabold text-gray-900">{price}</span>
        <span className="ml-2 text-gray-600">/{period}</span>
      </div>
      <ul className="mt-8 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className={`flex-shrink-0 h-6 w-6 ${feature.available ? (isPremium ? 'text-blue-500' : 'text-green-500') : 'text-gray-300'}`}>
              {feature.available ? <Check /> : <X />}
            </span>
            <span className={`ml-3 ${feature.available ? 'text-gray-700' : 'text-gray-400'}`}>
              {feature.text}
              {!feature.available && feature.upgradePrompt && (
                <span className="block text-sm text-gray-400">{feature.upgradePrompt}</span>
              )}
            </span>
          </li>
        ))}  
      </ul>
      <div className="mt-8">
        <Button
          variant={ctaVariant}
          className="w-full justify-center"
        >
          {ctaText}
        </Button>
      </div>
    </div>
  );
}

export function PricingSection() {
  const freePlanFeatures: PlanFeature[] = [
    { text: 'Basic Drug Lookup', available: true },
    { text: 'Limited Drug-Drug Interaction Check', available: true },
    { text: 'Basic Interaction Alerts', available: true },
    { text: 'Prescription Input (Manual Only)', available: true },
    { text: 'Drug-Food Interaction Check', available: false, upgradePrompt: 'Upgrade to detect risky food interactions' },
    { text: 'Upload Prescription Image', available: false },
    { text: 'Save Profiles / History', available: false },
    { text: 'AI Chatbot Q&A', available: false },
    { text: 'Real-time personalized alerts', available: false }
  ];

  const premiumPlanFeatures: PlanFeature[] = [
    { text: 'Full medication database access', available: true },
    { text: 'Full Drug-Drug Interaction Check', available: true },
    { text: 'Drug-Food Interaction Detection', available: true },
    { text: 'Prescription Analysis with OCR', available: true },
    { text: 'User Profiles & Medical History', available: true },
    { text: 'AI Medical Chatbot', available: true },
    { text: 'Real-time Personalized Alerts', available: true }
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Select the plan that best fits your needs
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <PricingCard
            title="Free Plan"
            price="₹0"
            period="month"
            features={freePlanFeatures}
            ctaText="Sign Up for Free"
            ctaVariant="secondary"
            badge="Always Free"
          />
          <PricingCard
            title="Premium Plan"
            price="₹199"
            period="month"
            features={premiumPlanFeatures}
            ctaText="Upgrade Now"
            ctaVariant="primary"
            badge="Most Popular"
            isPremium
          />
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Trusted by 500+ users • Secure payment • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}