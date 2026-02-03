
import React from 'react';
import { BookOpen, Gamepad2, Home, MessageSquare, Award } from 'lucide-react';
import { GameMode } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeMode: GameMode;
  onModeChange: (mode: GameMode) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeMode, onModeChange }) => {
  return (
    <div className="min-h-screen flex flex-col bg-emerald-50 text-slate-800">
      {/* Header */}
      <header className="bg-emerald-700 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onModeChange(GameMode.HOME)}>
            <div className="bg-white p-1.5 rounded-full">
              <BookOpen className="text-emerald-700 w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">নূর-ই-ইলম</h1>
          </div>
          <div className="flex space-x-4">
             <div className="bg-emerald-600 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <Award className="w-4 h-4 text-yellow-300" />
                <span>৫০০ পয়েন্ট</span>
             </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-4 md:p-6 mb-20">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-emerald-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] md:static md:bg-transparent md:border-none md:shadow-none">
        <div className="max-w-4xl mx-auto px-6 py-2 flex justify-around md:justify-center md:space-x-12">
          <NavItem 
            icon={<Home className="w-6 h-6" />} 
            label="হোম" 
            active={activeMode === GameMode.HOME} 
            onClick={() => onModeChange(GameMode.HOME)} 
          />
          <NavItem 
            icon={<Gamepad2 className="w-6 h-6" />} 
            label="কুইজ" 
            active={activeMode === GameMode.QUIZ} 
            onClick={() => onModeChange(GameMode.QUIZ)} 
          />
          <NavItem 
            icon={<MessageSquare className="w-6 h-6" />} 
            label="এআই আলিম" 
            active={activeMode === GameMode.AI_CHAT} 
            onClick={() => onModeChange(GameMode.AI_CHAT)} 
          />
        </div>
      </nav>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode, label: string, active: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 ${active ? 'text-emerald-700 md:bg-emerald-100' : 'text-slate-400 hover:text-emerald-600'}`}
  >
    {icon}
    <span className="text-[10px] md:text-xs font-semibold mt-1">{label}</span>
  </button>
);

export default Layout;
