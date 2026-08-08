export interface AnatomyPart {
  id: string;
  name: string;
  function: string;
  locationLabel: string;
  xPercent: number; // For SVG/interactive placement
  yPercent: number;
}

export const PLANT_ANATOMY_PARTS: AnatomyPart[] = [
  {
    id: 'flower',
    name: 'Flower / Reproductive Organs',
    function: 'Attracts pollinators using petals, nectar, and scent. Contains stamens (pollen) and pistil (ovary) for seed production.',
    locationLabel: 'Top Canopy',
    xPercent: 50,
    yPercent: 18
  },
  {
    id: 'blade',
    name: 'Leaf Blade (Lamina)',
    function: 'Main site of photosynthesis. Absorbs sunlight and CO2 to produce glucose sugars while releasing fresh O2.',
    locationLabel: 'Upper Stem',
    xPercent: 72,
    yPercent: 35
  },
  {
    id: 'petiole',
    name: 'Petiole / Leaf Stem',
    function: 'Attaches leaf blade to main stem and contains vascular channels transporting water and nutrient sugars.',
    locationLabel: 'Stem Branch',
    xPercent: 32,
    yPercent: 42
  },
  {
    id: 'stem',
    name: 'Main Stem (Xylem & Phloem)',
    function: 'Provides physical structural support. Xylem carries water UP from roots; Phloem carries synthesized sugars DOWN.',
    locationLabel: 'Center Axis',
    xPercent: 50,
    yPercent: 55
  },
  {
    id: 'root-crown',
    name: 'Root Crown / Soil Line',
    function: 'Transition zone between shoot system and root system; vital junction for respiration.',
    locationLabel: 'Soil Level',
    xPercent: 50,
    yPercent: 72
  },
  {
    id: 'roots',
    name: 'Taproot & Lateral Fibrous Roots',
    function: 'Anchors plant in soil, absorbs water and essential minerals (NPK), and stores energy reserves.',
    locationLabel: 'Sub-surface Soil',
    xPercent: 50,
    yPercent: 88
  }
];

export const COMPANION_PLANTING_MATRIX = [
  {
    crop: 'Tomato',
    goodCompanions: ['Basil', 'Marigold', 'Parsley', 'Carrots', 'Garlic'],
    badCompanions: ['Fennel', 'Potatoes', 'Cabbage / Brassicas'],
    reasons: 'Basil deters hornworms and improves flavor; Marigolds emit root secretions that repel destructive nematodes.'
  },
  {
    crop: 'Strawberry',
    goodCompanions: ['Borage', 'Bush Beans', 'Spinach', 'Thyme'],
    badCompanions: ['Cabbage', 'Fennel'],
    reasons: 'Borage attracts bees for heavy pollination and improves berry yield; Bush beans fix nitrogen into soil.'
  },
  {
    crop: 'Rosemary',
    goodCompanions: ['Beans', 'Cabbage', 'Carrots', 'Sage'],
    badCompanions: ['Basil', 'Mint (requires high water vs dry rosemary)'],
    reasons: 'Deters cabbage moths and bean beetles with strong aromatic pinene oils.'
  },
  {
    crop: 'Carrots',
    goodCompanions: ['Lettuce', 'Chives', 'Rosemary', 'Sage', 'Tomatoes'],
    badCompanions: ['Dill', 'Parsnips'],
    reasons: 'Chives and rosemary deter carrot rust flies; Tomatoes provide dappled shade.'
  }
];

export const EDUCATIONAL_TOPICS = [
  {
    id: 'photosynthesis',
    title: 'Photosynthesis & Solar Energy Conversion',
    icon: 'Sun',
    summary: 'How green chloroplasts convert sunlight, water, and atmospheric CO2 into life-sustaining oxygen and glucose sugars.',
    formula: '6CO₂ + 6H₂O + Light Energy ➔ C₆H₁₂O₆ + 6O₂',
    keyPoints: [
      'Chlorophyll pigments absorb red and blue wavelengths while reflecting green light.',
      'Stomata on leaf undersides open and close to regulate CO2 absorption and transpiration water loss.',
      'Light-dependent reactions occur in thylakoid membranes generating ATP energy units.'
    ]
  },
  {
    id: 'soil-science',
    title: 'Soil Science & N-P-K Macro Nutrients',
    icon: 'Layers',
    summary: 'Understanding Nitrogen (N), Phosphorus (P), and Potassium (K) balance alongside soil pH and organic mycorrhizae.',
    formula: 'NPK Ratio = % Nitrogen : % Phosphorus : % Potassium',
    keyPoints: [
      'Nitrogen (N): Drives lush green stem and leaf growth.',
      'Phosphorus (P): Stimulates deep root formation, flower buds, and fruit production.',
      'Potassium (K): Builds overall plant immunity, drought resistance, and cell wall strength.'
    ]
  },
  {
    id: 'composting',
    title: 'Organic Composting & Gold Humus',
    icon: 'Recycle',
    summary: 'Transforming kitchen scraps and yard waste into rich humus that feeds beneficial soil microbes.',
    formula: 'Optimal Carbon to Nitrogen Ratio = 30 : 1 (Greens vs Browns)',
    keyPoints: [
      'Greens (Nitrogen): Vegetable scraps, coffee grounds, fresh grass clippings.',
      'Browns (Carbon): Dry autumn leaves, cardboard, sawdust, straw.',
      'Aeration & Moisture: Turn pile weekly to supply aerobic bacteria with oxygen.'
    ]
  },
  {
    id: 'seed-germination',
    title: 'Seed Germination Lifecycle',
    icon: 'Sprout',
    summary: 'The transformation from dormant seed coat to sprouting seedling via imbibition, radicle emergence, and cotyledon unfolding.',
    formula: 'Trigger = Moisture + Warmth + Oxygen (+ Light for specific seeds)',
    keyPoints: [
      'Imbibition: Seed absorbs water, swelling and cracking open seed coat.',
      'Radicle Emergence: First embryonic root emerges downward into soil.',
      'Cotyledons: First seed leaves unfold upward to begin solar capture.'
    ]
  }
];
