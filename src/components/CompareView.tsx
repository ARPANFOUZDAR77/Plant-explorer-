import React, { useState } from 'react';
import { ArrowLeftRight, Check, Plus, X, Sun, Droplets, Thermometer, ShieldAlert, Sprout } from 'lucide-react';
import { PLANTS_DATA } from '../data/plantsData';
import { Plant } from '../types';

export const CompareView: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    PLANTS_DATA[0].id,
    PLANTS_DATA[1].id
  ]);

  const selectedPlants = selectedIds
    .map((id) => PLANTS_DATA.find((p) => p.id === id))
    .filter((p): p is Plant => p !== undefined);

  const handleTogglePlant = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
          <ArrowLeftRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Botanical Matrix</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
          Side-By-Side Plant Comparison
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto">
          Compare up to 3 plant species simultaneously to decide which best fits your windowsill light, schedule, and home environment.
        </p>
      </div>

      {/* Selector Ribbon */}
      <div className="p-4 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase tracking-wider text-zinc-400">
            Select 2 or 3 plants to compare ({selectedIds.length} / 3 Selected)
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {PLANTS_DATA.map((p) => {
            const isSelected = selectedIds.includes(p.id);
            return (
              <button
                key={p.id}
                onClick={() => handleTogglePlant(p.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-zinc-50 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100'
                }`}
              >
                <img src={p.images[0]} alt={p.commonName} className="w-5 h-5 rounded-md object-cover" />
                <span>{p.commonName}</span>
                {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5 text-zinc-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Matrix Table */}
      <div className="overflow-x-auto rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl">
        <table className="w-full text-left border-collapse min-w-[650px]">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40">
              <th className="p-4 sm:p-6 text-xs font-extrabold text-zinc-400 uppercase tracking-wider w-1/4">
                Attribute
              </th>
              {selectedPlants.map((p) => (
                <th key={p.id} className="p-4 sm:p-6 text-center align-top">
                  <div className="space-y-2">
                    <img
                      src={p.images[0]}
                      alt={p.commonName}
                      className="w-20 h-20 mx-auto rounded-2xl object-cover shadow-md border border-zinc-200 dark:border-zinc-700"
                    />
                    <div>
                      <h4 className="text-sm font-extrabold text-zinc-900 dark:text-zinc-100">{p.commonName}</h4>
                      <p className="text-[11px] text-zinc-400 italic">{p.scientificName}</p>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-xs">
            
            {/* Category */}
            <tr>
              <td className="p-4 font-bold text-zinc-500 dark:text-zinc-400 uppercase text-[10px] tracking-wider bg-zinc-50/50 dark:bg-zinc-800/20">
                Category
              </td>
              {selectedPlants.map((p) => (
                <td key={p.id} className="p-4 text-center font-bold text-zinc-800 dark:text-zinc-200">
                  {p.category}
                </td>
              ))}
            </tr>

            {/* Sunlight */}
            <tr>
              <td className="p-4 font-bold text-zinc-500 dark:text-zinc-400 uppercase text-[10px] tracking-wider bg-zinc-50/50 dark:bg-zinc-800/20">
                Light Requirement
              </td>
              {selectedPlants.map((p) => (
                <td key={p.id} className="p-4 text-center font-semibold text-zinc-800 dark:text-zinc-200">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold">
                    <Sun className="w-3.5 h-3.5" /> {p.light}
                  </span>
                </td>
              ))}
            </tr>

            {/* Water */}
            <tr>
              <td className="p-4 font-bold text-zinc-500 dark:text-zinc-400 uppercase text-[10px] tracking-wider bg-zinc-50/50 dark:bg-zinc-800/20">
                Water Schedule
              </td>
              {selectedPlants.map((p) => (
                <td key={p.id} className="p-4 text-center font-semibold text-zinc-800 dark:text-zinc-200">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 font-bold">
                    <Droplets className="w-3.5 h-3.5" /> {p.waterFrequency}
                  </span>
                </td>
              ))}
            </tr>

            {/* Difficulty */}
            <tr>
              <td className="p-4 font-bold text-zinc-500 dark:text-zinc-400 uppercase text-[10px] tracking-wider bg-zinc-50/50 dark:bg-zinc-800/20">
                Care Difficulty
              </td>
              {selectedPlants.map((p) => (
                <td key={p.id} className="p-4 text-center font-bold text-zinc-800 dark:text-zinc-200">
                  {p.difficulty}
                </td>
              ))}
            </tr>

            {/* Pet Safety */}
            <tr>
              <td className="p-4 font-bold text-zinc-500 dark:text-zinc-400 uppercase text-[10px] tracking-wider bg-zinc-50/50 dark:bg-zinc-800/20">
                Pet Safety
              </td>
              {selectedPlants.map((p) => (
                <td key={p.id} className="p-4 text-center font-bold">
                  <span className={`inline-block px-3 py-1 rounded-full ${
                    p.petFriendly
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                  }`}>
                    {p.petFriendly ? '🐾 Pet Friendly' : '⚠️ Toxic'}
                  </span>
                </td>
              ))}
            </tr>

            {/* Humidity & Temp */}
            <tr>
              <td className="p-4 font-bold text-zinc-500 dark:text-zinc-400 uppercase text-[10px] tracking-wider bg-zinc-50/50 dark:bg-zinc-800/20">
                Ideal Temperature
              </td>
              {selectedPlants.map((p) => (
                <td key={p.id} className="p-4 text-center text-zinc-700 dark:text-zinc-300">
                  {p.idealTemp}
                </td>
              ))}
            </tr>

            {/* Mature Size */}
            <tr>
              <td className="p-4 font-bold text-zinc-500 dark:text-zinc-400 uppercase text-[10px] tracking-wider bg-zinc-50/50 dark:bg-zinc-800/20">
                Mature Growth Size
              </td>
              {selectedPlants.map((p) => (
                <td key={p.id} className="p-4 text-center text-zinc-700 dark:text-zinc-300">
                  {p.matureSize}
                </td>
              ))}
            </tr>

            {/* Soil Type */}
            <tr>
              <td className="p-4 font-bold text-zinc-500 dark:text-zinc-400 uppercase text-[10px] tracking-wider bg-zinc-50/50 dark:bg-zinc-800/20">
                Recommended Soil
              </td>
              {selectedPlants.map((p) => (
                <td key={p.id} className="p-4 text-center text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                  {p.soilType}
                </td>
              ))}
            </tr>

          </tbody>
        </table>
      </div>

    </div>
  );
};
