"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  TrendingUp,
  BarChart3,
  Target,
  Shield,
  Zap,
  DollarSign,
  Sparkles,
  Lock,
  PieChart,
  ArrowUpRight,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-500 selection:text-white transition-colors duration-300">
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-blue-100/40 to-transparent dark:from-blue-950/20 pointer-events-none z-0" />
      <div className="absolute top-[20%] left-[-10%] w-[40%] h-[35%] rounded-full bg-blue-400/10 dark:bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[40%] h-[35%] rounded-full bg-indigo-400/10 dark:bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-32 md:pb-24 z-10">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200/50 dark:border-blue-800/30 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-semibold tracking-wide animate-fade-in">
            <Sparkles size={14} className="text-blue-500 animate-pulse" />
            <span>Smart Personal Finance Tracker</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-900 to-blue-700 dark:from-white dark:via-blue-100 dark:to-blue-400 leading-tight">
            Take Control of Your Money, <br />
            <span className="text-blue-600 dark:text-blue-400">
              Effortlessly.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Track expenses, manage budgets, set goals, and gain smart financial
            insights all in one beautifully design, dark-mode ready application.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {isAuthenticated ? (
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto px-8 py-6 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/20 dark:shadow-blue-500/10 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]">
                  Go to Dashboard
                  <ArrowRight size={20} />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/login" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto px-8 py-6 text-base font-semibold border-slate-300 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                  >
                    Sign In
                    <ChevronRight size={20} />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 z-10">
        <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-4 sm:p-6 shadow-2xl overflow-hidden group">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="px-6 py-1 rounded-lg bg-slate-200/50 dark:bg-slate-800/50 text-[10px] text-slate-500 dark:text-slate-400 select-none">
              fintrack.app/dashboard
            </div>
            <div className="w-12 h-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs">
                <p className="text-slate-500 dark:text-slate-400">
                  Total Balance
                </p>
                <p className="text-2xl font-bold text-slate-800 dark:text-white mt-1">
                  $12,480.50
                </p>
                <div className="flex items-center gap-1 text-emerald-500 font-medium mt-2">
                  <ArrowUpRight size={14} />
                  <span>+12.4% this month</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs space-y-3">
                <p className="font-semibold text-slate-800 dark:text-white">
                  Active Budgets
                </p>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>Dining Out</span>
                      <span className="font-medium">$120 / $300</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full w-[40%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>Shopping</span>
                      <span className="font-medium">$180 / $200</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full w-[90%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-slate-800 dark:text-white text-[13px]">
                  Monthly Outflow Comparison
                </span>
                <span className="px-2 py-1 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px]">
                  Filter: 6 months
                </span>
              </div>
              <div className="flex items-end justify-between h-36 px-4 pt-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 bg-blue-600/70 hover:bg-blue-600 rounded-t h-16 transition-all" />
                  <span className="text-[10px] text-slate-500">Jan</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 bg-blue-600/70 hover:bg-blue-600 rounded-t h-24 transition-all" />
                  <span className="text-[10px] text-slate-500">Feb</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 bg-blue-600/70 hover:bg-blue-600 rounded-t h-[75px] transition-all" />
                  <span className="text-[10px] text-slate-500">Mar</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 bg-blue-600/70 hover:bg-blue-600 rounded-t h-[110px] transition-all" />
                  <span className="text-[10px] text-slate-500">Apr</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 bg-blue-500 hover:bg-blue-500 rounded-t h-20 transition-all" />
                  <span className="text-[10px] text-slate-500">May</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mt-2 text-[11px]">
                <span>
                  Total monthly limit saved by:{" "}
                  <strong className="text-emerald-500">18.4%</strong>
                </span>
                <span className="text-blue-500 flex items-center gap-0.5">
                  Details <ChevronRight size={12} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Everything you need to master your assets
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Powerful components styled to adapt elegantly. No complex
            configurations needed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-md flex flex-col space-y-4 hover:shadow-lg transition-shadow">
            <div className="p-3 w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Real-time Budgeting
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
              Define target spending caps per category and receive intelligent
              spending insights as they update.
            </p>
          </div>
          <div className="p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-md flex flex-col space-y-4 hover:shadow-lg transition-shadow">
            <div className="p-3 w-12 h-12 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Advanced Reports
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
              Compare your monthly outlays using clean interactive bar charts,
              pie charts, and timelines.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-md flex flex-col space-y-4 hover:shadow-lg transition-shadow">
            <div className="p-3 w-12 h-12 rounded-xl bg-violet-500/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <Target size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Savings Milestones
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
              Establish multi-tier financial targets, log progression, and view
              visual percent complete metrics.
            </p>
          </div>
        </div>
      </section>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200 dark:border-slate-900 z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">
              $10M+
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Expenses Logged
            </p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">
              99.8%
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              System Uptime
            </p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">
              45k+
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Active Budgets
            </p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">
              100%
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              User Data Isolated
            </p>
          </div>
        </div>
      </section>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-slate-900 dark:to-blue-950 p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-blue-500/20">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold">
              <Shield size={12} />
              <span>Secure Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Your data remains exclusively yours.
            </h2>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              We leverage JSON Web Token authentication standards. Budget plans
              and recent transactions are directly bound to your unique account
              identifier, guaranteeing iron-clad data security.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-1 text-xs">
                <CheckCircle2 size={14} className="text-blue-300" />
                <span>Encrypted JWT Token Storage</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <CheckCircle2 size={14} className="text-blue-300" />
                <span>Isolated API Routing</span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg">
            <Lock size={64} className="text-blue-200 animate-pulse" />
          </div>
        </div>
      </section>

      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center z-10">
        <div className="space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Ready to design your financial future?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Create an account in less than 30 seconds and start visualising cash
            outflows.
          </p>
          <div className="pt-4">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button className="px-8 py-6 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]">
                  Return to Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/auth/register">
                <Button className="px-8 py-6 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]">
                  Get Started Free
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 dark:border-slate-900 py-12 text-center text-xs text-slate-500 dark:text-slate-400 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-600 rounded">
              <DollarSign size={12} className="text-white" />
            </div>
            <span className="font-bold text-slate-900 dark:text-white">
              FinTrack
            </span>
          </div>
          <p>
            &copy; {new Date().getFullYear()} FinTrack. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/auth/login" className="hover:underline">
              Login
            </Link>
            <Link href="/auth/register" className="hover:underline">
              Register
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
