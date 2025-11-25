
import React, { useState, useCallback } from 'react';
import { analyzeContent } from './services/geminiService';
import { AnalysisResult, LoadingState, Language } from './types';
import { TRANSLATIONS } from './translations';
import RadarChartComponent from './components/RadarChart';
import StandardCard from './components/StandardCard';
import HistoricalDataCard from './components/HistoricalDataCard';
import { Rocket, AlertCircle, RefreshCw, Copy, Sparkles, TrendingUp, Globe } from 'lucide-react';

const App: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('zh'); // Default to Chinese as per recent request

  const t = TRANSLATIONS[language];

  const handleAnalyze = useCallback(async () => {
    if (!topic.trim()) return;
    
    setLoadingState(LoadingState.ANALYZING);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeContent(topic, description, language);
      setResult(data);
      setLoadingState(LoadingState.SUCCESS);
    } catch (err) {
      console.error(err);
      setError(t.error);
      setLoadingState(LoadingState.ERROR);
    }
  }, [topic, description, language, t]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
    // Reset result when changing language to avoid mismatch
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="mb-10 flex flex-col items-center relative">
          <div className="absolute right-0 top-0 hidden md:block">
             <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all text-sm border border-slate-700"
            >
              <Globe size={14} />
              {language === 'en' ? 'Switch to 中文' : 'Switch to English'}
            </button>
          </div>

          <div className="inline-flex items-center justify-center p-3 bg-purple-500/10 rounded-full mb-4 ring-1 ring-purple-500/30">
            <Rocket className="w-6 h-6 text-purple-400 mr-2" />
            <span className="text-purple-300 font-semibold tracking-wide text-sm uppercase">Viral Content Engine</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400 mb-4 text-center">
            {t.appTitle}
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-center">
            {t.subtitle}
          </p>

          {/* Mobile Language Toggle */}
          <div className="mt-4 md:hidden">
             <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white text-sm border border-slate-700"
            >
              <Globe size={14} />
              {language === 'en' ? '中文' : 'English'}
            </button>
          </div>
        </header>

        {/* Logic Explanation */}
        <StandardCard standards={t.standards} titleText={t.logicButton} />

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Input Section */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
                <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center mr-3 text-sm font-bold">1</span>
                {t.step1}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">{t.topicLabel}</label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder={t.topicPlaceholder}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">{t.descLabel}</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t.descPlaceholder}
                    rows={6}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600 resize-none"
                  />
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={loadingState === LoadingState.ANALYZING || !topic.trim()}
                  className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all ${
                    loadingState === LoadingState.ANALYZING || !topic.trim()
                      ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white hover:shadow-purple-500/25'
                  }`}
                >
                  {loadingState === LoadingState.ANALYZING ? (
                    <>
                      <RefreshCw className="animate-spin" /> {t.analyzingBtn}
                    </>
                  ) : (
                    t.analyzeBtn
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-start gap-3">
                <AlertCircle className="shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="lg:col-span-7">
            {result ? (
              <div className="space-y-6 animate-fade-in">
                
                {/* Score Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                  
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="relative shrink-0">
                      <div className="w-32 h-32 rounded-full border-4 border-slate-800 flex items-center justify-center bg-slate-900 relative z-10">
                        <span className={`text-4xl font-bold ${
                          result.totalScore >= 80 ? 'text-green-400' : 
                          result.totalScore >= 60 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {result.totalScore}
                        </span>
                      </div>
                      <svg className="absolute top-0 left-0 w-32 h-32 -rotate-90 z-0">
                        <circle cx="64" cy="64" r="60" stroke="#1e293b" strokeWidth="4" fill="transparent" />
                        <circle 
                          cx="64" cy="64" r="60" 
                          stroke={result.totalScore >= 80 ? '#4ade80' : result.totalScore >= 60 ? '#facc15' : '#f87171'} 
                          strokeWidth="4" 
                          fill="transparent" 
                          strokeDasharray={377}
                          strokeDashoffset={377 - (377 * result.totalScore) / 100}
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-bold text-white mb-2">{result.verdict}</h3>
                      <p className="text-slate-400 leading-relaxed text-sm">{result.summaryAnalysis}</p>
                    </div>
                  </div>

                  {/* Chart and Dimensions */}
                  <div className="mt-8 grid md:grid-cols-2 gap-8 items-center">
                    <div className="-ml-6">
                      <RadarChartComponent data={result.dimensions} />
                    </div>
                    <div className="space-y-3">
                      {result.dimensions.map((dim, idx) => (
                        <div key={idx} className="group">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-slate-300">{dim.name}</span>
                            <span className={`text-sm font-bold ${dim.score > 70 ? 'text-green-400' : 'text-slate-400'}`}>{dim.score}/100</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2">
                            <div 
                              className={`h-1.5 rounded-full transition-all duration-1000 ${dim.score > 70 ? 'bg-green-500' : 'bg-purple-500'}`} 
                              style={{ width: `${dim.score}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-slate-500 hidden group-hover:block transition-all">
                            Tip: {dim.advice}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Historical Data / Market Validation */}
                <HistoricalDataCard data={result.similarContentAnalysis} t={t} />

                {/* Viral Variations */}
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-purple-500/20 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Sparkles className="text-yellow-400 fill-yellow-400" size={20} />
                    {t.aiSuggestionsTitle}
                  </h3>
                  
                  <div className="grid gap-4">
                    {result.viralVariations.map((variation, idx) => (
                      <div key={idx} className="bg-slate-900/80 p-5 rounded-xl border border-white/5 hover:border-purple-500/30 transition-all group">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <div className="inline-block px-2 py-1 rounded-md bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
                              {t.angle} {variation.angle}
                            </div>
                            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                              "{variation.title}"
                            </h4>
                            <p className="text-sm text-slate-400">{variation.reasoning}</p>
                          </div>
                          <button 
                            onClick={() => copyToClipboard(variation.title)}
                            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                            title={t.copyTitle}
                          >
                            <Copy size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-slate-500 bg-slate-900/30 rounded-2xl border-2 border-dashed border-slate-800">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                  <TrendingUp className="text-slate-600" size={32} />
                </div>
                <p className="text-lg font-medium">{t.readyToAnalyze}</p>
                <p className="text-sm opacity-60 mt-2 max-w-xs text-center">
                  {t.readyDesc}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
