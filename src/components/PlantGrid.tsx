import React, { useState } from 'react';
import { LayoutGrid, List, ArrowUpDown, Search, Sprout } from 'lucide-react';
import { PlantCard } from './PlantCard';
import { Plant } from '../types';

interface PlantGridProps {
  plants: Plant[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onOpenModal: (plant: Plant) => void;
  onQuickAddToCollection: (plant: Plant) => void;
  collectionPlantIds: string[];
  sortBy: string;
  setSortBy: (sort: 'popular' | 'name' | 'difficulty' | 'water') => void;
  isLoading?: boolean;
}

export const PlantGrid: React.FC<PlantGridProps> = ({
  plants,
  favorites,
  onToggleFavorite,
  onOpenModal,
  onQuickAddToCollection,
  collectionPlantIds,
  sortBy,
  setSortBy,
  isLoading = false
}) => {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-96 rounded-3xl bg-zinc-200 dark:bg-zinc-800/60 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Top Grid Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800">
        
        {/* Results Counter */}
        <div className="flex items-center gap-2">
          <Sprout className="w-5 h-5 text-emerald-500" />
          <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Showing {plants.length} Botanical Species
          </span>
        </div>

        {/* Sorting & Layout Toggles */}
        <div className="flex items-center gap-3">
          
          {/* Sorting dropdown */}
          <div className="flex items-center gap-1.5 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-zinc-400 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold border border-zinc-200 dark:border-zinc-700 focus:outline-none"
            >
              <option value="popular">Most Popular</option>
              <option value="name">Alphabetical (A-Z)</option>
              <option value="difficulty">Care Difficulty</option>
              <option value="water">Watering Frequency</option>
            </select>
          </div>

          {/* Grid vs List view toggle */}
          <div className="flex items-center p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <button
              onClick={() => setLayout('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                layout === 'grid'
                  ? 'bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayout('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                layout === 'list'
                  ? 'bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Empty State */}
      {plants.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl bg-white/60 dark:bg-zinc-900/60 border border-dashed border-zinc-300 dark:border-zinc-800 space-y-4">
          <div className="p-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 w-16 h-16 mx-auto flex items-center justify-center">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            No Plant Species Matched
          </h3>
          <p className="text-sm text-zinc-500 max-w-md mx-auto">
            Try resetting your search query or loosening your category filters to view more species from our botanical encyclopedia.
          </p>
        </div>
      ) : (
        /* Plant Grid Render */
        <div
          className={
            layout === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'flex flex-col gap-4'
          }
        >
          {plants.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              isFavorite={favorites.includes(plant.id)}
              onToggleFavorite={onToggleFavorite}
              onOpenModal={onOpenModal}
              onQuickAddToCollection={onQuickAddToCollection}
              isInCollection={collectionPlantIds.includes(plant.id)}
              layout={layout}
            />
          ))}
        </div>
      )}
    </div>
  );
};
