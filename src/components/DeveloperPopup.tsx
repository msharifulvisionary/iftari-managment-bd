import React from 'react';
import { X, Phone, Mail, Facebook, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperPopup: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md overflow-hidden bg-white dark:bg-slate-900 rounded-3xl shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-32 bg-gradient-to-r from-emerald-500 to-teal-600">
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                <div className="w-24 h-24 rounded-full border-4 border-white dark:border-slate-900 overflow-hidden bg-white">
                  <img
                    src="https://i.imgur.com/mm2jLrd.png"
                    alt="MD SHARIFUL ISLAM"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            <div className="pt-16 pb-8 px-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                MD SHARIFUL ISLAM
              </h3>
              <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-6">
                Full Stack Developer & Designer
              </p>

              <div className="space-y-4 text-left">
                <a href="tel:01735757133" className="flex items-center p-3 rounded-xl bg-gray-50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mr-4 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">মোবাইল নাম্বার</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">01735757133</p>
                  </div>
                </a>

                <a href="https://wa.me/8801735757133" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 rounded-xl bg-gray-50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mr-4 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">হোয়াটসঅ্যাপ</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">+8801735757133</p>
                  </div>
                </a>

                <a href="mailto:msharifulvisionary@gmail.com" className="flex items-center p-3 rounded-xl bg-gray-50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mr-4 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">ইমেইল</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">msharifulvisionary@gmail.com</p>
                  </div>
                </a>

                <a href="https://www.facebook.com/share/17wSvJUFGN/" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 rounded-xl bg-gray-50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mr-4 group-hover:scale-110 transition-transform">
                    <Facebook className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">ফেসবুক</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">MD SHARIFUL ISLAM</p>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
