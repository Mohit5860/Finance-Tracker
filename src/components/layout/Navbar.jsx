"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Moon, Sun, TrendingUp, Settings, Target, Home, BarChart3, DollarSign, LogOut, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function Navbar({ onThemeToggle, isDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();

  const navItems = [
    { label: "Dashboard", href: "/", icon: Home },
    { label: "Analytics", href: "/analytics", icon: BarChart3 },
    { label: "Goals", href: "/goals", icon: Target },
    { label: "Reports", href: "/reports", icon: TrendingUp },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  const isActive = (href) => pathname === href;

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  // Don't show navbar on auth pages
  if (pathname?.startsWith("/auth/")) {
    return null;
  }

  return (
    <nav className="bg-white dark:bg-slate-950 shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg group-hover:shadow-lg transition-shadow">
              <DollarSign className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:inline">
              FinTrack
            </span>
          </Link>

          {/* Desktop Menu */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-1">
              {navItems.map(({ label, href, icon: Icon }) => (
                <Link key={href} href={href}>
                  <Button
                    variant={isActive(href) ? "default" : "ghost"}
                    className="gap-2"
                  >
                    <Icon size={18} />
                    <span>{label}</span>
                  </Button>
                </Link>
              ))}
            </div>
          )}

          {/* Right Side Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onThemeToggle}
              className="rounded-full"
            >
              {isDarkMode ? (
                <Sun size={20} className="text-yellow-500" />
              ) : (
                <Moon size={20} className="text-gray-600" />
              )}
            </Button>

            {/* User Profile Dropdown */}
            {isAuthenticated && user ? (
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <ChevronDown size={18} className="text-gray-600 dark:text-gray-400" />
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-gray-200 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-800">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link href="/settings" onClick={() => setIsProfileOpen(false)}>
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                        <User size={16} />
                        Profile Settings
                      </button>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors border-t border-gray-200 dark:border-slate-800"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth/login" className="hidden sm:block">
                <Button className="bg-blue-600 hover:bg-blue-700">Sign In</Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isOpen ? (
                <X size={24} className="text-gray-900 dark:text-white" />
              ) : (
                <Menu size={24} className="text-gray-900 dark:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && isAuthenticated && (
          <div className="md:hidden pb-4 space-y-2 animate-in fade-in slide-in-from-top-2">
            {navItems.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive(href)
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            ))}

            {/* Mobile User Menu */}
            {user && (
              <>
                <div className="border-t border-gray-200 dark:border-slate-800 pt-2 mt-2">
                  <p className="px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white">
                    {user.name}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors rounded-lg"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Not Authenticated Mobile Menu */}
        {isOpen && !isAuthenticated && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/auth/login" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Sign In</Button>
            </Link>
            <Link href="/auth/register" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
