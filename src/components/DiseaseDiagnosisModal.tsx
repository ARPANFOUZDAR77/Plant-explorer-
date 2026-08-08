import React, { useState } from 'react';
import { Stethoscope, AlertTriangle, Bug, ShieldCheck, Sparkles, Upload, CheckCircle2, ChevronRight, X, Search } from 'lucide-react';
import { DISEASES_DATA } from '../data/diseasesData';
import { Disease } from '../types';

export const DiseaseDiagnosisModal: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [selectedDisease, setSelectedDisease] = useState<Disease>(DISEASES_DATA[0]);
  const [symptomSearch, setSymptomSearch] = useState<string>('');
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const filteredDiseases = DISEASES_DATA.filter((d) =>
    d.name.toLowerCase().includes(symptomSearch.toLowerCase()) ||
    d.symptoms.some((s) => s.toLowerCase().includes(symptomSearch.toLowerCase()))
  );

  const handleRunAiDiagnosis = () => {
    if (!aiPrompt.trim()) return;
    setIsAnalyzing(true);
    setAiResult(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      setAiResult(
        `Based on your description ("${aiPrompt}"), this looks like a early-stage Powdery Mildew or Spider Mite infestation. \n\nRecommended Step-by-step Treatment:\n1. Isolate the affected plant from surrounding houseplants immediately to prevent spread.\n2. Gently wipe down all affected leaves with an organic Neem Oil solution (1 tsp neem oil + 1/2 tsp liquid dish soap in 1 quart warm water).\n3. Increase room air circulation using a low-speed fan without pointing direct dry draft at the leaves.`
      );
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Title Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-500/20">
          <Stethoscope className="w-4 h-4 text-rose-600 dark:text-rose-400" />
          <span>Botanical Health Clinic</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
          Plant Doctor & Disease Diagnostic Tool
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto">
          Identify plant pests, fungal leaf spots, and root issues with expert symptoms guide or AI symptom analysis.
        </p>
      </div>

      {/* AI Quick Symptom Analyzer Box */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-900 via-zinc-900 to-zinc-950 text-white shadow-2xl space-y-4 border border-emerald-500/30">
        <div className="flex items-center gap-2 text-emerald-400">
          <Sparkles className="w-5 h-5 animate-pulse" />
          <h3 className="text-base font-extrabold">Instant AI Symptom Analyzer</h3>
        </div>
        
        <p className="text-xs text-zinc-300">
          Describe what you observe on your plant (e.g. "Yellowing bottom leaves with brown spots on my monstera" or "Sticky white web under pothos leaves").
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="e.g. White powdery dust on cucumber leaves with brown curling edges..."
            className="flex-1 px-4 py-3 rounded-xl bg-zinc-800/80 border border-zinc-700 text-sm text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={handleRunAiDiagnosis}
            disabled={isAnalyzing || !aiPrompt.trim()}
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/30"
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" /> Diagnosing...
              </>
            ) : (
              <>
                <Stethoscope className="w-4 h-4" /> Analyze Symptoms
              </>
            )}
          </button>
        </div>

        {/* AI Result panel */}
        {aiResult && (
          <div className="p-5 rounded-2xl bg-zinc-800/90 border border-emerald-500/40 text-xs leading-relaxed space-y-2 animate-in fade-in">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" /> AI Doctor Assessment
            </div>
            <p className="text-zinc-200 whitespace-pre-line">{aiResult}</p>
          </div>
        )}
      </div>

      {/* Disease Catalog Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left list selector */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={symptomSearch}
              onChange={(e) => setSymptomSearch(e.target.value)}
              placeholder="Search diseases or symptoms..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1">
            {filteredDiseases.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDisease(d)}
                className={`w-full p-3.5 rounded-2xl text-left transition-all border flex items-center gap-3 ${
                  selectedDisease.id === d.id
                    ? 'bg-rose-600 text-white border-transparent shadow-md font-bold'
                    : 'bg-zinc-50 dark:bg-zinc-800/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-800'
                }`}
              >
                <img src={d.imageUrl} alt={d.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold truncate">{d.name}</p>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      d.severity === 'Severe' ? 'bg-rose-950 text-rose-300' : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                    }`}>
                      {d.severity}
                    </span>
                  </div>
                  <p className={`text-[10px] mt-1 ${selectedDisease.id === d.id ? 'text-rose-100' : 'text-zinc-500'}`}>
                    Type: {d.type}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl space-y-6">
          <div className="flex items-center gap-4">
            <img src={selectedDisease.imageUrl} alt={selectedDisease.name} className="w-20 h-20 rounded-2xl object-cover border border-zinc-200 dark:border-zinc-800" />
            <div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                {selectedDisease.type} Issue
              </span>
              <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 mt-1">{selectedDisease.name}</h3>
            </div>
          </div>

          {/* Symptoms List */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-500" /> Key Visual Symptoms
            </h4>
            <ul className="space-y-1.5">
              {selectedDisease.symptoms.map((symptom, idx) => (
                <li key={idx} className="text-xs text-zinc-600 dark:text-zinc-300 flex items-start gap-2 bg-zinc-50 dark:bg-zinc-800/50 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  {symptom}
                </li>
              ))}
            </ul>
          </div>

          {/* Causes */}
          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-500/20 space-y-1">
            <p className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">Root Cause</p>
            <p className="text-xs text-zinc-700 dark:text-zinc-300">{selectedDisease.causes}</p>
          </div>

          {/* Treatment Steps */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
              <Bug className="w-4 h-4 text-emerald-500" /> Step-By-Step Treatment
            </h4>
            <div className="space-y-2">
              {selectedDisease.treatment.map((step, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-zinc-800 dark:text-zinc-200">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Prevention */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-500" /> Long-term Prevention
            </h4>
            <ul className="space-y-1">
              {selectedDisease.prevention.map((prev, idx) => (
                <li key={idx} className="text-xs text-zinc-600 dark:text-zinc-300 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  {prev}
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
