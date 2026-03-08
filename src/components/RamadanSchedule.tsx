import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Clock, Sunrise, Sunset, Calendar as CalendarIcon, MapPin } from 'lucide-react';
import { englishToBengaliNumber } from '../utils/dateUtils';

interface ScheduleDay {
  day: number;
  dateStr: string;
  displayDate: string;
  sehri: string;
  fajr: string;
  iftar: string;
}

const scheduleData: ScheduleDay[] = [
  { day: 1, dateStr: '2026-02-19', displayDate: '১৯ ফেব্রুয়ারি', sehri: '৫:১৫', fajr: '৫:১৯', iftar: '৬:০১' },
  { day: 2, dateStr: '2026-02-20', displayDate: '২০ ফেব্রুয়ারি', sehri: '৫:১৫', fajr: '৫:১৯', iftar: '৬:০২' },
  { day: 3, dateStr: '2026-02-21', displayDate: '২১ ফেব্রুয়ারি', sehri: '৫:১৪', fajr: '৫:১৮', iftar: '৬:০২' },
  { day: 4, dateStr: '2026-02-22', displayDate: '২২ ফেব্রুয়ারি', sehri: '৫:১৩', fajr: '৫:১৭', iftar: '৬:০৩' },
  { day: 5, dateStr: '2026-02-23', displayDate: '২৩ ফেব্রুয়ারি', sehri: '৫:১২', fajr: '৫:১৭', iftar: '৬:০৩' },
  { day: 6, dateStr: '2026-02-24', displayDate: '২৪ ফেব্রুয়ারি', sehri: '৫:১২', fajr: '৫:১৬', iftar: '৬:০৪' },
  { day: 7, dateStr: '2026-02-25', displayDate: '২৫ ফেব্রুয়ারি', sehri: '৫:১১', fajr: '৫:১৫', iftar: '৬:০৪' },
  { day: 8, dateStr: '2026-02-26', displayDate: '২৬ ফেব্রুয়ারি', sehri: '৫:১০', fajr: '৫:১৪', iftar: '৬:০৫' },
  { day: 9, dateStr: '2026-02-27', displayDate: '২৭ ফেব্রুয়ারি', sehri: '৫:০৯', fajr: '৫:১৩', iftar: '৬:০৬' },
  { day: 10, dateStr: '2026-02-28', displayDate: '২৮ ফেব্রুয়ারি', sehri: '৫:০৮', fajr: '৫:১৩', iftar: '৬:০৬' },
  { day: 11, dateStr: '2026-03-01', displayDate: '০১ মার্চ', sehri: '৫:০৮', fajr: '৫:১২', iftar: '৬:০৭' },
  { day: 12, dateStr: '2026-03-02', displayDate: '০২ মার্চ', sehri: '৫:০৭', fajr: '৫:১১', iftar: '৬:০৭' },
  { day: 13, dateStr: '2026-03-03', displayDate: '০৩ মার্চ', sehri: '৫:০৬', fajr: '৫:১০', iftar: '৬:০৮' },
  { day: 14, dateStr: '2026-03-04', displayDate: '০৪ মার্চ', sehri: '৫:০৫', fajr: '৫:০৯', iftar: '৬:০৮' },
  { day: 15, dateStr: '2026-03-05', displayDate: '০৫ মার্চ', sehri: '৫:০৪', fajr: '৫:০৮', iftar: '৬:০৯' },
  { day: 16, dateStr: '2026-03-06', displayDate: '০৬ মার্চ', sehri: '৫:০৩', fajr: '৫:০৭', iftar: '৬:০৯' },
  { day: 17, dateStr: '2026-03-07', displayDate: '০৭ মার্চ', sehri: '৫:০২', fajr: '৫:০৬', iftar: '৬:১০' },
  { day: 18, dateStr: '2026-03-08', displayDate: '০৮ মার্চ', sehri: '৫:০১', fajr: '৫:০৫', iftar: '৬:১০' },
  { day: 19, dateStr: '2026-03-09', displayDate: '০৯ মার্চ', sehri: '৫:০০', fajr: '৫:০৪', iftar: '৬:১১' },
  { day: 20, dateStr: '2026-03-10', displayDate: '১০ মার্চ', sehri: '৪:৫৯', fajr: '৫:০৩', iftar: '৬:১১' },
  { day: 21, dateStr: '2026-03-11', displayDate: '১১ মার্চ', sehri: '৪:৫৮', fajr: '৫:০২', iftar: '৬:১১' },
  { day: 22, dateStr: '2026-03-12', displayDate: '১২ মার্চ', sehri: '৪:৫৭', fajr: '৫:০১', iftar: '৬:১২' },
  { day: 23, dateStr: '2026-03-13', displayDate: '১৩ মার্চ', sehri: '৪:৫৬', fajr: '৫:০০', iftar: '৬:১২' },
  { day: 24, dateStr: '2026-03-14', displayDate: '১৪ মার্চ', sehri: '৪:৫৫', fajr: '৪:৫৯', iftar: '৬:১৩' },
  { day: 25, dateStr: '2026-03-15', displayDate: '১৫ মার্চ', sehri: '৪:৫৪', fajr: '৪:৫৮', iftar: '৬:১৩' },
  { day: 26, dateStr: '2026-03-16', displayDate: '১৬ মার্চ', sehri: '৪:৫৩', fajr: '৪:৫৭', iftar: '৬:১৪' },
  { day: 27, dateStr: '2026-03-17', displayDate: '১৭ মার্চ', sehri: '৪:৫২', fajr: '৪:৫৬', iftar: '৬:১৪' },
  { day: 28, dateStr: '2026-03-18', displayDate: '১৮ মার্চ', sehri: '৪:৫১', fajr: '৪:৫৫', iftar: '৬:১৫' },
  { day: 29, dateStr: '2026-03-19', displayDate: '১৯ মার্চ', sehri: '৪:৫০', fajr: '৪:৫৪', iftar: '৬:১৫' },
  { day: 30, dateStr: '2026-03-20', displayDate: '২০ মার্চ', sehri: '৪:৪৯', fajr: '৪:৫৩', iftar: '৬:১৫' },
];

export const RamadanSchedule: React.FC = () => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  useEffect(() => {
    // Find today's date in the schedule
    const today = new Date();
    // Use local time, format to YYYY-MM-DD
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;

    const index = scheduleData.findIndex(s => s.dateStr === todayStr);
    
    if (index !== -1) {
      setCurrentDayIndex(index);
    } else {
      // If today is before Ramadan, show first day. If after, show last day.
      if (today < new Date('2026-02-19')) {
        setCurrentDayIndex(0);
      } else if (today > new Date('2026-03-20')) {
        setCurrentDayIndex(scheduleData.length - 1);
      }
    }
  }, []);

  const handlePrev = () => {
    setCurrentDayIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentDayIndex((prev) => (prev < scheduleData.length - 1 ? prev + 1 : prev));
  };

  const currentSchedule = scheduleData[currentDayIndex];

  const getPhase = (day: number) => {
    if (day <= 10) return { name: 'রহমত', desc: 'প্রথম ১০ দিন', color: 'from-blue-500 to-cyan-400', bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-300' };
    if (day <= 20) return { name: 'মাগফিরাত', desc: 'দ্বিতীয় ১০ দিন', color: 'from-emerald-500 to-teal-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-700 dark:text-emerald-300' };
    return { name: 'নাজাত', desc: 'শেষ ১০ দিন', color: 'from-amber-500 to-orange-400', bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-700 dark:text-amber-300' };
  };

  const phase = getPhase(currentSchedule.day);

  return (
    <section className="py-20 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">রমজানের সময়সূচী</h2>
          <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400">
            <MapPin className="w-5 h-5 text-emerald-500" />
            <span className="text-lg font-medium">বগুড়া জেলা</span>
          </div>
        </div>

        {/* Marquee Train Section */}
        <div className="mb-10 overflow-hidden bg-slate-900 dark:bg-slate-800 rounded-2xl py-3 border border-slate-800 dark:border-slate-700 shadow-inner relative flex">
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-slate-900 dark:from-slate-800 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-slate-900 dark:from-slate-800 to-transparent z-10"></div>
          
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(10)].map((_, i) => (
              <span key={`a-${i}`} className="text-emerald-400 font-bold text-lg mx-6 flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                পবিত্র মাহে রমজান এর শুভেচ্ছা - শরিফুল
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse ml-3"></span>
              </span>
            ))}
          </div>
          <div className="flex whitespace-nowrap animate-marquee" aria-hidden="true">
            {[...Array(10)].map((_, i) => (
              <span key={`b-${i}`} className="text-emerald-400 font-bold text-lg mx-6 flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                পবিত্র মাহে রমজান এর শুভেচ্ছা - শরিফুল
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse ml-3"></span>
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          {/* Header / Navigation */}
          <div className={`p-6 sm:p-8 bg-gradient-to-r ${phase.color} text-white flex flex-col sm:flex-row items-center justify-between gap-6`}>
            <button 
              onClick={handlePrev}
              disabled={currentDayIndex === 0}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-bold mb-3">
                {phase.name} ({phase.desc})
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold mb-2">
                {englishToBengaliNumber(currentSchedule.day)} রমজান
              </h3>
              <div className="flex items-center justify-center gap-2 text-white/90 font-medium">
                <CalendarIcon className="w-4 h-4" />
                {currentSchedule.displayDate}, ২০২৬
              </div>
            </div>

            <button 
              onClick={handleNext}
              disabled={currentDayIndex === scheduleData.length - 1}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Times */}
          <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <motion.div 
              key={`sehri-${currentSchedule.day}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700"
            >
              <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium mb-1">সাহরীর শেষ সময়</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{currentSchedule.sehri}</p>
            </motion.div>

            <motion.div 
              key={`fajr-${currentSchedule.day}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700"
            >
              <div className="w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-4">
                <Sunrise className="w-6 h-6" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium mb-1">ফজরের আযান</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{currentSchedule.fajr}</p>
            </motion.div>

            <motion.div 
              key={`iftar-${currentSchedule.day}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700"
            >
              <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center text-orange-600 dark:text-orange-400 mb-4">
                <Sunset className="w-6 h-6" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium mb-1">ইফতারের সময়</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{currentSchedule.iftar}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
