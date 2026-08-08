import React, { useState } from 'react';
import {
  X,
  Heart,
  Droplets,
  Sun,
  ShieldCheck,
  AlertTriangle,
  MapPin,
  Sparkles,
  Share2,
  Printer,
  Plus,
  Check,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  BookOpen,
  Calendar,
  Layers,
  Thermometer,
  Scissors,
  Sprout,
  Activity
} from 'lucide-react';
import { Plant } from '../types';

interface PlantDetailsModalProps {
  plant: Plant | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onAddToCollection: (plant: Plant) => void;
  isInCollection: boolean;
  onToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const PlantDetailsModal: React.FC<PlantDetailsModalProps> = ({
  plant,
  onClose,
  isFavorite,
  onToggleFavorite,
  onAddToCollection,
  isInCollection,
  onToast,
}) => {
  if (!plant) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFullscreenImage, setIsFullscreenImage] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'care' | 'diseases' | 'taxonomy'>('overview');

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${plant.commonName} - Plant Encyclopedia`,
        text: `Check out the botanical profile and care guide for ${plant.commonName} (${plant.scientificName}).`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      onToast('Profile link copied to clipboard!', 'success');
    }
  };

  const handlePrintCareSheet = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl my-auto rounded-3xl bg-white dark:bg-zinc-900 border border-emerald-500/20 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col text-zinc-900 dark:text-zinc-100">
        
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
              {plant.botanicalFamily}
            </span>
            <div className="min-w-0">
              <h2 className="text-lg font-bold truncate">{plant.commonName}</h2>
              <p className="text-xs italic text-zinc-500 dark:text-zinc-400 truncate">
                {plant.scientificName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Share */}
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-zinc-500 hover:text-emerald-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="Share Plant Profile"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Print Care Sheet */}
            <button
              onClick={handlePrintCareSheet}
              className="p-2 rounded-xl text-zinc-500 hover:text-emerald-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors hidden sm:block"
              title="Print Care Sheet"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Favorite */}
            <button
              onClick={() => onToggleFavorite(plant.id)}
              className={`p-2 rounded-xl transition-all ${
                isFavorite
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'text-zinc-500 hover:text-rose-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1">
          
          {/* Top Gallery & Quick Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Image Gallery Column */}
            <div className="lg:col-span-6 space-y-3">
              <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden group bg-zinc-950">
                <img
                  src={plant.images[activeImageIndex]}
                  alt={plant.commonName}
                  className="w-full h-full object-cover"
                />
                
                {/* Fullscreen zoom button */}
                <button
                  onClick={() => setIsFullscreenImage(true)}
                  className="absolute top-3 right-3 p-2 rounded-xl bg-zinc-950/60 backdrop-blur-md text-white hover:bg-zinc-950 transition-colors"
                  title="Fullscreen View"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {/* Slideshow Nav Arrows */}
                {plant.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === 0 ? plant.images.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-950/60 backdrop-blur-md text-white hover:bg-zinc-950 transition-colors opacity-80 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === plant.images.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-950/60 backdrop-blur-md text-white hover:bg-zinc-950 transition-colors opacity-80 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Strip */}
              {plant.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {plant.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-emerald-500 scale-105 shadow-md'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Summary Column */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Native Origin */}
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-2xl border border-emerald-500/20">
                <MapPin className="w-4 h-4 shrink-0 text-emerald-500" />
                <span>Native Origin: {plant.nativeRegion}</span>
              </div>

              {/* Headline Overview */}
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                {plant.description}
              </p>

              {/* Pet Toxicity Alert Banner */}
              {plant.isToxicToPets ? (
                <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-500/30 text-rose-800 dark:text-rose-200 text-xs flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Toxic to Cats & Dogs</p>
                    <p className="text-[11px] opacity-90">{plant.toxicityDetails || 'Contains irritant crystals; keep away from curious pets.'}</p>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="font-semibold">Pet Safe & Non-Toxic Houseplant</span>
                </div>
              )}

              {/* Quick Care Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800 text-center">
                  <Droplets className="w-4 h-4 mx-auto text-sky-500 mb-1" />
                  <p className="text-[10px] text-zinc-400 uppercase font-bold">Watering</p>
                  <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                    Every {plant.care.wateringFrequencyDays} Days
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800 text-center">
                  <Sun className="w-4 h-4 mx-auto text-amber-500 mb-1" />
                  <p className="text-[10px] text-zinc-400 uppercase font-bold">Sunlight</p>
                  <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate">
                    {plant.care.sunlightNeeds}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800 text-center col-span-2 sm:col-span-1">
                  <ShieldCheck className="w-4 h-4 mx-auto text-emerald-500 mb-1" />
                  <p className="text-[10px] text-zinc-400 uppercase font-bold">Difficulty</p>
                  <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                    {plant.difficulty}
                  </p>
                </div>
              </div>

              {/* Add to Collection Button */}
              <button
                onClick={() => onAddToCollection(plant)}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm transition-all shadow-md ${
                  isInCollection
                    ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20'
                }`}
              >
                {isInCollection ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{isInCollection ? 'In Your Personal Collection' : 'Add to My Collection & Schedule Reminders'}</span>
              </button>

            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-zinc-200 dark:border-zinc-800">
            {[
              { id: 'overview', label: 'Species Facts & Description', icon: BookOpen },
              { id: 'care', label: 'Complete Care Guide', icon: Sprout },
              { id: 'diseases', label: 'Diseases & Pests', icon: Activity },
              { id: 'taxonomy', label: 'Taxonomy Hierarchy', icon: Layers }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-3 font-semibold text-xs border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                      : 'border-transparent text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content 1: Overview & Fun Facts */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Interesting Facts */}
              <div className="space-y-3">
                <h3 className="text-base font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Botanical Fun Facts
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {plant.interestingFacts.map((fact, idx) => (
                    <li
                      key={idx}
                      className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800/80 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Physical Specifications Grid */}
              <div className="p-5 rounded-3xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 space-y-4">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Physical Characteristics
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Mature Height</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">{plant.heightMature}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Foliage Type</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">{plant.leafType}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">Leaf Color</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">{plant.leafColor.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px] uppercase font-bold">USDA Hardiness</span>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">{plant.usdaZones.join(', ')}</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Tab Content 2: Comprehensive Care Guide */}
          {activeTab === 'care' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              
              {/* Soil & Fertilizer */}
              <div className="p-5 rounded-3xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-800 space-y-3">
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-500" />
                  Soil Mix & Recipe
                </h4>
                <p className="text-zinc-600 dark:text-zinc-300">
                  <strong className="text-zinc-900 dark:text-zinc-100">Soil Type:</strong> {plant.care.soilType}
                </p>
                <div className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <p className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 mb-1">Recommended Soil Mix Ratio</p>
                  <p className="font-semibold text-zinc-800 dark:text-zinc-200">{plant.care.soilMixRatio}</p>
                </div>
                <p className="text-zinc-600 dark:text-zinc-300 pt-1">
                  <strong className="text-zinc-900 dark:text-zinc-100">Fertilizer:</strong> {plant.care.fertilizerRecommendations}
                </p>
              </div>

              {/* Climate & Humidity */}
              <div className="p-5 rounded-3xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-800 space-y-3">
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-rose-500" />
                  Temperature & Humidity
                </h4>
                <p className="text-zinc-600 dark:text-zinc-300">
                  <strong className="text-zinc-900 dark:text-zinc-100">Ideal Temp:</strong> {plant.care.temperatureRange}
                </p>
                <p className="text-zinc-600 dark:text-zinc-300">
                  <strong className="text-zinc-900 dark:text-zinc-100">Humidity Level:</strong> {plant.care.humidityLevel}
                </p>
                <p className="text-zinc-600 dark:text-zinc-300">
                  <strong className="text-zinc-900 dark:text-zinc-100">Pot Size & Repotting:</strong> {plant.care.potSize}. {plant.care.repottingGuide}
                </p>
              </div>

              {/* Pruning & Propagation */}
              <div className="p-5 rounded-3xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-800 space-y-3 md:col-span-2">
                <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Scissors className="w-4 h-4 text-teal-500" />
                  Pruning & Propagation Methods
                </h4>
                <p className="text-zinc-600 dark:text-zinc-300">
                  <strong className="text-zinc-900 dark:text-zinc-100">Pruning Instructions:</strong> {plant.care.pruningInstructions}
                </p>
                <div>
                  <strong className="text-zinc-900 dark:text-zinc-100 block mb-1">Propagation Techniques:</strong>
                  <div className="flex flex-wrap gap-2">
                    {plant.care.propagationMethods.map((method, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold">
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Tab Content 3: Diseases */}
          {activeTab === 'diseases' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Known Disease Susceptibilities for {plant.commonName}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plant.commonDiseases.map((d, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100">{d.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        d.riskLevel === 'High' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {d.riskLevel} Risk
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300">
                      <strong className="text-zinc-800 dark:text-zinc-200">Prevention Tip:</strong> {d.preventionTip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content 4: Taxonomy */}
          {activeTab === 'taxonomy' && (
            <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 space-y-4">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Botanical Taxonomy Hierarchy
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <p className="text-[10px] text-zinc-400 uppercase font-bold">Kingdom</p>
                  <p className="font-bold text-xs text-emerald-600">Plantae</p>
                </div>
                <div className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <p className="text-[10px] text-zinc-400 uppercase font-bold">Division</p>
                  <p className="font-bold text-xs text-zinc-800 dark:text-zinc-200">Tracheophyta</p>
                </div>
                <div className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <p className="text-[10px] text-zinc-400 uppercase font-bold">Family</p>
                  <p className="font-bold text-xs text-emerald-600">{plant.botanicalFamily}</p>
                </div>
                <div className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <p className="text-[10px] text-zinc-400 uppercase font-bold">Genus</p>
                  <p className="font-bold text-xs text-zinc-800 dark:text-zinc-200">{plant.genus}</p>
                </div>
                <div className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 col-span-2 sm:col-span-1">
                  <p className="text-[10px] text-zinc-400 uppercase font-bold">Species</p>
                  <p className="font-bold text-xs text-emerald-600 italic">{plant.species}</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Fullscreen Image Overlay */}
      {isFullscreenImage && (
        <div className="fixed inset-0 z-50 bg-zinc-950/95 flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreenImage(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-zinc-800 text-white hover:bg-zinc-700"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={plant.images[activeImageIndex]}
            alt={plant.commonName}
            className="max-w-full max-h-full object-contain rounded-xl"
          />
        </div>
      )}
    </div>
  );
};
