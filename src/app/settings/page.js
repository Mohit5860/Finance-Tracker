"use client";

import { useState, useEffect } from "react";
import { Settings as SettingsIcon, User, Lock, Bell, HelpCircle, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Settings() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    currency: "USD",
    notifications: true,
  });

  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    // Load settings from localStorage
    const saved = localStorage.getItem("fintrackSettings");
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  const handleSaveSettings = () => {
    localStorage.setItem("fintrackSettings", JSON.stringify(profile));
    setSaveStatus("Settings saved successfully!");
    setTimeout(() => setSaveStatus(""), 3000);
  };

  const handleExportData = async () => {
    try {
      const transactionsRes = await fetch("/api/transactions/get");
      const transactions = await transactionsRes.json();

      const budgetsRes = await fetch("/api/budgets");
      const budgets = await budgetsRes.json();

      const data = {
        exportDate: new Date().toISOString(),
        transactions: transactions.transactions || [],
        budgets: budgets.budgets || [],
        profile,
      };

      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `fintrack-backup-${new Date().toISOString().split("T")[0]}.json`;
      a.click();
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  const handleDeleteAllData = () => {
    if (
      confirm(
        "This will permanently delete all your transactions and budgets. This cannot be undone. Are you sure?"
      )
    ) {
      if (
        confirm(
          "This is your last chance to back up your data. Do you really want to continue?"
        )
      ) {
        // Delete all transactions
        fetch("/api/transactions/get")
          .then((res) => res.json())
          .then((data) => {
            data.transactions?.forEach((t) => {
              fetch(`/api/transactions/delete?id=${t._id}`, {
                method: "DELETE",
              });
            });
          });

        // Delete all budgets
        fetch("/api/budgets")
          .then((res) => res.json())
          .then((data) => {
            data.budgets?.forEach((b) => {
              fetch(`/api/budgets?id=${b._id}`, { method: "DELETE" });
            });
          });

        alert("All data has been deleted.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 dark:from-slate-900 dark:to-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3">
            <SettingsIcon size={32} />
            <div>
              <h1 className="text-4xl font-bold">Settings</h1>
              <p className="text-slate-300 mt-2">
                Manage your account and preferences
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {saveStatus && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-100">
            {saveStatus}
          </div>
        )}

        {/* Profile Settings */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6 mb-6 border border-gray-200 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <User size={24} className="text-slate-700 dark:text-slate-300" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Profile Settings
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Currency
              </label>
              <select
                value={profile.currency}
                onChange={(e) =>
                  setProfile({ ...profile, currency: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD (C$)</option>
                <option value="AUD">AUD (A$)</option>
                <option value="INR">INR (₹)</option>
              </select>
            </div>
          </div>

          <Button
            onClick={handleSaveSettings}
            className="mt-6 bg-slate-700 hover:bg-slate-800"
          >
            Save Profile Settings
          </Button>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6 mb-6 border border-gray-200 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <Bell size={24} className="text-slate-700 dark:text-slate-300" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Notifications
            </h2>
          </div>

          <div className="space-y-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={profile.notifications}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    notifications: e.target.checked,
                  })
                }
                className="w-4 h-4 rounded"
              />
              <span className="ml-3 text-gray-900 dark:text-white">
                Enable budget alerts and spending notifications
              </span>
            </label>
          </div>

          <Button
            onClick={handleSaveSettings}
            className="mt-6 bg-slate-700 hover:bg-slate-800"
          >
            Save Notification Settings
          </Button>
        </div>

        {/* Data Management */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6 mb-6 border border-gray-200 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <Download size={24} className="text-slate-700 dark:text-slate-300" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Data Management
            </h2>
          </div>

          <div className="space-y-4 mb-6">
            <p className="text-gray-700 dark:text-gray-300">
              Export your financial data as a backup or to use in other applications.
            </p>
            <Button
              onClick={handleExportData}
              variant="secondary"
              className="gap-2"
            >
              <Download size={18} />
              Export All Data (JSON)
            </Button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 dark:bg-red-950 border-2 border-red-200 dark:border-red-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Trash2 size={24} className="text-red-600 dark:text-red-400" />
            <h2 className="text-2xl font-bold text-red-700 dark:text-red-400">
              Danger Zone
            </h2>
          </div>

          <p className="text-red-700 dark:text-red-300 mb-4">
            These actions are permanent and cannot be undone.
          </p>

          <Button
            onClick={handleDeleteAllData}
            variant="destructive"
            className="gap-2 bg-red-600 hover:bg-red-700"
          >
            <Trash2 size={18} />
            Delete All Data
          </Button>
        </div>

        {/* Help Section */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6 mt-6 border border-gray-200 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle size={24} className="text-slate-700 dark:text-slate-300" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Need Help?
            </h2>
          </div>

          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <p>
              <strong>Keyboard Shortcuts:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Use the navigation bar to switch between pages</li>
              <li>Dark mode toggle is available in the top right</li>
              <li>Export reports from the Reports page</li>
            </ul>

            <p className="mt-4">
              <strong>Tips:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Set realistic monthly budgets to track spending</li>
              <li>Review your analytics page regularly</li>
              <li>Use the goals feature to plan for future expenses</li>
              <li>Export your data regularly as a backup</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
