import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  rating: number;
  text: string;
  image: string;
}

export function TestimonialCard({ name, rating, text, image }: TestimonialCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center mb-4">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold">{name}</h4>
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < rating ? "currentColor" : "none"}
                className={i < rating ? "text-yellow-400" : "text-gray-300"}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 italic">{text}</p>
    </div>
  );
}