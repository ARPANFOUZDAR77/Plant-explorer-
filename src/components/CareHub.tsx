import React, { useState } from 'react';
import { BookOpen, Home, Trees, Sprout, Sun, Droplets, ShieldCheck, Thermometer, ChevronRight } from 'lucide-react';

export const CareHub: React.FC = () => {
  const [selectedHubId, setSelectedHubId] = useState('indoor');

  const hubs = [
    {
      id: 'indoor',
      title: 'Indoor Tropicals & Houseplants',
      icon: Home,
      summary: 'Master light requirements, humidity tricks, pest prevention, and potting mix for indoor foliage.',
      principles: [
        'Provide bright indirect sunlight near east or south facing windows.',
        'Group plants together to create micro-climate humidity zones.',
        'Wipe leaves with warm damp cloth monthly to clean stomata for max photosynthesis.',
        'Ensure pots always have bottom drainage holes.'
      ],
      light: 'Indirect Bright Light (1,000 - 2,500 Foot Candles)',
      water: 'Allow top 1-2 inches of soil to dry out between waterings.',
      temp: '65°F - 80°F (18°C - 27°C). Protect from cold window drafts.'
    },
    {
      id: 'succulents',
      title: 'Succulents & Desert Cacti',
      icon: Sun,
      summary: 'Drought-tolerant specialized flora requiring maximum drainage and soak-and-dry watering methods.',
      principles: [
        'Use gritty cactus soil mix containing 50% perlite or pumice.',
        'Water deeply only when soil is completely bone dry from top to bottom.',
        'Expose to 6+ hours of direct sunlight daily for vivid foliage colors.',
        'Never mist succulent leaves as trapped water causes crown rot.'
      ],
      light: 'Direct Sun to Full Bright Light (3,000+ Foot Candles)',
      water: 'Soak-and-dry method every 2-3 weeks.',
      temp: '55°F - 90°F (13°C - 32°C). Extremely frost sensitive.'
    },
    {
      id: 'herbs',
      title: 'Culinary & Medicinal Herbs',
      icon: Sprout,
      summary: 'Grow aromatic basil, rosemary, mint, lavender, and thyme on windowsills or garden beds.',
      principles: [
        'Harvest top growth frequently to encourage bushy branching rather than legginess.',
        'Prune flowering buds off edible herbs to keep essential oils rich in leaves.',
        'Ensure 6 hours of full sunlight for Mediterranean species like rosemary.',
        'Mint grows invasively—always plant mint in separate containers!'
      ],
      light: 'Full Direct Sun (6+ hours daily)',
      water: 'Moderate watering. Keep soil evenly moist for basil, dry for lavender.',
      temp: '60°F - 75°F (15°C - 24°C).'
    },
    {
      id: 'outdoor',
      title: 'Outdoor Garden Beds & Landscapes',
      icon: Trees,
      summary: 'Perennials, flowering shrubs, shade trees, and lawn garden maintenance.',
      principles: [
        'Mulch garden beds with 2-3 inches of organic bark to suppress weeds and lock in moisture.',
        'Water early in the morning so foliage dries before nightfall, reducing fungal disease.',
        'Amend heavy clay soil with rich compost and organic earthworm castings.',
        'Prune dormant trees and woody shrubs in late winter before spring bud break.'
      ],
      light: 'Full Sun to Partial Shade depending on hardiness zone',
      water: '1 inch of rainfall or deep soaking per week',
      temp: 'Check USDA Hardiness Zones 3-11'
    }
  ];

  const currentHub = hubs.find((h) => h.id === selectedHubId) || hubs[0];
  const Icon = currentHub.icon;

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
          <BookOpen className="w-4 h-4 text-emerald-500" />
          <span>Botanical Care Hubs</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">
          Specialized Plant Category Guides
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto">
          Tailored cultivation rules, soil mix formulations, and lighting setups for specific plant families.
        </p>
      </div>

      {/* Category Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {hubs.map((h) => {
          const HIcon = h.icon;
          const isSelected = h.id === selectedHubId;
          return (
            <button
              key={h.id}
              onClick={() => setSelectedHubId(h.id)}
              className={`p-5 rounded-3xl text-left border transition-all space-y-2 ${
                isSelected
                  ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-xl shadow-emerald-500/20 border-transparent scale-105'
                  : 'bg-white/80 dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-800'
              }`}
            >
              <HIcon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-emerald-500'}`} />
              <h3 className="font-bold text-sm leading-tight">{h.title}</h3>
            </button>
          );
        })}
      </div>

      {/* Selected Care Hub Detail Board */}
      <div className="p-8 rounded-3xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-emerald-500/20 shadow-2xl space-y-6">
        
        <div className="flex items-center gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">
              {currentHub.title}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{currentHub.summary}</p>
          </div>
        </div>

        {/* Quick Requirement Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-amber-500 block flex items-center gap-1">
              <Sun className="w-3.5 h-3.5" /> Sunlight Spectrum
            </span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">{currentHub.light}</span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-sky-500 block flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5" /> Hydration Rule
            </span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">{currentHub.water}</span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-rose-500 block flex items-center gap-1">
              <Thermometer className="w-3.5 h-3.5" /> Optimal Climate
            </span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">{currentHub.temp}</span>
          </div>
        </div>

        {/* Core Principles List */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Core Cultivation Rules
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {currentHub.principles.map((rule, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 text-zinc-800 dark:text-zinc-200 flex items-start gap-2.5"
              >
                <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
