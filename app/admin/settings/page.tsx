'use client';

import { useState } from 'react';
import { Settings, Save, User, Bell, Shield, Database } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    appName: 'German Learning App',
    appDescription: 'Learn German with interactive lessons and exercises',
    defaultLanguage: 'en',
    timezone: 'UTC',
    maintenanceMode: false
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    userRegistration: true
  });

  const handleSaveGeneral = () => {
    toast.success('General settings saved successfully');
  };

  const handleSaveNotifications = () => {
    toast.success('Notification settings saved successfully');
  };

  return (
    <div className="">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage application settings and configurations.
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        {/* General Settings */}
        <div className="card">
          <div className="flex items-center space-x-2 mb-6">
            <Settings className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">General Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Application Name
                </label>
                <input
                  type="text"
                  value={generalSettings.appName}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, appName: e.target.value })}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Language
                </label>
                <select
                  value={generalSettings.defaultLanguage}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, defaultLanguage: e.target.value })}
                  className="input-field"
                >
                  <option value="en">English</option>
                  <option value="de">German</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Application Description
              </label>
              <textarea
                value={generalSettings.appDescription}
                onChange={(e) => setGeneralSettings({ ...generalSettings, appDescription: e.target.value })}
                className="input-field"
                rows={3}
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="maintenance-mode"
                checked={generalSettings.maintenanceMode}
                onChange={(e) => setGeneralSettings({ ...generalSettings, maintenanceMode: e.target.checked })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="maintenance-mode" className="text-sm font-medium text-gray-700">
                Enable Maintenance Mode
              </label>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button onClick={handleSaveGeneral} className="btn btn-primary flex items-center justify-center">
              <Save className="h-4 w-4 mr-2" />
              Save General Settings
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        {/* <div className="card">
          <div className="flex items-center space-x-2 mb-6">
            <Bell className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">Notification Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="email-notifications"
                checked={notificationSettings.emailNotifications}
                onChange={(e) => setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.checked })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="email-notifications" className="text-sm font-medium text-gray-700">
                Email Notifications
              </label>
            </div>
            
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="push-notifications"
                checked={notificationSettings.pushNotifications}
                onChange={(e) => setNotificationSettings({ ...notificationSettings, pushNotifications: e.target.checked })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="push-notifications" className="text-sm font-medium text-gray-700">
                Push Notifications
              </label>
            </div>
            
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="weekly-reports"
                checked={notificationSettings.weeklyReports}
                onChange={(e) => setNotificationSettings({ ...notificationSettings, weeklyReports: e.target.checked })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="weekly-reports" className="text-sm font-medium text-gray-700">
                Weekly Reports
              </label>
            </div>
            
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="user-registration"
                checked={notificationSettings.userRegistration}
                onChange={(e) => setNotificationSettings({ ...notificationSettings, userRegistration: e.target.checked })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="user-registration" className="text-sm font-medium text-gray-700">
                New User Registration Alerts
              </label>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button onClick={handleSaveNotifications} className="btn btn-primary flex items-center justify-center">
              <Save className="h-4 w-4 mr-2" />
              Save Notification Settings
            </button>
          </div>
        </div> */}

        {/* System Information */}
        {/* <div className="card">
          <div className="flex items-center space-x-2 mb-6">
            <Database className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">System Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Database Status</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Connection:</span>
                  <span className="text-sm font-medium text-green-600">Connected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Records:</span>
                  <span className="text-sm font-medium text-gray-900">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Last Backup:</span>
                  <span className="text-sm font-medium text-gray-900">2 hours ago</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Performance</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Server Status:</span>
                  <span className="text-sm font-medium text-green-600">Healthy</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Response Time:</span>
                  <span className="text-sm font-medium text-gray-900">45ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Uptime:</span>
                  <span className="text-sm font-medium text-gray-900">99.9%</span>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}