
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { getIslamicAIResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    const newMessages: ChatMessage[] = [...messages, { role: 'user', parts: [{ text: userMsg }] }];
    setMessages(newMessages);
    setIsLoading(true);

    const response = await getIslamicAIResponse(messages, userMsg);
    
    setMessages([...newMessages, { role: 'model', parts: [{ text: response }] }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[70vh] md:h-[75vh] bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-emerald-100">
      {/* Chat Header */}
      <div className="bg-emerald-700 p-4 text-white flex items-center gap-3">
        <div className="bg-emerald-600 p-2 rounded-full">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold">নূর এআই আলিম</h3>
          <p className="text-[10px] opacity-80 uppercase tracking-tighter">ভার্চুয়াল ইসলামিক সহকারী</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-emerald-50/30">
        {messages.length === 0 && (
          <div className="text-center py-10 px-6">
            <Bot className="w-12 h-12 text-emerald-200 mx-auto mb-4" />
            <h4 className="text-slate-500 font-medium">আসসালামু আলাইকুম!</h4>
            <p className="text-slate-400 text-sm mt-2">ইসলামী জ্ঞান সম্পর্কে যেকোনো প্রশ্ন করুন। ইনশাআল্লাহ আমি সাহায্য করার চেষ্টা করব।</p>
          </div>
        )}
        
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-emerald-600' : 'bg-slate-200'}`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-emerald-700" />}
              </div>
              <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
              }`}>
                {msg.parts[0].text}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
             <div className="flex gap-2 max-w-[85%]">
               <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                 <Bot className="w-4 h-4 text-emerald-700" />
               </div>
               <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                 <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                 <span className="text-xs text-slate-400 italic">চিন্তা করছি...</span>
               </div>
             </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-100 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="আপনার প্রশ্ন লিখুন..."
            className="flex-1 bg-slate-100 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-emerald-600 text-white p-3 rounded-2xl hover:bg-emerald-700 disabled:opacity-50 disabled:bg-slate-300 transition-all shadow-md active:scale-95"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
