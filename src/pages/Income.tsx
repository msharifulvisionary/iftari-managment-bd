import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { ref, onValue, push, remove, update } from 'firebase/database';
import { Plus, Trash2, Edit2, Download, Calendar, User, DollarSign, FileDown } from 'lucide-react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { formatBengaliDate, englishToBengaliNumber } from '../utils/dateUtils';

interface Income {
  id: string;
  date: string;
  name: string;
  amount: number;
}

export const Income: React.FC = () => {
  const { currentUser, profile } = useAuth();
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [formData, setFormData] = useState({ date: '', name: '', amount: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!currentUser) return;
    const incomeRef = ref(db, `incomes/${currentUser.uid}`);
    onValue(incomeRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const formattedData = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setIncomes(formattedData);
      } else {
        setIncomes([]);
      }
    });
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const incomeRef = ref(db, `incomes/${currentUser.uid}`);
    if (editingId) {
      await update(ref(db, `incomes/${currentUser.uid}/${editingId}`), {
        date: formData.date,
        name: formData.name,
        amount: Number(formData.amount)
      });
      setEditingId(null);
    } else {
      await push(incomeRef, {
        date: formData.date,
        name: formData.name,
        amount: Number(formData.amount)
      });
    }
    setFormData({ date: '', name: '', amount: '' });
  };

  const handleEdit = (income: Income) => {
    setFormData({ date: income.date, name: income.name, amount: income.amount.toString() });
    setEditingId(income.id);
  };

  const handleDelete = async (id: string) => {
    if (!currentUser || !window.confirm('আপনি কি নিশ্চিত যে এটি মুছে ফেলতে চান?')) return;
    await remove(ref(db, `incomes/${currentUser.uid}/${id}`));
  };

  const handleDownloadPDF = async () => {
    if (!tableRef.current) return;
    
    tableRef.current.classList.add('exporting-mode');
    
    try {
      const dataUrl = await toPng(tableRef.current, {
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
      
      let finalWidth = pdfWidth - 40; // 20px padding on each side
      let finalHeight = finalWidth / imgRatio;

      if (finalHeight > pdfHeight - 40) {
        finalHeight = pdfHeight - 40;
        finalWidth = finalHeight * imgRatio;
      }

      const x = (pdfWidth - finalWidth) / 2;
      const y = 20;

      pdf.addImage(dataUrl, 'PNG', x, y, finalWidth, finalHeight);
      pdf.save(`Iftar_Income_${profile?.month}_${profile?.year}.pdf`);
    } finally {
      tableRef.current.classList.remove('exporting-mode');
    }
  };

  const handleDownload = async () => {
    if (!tableRef.current) return;
    
    // Temporarily add a class to make it look good for export
    tableRef.current.classList.add('exporting-mode');
    
    try {
      const dataUrl = await toPng(tableRef.current, {
        pixelRatio: 2,
        backgroundColor: document.documentElement.classList.contains('dark') ? '#0f172a' : '#ffffff',
      });
      const link = document.createElement('a');
      link.download = `Iftar_Income_${profile?.month}_${profile?.year}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      tableRef.current.classList.remove('exporting-mode');
    }
  };

  const totalAmount = incomes.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">চাঁদা সংগ্রহ</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">ইফতারের জন্য কে কত টাকা দিল তার হিসাব</p>
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors font-medium shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">HD ইমেজ ডাউনলোড</span>
            <span className="sm:hidden">ইমেজ</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 sticky top-24">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-emerald-500" />
              {editingId ? 'চাঁদা আপডেট করুন' : 'নতুন চাঁদা যোগ করুন'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">তারিখ</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="date"
                    required
                    className="pl-10 block w-full rounded-xl border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm py-3 px-4 transition-colors"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">সদস্যের নাম</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="নাম লিখুন"
                    className="pl-10 block w-full rounded-xl border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm py-3 px-4 transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">টাকার পরিমাণ</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="number"
                    required
                    placeholder="0"
                    min="0"
                    className="pl-10 block w-full rounded-xl border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm py-3 px-4 transition-colors"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all mt-6"
              >
                {editingId ? 'আপডেট করুন' : 'যোগ করুন'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => { setEditingId(null); setFormData({ date: '', name: '', amount: '' }); }}
                  className="w-full flex justify-center py-3 px-4 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-xl text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all mt-2"
                >
                  বাতিল করুন
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Table Section */}
        <div className="lg:col-span-2">
          <div ref={tableRef} className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
            {/* Header for Export */}
            <div className="text-center mb-8 pb-6 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">{profile?.messName}</h2>
              <p className="text-slate-600 dark:text-slate-400 font-medium text-lg">ইফতার চাঁদা সংগ্রহ - {profile?.month} {profile?.year}</p>
              <div className="mt-4 inline-flex flex-wrap justify-center gap-4 text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 px-6 py-3 rounded-full">
                <span>ম্যানেজার: <strong className="text-slate-900 dark:text-white">{profile?.name}</strong></span>
                <span>•</span>
                <span>মোবাইল: <strong className="text-slate-900 dark:text-white">{profile?.phone}</strong></span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                <thead>
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">ক্রমিক নং</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">তারিখ</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">সদস্যের নাম</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">টাকার পরিমাণ</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider action-col">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {incomes.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                        কোনো তথ্য পাওয়া যায়নি
                      </td>
                    </tr>
                  ) : (
                    incomes.map((income, index) => (
                      <tr key={income.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{englishToBengaliNumber(index + 1)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white font-medium">
                          {formatBengaliDate(income.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white font-medium">{income.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-600 dark:text-emerald-400 font-bold text-right">
                          <span className="whitespace-nowrap">৳ {income.amount.toLocaleString('bn-BD')}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium action-col">
                          <button onClick={() => handleEdit(income)} className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(income.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-50 dark:bg-slate-900/50">
                    <td colSpan={3} className="px-6 py-4 text-right text-sm font-bold text-slate-900 dark:text-white">সর্বমোট:</td>
                    <td className="px-6 py-4 text-right text-lg font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                      <span className="whitespace-nowrap">৳ {totalAmount.toLocaleString('bn-BD')}</span>
                    </td>
                    <td className="action-col"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .exporting-mode .action-col {
          display: none !important;
        }
        .exporting-mode {
          padding: 40px !important;
          border: none !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
};
