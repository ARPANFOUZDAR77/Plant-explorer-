import React, { useState, useEffect } from 'react';
import { Droplets, CheckCircle, AlertCircle, Plus, Calendar, Clock, RefreshCw, Check } from 'lucide-react';
import { WaterReminder } from '../types';
import { getReminders, saveReminders } from '../utils/storage';

interface WateringGuideProps {
  onToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const WateringGuide: React.FC<WateringGuideProps> = ({ onToast }) => {
  const [reminders, setReminders] = useState<WaterReminder[]>([]);
  const [newPlantName, setNewPlantName] = useState('');
  const [newFrequency, setNewFrequency] = useState(7);

  useEffect(() => {
    setReminders(getReminders());
  }, []);

  const handleToggleComplete = (id: string) => {
    const updated = reminders.map((r) => {
      if (r.id === id) {
        const isNowCompleted = !r.completed;
        let nextDue = r.dueDate;
        if (isNowCompleted) {
          const d = new Date();
          d.setDate(d.getDate() + r.frequencyDays);
          nextDue = d.toISOString().split('T')[0];
        }
        return {
          ...r,
          completed: isNowCompleted,
          dueDate: nextDue,
        };
      }
      return r;
    });
    setReminders(updated);
    saveReminders(updated);
    onToast('Watering status updated!', 'success');
  };

  const handleAddCustomReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlantName.trim()) return;

    const d = new Date();
    d.setDate(d.getDate() + Number(newFrequency));

    const newReminder: WaterReminder = {
      id: `rem-${Date.now()}`,
      plantName: newPlantName.trim(),
      dueDate: d.toISOString().split('T')[0],
      frequencyDays: Number(newFrequency),
      completed: false,
    };

    const updated = [newReminder, ...reminders];
    setReminders(updated);
    saveReminders(updated);
    setNewPlantName('');
    onToast('Watering reminder created!', 'success');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-500/20">
          <Droplets className="w-4 h-4 text-sky-500" />
          <span>Hydration Masterclass & Reminders</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">
          Watering Schedule & Hydration Guide
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto">
          Learn master watering techniques, diagnose soil hydration levels, and manage persistent watering schedules for your plant collection.
        </p>
      </div>

      {/* Interactive Watering Reminders Tracker */}
      <div className="p-8 rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-sky-500/20 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-sky-500" />
              Active Collection Watering Calendar
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Track watering due dates. Marking a plant complete auto-calculates its next watering date!
            </p>
          </div>

          {/* Quick Add Custom Reminder Form */}
          <form onSubmit={handleAddCustomReminder} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={newPlantName}
              onChange={(e) => setNewPlantName(e.target.value)}
              placeholder="Plant Name..."
              className="px-3 py-2 rounded-xl text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 focus:outline-none"
            />
            <select
              value={newFrequency}
              onChange={(e) => setNewFrequency(Number(e.target.value))}
              className="px-2 py-2 rounded-xl text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700"
            >
              <option value={3}>Every 3d</option>
              <option value={7}>Every 7d</option>
              <option value={10}>Every 10d</option>
              <option value={14}>Every 14d</option>
              <option value={21}>Every 21d</option>
            </select>
            <button
              type="submit"
              className="p-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white shadow-md text-xs font-bold"
              title="Add Reminder"
            >
              <Plus className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Reminders List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reminders.map((rem) => {
            const isTodayOrPast = new Date(rem.dueDate) <= new Date();
            return (
              <div
                key={rem.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  rem.completed
                    ? 'bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 opacity-60'
                    : isTodayOrPast
                    ? 'bg-sky-50 dark:bg-sky-950/40 border-sky-500/40 shadow-sm'
                    : 'bg-white dark:bg-zinc-900 border-zinc-200/80 dark:border-zinc-800'
                }`}
              >
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 truncate">
                    {rem.plantName}
                  </h4>
                  <p className="text-xs text-zinc-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-sky-500" />
                    Due: <strong className="text-zinc-700 dark:text-zinc-300">{rem.dueDate}</strong>
                  </p>
                  <span className="text-[10px] text-zinc-400">Repeat every {rem.frequencyDays} days</span>
                </div>

                <button
                  onClick={() => handleToggleComplete(rem.id)}
                  className={`p-2.5 rounded-xl transition-all ${
                    rem.completed
                      ? 'bg-emerald-500 text-white'
                      : 'bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-300 hover:bg-sky-500 hover:text-white'
                  }`}
                  title={rem.completed ? 'Mark as Pending' : 'Mark Watered'}
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Overwatering vs Underwatering Diagnostic Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Overwatering */}
        <div className="p-6 rounded-3xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-500/20 space-y-4">
          <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-200">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <span>Signs of Overwatering (Drowning Roots)</span>
          </div>
          <ul className="text-xs text-zinc-700 dark:text-zinc-300 space-y-2 list-disc list-inside">
            <li>Lower leaves yellowing while remaining soft and limp</li>
            <li>Soil remains wet and soggy for over 7-10 days</li>
            <li>Brown spots on leaves surrounded by yellow halos</li>
            <li>Fungus gnats hovering around the soil surface</li>
            <li>Musty sour smell coming from pot drainage holes</li>
          </ul>
        </div>

        {/* Underwatering */}
        <div className="p-6 rounded-3xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-500/20 space-y-4">
          <div className="flex items-center gap-2 font-bold text-sky-800 dark:text-sky-200">
            <Droplets className="w-5 h-5 text-sky-500" />
            <span>Signs of Underwatering (Dehydration)</span>
          </div>
          <ul className="text-xs text-zinc-700 dark:text-zinc-300 space-y-2 list-disc list-inside">
            <li>Leaf tips turn brown, dry, crispy, and curl inwards</li>
            <li>Soil pulls away from the inner edges of the pot</li>
            <li>Slow stem growth and drooping brittle petioles</li>
            <li>Water runs straight through dry soil without absorbing</li>
            <li>Pot feels extremely lightweight when lifted</li>
          </ul>
        </div>

      </div>

      {/* Watering Best Practices Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
        <div className="p-5 rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800 space-y-2">
          <span className="font-bold text-sm text-emerald-600 block">1. The Finger Test</span>
          <p className="text-zinc-600 dark:text-zinc-300">
            Insert your index finger 2 inches into the soil. If it feels cool and moist, hold off on watering. If dry, water thoroughly until it drains.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800 space-y-2">
          <span className="font-bold text-sm text-teal-600 block">2. Bottom Watering</span>
          <p className="text-zinc-600 dark:text-zinc-300">
            Place nursery pots in a tray of water for 20-30 minutes. The soil capillary action absorbs moisture directly to the root tips without compacting topsoil.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800 space-y-2">
          <span className="font-bold text-sm text-sky-600 block">3. Rainwater vs Tap Water</span>
          <p className="text-zinc-600 dark:text-zinc-300">
            Let tap water sit overnight to dissipate chlorine before watering sensitive plants like Calatheas and Orchids to prevent leaf tip burn.
          </p>
        </div>
      </div>

    </div>
  );
};
