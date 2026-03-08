import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, db } from '../firebase';
import { UserPlus, Mail, Lock, User, Phone, Droplet, Calendar, Home as HomeIcon } from 'lucide-react';
import { motion } from 'motion/react';

export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    messName: '',
    phone: '',
    bloodGroup: '',
    year: new Date().getFullYear().toString(),
    month: 'রমজান',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await set(ref(db, `managers/${user.uid}`), {
        name: formData.name,
        messName: formData.messName,
        phone: formData.phone,
        bloodGroup: formData.bloodGroup,
        year: formData.year,
        month: formData.month,
        email: formData.email,
        createdAt: new Date().toISOString(),
      });

      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700"
      >
        <div>
          <div className="mx-auto w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
            <UserPlus className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 dark:text-white">
            নতুন ম্যানেজার অ্যাকাউন্ট
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
            ইফতার ম্যানেজমেন্ট সিস্টেমে স্বাগতম
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-md">
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">ম্যানেজারের নাম</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    name="name"
                    type="text"
                    required
                    className="pl-10 block w-full rounded-xl border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm py-3 px-4 transition-colors"
                    placeholder="আপনার নাম"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">মেস/প্রতিষ্ঠানের নাম</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HomeIcon className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    name="messName"
                    type="text"
                    required
                    className="pl-10 block w-full rounded-xl border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm py-3 px-4 transition-colors"
                    placeholder="মেসের নাম"
                    value={formData.messName}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">মোবাইল নাম্বার</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    name="phone"
                    type="tel"
                    required
                    className="pl-10 block w-full rounded-xl border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm py-3 px-4 transition-colors"
                    placeholder="01XXXXXXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">রক্তের গ্রুপ</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Droplet className="h-5 w-5 text-slate-400" />
                  </div>
                  <select
                    name="bloodGroup"
                    required
                    className="pl-10 block w-full rounded-xl border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm py-3 px-4 transition-colors appearance-none"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                  >
                    <option value="">নির্বাচন করুন</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">বছর</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    name="year"
                    type="number"
                    required
                    className="pl-10 block w-full rounded-xl border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm py-3 px-4 transition-colors"
                    placeholder="২০২৫"
                    value={formData.year}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">মাস</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    name="month"
                    type="text"
                    required
                    className="pl-10 block w-full rounded-xl border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm py-3 px-4 transition-colors"
                    placeholder="রমজান"
                    value={formData.month}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">ইমেইল (ইউজারনেম)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  className="pl-10 block w-full rounded-xl border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm py-3 px-4 transition-colors"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">পাসওয়ার্ড</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  className="pl-10 block w-full rounded-xl border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm py-3 px-4 transition-colors"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all disabled:opacity-70"
            >
              {loading ? 'অপেক্ষা করুন...' : 'রেজিস্ট্রেশন করুন'}
            </button>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
              <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400">
                লগইন করুন
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
