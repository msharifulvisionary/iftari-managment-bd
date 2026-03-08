import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun, LogOut, Menu, X, LayoutDashboard, Wallet, ShoppingBag, FileText, Home } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { DeveloperPopup } from './DeveloperPopup';
import { InstallPrompt } from './InstallPrompt';

export const Layout: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, profile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDeveloperPopupOpen, setIsDeveloperPopupOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const navLinks = [
    { name: 'হোম', path: '/', icon: Home },
    { name: 'ড্যাশবোর্ড', path: '/dashboard', icon: LayoutDashboard, requiresAuth: true },
    { name: 'চাঁদা সংগ্রহ', path: '/income', icon: Wallet, requiresAuth: true },
    { name: 'বাজার খরচ', path: '/expense', icon: ShoppingBag, requiresAuth: true },
    { name: 'সারসংক্ষেপ', path: '/summary', icon: FileText, requiresAuth: true },
  ];

  const filteredLinks = navLinks.filter(link => !link.requiresAuth || currentUser);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <InstallPrompt />
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-3">
                <img src="https://cdn-icons-png.flaticon.com/512/2386/2386614.png" alt="Logo" className="w-10 h-10" />
                <span className="font-bold text-2xl text-emerald-600 dark:text-emerald-400">ইফতার ম্যানেজমেন্ট</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {filteredLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                      isActive 
                        ? 'text-emerald-600 dark:text-emerald-400' 
                        : 'text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
              </button>

              {currentUser ? (
                <div className="hidden md:flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{profile?.messName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{profile?.name}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                    title="লগআউট"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-3">
                  <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400">লগইন</Link>
                  <Link to="/register" className="text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full transition-colors">রেজিস্ট্রেশন</Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {filteredLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium ${
                      isActive 
                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' 
                        : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                );
              })}
              
              {!currentUser ? (
                <div className="grid grid-cols-2 gap-2 p-2 mt-4">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-center py-2 border border-slate-300 dark:border-slate-700 rounded-lg font-medium">লগইন</Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="text-center py-2 bg-emerald-600 text-white rounded-lg font-medium">রেজিস্ট্রেশন</Link>
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 mt-2"
                >
                  <LogOut className="w-5 h-5" />
                  লগআউট
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">
            &copy; {new Date().getFullYear()} ইফতার ম্যানেজমেন্ট সিস্টেম। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <button 
            onClick={() => setIsDeveloperPopupOpen(true)}
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors group"
          >
            Design and Devlop By <span className="underline decoration-emerald-300 dark:decoration-emerald-700 underline-offset-4 group-hover:decoration-emerald-500 transition-colors">MD SHARIFUL ISLAM</span>
          </button>
        </div>
      </footer>

      <DeveloperPopup isOpen={isDeveloperPopupOpen} onClose={() => setIsDeveloperPopupOpen(false)} />
    </div>
  );
};
