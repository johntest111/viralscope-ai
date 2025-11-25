
import React, { useState } from 'react';
import { OptimizedStandardPoint } from '../types';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface Props {
  standards: OptimizedStandardPoint[];
  titleText: string;
}

const StandardCard: React.FC<Props> = ({ standards, titleText }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden mb-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between bg-slate-800/80 hover:bg-slate-700 transition-colors"
      >
        <div className="flex items-center gap-2 text-purple-400">
          <Sparkles size={20} />
          <span className="font-semibold text-white text-left">{titleText}</span>
        </div>
        {isOpen ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
      </button>
      
      {isOpen && (
        <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 bg-slate-900/50">
          {standards.map((s, idx) => (
            <div key={idx} className="bg-slate-800 p-3 rounded-lg border border-slate-700/50">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-1 line-through decoration-slate-600/50">
                {s.original}
              </div>
              <div className="text-sm font-bold text-purple-300 mb-2 flex items-center gap-2">
                {s.optimized}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{s.reason}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StandardCard;
