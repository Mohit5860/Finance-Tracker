"use client";

import { useState, useEffect } from "react";
import { Target, Plus, Trash2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    currentAmount: "",
    deadline: "",
    category: "saving",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/goals");
      if (response.ok) {
        const data = await response.json();
        setGoals(data.goals || []);
      }
    } catch (error) {
      console.error("Error fetching goals:", error);
      setGoals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.targetAmount || !formData.deadline) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          targetAmount: parseFloat(formData.targetAmount),
          currentAmount: parseFloat(formData.currentAmount) || 0,
          deadline: formData.deadline,
          category: formData.category,
        }),
      });

      if (response.ok) {
        setFormData({
          name: "",
          targetAmount: "",
          currentAmount: "",
          deadline: "",
          category: "saving",
        });
        setShowForm(false);
        fetchGoals();
      }
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  const handleDelete = async (goalId) => {
    if (confirm("Are you sure you want to delete this goal?")) {
      try {
        await fetch(`/api/goals?id=${goalId}`, { method: "DELETE" });
        fetchGoals();
      } catch (error) {
        console.error("Error deleting goal:", error);
      }
    }
  };

  const handleUpdateProgress = async (goalId, newAmount) => {
    try {
      const response = await fetch(`/api/goals/${goalId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentAmount: newAmount }),
      });

      if (response.ok) {
        fetchGoals();
      }
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  const getGoalStatus = (goal) => {
    const progress = (goal.currentAmount / goal.targetAmount) * 100;
    const daysLeft = Math.ceil(
      (new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24),
    );

    return {
      progress: Math.min(progress, 100),
      daysLeft,
      isCompleted: progress >= 100,
      isOverdue: daysLeft < 0,
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-900 dark:to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target size={32} />
              <div>
                <h1 className="text-4xl font-bold">Savings Goals</h1>
                <p className="text-purple-100 mt-2">
                  Set and track your financial targets
                </p>
              </div>
            </div>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="gap-2 bg-white text-purple-600 hover:bg-purple-50"
            >
              <Plus size={20} />
              New Goal
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm && (
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6 mb-8 border border-gray-200 dark:border-slate-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Create New Goal
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Goal Name (e.g., Emergency Fund)"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  required
                />

                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                >
                  <option value="saving">Savings</option>
                  <option value="investment">Investment</option>
                  <option value="vacation">Vacation</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>

                <input
                  type="number"
                  placeholder="Target Amount ($)"
                  value={formData.targetAmount}
                  onChange={(e) =>
                    setFormData({ ...formData, targetAmount: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  step="0.01"
                  required
                />

                <input
                  type="number"
                  placeholder="Current Amount ($)"
                  value={formData.currentAmount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentAmount: e.target.value,
                    })
                  }
                  className="px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  step="0.01"
                />

                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) =>
                    setFormData({ ...formData, deadline: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Create Goal
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-gray-600 dark:text-gray-400">
            Loading goals...
          </div>
        ) : goals.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-12 border border-gray-200 dark:border-slate-800 text-center">
            <Target className="mx-auto mb-4 text-gray-400" size={48} />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No goals yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create your first savings goal to get started!
            </p>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus size={18} className="mr-2" />
              Create First Goal
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {goals.map((goal) => {
              const status = getGoalStatus(goal);
              return (
                <div
                  key={goal._id}
                  className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6 border border-gray-200 dark:border-slate-800 hover:shadow-lg transition-shadow"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {goal.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 capitalize mt-1">
                        {goal.category}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(goal._id)}
                      className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    {status.isCompleted ? (
                      <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                        <CheckCircle size={18} />
                        <span className="text-sm font-semibold">
                          Completed!
                        </span>
                      </div>
                    ) : status.isOverdue ? (
                      <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                        <AlertCircle size={18} />
                        <span className="text-sm font-semibold">Overdue</span>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {status.daysLeft} days left
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Progress
                      </span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {status.progress.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-full transition-all duration-300"
                        style={{ width: `${status.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 pb-4 border-b border-gray-200 dark:border-slate-700">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Current:
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        ${goal.currentAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Target:
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        ${goal.targetAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Remaining:
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        $
                        {Math.max(
                          0,
                          goal.targetAmount - goal.currentAmount,
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {!status.isCompleted && (
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Add amount"
                        defaultValue=""
                        step="0.01"
                        id={`goal-input-${goal._id}`}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm"
                      />
                      <Button
                        size="sm"
                        onClick={() => {
                          const input = document.getElementById(
                            `goal-input-${goal._id}`,
                          );
                          if (input.value) {
                            handleUpdateProgress(
                              goal._id,
                              goal.currentAmount + parseFloat(input.value),
                            );
                            input.value = "";
                          }
                        }}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Update
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
