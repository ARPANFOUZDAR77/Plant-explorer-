import React from 'react';
import {
  Sparkles,
  Camera,
  Search,
  Sprout,
  ShieldCheck,
  BookOpen,
  Award,
  ArrowRight,
  TrendingUp,
  Droplets
} from 'lucide-react';
import { Plant } from '../types';

interface HeroProps {
  onExploreClick: () => void;
  onIdentifyClick: () => void;
  onSelectCategory: (cat: string) => void;
  plantOfTheDay: Plant;
  onOpenPlantModal: (plant: Plant) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onIdentifyClick,
  onSelectCategory,
  plantOfTheDay,
  onOpenPlantModal,
}) => {
  const quickCategories = [
    { name: 'Indoor', label: 'Popular Indoor', count: '120+' },
    { name: 'Succulents', label: 'Succulents & Cacti', count: '95+' },
    { name: 'Herbs', label: 'Medicinal Herbs', count: '88+' },
    { name: 'Flowering', label: 'Flowering Beauties', count: '180+' },
    { name: 'Rare Plants', label: 'Rare Collector Species', count: '38+' },
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:py-20 bg-gradient-to-b from-emerald-50/50 via-teal-50/20 to-transparent dark:from-emerald-950/20 dark:via-zinc-950 dark:to-zinc-950">
      
      {/* Animated Botanical Leaf Particles background graphics */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-30">
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-400 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>AI-Powered Botanical Knowledge Hub</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 leading-[1.15]">
              Discover, Identify & Master{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 bg-clip-text text-transparent">
                Every Plant Species
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              A National Geographic-inspired botanical library with instant AI photo identification, care schedules, disease diagnosis, and interactive garden planning tools.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onIdentifyClick}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Camera className="w-5 h-5" />
                <span>Snap & Identify Plant</span>
                <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-md bg-white/20">
                  Gemini AI
                </span>
              </button>

              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold border border-zinc-200 dark:border-zinc-800 shadow-md transition-all duration-200"
              >
                <Search className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Browse Encyclopedia</span>
              </button>
            </div>

            {/* Quick Category Chips */}
            <div className="pt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                Explore Popular Categories
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {quickCategories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => onSelectCategory(cat.name)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium bg-white/60 dark:bg-zinc-900/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-800 transition-colors"
                  >
                    <Sprout className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{cat.label}</span>
                    <span className="text-[10px] text-zinc-400">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Key Statistics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 text-center lg:text-left">
              <div>
                <p className="text-2xl font-black text-zinc-900 dark:text-zinc-100">10,000+</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Botanical Species</p>
              </div>
              <div>
                <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">99.4%</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">AI Photo Accuracy</p>
              </div>
              <div>
                <p className="text-2xl font-black text-zinc-900 dark:text-zinc-100">100%</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Free Open Access</p>
              </div>
            </div>
          </div>

          {/* Right Plant of the Day Card Showcase */}
          <div className="lg:col-span-5">
            <div className="relative group p-2 rounded-3xl bg-gradient-to-b from-emerald-500/20 via-teal-500/10 to-transparent p-[1px]">
              <div className="relative rounded-3xl overflow-hidden bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-emerald-500/20 shadow-2xl p-6 space-y-4">
                
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    <Award className="w-3.5 h-3.5" />
                    Plant of the Day
                  </span>
                  <span className="text-xs font-medium text-zinc-400 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    Trending #1
                  </span>
                </div>

                {/* Plant Image Showcase */}
                <div
                  onClick={() => onOpenPlantModal(plantOfTheDay)}
                  className="relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer group-hover:scale-[1.01] transition-transform duration-300"
                >
                  <img
                    src={plantOfTheDay.images[0]}
                    alt={plantOfTheDay.commonName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-emerald-600/80 backdrop-blur-md mb-1 inline-block">
                      {plantOfTheDay.botanicalFamily}
                    </span>
                    <h3 className="text-xl font-extrabold">{plantOfTheDay.commonName}</h3>
                    <p className="text-xs italic text-emerald-200">{plantOfTheDay.scientificName}</p>
                  </div>
                </div>

                {/* Quick Care Snapshot */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800 flex items-center gap-2.5">
                    <Droplets className="w-4 h-4 text-sky-500 shrink-0" />
                    <div>
                      <p className="text-zinc-400 text-[10px]">Watering</p>
                      <p className="font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                        Every {plantOfTheDay.care.wateringFrequencyDays} Days
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800 flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <div>
                      <p className="text-zinc-400 text-[10px]">Difficulty</p>
                      <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                        {plantOfTheDay.difficulty}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Read Profile Button */}
                <button
                  onClick={() => onOpenPlantModal(plantOfTheDay)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 hover:bg-emerald-600 dark:hover:bg-emerald-500 text-white dark:text-zinc-900 hover:text-white font-semibold text-xs transition-colors duration-200"
                >
                  <span>View Full Species Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
