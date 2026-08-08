import React from 'react';
import {
  Heart,
  Droplets,
  Sun,
  AlertTriangle,
  Star,
  Plus,
  Check,
  Sparkles,
  Info
} from 'lucide-react';
import { Plant } from '../types';

interface PlantCardProps {
  plant: Plant;
  isFavorite: boolean;
  onToggleFavorite: (plantId: string) => void;
  onOpenModal: (plant: Plant) => void;
  onQuickAddToCollection: (plant: Plant) => void;
  isInCollection?: boolean;
  layout?: 'grid' | 'list';
}

export const PlantCard: React.FC<PlantCardProps> = ({
  plant,
  isFavorite,
  onToggleFavorite,
  onOpenModal,
  onQuickAddToCollection,
  isInCollection = false,
  layout = 'grid'
}) => {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Intermediate':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'Advanced':
      case 'Expert':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
      default:
        return 'bg-zinc-500/10 text-zinc-600 border-zinc-500/20';
    }
  };

  if (layout === 'list') {
    return (
      <div className="group flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800 hover:border-emerald-500/40 shadow-sm hover:shadow-xl transition-all duration-300">
        
        {/* Plant Thumbnail */}
        <div
          onClick={() => onOpenModal(plant)}
          className="relative w-full sm:w-36 h-36 rounded-xl overflow-hidden cursor-pointer shrink-0"
        >
          <img
            src={plant.images[0]}
            alt={plant.commonName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {plant.rareExotic && (
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-amber-500 text-white shadow-md">
              Rare
            </span>
          )}
        </div>

        {/* Content Details */}
        <div className="flex-1 min-w-0 space-y-1.5 text-left w-full">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              {plant.botanicalFamily}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{plant.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3
            onClick={() => onOpenModal(plant)}
            className="text-lg font-bold text-zinc-900 dark:text-zinc-100 cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors truncate"
          >
            {plant.commonName}
          </h3>

          <p className="text-xs italic text-zinc-500 dark:text-zinc-400 truncate">
            {plant.scientificName}
          </p>

          <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-2 pt-0.5">
            {plant.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
            <span className={`px-2 py-0.5 rounded-md font-semibold border ${getDifficultyColor(plant.difficulty)}`}>
              {plant.difficulty}
            </span>
            <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
              <Droplets className="w-3 h-3 text-sky-500" />
              Every {plant.care.wateringFrequencyDays} days
            </span>
            <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
              <Sun className="w-3 h-3 text-amber-500" />
              {plant.care.sunlightNeeds}
            </span>
            {plant.isToxicToPets && (
              <span className="flex items-center gap-1 text-rose-500 font-medium">
                <AlertTriangle className="w-3 h-3" /> Toxic to Pets
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex sm:flex-col items-center gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
          <button
            onClick={() => onToggleFavorite(plant.id)}
            className={`p-2.5 rounded-xl border transition-all ${
              isFavorite
                ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-500 border-rose-200 dark:border-rose-900'
                : 'text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:text-rose-500'
            }`}
            title="Add to Favorites"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
          </button>

          <button
            onClick={() => onQuickAddToCollection(plant)}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              isInCollection
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
            }`}
          >
            {isInCollection ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            <span>{isInCollection ? 'In Collection' : 'Add to Collection'}</span>
          </button>
        </div>

      </div>
    );
  }

  // Grid Layout
  return (
    <div className="group relative flex flex-col rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 hover:border-emerald-500/40 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden">
      
      {/* Top Image Container */}
      <div
        onClick={() => onOpenModal(plant)}
        className="relative h-52 sm:h-56 w-full overflow-hidden cursor-pointer"
      >
        <img
          src={plant.images[0]}
          alt={plant.commonName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-80" />

        {/* Favorite Heart Badge */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(plant.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            isFavorite
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
              : 'bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-300 hover:scale-110'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
        </button>

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {plant.rareExotic && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500 text-white shadow-md">
              Rare Species
            </span>
          )}
          {plant.popularIndoor && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-600/90 text-white backdrop-blur-md">
              Indoor Favorite
            </span>
          )}
        </div>

        {/* Rating & Family at bottom of image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-md">
            {plant.botanicalFamily}
          </span>
          <div className="flex items-center gap-1 text-xs font-bold bg-zinc-950/60 backdrop-blur-md px-2 py-0.5 rounded-md">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{plant.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        
        <div className="space-y-1">
          <h3
            onClick={() => onOpenModal(plant)}
            className="text-lg font-bold text-zinc-900 dark:text-zinc-100 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer transition-colors line-clamp-1"
          >
            {plant.commonName}
          </h3>
          <p className="text-xs italic text-zinc-500 dark:text-zinc-400 line-clamp-1">
            {plant.scientificName}
          </p>
        </div>

        {/* Short description */}
        <p className="text-xs text-zinc-600 dark:text-zinc-300 line-clamp-2 leading-relaxed">
          {plant.description}
        </p>

        {/* Attribute Pills */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] pt-1">
          <span className={`px-2 py-0.5 rounded-md font-semibold border ${getDifficultyColor(plant.difficulty)}`}>
            {plant.difficulty}
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            <Droplets className="w-3 h-3 text-sky-500" />
            Every {plant.care.wateringFrequencyDays}d
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            <Sun className="w-3 h-3 text-amber-500" />
            {plant.care.sunlightNeeds}
          </span>
          {plant.isToxicToPets && (
            <span
              title={plant.toxicityDetails || 'Toxic to pets if eaten'}
              className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 font-medium"
            >
              <AlertTriangle className="w-3 h-3" /> Toxic
            </span>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2">
          <button
            onClick={() => onOpenModal(plant)}
            className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Care Guide</span>
          </button>

          <button
            onClick={() => onQuickAddToCollection(plant)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              isInCollection
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
            }`}
          >
            {isInCollection ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            <span>{isInCollection ? 'Saved' : 'Add'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
