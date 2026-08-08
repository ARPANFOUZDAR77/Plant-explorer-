import React, { useState, useEffect } from 'react';
import { 
  Sprout, 
  Search, 
  Filter, 
  Sun, 
  Droplets, 
  LayoutGrid, 
  Calendar, 
  ArrowLeftRight, 
  Stethoscope, 
  Moon, 
  Sun as SunIcon, 
  Check, 
  PlusCircle, 
  Info,
  ShieldAlert,
  Sparkles,
  Heart
} from 'lucide-react';

import { PLANTS_DATA } from './data/plantsData';
import { Plant, UserPlant, LightLevel, CareDifficulty } from './types';
import { GardenPlanner } from './components/GardenPlanner';
import { PlantDetailModal } from './components/PlantDetailModal';
import { DiseaseDiagnosisModal } from './components/DiseaseDiagnosisModal';
import { CompareView } from './components/CompareView';
import { UserDashboard } from './components/UserDashboard';

export default function App() {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'catalog' | 'planner' | 'dashboard' | 'compare' | 'clinic'>('catalog');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLight, setSelectedLight] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [petFriendlyOnly, setPetFriendlyOnly] = useState<boolean>(false);

  // Modals
  const [inspectedPlant, setInspectedPlant] = useState<Plant | null>(null);

  // Dark Mode State
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // User's Tracked Plants State (LocalStorage Persisted)
  const [userPlants, setUserPlants] = useState<UserPlant[]>(() => {
    const saved = localStorage.getItem('sproutwise_user_plants');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    // Default initial plant
    const todayStr = new Date().toISOString().split('T')[0];
    return [
      {
        id: '1',
        plantId: 'monstera-deliciosa',
        customName: 'Living Room Monstera',
        dateAdded: todayStr,
        lastWatered: todayStr,
        nextWateringDate: todayStr,
        location: 'West Window',
        notes: 'Thriving in bright indirect light.',
        careLogs: [],
        healthStatus: 'Thriving'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('sproutwise_user_plants', JSON.stringify(userPlants));
  }, [userPlants]);

  // Handle Add Plant to Garden
  const handleAddToGarden = (plant: Plant) => {
    const todayStr = new Date().toISOString().split('T')[0];
    
    // Calculate next water
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + plant.waterDaysInterval);
    const nextDateStr = nextDate.toISOString().split('T')[0];

    const newUserPlant: UserPlant = {
      id: Date.now().toString(),
      plantId: plant.id,
      customName: plant.commonName,
      dateAdded: todayStr,
      lastWatered: todayStr,
      nextWateringDate: nextDateStr,
      location: 'Main Window / Rack',
      notes: 'Added from species catalog.',
      careLogs: [
        {
          id: Date.now().toString(),
          date: todayStr,
          action: 'Watered',
          notes: 'First watering on adding to my garden tracker.'
        }
      ],
      healthStatus: 'Thriving'
    };

    setUserPlants((prev) => [newUserPlant, ...prev]);
  };

  // Filter Logic
  const categories = ['All', 'Houseplants', 'Vegetables & Herbs', 'Succulents & Cacti', 'Outdoor & Flowers', 'Trees & Shrubs'];

  const filteredPlants = PLANTS_DATA.filter((plant) => {
    const matchesSearch = 
      plant.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || plant.category === selectedCategory;
    const matchesLight = selectedLight === 'All' || plant.light === selectedLight;
    const matchesDifficulty = selectedDifficulty === 'All' || plant.difficulty === selectedDifficulty;
    const matchesPet = !petFriendlyOnly || plant.petFriendly;

    return matchesSearch && matchesCategory && matchesLight && matchesDifficulty && matchesPet;
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-200 selection:bg-emerald-500 selection:text-white pb-24">
      
      {/* Navbar Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('catalog')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-1.5">
                <span>SproutWise</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/20">
                  Pro Care
                </span>
              </h1>
              <p className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400">
                Botanical Care & Smart Garden Planner
              </p>
            </div>
          </div>

          {/* Nav Tabs (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60">
            {[
              { id: 'catalog', label: 'Species Catalog', icon: Sprout },
              { id: 'planner', label: 'Garden Planner', icon: LayoutGrid },
              { id: 'dashboard', label: 'My Care Schedule', icon: Calendar, badge: userPlants.length },
              { id: 'compare', label: 'Compare Matrix', icon: ArrowLeftRight },
              { id: 'clinic', label: 'Plant Clinic', icon: Stethoscope }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                      isActive ? 'bg-emerald-700 text-white' : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Controls Right */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors border border-zinc-200 dark:border-zinc-700"
              title="Toggle Theme"
            >
              {darkMode ? <SunIcon className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* Navigation Bar (Mobile) */}
      <div className="lg:hidden sticky top-20 z-30 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-4 py-2 flex items-center justify-between overflow-x-auto no-scrollbar gap-2">
        {[
          { id: 'catalog', label: 'Catalog', icon: Sprout },
          { id: 'planner', label: 'Planner', icon: LayoutGrid },
          { id: 'dashboard', label: 'Schedule', icon: Calendar },
          { id: 'compare', label: 'Compare', icon: ArrowLeftRight },
          { id: 'clinic', label: 'Clinic', icon: Stethoscope }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5 transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* TAB 1: SPECIES CATALOG */}
        {activeTab === 'catalog' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Hero Search Section */}
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Botanical Knowledgebase & Care Encyclopedia</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
                Discover Plants & Master Their Care
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                Detailed care guides, light meters, pet safety ratings, watering intervals, and companion species compatibility.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name (e.g. Monstera, Sweet Basil, Snake Plant)..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                />
              </div>
            </div>

            {/* Filter Ribbon */}
            <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                
                {/* Categories */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-extrabold text-zinc-400 uppercase tracking-wider mr-1">
                    Category:
                  </span>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        selectedCategory === cat
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Pet Friendly Toggle */}
                <label className="flex items-center gap-2 cursor-pointer bg-zinc-100 dark:bg-zinc-800 px-3.5 py-1.5 rounded-xl text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  <input
                    type="checkbox"
                    checked={petFriendlyOnly}
                    onChange={(e) => setPetFriendlyOnly(e.target.checked)}
                    className="accent-emerald-600 w-4 h-4 rounded"
                  />
                  <span>🐾 Pet-Friendly Only</span>
                </label>

              </div>
            </div>

            {/* Plant Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPlants.map((plant) => {
                const isAlreadyInGarden = userPlants.some((up) => up.plantId === plant.id);

                return (
                  <div
                    key={plant.id}
                    className="group rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg overflow-hidden flex flex-col justify-between transition-all hover:shadow-2xl hover:border-emerald-500/40 hover:-translate-y-1"
                  >
                    {/* Plant Image Header */}
                    <div className="relative h-48 w-full overflow-hidden bg-zinc-900">
                      <img
                        src={plant.images[0]}
                        alt={plant.commonName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-zinc-950/80 text-white backdrop-blur-md">
                          {plant.category}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold backdrop-blur-md ${
                          plant.petFriendly ? 'bg-emerald-950/80 text-emerald-300' : 'bg-rose-950/80 text-rose-300'
                        }`}>
                          {plant.petFriendly ? '🐾 Safe' : '⚠️ Toxic'}
                        </span>
                      </div>
                    </div>

                    {/* Plant Info */}
                    <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {plant.commonName}
                        </h3>
                        <p className="text-xs text-zinc-400 italic">{plant.scientificName}</p>
                      </div>

                      {/* Specs */}
                      <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400">
                          <Sun className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{plant.light}</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-bold text-sky-600 dark:text-sky-400">
                          <Droplets className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{plant.waterFrequency}</span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="pt-3 flex items-center justify-between gap-2 border-t border-zinc-100 dark:border-zinc-800">
                        <button
                          onClick={() => setInspectedPlant(plant)}
                          className="px-3 py-2 rounded-xl text-xs font-extrabold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 flex items-center gap-1 transition-colors"
                        >
                          <Info className="w-3.5 h-3.5" /> Care Details
                        </button>

                        <button
                          onClick={() => handleAddToGarden(plant)}
                          disabled={isAlreadyInGarden}
                          className={`px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1 transition-all ${
                            isAlreadyInGarden
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 cursor-default'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow'
                          }`}
                        >
                          {isAlreadyInGarden ? <Check className="w-3.5 h-3.5" /> : <PlusCircle className="w-3.5 h-3.5" />}
                          <span>{isAlreadyInGarden ? 'In Garden' : 'Track'}</span>
                        </button>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* TAB 2: GARDEN PLANNER */}
        {activeTab === 'planner' && <GardenPlanner />}

        {/* TAB 3: USER DASHBOARD */}
        {activeTab === 'dashboard' && (
          <UserDashboard
            userPlants={userPlants}
            setUserPlants={setUserPlants}
            onOpenCatalog={() => setActiveTab('catalog')}
          />
        )}

        {/* TAB 4: COMPARE MATRIX */}
        {activeTab === 'compare' && <CompareView />}

        {/* TAB 5: PLANT CLINIC */}
        {activeTab === 'clinic' && <DiseaseDiagnosisModal />}

      </main>

      {/* Plant Inspection Modal */}
      <PlantDetailModal
        plant={inspectedPlant}
        onClose={() => setInspectedPlant(null)}
        onAddToGarden={(plant) => {
          handleAddToGarden(plant);
          setInspectedPlant(null);
        }}
        isAlreadyInGarden={inspectedPlant ? userPlants.some((up) => up.plantId === inspectedPlant.id) : false}
      />

    </div>
  );
}
