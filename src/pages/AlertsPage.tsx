import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '../components/Button';

export function AlertsPage() {
  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Potential Interaction Detected',
      message: 'Your medication Warfarin may interact with recently added food item: Green Tea',
      date: '2024-01-20'
    },
    {
      id: 2,
      type: 'info',
      title: 'Medication Reminder',
      message: 'Time to take your evening dose of Tetracycline',
      date: '2024-01-20'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Bell size={48} className="mx-auto text-blue-600 mb-4" />
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Real-Time Alerts
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Stay informed about potential interactions and medication reminders.
          </p>
        </div>

        <div className="mt-12 max-w-lg mx-auto">
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`bg-white shadow sm:rounded-lg p-6 ${alert.type === 'warning' ? 'border-l-4 border-yellow-500' : 'border-l-4 border-blue-500'}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{alert.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{alert.message}</p>
                  </div>
                  <span className="text-sm text-gray-500">{alert.date}</span>
                </div>
                <div className="mt-4 flex space-x-3">
                  <Button
                    variant="secondary"
                    className="text-sm"
                    onClick={() => console.log('View details')}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="secondary"
                    className="text-sm"
                    onClick={() => console.log('Dismiss alert')}
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}