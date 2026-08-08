import React, { useState } from 'react';
import { LayoutGrid, Plus, Trash2, CheckCircle2, AlertTriangle, Sparkles, Sprout, Info, ShieldCheck, HelpCircle } from 'lucide-react';
import { PLANTS_DATA } from '../data/plantsData';
import { Plant, GridCell } from '../types';

export const GardenPlanner: React.FC = () => {
  const [gridDim, setGridDim] = useState<number>(4); // 4x4 by default
  const totalCells = gridDim * gridDim;

  const [cells, setCells] = useState<GridCell[]>(
    Array.from({ length: 16 }, (_, i) => ({ id: i, plantId: null }))
  );
  const [selectedPlantToPlace, setSelectedPlantToPlace] = useState<Plant>(PLANTS_DATA[0]);
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);

  const handleDimensionChange = (newDim: number) => {
    setGridDim(newDim);
    setCells(Array.from({ length: newDim * newDim }, (_, i) => ({ id: i, plantId: null })));
  };

  const handleCellClick = (cellId: number) => {
    setCells((prev) =>
      prev.map((c) => (c.id === cellId ? { ...c, plantId: selectedPlantToPlace.id } : c))
    );
  };

  const handleClearCell = (e: React.MouseEvent, cellId: number) => {
    e.stopPropagation();
    setCells((prev) => prev.map((c) => (c.id === cellId ? { ...c, plantId: null } : c)));
  };

  const handleResetPlanner = () => {
    setCells(Array.from({ length: totalCells }, (_, i) => ({ id: i, plantId: null })));
  };

  // Helper to check adjacent companions/conflicts
  const getCellCompanionStatus = (cellIndex: number) => {
    const currentPlantId = cells[cellIndex]?.plantId;
    if (!currentPlantId) return null;

    const currentPlant = PLANTS_DATA.find((p) => p.id === currentPlantId);
    if (!currentPlant) return null;

    const row = Math.floor(cellIndex / gridDim);
    const col = cellIndex % gridDim;

    // Neighbor indices (up, down, left, right)
    const neighbors: number[] = [];
    if (row > 0) neighbors.push((row - 1) * gridDim + col);
    if (row < gridDim - 1) neighbors.push((row + 1) * gridDim + col);
    if (col > 0) neighbors.push(row * gridDim + (col - 1));
    if (col < gridDim - 1) neighbors.push(row * gridDim + (col + 1));

    let isCompanionMatch = false;
    let isConflictMatch = false;
    let matchNames: string[] = [];
    let conflictNames: string[] = [];

    neighbors.forEach((nIdx) => {
      const neighborPlantId = cells[nIdx]?.plantId;
      if (neighborPlantId) {
        const neighborPlant = PLANTS_DATA.find((p) => p.id === neighborPlantId);
        if (neighborPlant) {
          if (currentPlant.companionPlantIds.includes(neighborPlant.id)) {
            isCompanionMatch = true;
            matchNames.push(neighborPlant.commonName);
          }
          if (currentPlant.incompatiblePlantIds.includes(neighborPlant.id)) {
            isConflictMatch = true;
            conflictNames.push(neighborPlant.commonName);
          }
        }
      }
    });

    return {
      isCompanionMatch,
      isConflictMatch,
      matchNames,
      conflictNames
    };
  };

  const totalPlacedCount = cells.filter((c) => c.plantId !== null).length;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
          <LayoutGrid className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Companion Garden Bed Plotter</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
          Visual Garden Plot Designer
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
          Map out your vegetable bed, indoor rack, or allotment grid. Select a plant below and click any plot cell to place it. We automatically analyze companion planting synergies!
        </p>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Plant Picker sidebar */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-500" />
              1. Select Plant to Place
            </h3>
            <span className="text-xs font-bold text-zinc-400">
              {PLANTS_DATA.length} Species
            </span>
          </div>

          {/* Selected indicator */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-3">
            <img
              src={selectedPlantToPlace.images[0]}
              alt={selectedPlantToPlace.commonName}
              className="w-12 h-12 rounded-xl object-cover shrink-0 border border-emerald-500/30"
            />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-600 dark:text-emerald-400">Ready to plant</span>
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">{selectedPlantToPlace.commonName}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 italic truncate">{selectedPlantToPlace.scientificName}</p>
            </div>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {PLANTS_DATA.map((p) => {
              const isSelected = selectedPlantToPlace.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlantToPlace(p)}
                  className={`w-full p-3 rounded-2xl text-left flex items-center gap-3 transition-all border ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-transparent shadow-md font-bold'
                      : 'bg-zinc-50 dark:bg-zinc-800/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-800'
                  }`}
                >
                  <img
                    src={p.images[0]}
                    alt={p.commonName}
                    className="w-10 h-10 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold truncate">{p.commonName}</p>
                    <div className="flex items-center gap-2 text-[10px] mt-0.5">
                      <span className={`px-2 py-0.5 rounded-full ${isSelected ? 'bg-emerald-700 text-emerald-100' : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300'}`}>
                        {p.light}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Garden Bed Canvas */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl space-y-6">
          
          {/* Header Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
            <div>
              <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <span>2. Interactive Grid Bed</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
                  {totalPlacedCount} / {totalCells} Filled
                </span>
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-zinc-500">Size:</span>
              <div className="flex rounded-xl bg-zinc-100 dark:bg-zinc-800 p-1 gap-1">
                {[3, 4, 5].map((dim) => (
                  <button
                    key={dim}
                    onClick={() => handleDimensionChange(dim)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      gridDim === dim
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                    }`}
                  >
                    {dim}x{dim}
                  </button>
                ))}
              </div>

              <button
                onClick={handleResetPlanner}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-1 transition-colors"
                title="Clear All Cells"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
            </div>
          </div>

          {/* Plot Grid */}
          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns: `repeat(${gridDim}, minmax(0, 1fr))`
            }}
          >
            {cells.map((cell, idx) => {
              const plantInCell = PLANTS_DATA.find((p) => p.id === cell.plantId);
              const companionStatus = getCellCompanionStatus(idx);

              return (
                <div
                  key={cell.id}
                  onClick={() => handleCellClick(cell.id)}
                  onMouseEnter={() => setHoveredCell(cell.id)}
                  onMouseLeave={() => setHoveredCell(null)}
                  className={`relative aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-2 text-center cursor-pointer transition-all overflow-hidden group ${
                    plantInCell
                      ? companionStatus?.isConflictMatch
                        ? 'border-rose-500 bg-rose-50/40 dark:bg-rose-950/30'
                        : companionStatus?.isCompanionMatch
                        ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 shadow-md ring-2 ring-emerald-500/30'
                        : 'border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/40'
                      : 'border-zinc-300 dark:border-zinc-800 hover:border-emerald-500 bg-zinc-50/50 dark:bg-zinc-800/20'
                  }`}
                >
                  {plantInCell ? (
                    <>
                      <img
                        src={plantInCell.images[0]}
                        alt={plantInCell.commonName}
                        className="w-full h-full object-cover rounded-xl"
                      />
                      
                      {/* Companion indicator badge */}
                      {companionStatus?.isCompanionMatch && (
                        <div className="absolute top-1 left-1 bg-emerald-500 text-white p-1 rounded-full shadow" title="Great Companion Synergy!">
                          <ShieldCheck className="w-3 h-3" />
                        </div>
                      )}
                      {companionStatus?.isConflictMatch && (
                        <div className="absolute top-1 left-1 bg-rose-500 text-white p-1 rounded-full shadow" title="Incompatible Neighbor Conflict!">
                          <AlertTriangle className="w-3 h-3" />
                        </div>
                      )}

                      <button
                        onClick={(e) => handleClearCell(e, cell.id)}
                        className="absolute top-1 right-1 p-1.5 rounded-full bg-zinc-950/80 text-white hover:bg-rose-500 opacity-0 group-hover:opacity-100 transition-all shadow"
                        title="Remove Plant"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>

                      <span className="absolute bottom-1 left-1 right-1 px-1 py-0.5 text-[9px] font-extrabold text-white bg-zinc-950/80 backdrop-blur-sm rounded truncate">
                        {plantInCell.commonName}
                      </span>
                    </>
                  ) : (
                    <div className="text-zinc-400 group-hover:text-emerald-500 transition-colors text-center space-y-1">
                      <Plus className="w-5 h-5 mx-auto" />
                      <span className="text-[10px] font-bold block">Plot #{idx + 1}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend and tips */}
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 font-bold text-zinc-700 dark:text-zinc-300">
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-4 h-4" /> Green Ring = Beneficial Companion Plant Nearby
              </span>
              <span className="flex items-center gap-1.5 text-rose-500">
                <AlertTriangle className="w-4 h-4" /> Red Ring = Incompatible Species Conflict
              </span>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 text-[11px] leading-relaxed">
              Tip: Place aromatic herbs (e.g., Sweet Basil or Rosemary) next to tomatoes to boost flavor and naturally repel insect pests like aphids!
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
