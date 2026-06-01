"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Loader, AlertCircle, DollarSign } from "lucide-react";

function LoginFormComponent() {
  const router = useRouter();
  const { login, error: authError } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const result = await login(formData.email, formData.password);

      if (result.success) {
        router.push("/dashboard");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <DollarSign className="text-white" size={40} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">FinTrack</h1>
          <p className="text-blue-100">Manage your finances with ease</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl p-8 border border-gray-200 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome Back
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 mt-6"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin mr-2" size={18} />
                  Signing in...
                </>
              ) : (
                "Sign In"
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
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>

        <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
          <p className="text-white text-xs mb-2 font-semibold">
            Demo Credentials:
          </p>
          <p className="text-blue-100 text-xs">Email: demo@example.com</p>
          <p className="text-blue-100 text-xs">Password: demo123</p>
        </div>
      </div>
    </div>
  );
}

export default LoginFormComponent;
