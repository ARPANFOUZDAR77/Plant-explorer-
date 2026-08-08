import { PlantCategory } from '../types';

export interface CategoryInfo {
  name: PlantCategory;
  description: string;
  iconName: string;
  popularCount: number;
  bgGradient: string;
}

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    name: 'Indoor',
    description: 'Foliage and bloom species engineered by nature to thrive in moderate indoor light and cozy room climates.',
    iconName: 'Home',
    popularCount: 120,
    bgGradient: 'from-emerald-500/20 to-teal-500/10'
  },
  {
    name: 'Outdoor',
    description: 'Garden beds, landscaping shrubs, patio containers, and sun-loving flora.',
    iconName: 'Sun',
    popularCount: 210,
    bgGradient: 'from-amber-500/20 to-orange-500/10'
  },
  {
    name: 'Flowering',
    description: 'Ornamental species featuring fragrant, colorful blooms that attract pollinators and brighten spaces.',
    iconName: 'Flower2',
    popularCount: 180,
    bgGradient: 'from-pink-500/20 to-rose-500/10'
  },
  {
    name: 'Succulents',
    description: 'Fleshy water-storing plants with dramatic geometrical shapes and low maintenance demands.',
    iconName: 'Sparkles',
    popularCount: 95,
    bgGradient: 'from-emerald-600/20 to-lime-500/10'
  },
  {
    name: 'Cacti',
    description: 'Resilient desert wonders engineered with protective spines and drought-proof stems.',
    iconName: 'Zap',
    popularCount: 64,
    bgGradient: 'from-yellow-600/20 to-amber-600/10'
  },
  {
    name: 'Herbs',
    description: 'Aromatic, medicinal, and culinary plants packed with essential oils and fresh kitchen flavors.',
    iconName: 'Leaf',
    popularCount: 88,
    bgGradient: 'from-green-500/20 to-emerald-500/10'
  },
  {
    name: 'Vegetables',
    description: 'Edible garden favorites for homegrown harvests from tomatoes to leafy greens.',
    iconName: 'Carrot',
    popularCount: 140,
    bgGradient: 'from-orange-500/20 to-red-500/10'
  },
  {
    name: 'Fruits',
    description: 'Fruit trees, berry bushes, and sweet fruiting vines.',
    iconName: 'Apple',
    popularCount: 72,
    bgGradient: 'from-red-500/20 to-pink-500/10'
  },
  {
    name: 'Trees',
    description: 'Majestic shade trees, Japanese maples, citrus trees, and architectural specimens.',
    iconName: 'Trees',
    popularCount: 110,
    bgGradient: 'from-green-700/20 to-emerald-800/10'
  },
  {
    name: 'Ferns',
    description: 'Lush ancient fronds thriving in humid, dappled forest shade.',
    iconName: 'Wind',
    popularCount: 45,
    bgGradient: 'from-teal-600/20 to-emerald-600/10'
  },
  {
    name: 'Climbers',
    description: 'Trailing vines and vertical scrambling climbers that hug moss poles and outdoor arbors.',
    iconName: 'Layers',
    popularCount: 52,
    bgGradient: 'from-emerald-400/20 to-cyan-500/10'
  },
  {
    name: 'Medicinal',
    description: 'Botanicals valued for soothing gels, calming aromatics, and herbal wellness infusions.',
    iconName: 'HeartPulse',
    popularCount: 60,
    bgGradient: 'from-purple-500/20 to-violet-500/10'
  },
  {
    name: 'Rare Plants',
    description: 'Exotic collector species, variegated jewels, and unusual botanical oddities.',
    iconName: 'Crown',
    popularCount: 38,
    bgGradient: 'from-amber-400/20 to-purple-500/10'
  },
  {
    name: 'Air Plants',
    description: 'Soil-free epiphytic bromeliads that draw moisture directly from ambient air.',
    iconName: 'Cloud',
    popularCount: 28,
    bgGradient: 'from-sky-500/20 to-indigo-500/10'
  },
  {
    name: 'Carnivorous',
    description: 'Insect-trapping specialized bog flora with snap-traps, pitchers, and sticky dew drops.',
    iconName: 'Bug',
    popularCount: 22,
    bgGradient: 'from-rose-600/20 to-red-600/10'
  },
  {
    name: 'Aquatic',
    description: 'Floating water lilies, marginal pond reeds, and oxygenating underwater plants.',
    iconName: 'Droplets',
    popularCount: 30,
    bgGradient: 'from-blue-500/20 to-cyan-500/10'
  }
];
