import { UserPlantItem, WaterReminder } from '../types';

const FAVORITES_KEY = 'plant_encyclopedia_favorites';
const COLLECTION_KEY = 'plant_encyclopedia_collection';
const REMINDERS_KEY = 'plant_encyclopedia_reminders';
const SEARCH_HISTORY_KEY = 'plant_encyclopedia_search_history';
const VIEWED_PLANTS_KEY = 'plant_encyclopedia_recently_viewed';
const THEME_KEY = 'plant_encyclopedia_theme';
const NOTES_KEY = 'plant_encyclopedia_plant_notes';

// Favorites
export const getFavorites = (): string[] => {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : ['monstera-deliciosa', 'snake-plant', 'moth-orchid'];
  } catch {
    return ['monstera-deliciosa', 'snake-plant'];
  }
};

export const toggleFavoriteStorage = (plantId: string): string[] => {
  const current = getFavorites();
  const exists = current.includes(plantId);
  const updated = exists ? current.filter((id) => id !== plantId) : [...current, plantId];
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  return updated;
};

// Collection Items
export const getCollection = (): UserPlantItem[] => {
  try {
    const raw = localStorage.getItem(COLLECTION_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  // Default seed collection
  return [
    {
      id: 'coll-1',
      plantId: 'monstera-deliciosa',
      customName: 'Monty the Monstera',
      dateAdded: '2026-07-15',
      lastWatered: '2026-08-01',
      nextWateringDate: '2026-08-11',
      location: 'Living Room Window',
      notes: 'Loves weekly leaf misting. New fenestrated leaf opening up!'
    },
    {
      id: 'coll-2',
      plantId: 'snake-plant',
      customName: 'Sammy Snake',
      dateAdded: '2026-06-20',
      lastWatered: '2026-07-25',
      nextWateringDate: '2026-08-15',
      location: 'Bedroom Nightstand',
      notes: 'Thriving in low light.'
    }
  ];
};

export const saveCollectionItem = (item: UserPlantItem): UserPlantItem[] => {
  const current = getCollection();
  const updated = [item, ...current.filter((i) => i.id !== item.id)];
  try {
    localStorage.setItem(COLLECTION_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  return updated;
};

export const removeCollectionItem = (id: string): UserPlantItem[] => {
  const current = getCollection();
  const updated = current.filter((item) => item.id !== id);
  try {
    localStorage.setItem(COLLECTION_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  return updated;
};

// Water Reminders
export const getReminders = (): WaterReminder[] => {
  try {
    const raw = localStorage.getItem(REMINDERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return [
    {
      id: 'rem-1',
      userPlantId: 'coll-1',
      plantName: 'Monty the Monstera',
      dueDate: '2026-08-11',
      frequencyDays: 10,
      completed: false
    },
    {
      id: 'rem-2',
      userPlantId: 'coll-2',
      plantName: 'Sammy Snake',
      dueDate: '2026-08-15',
      frequencyDays: 21,
      completed: false
    }
  ];
};

export const saveReminders = (reminders: WaterReminder[]): void => {
  try {
    localStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders));
  } catch (e) {
    console.error(e);
  }
};

// Search History
export const getSearchHistory = (): string[] => {
  try {
    const raw = localStorage.getItem(SEARCH_HISTORY_KEY);
    return raw ? JSON.parse(raw) : ['Monstera', 'Snake Plant', 'Lavender', 'Orchid'];
  } catch {
    return ['Monstera', 'Lavender'];
  }
};

export const addSearchHistory = (term: string): string[] => {
  if (!term.trim()) return getSearchHistory();
  const current = getSearchHistory();
  const filtered = current.filter((t) => t.toLowerCase() !== term.toLowerCase());
  const updated = [term.trim(), ...filtered].slice(0, 10);
  try {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  return updated;
};

// Recently Viewed
export const getRecentlyViewed = (): string[] => {
  try {
    const raw = localStorage.getItem(VIEWED_PLANTS_KEY);
    return raw ? JSON.parse(raw) : ['monstera-deliciosa', 'snake-plant', 'moth-orchid', 'lavender'];
  } catch {
    return ['monstera-deliciosa'];
  }
};

export const addRecentlyViewed = (plantId: string): string[] => {
  const current = getRecentlyViewed();
  const filtered = current.filter((id) => id !== plantId);
  const updated = [plantId, ...filtered].slice(0, 12);
  try {
    localStorage.setItem(VIEWED_PLANTS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  return updated;
};

// Theme
export const getStoredTheme = (): 'light' | 'dark' => {
  try {
    const raw = localStorage.getItem(THEME_KEY);
    if (raw === 'dark' || raw === 'light') return raw;
  } catch (e) {
    console.error(e);
  }
  return 'light';
};

export const setStoredTheme = (theme: 'light' | 'dark'): void => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    console.error(e);
  }
};
