"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Lock,
  AlertCircle,
  DollarSign,
  Check,
  X,
} from "lucide-react";

function RegisterFormComponent() {
  const router = useRouter();
  const { register, error: authError } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordChecks, setPasswordChecks] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");

    if (name === "password") {
      setPasswordChecks({
        minLength: value.length >= 6,
        hasUpperCase: /[A-Z]/.test(value),
        hasLowerCase: /[a-z]/.test(value),
        hasNumber: /\d/.test(value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const result = await register(
        formData.name,
        formData.email,
        formData.password,
        formData.confirmPassword,
      );

      if (result.success) {
        router.push("/dashboard");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 to-emerald-700 dark:from-emerald-900 dark:to-emerald-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <DollarSign className="text-white" size={40} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">FinTrack</h1>
          <p className="text-emerald-100">Start managing your finances today</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl p-8 border border-gray-200 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Create Account
          </h2>

          {(error || authError) && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
              <AlertCircle
                className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"
                size={20}
              />
              <p className="text-red-800 dark:text-red-200 text-sm">
                {error || authError}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  disabled={loading}
                />
              </div>

              {formData.password && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2">
                    {passwordChecks.minLength ? (
                      <Check className="text-green-500" size={16} />
                    ) : (
                      <X className="text-gray-300" size={16} />
                    )}
                    <span
                      className={`text-xs ${passwordChecks.minLength ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}`}
                    >
                      At least 6 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {passwordChecks.hasLowerCase ? (
                      <Check className="text-green-500" size={16} />
                    ) : (
                      <X className="text-gray-300" size={16} />
                    )}
                    <span
                      className={`text-xs ${passwordChecks.hasLowerCase ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}`}
                    >
                      Lowercase letter
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  disabled={loading}
                />
              </div>

              {formData.confirmPassword && (
                <div className="mt-2">
                  {formData.password === formData.confirmPassword ? (
                    <div className="flex items-center gap-2">
                      <Check className="text-green-500" size={16} />
                      <span className="text-xs text-green-600 dark:text-green-400">
                        Passwords match
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <X className="text-red-500" size={16} />
                      <span className="text-xs text-red-600 dark:text-red-400">
                        Passwords do not match
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={
                loading || formData.password !== formData.confirmPassword
              }
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 mt-6"
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300 dark:border-slate-700"></div>
            <span className="px-3 text-gray-500 dark:text-gray-400 text-sm">
              OR
            </span>
            <div className="flex-1 border-t border-gray-300 dark:border-slate-700"></div>
          </div>

          <p className="text-center text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterFormComponent;
