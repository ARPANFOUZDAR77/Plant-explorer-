export type LightLevel = 'Low Light' | 'Indirect Bright' | 'Direct Sunlight' | 'Partial Shade';
export type WaterFrequency = 'Every 2-3 Days' | 'Weekly' | 'Bi-weekly' | 'Monthly' | 'When Soil Dry';
export type CareDifficulty = 'Easy / Beginner' | 'Intermediate' | 'Advanced';

export interface Plant {
  id: string;
  commonName: string;
  scientificName: string;
  category: 'Houseplants' | 'Vegetables & Herbs' | 'Succulents & Cacti' | 'Outdoor & Flowers' | 'Trees & Shrubs';
  light: LightLevel;
  waterFrequency: WaterFrequency;
  waterDaysInterval: number; // e.g. 7 for weekly
  difficulty: CareDifficulty;
  petFriendly: boolean;
  humidity: 'Low' | 'Moderate' | 'High';
  idealTemp: string;
  soilType: string;
  fertilizerNeeds: string;
  pruningTip: string;
  propagationTip: string;
  companionPlantIds: string[];
  incompatiblePlantIds: string[];
  description: string;
  images: string[];
  nativeRegion: string;
  matureSize: string;
}

export interface Disease {
  id: string;
  name: string;
  type: 'Fungal' | 'Pest' | 'Bacterial' | 'Environmental';
  symptoms: string[];
  causes: string;
  treatment: string[];
  prevention: string[];
  imageUrl: string;
  severity: 'Low' | 'Moderate' | 'High' | 'Severe';
}

export interface UserPlantCareLog {
  id: string;
  date: string;
  action: 'Watered' | 'Fertilized' | 'Pruned' | 'Repotted' | 'Inspected';
  notes?: string;
}

export interface UserPlant {
  id: string;
  plantId: string;
  customName: string;
  dateAdded: string;
  lastWatered?: string;
  nextWateringDate: string;
  lastFertilized?: string;
  location: string;
  notes?: string;
  careLogs: UserPlantCareLog[];
  healthStatus: 'Thriving' | 'Needs Attention' | 'Recovering';
  photoUrl?: string;
}

export interface GridCell {
  id: number;
  plantId: string | null;
  sunlightExposure?: 'Full Sun' | 'Partial Shade' | 'Full Shade';
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}
