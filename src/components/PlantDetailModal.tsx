import React from 'react';
import { X, Sun, Droplets, Thermometer, ShieldAlert, Sparkles, Sprout, Heart, PlusCircle, Check, Info, ArrowUpRight } from 'lucide-react';
import { Plant } from '../types';
import { PLANTS_DATA } from '../data/plantsData';

interface PlantDetailModalProps {
  plant: Plant | null;
  onClose: () => void;
  onAddToGarden: (plant: Plant) => void;
  isAlreadyInGarden: boolean;
}

export const PlantDetailModal: React.FC<PlantDetailModalProps> = ({
  plant,
  onClose,
  onAddToGarden,
  isAlreadyInGarden
}) => {
  if (!plant) return null;

  const companionPlants = PLANTS_DATA.filter((p) => plant.companionPlantIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-y-auto flex flex-col">
        
        {/* Header image banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-zinc-900">
          <img
            src={plant.images[0]}
            alt={plant.commonName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-zinc-950/70 hover:bg-zinc-950 text-white transition-all backdrop-blur-md border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Plant overlay titles */}
          <div className="absolute bottom-6 left-6 right-6 space-y-1 text-white">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/90 text-white backdrop-blur-md">
                {plant.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md ${
                plant.petFriendly ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30' : 'bg-rose-950/80 text-rose-300 border border-rose-500/30'
              }`}>
                {plant.petFriendly ? '🐾 Pet Friendly' : '⚠️ Toxic to Pets'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black">{plant.commonName}</h2>
            <p className="text-sm text-zinc-300 italic">{plant.scientificName}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 flex-1">
          
          {/* Action bar */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-500/20">
            <div>
              <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                Difficulty: <span className="underline">{plant.difficulty}</span>
              </p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">Native to: {plant.nativeRegion}</p>
            </div>

            <button
              onClick={() => onAddToGarden(plant)}
              disabled={isAlreadyInGarden}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
                isAlreadyInGarden
                  ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500 cursor-default'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30'
              }`}
            >
              {isAlreadyInGarden ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  In My Garden
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  Add to My Garden Tracker
                </>
              )}
            </button>
          </div>

          {/* Essential Care Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 space-y-1">
              <Sun className="w-5 h-5 text-amber-500" />
              <span className="text-[10px] uppercase font-extrabold text-zinc-400">Sunlight</span>
              <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{plant.light}</p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 space-y-1">
              <Droplets className="w-5 h-5 text-sky-500" />
              <span className="text-[10px] uppercase font-extrabold text-zinc-400">Water Schedule</span>
              <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{plant.waterFrequency}</p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 space-y-1">
              <Thermometer className="w-5 h-5 text-rose-500" />
              <span className="text-[10px] uppercase font-extrabold text-zinc-400">Temperature</span>
              <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{plant.idealTemp}</p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 space-y-1">
              <Sprout className="w-5 h-5 text-emerald-500" />
              <span className="text-[10px] uppercase font-extrabold text-zinc-400">Humidity</span>
              <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{plant.humidity} Level</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-extrabold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              About this Species
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {plant.description}
            </p>
          </div>

          {/* Detailed Soil & Care Instructions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Sprout className="w-4 h-4 text-emerald-500" /> Soil & Potting Mix
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{plant.soilType}</p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" /> Fertilizer Requirements
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{plant.fertilizerNeeds}</p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                ✂️ Pruning Technique
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{plant.pruningTip}</p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                🌱 Propagation Guide
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">{plant.propagationTip}</p>
            </div>
          </div>

          {/* Companion Species */}
          {companionPlants.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-extrabold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                Recommended Companion Plants
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {companionPlants.map((cp) => (
                  <div key={cp.id} className="p-3 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 flex items-center gap-3">
                    <img src={cp.images[0]} alt={cp.commonName} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{cp.commonName}</p>
                      <p className="text-[10px] text-emerald-600 dark:text-emerald-400">Beneficial Neighbor</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
