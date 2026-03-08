import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { Wallet, ShoppingBag, Users, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { motion } from 'motion/react';

export const Dashboard: React.FC = () => {
  const { currentUser, profile } = useAuth();
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalContributors, setTotalContributors] = useState(0);
  const [totalMarkets, setTotalMarkets] = useState(0);

  useEffect(() => {
    if (!currentUser) return;

    const incomeRef = ref(db, `incomes/${currentUser.uid}`);
    const expenseRef = ref(db, `expenses/${currentUser.uid}`);

    const unsubscribeIncome = onValue(incomeRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        let total = 0;
        const uniqueContributors = new Set();
        Object.values(data).forEach((item: any) => {
          total += Number(item.amount);
          uniqueContributors.add(item.name.toLowerCase().trim());
        });
        setTotalIncome(total);
        setTotalContributors(uniqueContributors.size);
      } else {
        setTotalIncome(0);
        setTotalContributors(0);
      }
    });

    const unsubscribeExpense = onValue(expenseRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        let total = 0;
        let count = 0;
        Object.values(data).forEach((item: any) => {
          total += Number(item.amount);
          count++;
        });
        setTotalExpense(total);
        setTotalMarkets(count);
      } else {
        setTotalExpense(0);
        setTotalMarkets(0);
      }
    });

    return () => {
      unsubscribeIncome();
      unsubscribeExpense();
    };
  }, [currentUser]);

  const balance = totalIncome - totalExpense;

  const cards = [
    {
      title: 'মোট চাঁদা সংগ্রহ',
      amount: totalIncome,
      icon: Wallet,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-100 dark:bg-emerald-900/50',
      trend: '+',
      trendIcon: TrendingUp
    },
    {
      title: 'মোট বাজার খরচ',
      amount: totalExpense,
      icon: ShoppingBag,
      color: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-100 dark:bg-rose-900/50',
      trend: '-',
      trendIcon: TrendingDown
    },
    {
      title: 'মোট বাজার সংখ্যা',
      amount: totalMarkets,
      icon: ShoppingBag,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-100 dark:bg-purple-900/50',
      isCount: true
    },
    {
      title: 'অবশিষ্ট ব্যালেন্স',
      amount: balance,
      icon: Activity,
      color: balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400',
      bg: balance >= 0 ? 'bg-blue-100 dark:bg-blue-900/50' : 'bg-red-100 dark:bg-red-900/50',
      trend: balance >= 0 ? '+' : '-',
      trendIcon: balance >= 0 ? TrendingUp : TrendingDown
    },
    {
      title: 'মোট সদস্য (চাঁদা প্রদানকারী)',
      amount: totalContributors,
      icon: Users,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-100 dark:bg-amber-900/50',
      isCount: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">ড্যাশবোর্ড</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          স্বাগতম, <span className="font-semibold text-emerald-600 dark:text-emerald-400">{profile?.name}</span> ({profile?.messName})
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${card.bg} ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
              {card.trendIcon && (
                <div className={`flex items-center gap-1 text-sm font-medium ${card.color}`}>
                  <card.trendIcon className="w-4 h-4" />
                </div>
              )}
            </div>
            <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{card.title}</h3>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">
              {card.isCount ? card.amount.toLocaleString('bn-BD') : `৳ ${card.amount.toLocaleString('bn-BD')}`}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions or Recent Activity can go here */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-emerald-500" />
            সাম্প্রতিক চাঁদা
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">বিস্তারিত দেখতে 'চাঁদা সংগ্রহ' মেনুতে যান।</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-rose-500" />
            সাম্প্রতিক খরচ
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">বিস্তারিত দেখতে 'বাজার খরচ' মেনুতে যান।</p>
        </div>
      </div>
    </div>
  );
};
