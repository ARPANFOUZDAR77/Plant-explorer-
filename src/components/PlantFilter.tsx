import React from 'react';
import {
  Filter,
  RotateCcw,
  Sun,
  Droplets,
  ShieldCheck,
  AlertTriangle,
  Home,
  Trees,
  Check
} from 'lucide-react';
import { FilterState, PlantCategory } from '../types';

interface PlantFilterProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  totalResults: number;
  onReset: () => void;
}

export const PlantFilter: React.FC<PlantFilterProps> = ({
  filters,
  setFilters,
  totalResults,
  onReset,
}) => {
  const categories: (PlantCategory | 'All')[] = [
    'All',
    'Indoor',
    'Outdoor',
    'Flowering',
    'Succulents',
    'Cacti',
    'Herbs',
    'Vegetables',
    'Fruits',
    'Trees',
    'Ferns',
    'Climbers',
    'Medicinal',
    'Rare Plants',
    'Air Plants',
    'Carnivorous',
    'Aquatic'
  ];

  const lightOptions = [
    'All',
    'Low Light',
    'Partial Shade',
    'Indirect Bright',
    'Full Sun',
    'Direct Sun'
  ];

  const difficultyOptions = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-6 p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800 shadow-xl">
      
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100">
          <Filter className="w-4 h-4 text-emerald-500" />
          <span>Refine Species</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold">
            {totalResults}
          </span>
        </div>

        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          title="Reset All Filters"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Category Selection */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
          Botanical Category
        </label>
        <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilters((prev) => ({ ...prev, category: cat }))}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                filters.category === cat
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'bg-zinc-100 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Level */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          Care Difficulty
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {difficultyOptions.map((diff) => (
            <button
              key={diff}
              onClick={() => setFilters((prev) => ({ ...prev, difficulty: diff }))}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-medium text-center transition-all ${
                filters.difficulty === diff
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'bg-zinc-100 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Sunlight Needs */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
          <Sun className="w-3.5 h-3.5 text-amber-500" />
          Sunlight Requirement
        </label>
        <select
          value={filters.lightRequirement}
          onChange={(e) => setFilters((prev) => ({ ...prev, lightRequirement: e.target.value }))}
          className="w-full px-3 py-2 rounded-xl text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-emerald-500"
        >
          {lightOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Pet Toxicity */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
          Pet Safety
        </label>
        <div className="grid grid-cols-3 gap-1">
          {[
            { id: 'all', label: 'All' },
            { id: 'safe', label: 'Pet Safe' },
            { id: 'toxic', label: 'Toxic' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setFilters((prev) => ({ ...prev, toxicity: t.id }))}
              className={`py-1.5 px-2 rounded-xl text-[11px] font-semibold text-center transition-all ${
                filters.toxicity === t.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-zinc-100 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Indoor vs Outdoor */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
          <Home className="w-3.5 h-3.5 text-teal-500" />
          Location
        </label>
        <div className="grid grid-cols-3 gap-1">
          {[
            { id: 'all', label: 'All' },
            { id: 'indoor', label: 'Indoor' },
            { id: 'outdoor', label: 'Outdoor' }
          ].map((loc) => (
            <button
              key={loc.id}
              onClick={() => setFilters((prev) => ({ ...prev, indoorOutdoor: loc.id }))}
              className={`py-1.5 px-2 rounded-xl text-[11px] font-semibold text-center transition-all ${
                filters.indoorOutdoor === loc.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-zinc-100 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              {loc.label}
            </button>
          ))}
        </div>
      </div>

    </aside>
  );
};
