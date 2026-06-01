"use client";

import { useState, useEffect } from "react";
import { Settings as SettingsIcon, User, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function Settings() {
  const { user, updateUser } = useAuth();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    currency: "USD",
    notifications: true,
  });

  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("fintrackSettings");
    const initialSettings = saved ? JSON.parse(saved) : {};

    setProfile({
      name: user?.name || initialSettings.name || "",
      email: user?.email || initialSettings.email || "",
      currency: initialSettings.currency || "USD",
      notifications:
        initialSettings.notifications !== undefined
          ? initialSettings.notifications
          : true,
    });
  }, [user]);

  const handleSaveSettings = () => {
    localStorage.setItem("fintrackSettings", JSON.stringify(profile));
    if (updateUser) {
      updateUser({ name: profile.name, email: profile.email });
    }
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
        transactions: transactions || [],
        budgets: budgets || [],
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
        "This will permanently delete all your transactions and budgets. This cannot be undone. Are you sure?",
      )
    ) {
      if (
        confirm(
          "This is your last chance to back up your data. Do you really want to continue?",
        )
      ) {
        fetch("/api/transactions/get")
          .then((res) => res.json())
          .then((data) => {
            (data || [])?.forEach((t) => {
              fetch(`/api/transactions/delete?id=${t._id}`, {
                method: "DELETE",
              });
            });
          });

        fetch("/api/budgets")
          .then((res) => res.json())
          .then((data) => {
            (data || [])?.forEach((b) => {
              fetch(`/api/budgets?id=${b._id}`, { method: "DELETE" });
            });
          });

        alert("All data has been deleted.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {saveStatus && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-100">
            {saveStatus}
          </div>
        )}

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
          </div>

          <Button
            onClick={handleSaveSettings}
            className="mt-6 bg-slate-700 hover:bg-slate-800"
          >
            Save Profile Settings
          </Button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6 mb-6 border border-gray-200 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <Download
              size={24}
              className="text-slate-700 dark:text-slate-300"
            />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Data Management
            </h2>
          </div>

          <div className="space-y-4 mb-6">
            <p className="text-gray-700 dark:text-gray-300">
              Export your financial data as a backup or to use in other
              applications.
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
      </div>
    </div>
  );
}
