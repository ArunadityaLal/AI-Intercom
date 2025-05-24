import React from "react";

const Settings = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>

      {/* Profile Settings */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Profile</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" className="mt-1 w-full border rounded px-3 py-2" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" className="mt-1 w-full border rounded px-3 py-2" placeholder="john@example.com" />
          </div>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Update Profile
          </button>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-medium mb-4">Preferences</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Enable Dark Mode</span>
          <input type="checkbox" className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default Settings;
