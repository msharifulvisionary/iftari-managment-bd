import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show prompt after 3 seconds
      setTimeout(() => setShowPrompt(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 p-4 flex items-start gap-4"
        >
          <img 
            src="https://cdn-icons-png.flaticon.com/512/2386/2386614.png" 
            alt="App Icon" 
            className="w-12 h-12 rounded-xl object-contain bg-slate-50 dark:bg-slate-900 p-2"
          />
          <div className="flex-1">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">ইফতার ম্যানেজমেন্ট অ্যাপ</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
              অফলাইনে ব্যবহার এবং দ্রুত অ্যাক্সেসের জন্য অ্যাপটি ইন্সটল করুন।
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleInstall}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                ইন্সটল করুন
              </button>
              <button
                onClick={() => setShowPrompt(false)}
                className="px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                পরে
              </button>
            </div>
          </div>
          <button 
            onClick={() => setShowPrompt(false)}
            className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
