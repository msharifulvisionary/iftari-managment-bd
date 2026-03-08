import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Heart, Users, Calendar, ShieldCheck, ShoppingBag, FileText, LayoutDashboard, Moon, CheckCircle2, Clock, Download } from 'lucide-react';
import { RamadanSchedule } from '../components/RamadanSchedule';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-40">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=2076&auto=format&fit=crop')] bg-cover bg-center opacity-10 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent dark:from-emerald-900/20 pointer-events-none"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              রমজানুল মোবারক
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white tracking-tight mb-8">
              সহজ ও সুন্দর <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">ইফতার ম্যানেজমেন্ট</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
              মেস, অফিস বা যেকোনো ইফতার আয়োজনের হিসাব নিকাশ, চাঁদা সংগ্রহ ও খরচের তালিকা সংরক্ষণ করুন খুব সহজেই। সম্পূর্ণ ডিজিটাল ও নিরাপদ।
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-lg transition-all hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5"
              >
                শুরু করুন <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
              >
                লগইন করুন
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ramadan Schedule Section */}
      <RamadanSchedule />

      {/* How it Works Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">কীভাবে কাজ করে?</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">খুব সহজেই ৩টি ধাপে আপনার ইফতার আয়োজনের হিসাব শুরু করুন</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-200 dark:from-emerald-800 dark:via-emerald-600 dark:to-emerald-800 -translate-y-1/2 z-0"></div>
            
            {[
              { step: '১', title: 'অ্যাকাউন্ট তৈরি করুন', desc: 'ম্যানেজার হিসেবে আপনার নাম, মেসের নাম ও মোবাইল নাম্বার দিয়ে ফ্রিতে রেজিস্ট্রেশন করুন।' },
              { step: '২', title: 'চাঁদা ও খরচ যোগ করুন', desc: 'প্রতিদিন কে কত টাকা চাঁদা দিল এবং বাজারে কত খরচ হলো তা ড্যাশবোর্ড থেকে এন্ট্রি করুন।' },
              { step: '৩', title: 'হিসাব ডাউনলোড করুন', desc: 'মাস শেষে বা যেকোনো সময় এক ক্লিকে সম্পূর্ণ হিসাবের HD ছবি ডাউনলোড করে সবার সাথে শেয়ার করুন।' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-emerald-500/30 ring-4 ring-white dark:ring-slate-800">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">কেন ব্যবহার করবেন?</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">আমাদের সিস্টেমে রয়েছে ইফতার আয়োজনের যাবতীয় হিসাব রাখার সকল সুবিধা।</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: 'সহজ চাঁদা সংগ্রহ', desc: 'সদস্যদের চাঁদা জমার হিসাব রাখুন তারিখ ও নাম সহ। কে কত টাকা দিল তা সহজেই ট্র্যাক করুন।' },
              { icon: ShoppingBag, title: 'বাজার খরচ ট্র্যাকিং', desc: 'প্রতিদিনের ইফতার বাজারের খরচ, বাজারকারীর নাম ও তারিখ সহ বিস্তারিত হিসাব রাখুন।' },
              { icon: FileText, title: 'রিপোর্ট ডাউনলোড', desc: 'চাঁদা ও খরচের সম্পূর্ণ তালিকা সুন্দর হেডিং সহ HD ইমেজ বা PDF হিসেবে ডাউনলোড করুন।' },
              { icon: LayoutDashboard, title: 'স্মার্ট ড্যাশবোর্ড', desc: 'মোট জমা, মোট খরচ এবং অবশিষ্ট টাকার পরিমাণ এক নজরে দেখুন ড্যাশবোর্ডে।' },
              { icon: ShieldCheck, title: 'নিরাপদ ডেটা', desc: 'আপনার সকল তথ্য ফায়ারবেস রিয়েলটাইম ডেটাবেসে সম্পূর্ণ সুরক্ষিত থাকবে।' },
              { icon: Moon, title: 'ডার্ক মোড', desc: 'চোখের প্রশান্তির জন্য রয়েছে সুন্দর ডার্ক মোড সুবিধা, যা রাতে ব্যবহারে আরামদায়ক।' },
              { icon: Download, title: 'অফলাইন অ্যাপ', desc: 'ওয়েবসাইটটি অ্যাপ হিসেবে ইন্সটল করে অফলাইনেও ব্যবহার করতে পারবেন।' },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-emerald-500/5 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Duas Section */}
      <section className="py-20 bg-emerald-50 dark:bg-emerald-900/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">গুরুত্বপূর্ণ দোয়া</h2>
            <p className="text-slate-600 dark:text-slate-400">ইফতার ও সেহরির দোয়া সমূহ</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-emerald-100 dark:border-emerald-800/30"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl text-emerald-600 dark:text-emerald-400">
                  <Moon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">সেহরির দোয়া</h3>
              </div>
              <p className="text-2xl font-serif text-emerald-700 dark:text-emerald-400 mb-4 leading-relaxed text-right" dir="rtl">
                نَوَيْتُ اَنْ اُصُوْمَ غَدًا مِّنْ شَهْرِ رَمْضَانَ الْمُبَارَكِ فَرْضَا لَكَ يَا اللهُ فَتَقَبَّل مِنِّى اِنَّكَ اَنْتَ السَّمِيْعُ الْعَلِيْم
              </p>
              <p className="text-slate-700 dark:text-slate-300 font-medium mb-2">উচ্চারণ:</p>
              <p className="text-slate-600 dark:text-slate-400 italic mb-4">
                নাওয়াইতু আন আছুমা গাদাম, মিন শাহরি রমাদানাল মুবারাকি ফারদাল্লাকা ইয়া আল্লাহু, ফাতাকাব্বাল মিন্নি ইন্নাকা আংতাস সামিউল আলিম।
              </p>
              <p className="text-slate-700 dark:text-slate-300 font-medium mb-2">অর্থ:</p>
              <p className="text-slate-600 dark:text-slate-400">
                হে আল্লাহ! আমি আগামীকাল পবিত্র রমজানের তোমার পক্ষ থেকে নির্ধারিত ফরজ রোজা রাখার ইচ্ছা পোষণ করলাম। অতএব তুমি আমার পক্ষ থেকে (আমার রোজা তথা পানাহার থেকে বিরত থাকাকে) কবুল কর, নিশ্চয়ই তুমি সর্বশ্রোতা ও সর্বজ্ঞানী।
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-emerald-100 dark:border-emerald-800/30"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl text-emerald-600 dark:text-emerald-400">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">ইফতারের দোয়া</h3>
              </div>
              <p className="text-2xl font-serif text-emerald-700 dark:text-emerald-400 mb-4 leading-relaxed text-right" dir="rtl">
                اَللَّهُمَّ لَكَ صُمْتُ وَ عَلَى رِزْقِكَ وَ اَفْطَرْتُ بِرَحْمَتِكَ يَا اَرْحَمَ الرَّاحِمِيْن
              </p>
              <p className="text-slate-700 dark:text-slate-300 font-medium mb-2">উচ্চারণ:</p>
              <p className="text-slate-600 dark:text-slate-400 italic mb-4">
                আল্লাহুম্মা লাকা ছুমতু ওয়া আলা রিযক্বিকা ওয়া আফতারতু বিরাহমাতিকা ইয়া আরহামার রাহিমিন।
              </p>
              <p className="text-slate-700 dark:text-slate-300 font-medium mb-2">অর্থ:</p>
              <p className="text-slate-600 dark:text-slate-400">
                হে আল্লাহ! আমি তোমারই সন্তুষ্টির জন্য রোজা রেখেছি এবং তোমারই দেয়া রিযিক্বের মাধ্যমে ইফতার করছি।
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ramadan Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-emerald-900"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590076215667-875d4cece8c6?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <BookOpen className="w-12 h-12 mx-auto mb-6 text-emerald-300 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-8 font-serif">রমজানের ফজিলত</h2>
          
          <div className="space-y-8 text-lg md:text-xl leading-relaxed text-emerald-50">
            <blockquote className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              "হে মুমিনগণ! তোমাদের ওপর রোজা ফরজ করা হয়েছে, যেমন ফরজ করা হয়েছিল তোমাদের পূর্ববর্তীদের ওপর; যাতে তোমরা তাকওয়া অর্জন করতে পারো।"
              <footer className="mt-4 text-sm text-emerald-300 font-medium">— সূরা আল-বাকারাহ: ১৮৩</footer>
            </blockquote>
            
            <blockquote className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              "যে ব্যক্তি ঈমানের সাথে ও সওয়াবের আশায় রমজানের রোজা রাখে, তার পূর্বের সব গুনাহ মাফ করে দেওয়া হয়।"
              <footer className="mt-4 text-sm text-emerald-300 font-medium">— সহীহ বুখারী: ৩৮</footer>
            </blockquote>

            <blockquote className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              "যে ব্যক্তি কোনো রোজাদারকে ইফতার করাবে, সে রোজাদারের সমপরিমাণ সওয়াব পাবে; কিন্তু রোজাদারের সওয়াব থেকে বিন্দুমাত্র কমানো হবে না।"
              <footer className="mt-4 text-sm text-emerald-300 font-medium">— তিরমিজি: ৮০৭</footer>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
};
