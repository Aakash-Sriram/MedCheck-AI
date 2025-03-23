import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to?: string;
}

export function Card({ title, description, icon, to }: CardProps) {
  const content = (
    <>
      <div className="text-blue-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </>
  );

  if (to) {
    return (
      <Link to={to} className="block bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
        {content}
      </Link>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
      {content}
    </div>
  );
}