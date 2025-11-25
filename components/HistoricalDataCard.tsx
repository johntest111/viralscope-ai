
import React from 'react';
import { SimilarContent } from '../types';
import { History, Eye, Heart, Share2, TrendingUp } from 'lucide-react';

interface Props {
  data: SimilarContent[];
  t: any; // Translation object
}

const HistoricalDataCard: React.FC<Props> = ({ data, t }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl mb-6">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <History className="text-blue-400" size={20} />
        {t.marketValidationTitle}
        <span className="text-xs font-normal text-slate-500 bg-slate-800 px-2 py-1 rounded-full ml-auto border border-slate-700">
          {t.similarContentBadge}
        </span>
      </h3>

      <div className="space-y-4">
        {data.map((item, idx) => (
          <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 hover:border-blue-500/30 transition-all">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                    item.platform.toLowerCase().includes('wechat') || item.platform.includes('公众号') 
                    ? 'bg-green-500/10 text-green-400' 
                    : 'bg-blue-500/10 text-blue-300'
                  }`}>
                    {item.platform}
                  </span>
                  <span className="text-xs text-slate-500">{t.benchmarkExample}</span>
                </div>
                <h4 className="font-semibold text-slate-200 text-lg leading-tight">"{item.title}"</h4>
              </div>
              
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex flex-col items-center min-w-[60px] p-2 bg-slate-800 rounded-lg border border-slate-700" title="Reads/Views">
                  <Eye size={16} className="text-slate-400 mb-1" />
                  <span className="text-sm font-bold text-white">{item.metrics.views}</span>
                </div>
                <div className="flex flex-col items-center min-w-[60px] p-2 bg-slate-800 rounded-lg border border-slate-700" title="Likes">
                  <Heart size={16} className="text-pink-400 mb-1" />
                  <span className="text-sm font-bold text-white">{item.metrics.likes}</span>
                </div>
                 <div className="flex flex-col items-center min-w-[60px] p-2 bg-slate-800 rounded-lg border border-slate-700" title="Shares/Wows">
                  <Share2 size={16} className="text-green-400 mb-1" />
                  <span className="text-sm font-bold text-white">{item.metrics.shares}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-2 pt-3 border-t border-slate-700/50">
              <TrendingUp size={16} className="text-yellow-500 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-400">
                <span className="text-yellow-500 font-medium">{t.whyItWorked} </span>
                {item.keyInsight}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoricalDataCard;
