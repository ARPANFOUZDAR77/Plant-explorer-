import React, { useState } from 'react';
import { Sprout, Droplets, Calendar, CheckCircle2, AlertCircle, Plus, Trash2, Heart, Sparkles, Filter, Clock } from 'lucide-react';
import { UserPlant, Plant } from '../types';
import { PLANTS_DATA } from '../data/plantsData';

interface UserDashboardProps {
  userPlants: UserPlant[];
  setUserPlants: React.Dispatch<React.SetStateAction<UserPlant[]>>;
  onOpenCatalog: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  userPlants,
  setUserPlants,
  onOpenCatalog
}) => {
  const [filterHealth, setFilterHealth] = useState<string>('All');
  const [selectedPlantForNote, setSelectedPlantForNote] = useState<UserPlant | null>(null);
  const [noteText, setNoteText] = useState<string>('');

  // Handle Watering Action
  const handleWaterPlant = (userPlantId: string) => {
    const todayStr = new Date().toISOString().split('T')[0];
    
    setUserPlants((prev) =>
      prev.map((up) => {
        if (up.id !== userPlantId) return up;

        const speciesInfo = PLANTS_DATA.find((p) => p.id === up.plantId);
        const daysInterval = speciesInfo ? speciesInfo.waterDaysInterval : 7;
        
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + daysInterval);
        const nextDateStr = nextDate.toISOString().split('T')[0];

        const newLog = {
          id: Date.now().toString(),
          date: todayStr,
          action: 'Watered' as const,
          notes: 'Watered thoroughly until drainage.'
        };

        return {
          ...up,
          lastWatered: todayStr,
          nextWateringDate: nextDateStr,
          careLogs: [newLog, ...up.careLogs],
          healthStatus: 'Thriving' as const
        };
      })
    );
  };

  // Handle Health Status Change
  const handleUpdateHealth = (userPlantId: string, status: 'Thriving' | 'Needs Attention' | 'Recovering') => {
    setUserPlants((prev) =>
      prev.map((up) => (up.id === userPlantId ? { ...up, healthStatus: status } : up))
    );
  };

  // Handle Remove
  const handleRemoveUserPlant = (userPlantId: string) => {
    setUserPlants((prev) => prev.filter((up) => up.id !== userPlantId));
  };

  // Add Custom Note
  const handleAddNote = () => {
    if (!selectedPlantForNote || !noteText.trim()) return;

    setUserPlants((prev) =>
      prev.map((up) => {
        if (up.id !== selectedPlantForNote.id) return up;
        return {
          ...up,
          notes: noteText
        };
      })
    );

    setSelectedPlantForNote(null);
    setNoteText('');
  };

  // Calculations
  const todayStr = new Date().toISOString().split('T')[0];
  const dueWatering = userPlants.filter((up) => up.nextWateringDate <= todayStr);
  const thrivingCount = userPlants.filter((up) => up.healthStatus === 'Thriving').length;

  const filteredPlants = userPlants.filter((up) => {
    if (filterHealth === 'All') return true;
    return up.healthStatus === filterHealth;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-zinc-900 text-white shadow-2xl border border-emerald-500/30">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <Sprout className="w-4 h-4 text-emerald-400" />
            <span>My Personal Botanical Garden</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black">Garden Dashboard & Care Schedule</h2>
          <p className="text-xs sm:text-sm text-emerald-100/80">
            Tracking {userPlants.length} plants • {dueWatering.length} tasks due today
          </p>
        </div>

        <button
          onClick={onOpenCatalog}
          className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/30 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Plants From Catalog
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md space-y-1">
          <span className="text-[10px] uppercase font-black text-zinc-400">Total Tracked</span>
          <p className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100">{userPlants.length}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md space-y-1">
          <span className="text-[10px] uppercase font-black text-emerald-600 dark:text-emerald-400">Thriving</span>
          <p className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">{thrivingCount}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md space-y-1">
          <span className="text-[10px] uppercase font-black text-sky-500">Due for Water</span>
          <p className="text-2xl sm:text-3xl font-black text-sky-500">{dueWatering.length}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md space-y-1">
          <span className="text-[10px] uppercase font-black text-amber-500">Care Streak</span>
          <p className="text-2xl sm:text-3xl font-black text-amber-500">🔥 7 Days</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex gap-2">
          {['All', 'Thriving', 'Needs Attention', 'Recovering'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterHealth(status)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterHealth === status
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* User Plants Grid */}
      {filteredPlants.length === 0 ? (
        <div className="text-center py-16 space-y-4 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50">
          <Sprout className="w-12 h-12 text-zinc-400 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">No Plants in this View</h3>
            <p className="text-xs text-zinc-500">Browse the species catalog to add your favorite houseplants or garden herbs!</p>
          </div>
          <button
            onClick={onOpenCatalog}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow"
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlants.map((up) => {
            const speciesInfo = PLANTS_DATA.find((p) => p.id === up.plantId);
            const isWaterOverdue = up.nextWateringDate <= todayStr;

            return (
              <div
                key={up.id}
                className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-4 flex flex-col justify-between transition-all hover:border-emerald-500/40"
              >
                {/* Header info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={up.photoUrl || speciesInfo?.images[0]}
                      alt={up.customName}
                      className="w-16 h-16 rounded-2xl object-cover border border-zinc-200 dark:border-zinc-800 shadow"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                          up.healthStatus === 'Thriving'
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                            : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                        }`}>
                          {up.healthStatus}
                        </span>
                        
                        <button
                          onClick={() => handleRemoveUserPlant(up.id)}
                          className="text-zinc-400 hover:text-rose-500 p-1"
                          title="Remove from Garden"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 truncate mt-1">
                        {up.customName}
                      </h3>
                      <p className="text-[11px] text-zinc-400 italic truncate">
                        {speciesInfo?.commonName || 'Custom Species'}
                      </p>
                    </div>
                  </div>

                  {/* Watering Status box */}
                  <div className={`p-3 rounded-2xl border text-xs space-y-1 ${
                    isWaterOverdue
                      ? 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-500/30 text-rose-800 dark:text-rose-300'
                      : 'bg-sky-50/80 dark:bg-sky-950/30 border-sky-500/30 text-sky-800 dark:text-sky-300'
                  }`}>
                    <div className="flex items-center justify-between font-bold">
                      <span className="flex items-center gap-1.5">
                        <Droplets className="w-4 h-4 text-sky-500" />
                        {isWaterOverdue ? 'Watering Due Today!' : `Next Water: ${up.nextWateringDate}`}
                      </span>
                    </div>
                    {up.lastWatered && (
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                        Last watered on {up.lastWatered}
                      </p>
                    )}
                  </div>

                  {/* Location & Notes */}
                  <div className="text-xs space-y-1 text-zinc-600 dark:text-zinc-400">
                    <p><span className="font-bold text-zinc-800 dark:text-zinc-200">Location:</span> {up.location}</p>
                    {up.notes && (
                      <p className="italic bg-zinc-50 dark:bg-zinc-800/50 p-2 rounded-xl text-[11px] border border-zinc-200 dark:border-zinc-800">
                        "{up.notes}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 space-y-2 border-t border-zinc-100 dark:border-zinc-800">
                  <button
                    onClick={() => handleWaterPlant(up.id)}
                    className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-sky-600/20 transition-all"
                  >
                    <Droplets className="w-4 h-4" /> Mark Watered Today
                  </button>

                  <div className="flex items-center justify-between gap-2 text-[10px]">
                    <span className="font-bold text-zinc-400">Health:</span>
                    <div className="flex gap-1">
                      {(['Thriving', 'Needs Attention', 'Recovering'] as const).map((st) => (
                        <button
                          key={st}
                          onClick={() => handleUpdateHealth(up.id, st)}
                          className={`px-2 py-0.5 rounded ${
                            up.healthStatus === st
                              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold'
                              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900'
                          }`}
                        >
                          {st.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
