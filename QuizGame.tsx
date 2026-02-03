
import React, { useState } from 'react';
import { ISLAMIC_QUESTIONS } from '../constants';
import { CheckCircle2, XCircle, ChevronRight, RotateCcw } from 'lucide-react';

const QuizGame: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = ISLAMIC_QUESTIONS[currentIdx];

  const handleAnswer = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    if (idx === currentQuestion.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < ISLAMIC_QUESTIONS.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedAnswer(null);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-xl text-center border-4 border-emerald-100">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">মাশাআল্লাহ!</h2>
        <p className="text-slate-600 mb-6">আপনি সব প্রশ্নের উত্তর দিয়েছেন।</p>
        <div className="bg-emerald-50 p-6 rounded-2xl mb-8">
          <p className="text-sm text-emerald-700 font-semibold uppercase tracking-wider mb-1">আপনার স্কোর</p>
          <p className="text-5xl font-black text-emerald-800">{score} / {ISLAMIC_QUESTIONS.length}</p>
        </div>
        <button 
          onClick={resetQuiz}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          আবার খেলুন
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
          প্রশ্ন {currentIdx + 1} / {ISLAMIC_QUESTIONS.length}
        </span>
        <span className="text-sm font-semibold text-slate-500">স্কোর: {score}</span>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border-b-8 border-emerald-200">
        <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-8 leading-relaxed">
          {currentQuestion.question}
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {currentQuestion.options.map((option, idx) => {
            let bgColor = 'bg-slate-50 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50';
            let textColor = 'text-slate-700';
            let icon = null;

            if (selectedAnswer !== null) {
              if (idx === currentQuestion.correctAnswer) {
                bgColor = 'bg-green-100 border-green-500 ring-2 ring-green-200';
                textColor = 'text-green-800';
                icon = <CheckCircle2 className="w-5 h-5 text-green-600" />;
              } else if (idx === selectedAnswer) {
                bgColor = 'bg-red-100 border-red-500 ring-2 ring-red-200';
                textColor = 'text-red-800';
                icon = <XCircle className="w-5 h-5 text-red-600" />;
              } else {
                bgColor = 'bg-slate-50 border-slate-100 opacity-50';
                textColor = 'text-slate-400';
              }
            }

            return (
              <button
                key={idx}
                disabled={selectedAnswer !== null}
                onClick={() => handleAnswer(idx)}
                className={`flex items-center justify-between p-4 md:p-5 rounded-2xl border-2 transition-all text-left font-medium ${bgColor} ${textColor}`}
              >
                <span>{option}</span>
                {icon}
              </button>
            );
          })}
        </div>

        {selectedAnswer !== null && (
          <div className="mt-8 p-4 bg-emerald-50 rounded-xl border border-emerald-100 animate-in fade-in slide-in-from-top-2">
            <p className="text-emerald-800 text-sm italic">
              <strong>শিক্ষা:</strong> {currentQuestion.explanation}
            </p>
          </div>
        )}
      </div>

      <button
        onClick={handleNext}
        disabled={selectedAnswer === null}
        className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-md ${
          selectedAnswer !== null 
          ? 'bg-emerald-600 text-white hover:bg-emerald-700 translate-y-0 shadow-emerald-200' 
          : 'bg-slate-200 text-slate-400 translate-y-1 shadow-none'
        }`}
      >
        পরবর্তী প্রশ্ন
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default QuizGame;
