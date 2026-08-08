import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Layers,
  Search,
  CheckCircle2,
  Info,
  HelpCircle,
  Flame,
  Award
} from 'lucide-react';
import { EDUCATIONAL_ANATOMY, COMPANION_PLANTS_MATRIX } from '../data/educationalData';
import { GLOSSARY_DATA } from '../data/glossaryData';

export const EducationalSection: React.FC = () => {
  const [selectedAnatomyId, setSelectedAnatomyId] = useState('leaves');
  const [companionSearch, setCompanionSearch] = useState('');
  const [glossaryQuery, setGlossaryQuery] = useState('');

  const activeAnatomyPart = EDUCATIONAL_ANATOMY.find((a) => a.id === selectedAnatomyId) || EDUCATIONAL_ANATOMY[0];

  const filteredCompanion = COMPANION_PLANTS_MATRIX.filter(
    (c) =>
      c.crop.toLowerCase().includes(companionSearch.toLowerCase()) ||
      c.goodCompanions.some((g) => g.toLowerCase().includes(companionSearch.toLowerCase()))
  );

  const filteredGlossary = GLOSSARY_DATA.filter(
    (g) =>
      g.term.toLowerCase().includes(glossaryQuery.toLowerCase()) ||
      g.definition.toLowerCase().includes(glossaryQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>Interactive Botanical Science</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">
          Plant Anatomy, Soil Chemistry & Science
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto">
          Explore botanical structures, soil N-P-K nutrient ratios, companion planting synergies, and terminology.
        </p>
      </div>

      {/* 1. Interactive Plant Anatomy Diagram */}
      <div className="p-8 rounded-3xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-emerald-500/20 shadow-2xl space-y-6">
        
        <div className="flex items-center gap-2 font-bold text-lg text-zinc-900 dark:text-zinc-100">
          <BookOpen className="w-5 h-5 text-emerald-500" />
          <span>1. Interactive Plant Anatomy Diagram</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Anatomy Diagram Hotspots */}
          <div className="lg:col-span-5 relative bg-gradient-to-b from-emerald-950 to-zinc-950 rounded-3xl p-6 text-white min-h-[320px] flex flex-col justify-between overflow-hidden shadow-inner border border-emerald-500/20">
            <div className="absolute top-2 right-2 text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
              Anatomical Structure
            </div>

            <div className="space-y-2 z-10 pt-4">
              {EDUCATIONAL_ANATOMY.map((part) => (
                <button
                  key={part.id}
                  onClick={() => setSelectedAnatomyId(part.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-between ${
                    selectedAnatomyId === part.id
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-102'
                      : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
                  }`}
                >
                  <span>{part.partName}</span>
                  <span className="text-[10px] opacity-80">{part.function.substring(0, 24)}...</span>
                </button>
              ))}
            </div>

            <p className="text-[10px] text-zinc-400 z-10 pt-4 text-center">
              Click any anatomical part above to view function & cell dynamics
            </p>
          </div>

          {/* Active Part Details */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Selected Structural Component
              </span>
              <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">
                {activeAnatomyPart.partName}
              </h3>
            </div>

            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {activeAnatomyPart.description}
            </p>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 text-xs text-emerald-900 dark:text-emerald-100 font-medium">
              <strong className="block text-emerald-700 dark:text-emerald-300 font-bold uppercase text-[10px] mb-1">
                Primary Physiological Function:
              </strong>
              {activeAnatomyPart.function}
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 text-xs space-y-1">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 block">Cellular Structure:</span>
              <p className="text-zinc-600 dark:text-zinc-300">{activeAnatomyPart.cellularDetails}</p>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Soil N-P-K Chemistry Guide */}
      <div className="p-8 rounded-3xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-amber-500/20 shadow-2xl space-y-6">
        <div className="flex items-center gap-2 font-bold text-lg text-zinc-900 dark:text-zinc-100">
          <Layers className="w-5 h-5 text-amber-500" />
          <span>2. Soil N-P-K Fertilizer Chemistry (Nitrogen, Phosphorus, Potassium)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          
          <div className="p-5 rounded-3xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-2">
            <span className="text-2xl font-black text-emerald-600 block">N - Nitrogen</span>
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-sm">Foliage & Stem Growth</span>
            <p className="text-zinc-600 dark:text-zinc-300">
              Powers chlorophyll creation for lush green leaves and rapid vertical growth. High N is ideal for houseplants, monstera, and leafy greens like spinach.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-500/20 space-y-2">
            <span className="text-2xl font-black text-amber-600 block">P - Phosphorus</span>
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-sm">Roots, Blooms & Fruit Set</span>
            <p className="text-zinc-600 dark:text-zinc-300">
              Encourages deep root branching, flower bud formation, and fruit size. Essential during spring repotting and flowering cycles for orchids and roses.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-500/20 space-y-2">
            <span className="text-2xl font-black text-rose-600 block">K - Potassium</span>
            <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-sm">Overall Health & Immunity</span>
            <p className="text-zinc-600 dark:text-zinc-300">
              Regulates water uptake, stomatal opening, winter cold hardiness, and resistance to fungal diseases. Builds strong cell walls.
            </p>
          </div>

        </div>
      </div>

      {/* 3. Companion Planting Compatibility Matrix */}
      <div className="p-8 rounded-3xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-emerald-500/20 shadow-2xl space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Award className="w-5 h-5 text-teal-500" />
              3. Companion Planting Matrix
            </h3>
            <p className="text-xs text-zinc-500">
              Discover which plants protect each other from pests and enrich soil nutrients when planted together.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={companionSearch}
              onChange={(e) => setCompanionSearch(e.target.value)}
              placeholder="Search crop (e.g. Tomato)..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {filteredCompanion.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 space-y-3"
            >
              <h4 className="font-extrabold text-base text-zinc-900 dark:text-zinc-100">
                {item.crop}
              </h4>

              <div className="space-y-1">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block text-[11px] uppercase">
                  ✓ Good Companions:
                </span>
                <p className="text-zinc-700 dark:text-zinc-300 font-semibold">
                  {item.goodCompanions.join(', ')}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-rose-500 block text-[11px] uppercase">
                  ✗ Avoid Planting Near:
                </span>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {item.badCompanions.join(', ')}
                </p>
              </div>

              <p className="text-[11px] text-zinc-500 italic pt-1 border-t border-zinc-200 dark:border-zinc-800">
                Reason: {item.reason}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* 4. Searchable Botanical Glossary */}
      <div className="p-8 rounded-3xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-500" />
            4. Botanical Glossary & Terminology
          </h3>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={glossaryQuery}
              onChange={(e) => setGlossaryQuery(e.target.value)}
              placeholder="Search terms (e.g. Fenestration)..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          {filteredGlossary.map((g, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 space-y-1"
            >
              <h5 className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400">{g.term}</h5>
              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">{g.definition}</p>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
