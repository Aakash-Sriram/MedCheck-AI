import React from 'react';
import { User } from 'lucide-react';
import { Button } from '../components/Button';

export function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <User size={48} className="mx-auto text-blue-600 mb-4" />
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Your Profile
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Manage your medications, preferences, and account settings.
          </p>
        </div>

        <div className="mt-12 max-w-lg mx-auto">
          <div className="bg-white shadow sm:rounded-lg p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900">Medications</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Add your current medications for better interaction checks.
                </p>
                <div className="mt-4">
                  <Button
                    variant="secondary"
                    className="w-full justify-center"
                    onClick={() => console.log('Add medication')}
                  >
                    Add Medication
                  </Button>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900">Preferences</h2>
                <div className="mt-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Receive email notifications for potential interactions
                    </span>
                  </label>
                </div>
              </div>

              <Button
                variant="primary"
                className="w-full justify-center"
                onClick={() => console.log('Save changes')}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}