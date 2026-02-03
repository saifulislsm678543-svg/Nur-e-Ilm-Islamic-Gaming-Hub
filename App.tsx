
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import QuizGame from './components/QuizGame';
import AIChat from './components/AIChat';
import { GameMode } from './types';
import { DAILY_HADITH } from './constants';
// Added MessageSquare to imports
import { BookOpen, Star, Play, Sparkles, Languages, MessageSquare } from 'lucide-react';
import { generateDailyVerse } from './services/geminiService';

const App: React.FC = () => {
  const [activeMode, setActiveMode] = useState<GameMode>(GameMode.HOME);
  const [dailyVerse, setDailyVerse] = useState<{
    arabic: string;
    bengali: string;
    reference: string;
    explanation: string;
  } | null>(null);

  useEffect(() => {
    const fetchVerse = async () => {
      const data = await generateDailyVerse();
      if (data) setDailyVerse(data);
    };
    fetchVerse();
  }, []);

  const renderContent = () => {
    switch (activeMode) {
      case GameMode.QUIZ:
        return <QuizGame />;
      case GameMode.AI_CHAT:
        return <AIChat />;
      case GameMode.HOME:
      default:
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Welcome Section */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden">
               <div className="relative z-10">
                 <h2 className="text-3xl font-bold mb-2">আসসালামু আলাইকুম!</h2>
                 <p className="opacity-90 text-emerald-50 mb-6">আজকের দিনটি শুরু করুন ইসলামী জ্ঞান দিয়ে।</p>
                 <div className="flex gap-4">
                   <button 
                    onClick={() => setActiveMode(GameMode.QUIZ)}
                    className="bg-white text-emerald-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-50 transition-all shadow-lg active:scale-95"
                   >
                     <Play className="w-4 h-4 fill-current" />
                     কুইজ খেলুন
                   </button>
                 </div>
               </div>
               <div className="absolute top-[-20%] right-[-10%] opacity-10">
                 <BookOpen className="w-64 h-64" />
               </div>
            </div>

            {/* Daily Hadith / AI Generated Verse */}
            <div className="bg-white rounded-3xl p-6 shadow-md border border-emerald-100">
              <div className="flex items-center gap-2 mb-4 text-amber-600">
                <Star className="w-5 h-5 fill-current" />
                <h3 className="font-bold uppercase tracking-wide text-xs">আজকের আয়াত</h3>
              </div>
              {dailyVerse ? (
                <div className="space-y-4">
                   <p className="arabic-text text-2xl text-right text-emerald-800 leading-relaxed font-semibold">
                    {dailyVerse.arabic}
                  </p>
                  <p className="text-slate-700 font-medium leading-relaxed italic border-l-4 border-emerald-400 pl-4">
                    "{dailyVerse.bengali}"
                  </p>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 uppercase font-bold tracking-widest pt-2">
                    <span>{dailyVerse.reference}</span>
                    <div className="flex items-center gap-1 text-emerald-600">
                      <Sparkles className="w-3 h-3" />
                      <span>এআই দ্বারা সংগৃহীত</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-slate-100 rounded-full w-3/4 ml-auto"></div>
                  <div className="h-4 bg-slate-100 rounded-full w-full"></div>
                  <div className="h-4 bg-slate-100 rounded-full w-1/4"></div>
                </div>
              )}
            </div>

            {/* Daily Hadith Simple Card */}
            <div className="bg-amber-50 rounded-3xl p-6 border-2 border-dashed border-amber-200">
               <div className="flex items-center gap-2 mb-3 text-amber-700">
                 <Languages className="w-5 h-5" />
                 <h3 className="font-bold text-sm">হাদিস অফ দ্য ডে</h3>
               </div>
               <p className="text-amber-900 font-semibold leading-relaxed mb-2">"{DAILY_HADITH.text}"</p>
               <p className="text-amber-700 text-xs">— {DAILY_HADITH.source}</p>
            </div>

            {/* Game Options Grid */}
            <div className="grid grid-cols-2 gap-4">
              <GameCard 
                title="কুইজ মাস্টার" 
                subtitle="ইসলামিক কুইজ"
                icon={<Star className="w-6 h-6 text-white" />}
                color="bg-orange-500"
                onClick={() => setActiveMode(GameMode.QUIZ)}
              />
              <GameCard 
                title="এআই আলিম" 
                subtitle="প্রশ্ন করুন"
                icon={<MessageSquare className="w-6 h-6 text-white" />}
                color="bg-indigo-500"
                onClick={() => setActiveMode(GameMode.AI_CHAT)}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <Layout activeMode={activeMode} onModeChange={setActiveMode}>
      {renderContent()}
    </Layout>
  );
};

const GameCard: React.FC<{ title: string, subtitle: string, icon: React.ReactNode, color: string, onClick: () => void }> = ({ title, subtitle, icon, color, onClick }) => (
  <button 
    onClick={onClick}
    className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all text-left flex flex-col items-start gap-3 active:scale-95 group"
  >
    <div className={`${color} p-3 rounded-2xl group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-slate-800">{title}</h4>
      <p className="text-xs text-slate-400">{subtitle}</p>
    </div>
  </button>
);

export default App;
