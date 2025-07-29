"use client"
import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';

// Configure Amplify with the outputs
Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function DashboardPage() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        // Get current user's data from our database
        const result = await client.models.User.list();
        setUserData(result.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                AuraSight Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Welcome to AuraSight! Manage your profile and find matches.
              </p>
            </div>
            <a
              href="/auth/login"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Sign Out
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Info Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Account Information</h2>
              
              {loading ? (
                <div className="text-center py-4">Loading user data...</div>
              ) : userData && userData.length > 0 ? (
                <div className="space-y-3">
                  <div>
                    <strong>Total Users:</strong> {userData.length}
                  </div>
                  <div>
                    <strong>Latest User:</strong> {userData[0]?.email}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-600 mb-4">No user data found</p>
                  <a
                    href="/profile/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Create Profile
                  </a>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <a
                  href="/profile/create"
                  className="block bg-blue-600 text-white px-4 py-2 rounded text-center hover:bg-blue-700"
                >
                  Create Profile
                </a>
                <a
                  href="/match"
                  className="block bg-green-600 text-white px-4 py-2 rounded text-center hover:bg-green-700"
                >
                  Find Matches
                </a>
                <a
                  href="/results"
                  className="block bg-purple-600 text-white px-4 py-2 rounded text-center hover:bg-purple-700"
                >
                  View Results
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-center">
              🎉 App successfully hosted with authentication! You can now create your profile and find matches.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 