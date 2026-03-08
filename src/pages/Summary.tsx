import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { Download, Wallet, ShoppingBag, Users, Activity, FileDown } from 'lucide-react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export const Summary: React.FC = () => {
  const { currentUser, profile } = useAuth();
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalContributors, setTotalContributors] = useState(0);
  const [totalMarkets, setTotalMarkets] = useState(0);
  const summaryRef = useRef<HTMLDivElement>(null);

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

  const handleDownloadPDF = async () => {
    if (!summaryRef.current) return;
    
    summaryRef.current.classList.add('exporting-mode');
    
    try {
      const dataUrl = await toPng(summaryRef.current, {
        pixelRatio: 2,
        backgroundColor: document.documentElement.classList.contains('dark') ? '#0f172a' : '#ffffff',
      });
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgProps = pdf.getImageProperties(dataUrl);
      const imgRatio = imgProps.width / imgProps.height;
      
      let finalWidth = pdfWidth - 40;
      let finalHeight = finalWidth / imgRatio;

      if (finalHeight > pdfHeight - 40) {
        finalHeight = pdfHeight - 40;
        finalWidth = finalHeight * imgRatio;
      }

      const x = (pdfWidth - finalWidth) / 2;
      const y = 20;

      pdf.addImage(dataUrl, 'PNG', x, y, finalWidth, finalHeight);
      pdf.save(`Iftar_Summary_${profile?.month}_${profile?.year}.pdf`);
    } finally {
      summaryRef.current.classList.remove('exporting-mode');
    }
  };

  const handleDownload = async () => {
    if (!summaryRef.current) return;
    
    summaryRef.current.classList.add('exporting-mode');
    
    try {
      const dataUrl = await toPng(summaryRef.current, {
        pixelRatio: 2,
        backgroundColor: document.documentElement.classList.contains('dark') ? '#0f172a' : '#ffffff',
      });
      const link = document.createElement('a');
      link.download = `Iftar_Summary_${profile?.month}_${profile?.year}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      summaryRef.current.classList.remove('exporting-mode');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">সারসংক্ষেপ</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">ইফতার আয়োজনের চূড়ান্ত হিসাব</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-colors font-medium shadow-sm"
          >
            <FileDown className="w-4 h-4" />
            <span className="hidden sm:inline">PDF ডাউনলোড</span>
            <span className="sm:hidden">PDF</span>
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">HD ইমেজ ডাউনলোড</span>
            <span className="sm:hidden">ইমেজ</span>
          </button>
        </div>
      </div>

      <div ref={summaryRef} className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
        {/* Header for Export */}
        <div className="text-center mb-10 pb-8 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-3">{profile?.messName}</h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium text-xl">ইফতার হিসাব সারসংক্ষেপ - {profile?.month} {profile?.year}</p>
          <div className="mt-6 inline-flex flex-wrap justify-center gap-6 text-base text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/50 px-8 py-4 rounded-2xl">
            <span>ম্যানেজার: <strong className="text-slate-900 dark:text-white">{profile?.name}</strong></span>
            <span>•</span>
            <span>মোবাইল: <strong className="text-slate-900 dark:text-white">{profile?.phone}</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-800/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Wallet className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">মোট চাঁদা সংগ্রহ</h3>
            </div>
            <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
              ৳ {totalIncome.toLocaleString('bn-BD')}
            </p>
          </div>

          <div className="bg-rose-50 dark:bg-rose-900/20 rounded-2xl p-6 border border-rose-100 dark:border-rose-800/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center text-rose-600 dark:text-rose-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">মোট বাজার খরচ</h3>
            </div>
            <p className="text-4xl font-bold text-rose-600 dark:text-rose-400">
              ৳ {totalExpense.toLocaleString('bn-BD')}
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6 border border-purple-100 dark:border-purple-800/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">মোট বাজার সংখ্যা</h3>
            </div>
            <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">
              {totalMarkets.toLocaleString('bn-BD')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`rounded-2xl p-6 border ${balance >= 0 ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/30' : 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800/30'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${balance >= 0 ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' : 'bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400'}`}>
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">অবশিষ্ট ব্যালেন্স</h3>
            </div>
            <p className={`text-4xl font-bold ${balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>
              ৳ {balance.toLocaleString('bn-BD')}
            </p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-6 border border-amber-100 dark:border-amber-800/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">মোট সদস্য (চাঁদাদাতা)</h3>
            </div>
            <p className="text-4xl font-bold text-amber-600 dark:text-amber-400">
              {totalContributors} জন
            </p>
          </div>
        </div>
      </div>
      
      <style>{`
        .exporting-mode {
          padding: 60px !important;
          border: none !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
};
