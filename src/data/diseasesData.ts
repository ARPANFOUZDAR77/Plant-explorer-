import { Disease } from '../types';

export const DISEASES_DATA: Disease[] = [
  {
    id: 'powdery-mildew',
    name: 'Powdery Mildew',
    type: 'Fungal',
    symptoms: [
      'White to grayish powdery coating on tops of leaves and stems',
      'Distorted, twisted, or stunted leaf growth',
      'Premature leaf yellowing and dropping'
    ],
    causes: 'High humidity combined with dry soil, crowded spacing, and lack of air circulation around foliage.',
    treatment: [
      'Prune severely infected leaves immediately and dispose in trash (do not compost).',
      'Spray affected foliage thoroughly with a solution of 1 tbsp baking soda + 1 tsp neem oil + 1 tsp dish soap per gallon of water.',
      'Apply potassium bicarbonate or copper fungicide spray every 7-10 days.'
    ],
    prevention: [
      'Water plants at root base only, avoiding wet leaves.',
      'Provide ample spacing between plants for wind ventilation.',
      'Position plants in locations with adequate sunlight.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
    severity: 'Moderate'
  },
  {
    id: 'root-rot',
    name: 'Root Rot (Pythium / Phytophthora)',
    type: 'Fungal',
    symptoms: [
      'Yellowing or wilting leaves despite moist soil',
      'Black, mushy, soft roots with sour odor',
      'Stunted growth and stems collapsing near soil level'
    ],
    causes: 'Overwatering, poor drainage pots without drainage holes, or dense compacted soil trapping stagnant moisture.',
    treatment: [
      'Unpot plant immediately and gently wash soil off roots.',
      'Trim all dark, mushy, decaying roots with sterilized shears until only firm white roots remain.',
      'Soak remaining roots in diluted 3% hydrogen peroxide solution for 15 minutes.',
      'Repot in clean pot with fresh, sterile, fast-draining potting soil.'
    ],
    prevention: [
      'Always use containers with functional drainage holes.',
      'Allow top 2-3 inches of soil to dry out between waterings.',
      'Incorporate perlite, pumice, or bark into heavy potting mixes.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80',
    severity: 'Severe'
  },
  {
    id: 'spider-mites',
    name: 'Two-Spotted Spider Mites',
    type: 'Pest',
    symptoms: [
      'Fine silky webbing on undersides of leaves and leaf joints',
      'Tiny yellow or bronze stippling dots across leaf surfaces',
      'Leaves turning pale, dry, and papery before falling off'
    ],
    causes: 'Dry ambient indoor air and warm temperatures that allow mite populations to explode rapidly.',
    treatment: [
      'Shower plant under tepid water to knock pests off leaves mechanically.',
      'Spray leaves (especially undersides) thoroughly with insecticidal soap or pure Cold-Pressed Neem Oil solution every 5 days for 3 weeks.'
    ],
    prevention: [
      'Maintain indoor air humidity above 50% around houseplants.',
      'Wipe down leaf undersides with a damp cloth bi-weekly.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=800&q=80',
    severity: 'High'
  },
  {
    id: 'aphids',
    name: 'Aphids (Plant Lice)',
    type: 'Pest',
    symptoms: [
      'Clusters of small green, black, or pear-shaped soft insects on tender new shoots',
      'Sticky residue ("honeydew") coating leaves below',
      'Curled or puckered growth at stem tips'
    ],
    causes: 'Excess nitrogen fertilization creating soft flush growth that attracts winged aphids.',
    treatment: [
      'Blast colonies off with a strong stream of water from hose or sink sprayer.',
      'Apply organic insecticidal soap or release beneficial predators like ladybugs or lacewing larvae in garden beds.'
    ],
    prevention: [
      'Avoid over-fertilizing with high-nitrogen synthetic plant foods.',
      'Plant companion flowers like marigolds and dill that attract ladybugs.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80',
    severity: 'Moderate'
  },
  {
    id: 'leaf-spot',
    name: 'Bacterial / Fungal Leaf Spot',
    type: 'Bacterial',
    symptoms: [
      'Brown or black circular spots on leaves often bordered by a yellow halo',
      'Water-soaked lesions that dry up and leave shot-holes in leaves'
    ],
    causes: 'Bacteria or fungal spores spread through overhead watering splashing onto foliage.',
    treatment: [
      'Pick off and destroy infected foliage.',
      'Apply organic copper-based bactericide/fungicide spray early in the day.'
    ],
    prevention: [
      'Avoid top watering or misting leaves in humid unventilated environments.',
      'Sterilize pruning tools with rubbing alcohol between cuts.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
    severity: 'Moderate'
  }
];
