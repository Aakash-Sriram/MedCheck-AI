import React from 'react';
import { Scan, AlertCircle, Coffee, Pill } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { TestimonialCard } from '../components/TestimonialCard';
import { PricingSection } from '../components/PricingSection';

export function HomePage() {
  const features = [
    {
      icon: <Scan size={32} />,
      title: 'Scan Prescriptions',
      description: 'Quickly scan your prescriptions using your device camera for instant analysis.',
      to: '/scan'
    },
    {
      icon: <Coffee size={32} />,
      title: 'Check Drug-Food Interactions',
      description: 'Understand how your medications interact with different foods and beverages.',
      to: '/check'
    },
    {
      icon: <Pill size={32} />,
      title: 'Check Drug-Drug Interactions',
      description: 'Analyze potential interactions between different medications for safer usage.',
      to: '/check'
    },
    {
      icon: <AlertCircle size={32} />,
      title: 'Real-Time Alerts',
      description: 'Receive immediate notifications about potential drug interactions and risks.',
      to: '/alerts'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      text: 'This app has been a lifesaver! It helped me identify potential interactions between my medications that even my doctor missed.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150'
    },
    {
      name: 'Michael Chen',
      rating: 4,
      text: 'The food interaction checker is incredibly helpful. I now know exactly what to avoid with my medications.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Stay Safe with</span>
                  <span className="block text-blue-600">AI-Powered Drug Interaction Checks</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Ensure your medications work safely together. Our AI-powered system checks for drug-drug and drug-food interactions, helping you make informed decisions about your health.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <Button to="/check" variant="primary">
                    Get Started
                  </Button>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Button to="/help" variant="secondary">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-full w-full">
            <img
              className="w-full h-full object-cover object-center rounded-lg shadow-lg"
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070&h=1380"
              alt="Medical professional reviewing medications"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Powerful Features for Your Safety
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Everything you need to manage your medications safely and effectively.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  to={feature.to}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <PricingSection />

      {/* Testimonials Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                rating={testimonial.rating}
                text={testimonial.text}
                image={testimonial.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}