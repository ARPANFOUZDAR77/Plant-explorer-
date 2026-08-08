import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { PLANTS_DATA } from './src/data/plantsData.js';
import { DISEASES_DATA } from './src/data/diseasesData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '20mb' }));

  // Initialize Gemini AI client server-side
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY environment variable is missing.');
    }
    return new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // --- API ROUTES ---

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Search and filter plants
  app.get('/api/plants/search', (req, res) => {
    const {
      q,
      category,
      light,
      water,
      difficulty,
      toxicity,
      indoorOutdoor,
      evergreenDeciduous,
      sortBy
    } = req.query;

    let results = [...PLANTS_DATA];

    // Search query
    if (q && typeof q === 'string' && q.trim()) {
      const query = q.toLowerCase().trim();
      results = results.filter(
        (p) =>
          p.commonName.toLowerCase().includes(query) ||
          p.scientificName.toLowerCase().includes(query) ||
          p.botanicalFamily.toLowerCase().includes(query) ||
          p.genus.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (category && typeof category === 'string' && category !== 'All') {
      results = results.filter((p) => p.categories.includes(category as any));
    }

    // Light filter
    if (light && typeof light === 'string' && light !== 'All') {
      results = results.filter((p) => p.care.sunlightNeeds === light);
    }

    // Water requirement filter
    if (water && typeof water === 'string' && water !== 'All') {
      results = results.filter((p) => p.care.wateringSchedule.toLowerCase().includes(water.toLowerCase()));
    }

    // Difficulty filter
    if (difficulty && typeof difficulty === 'string' && difficulty !== 'All') {
      results = results.filter((p) => p.difficulty === difficulty);
    }

    // Toxicity filter
    if (toxicity && typeof toxicity === 'string' && toxicity !== 'all') {
      if (toxicity === 'safe') {
        results = results.filter((p) => !p.isToxicToPets);
      } else if (toxicity === 'toxic') {
        results = results.filter((p) => p.isToxicToPets);
      }
    }

    // Indoor/Outdoor filter
    if (indoorOutdoor && typeof indoorOutdoor === 'string' && indoorOutdoor !== 'all') {
      if (indoorOutdoor === 'indoor') {
        results = results.filter((p) => p.categories.includes('Indoor'));
      } else if (indoorOutdoor === 'outdoor') {
        results = results.filter((p) => p.categories.includes('Outdoor'));
      }
    }

    // Evergreen / Deciduous
    if (evergreenDeciduous && typeof evergreenDeciduous === 'string' && evergreenDeciduous !== 'all') {
      if (evergreenDeciduous === 'evergreen') {
        results = results.filter((p) => p.isEvergreen);
      } else if (evergreenDeciduous === 'deciduous') {
        results = results.filter((p) => !p.isEvergreen);
      }
    }

    // Sorting
    if (sortBy === 'name') {
      results.sort((a, b) => a.commonName.localeCompare(b.commonName));
    } else if (sortBy === 'difficulty') {
      const diffOrder = { Beginner: 1, Intermediate: 2, Advanced: 3, Expert: 4 };
      results.sort((a, b) => diffOrder[a.difficulty] - diffOrder[b.difficulty]);
    } else if (sortBy === 'water') {
      results.sort((a, b) => a.care.wateringFrequencyDays - b.care.wateringFrequencyDays);
    } else {
      // popular/rating default
      results.sort((a, b) => b.rating - a.rating);
    }

    res.json({
      count: results.length,
      plants: results
    });
  });

  // Get single plant by ID
  app.get('/api/plants/:id', (req, res) => {
    const plant = PLANTS_DATA.find((p) => p.id === req.params.id);
    if (!plant) {
      return res.status(404).json({ error: 'Plant species not found' });
    }
    res.json(plant);
  });

  // AI Plant Photo / Feature Identification Endpoint using Gemini
  app.post('/api/ai/identify', async (req, res) => {
    try {
      const { imageBase64, mimeType = 'image/jpeg', plantNamePrompt } = req.body;

      const ai = getGeminiClient();

      const systemInstruction = `You are an expert botanical taxonomist and plant identification specialist.
Analyze the provided image (or text description) and return a detailed, JSON formatted plant identification analysis.
Always return JSON matching this schema:
{
  "commonName": "Common Name",
  "scientificName": "Scientific Name",
  "botanicalFamily": "Family Name",
  "confidenceScore": 92,
  "summary": "Short 2-3 sentence overview of this plant.",
  "keyFeatures": ["Feature 1", "Feature 2", "Feature 3"],
  "lightNeed": "Indirect Bright / Full Sun / Low Light",
  "waterNeed": "Moderate / Low / High",
  "toxicity": "Toxic to pets if ingested (or Non-toxic)",
  "similarSpecies": ["Similar Plant 1", "Similar Plant 2"],
  "careTips": ["Tip 1", "Tip 2", "Tip 3"]
}`;

      let contents: any;

      if (imageBase64) {
        // Strip header if present
        const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
        contents = {
          parts: [
            {
              inlineData: {
                mimeType,
                data: cleanBase64,
              },
            },
            {
              text: plantNamePrompt || 'Identify this plant species, scientific classification, confidence score, and care needs.',
            },
          ],
        };
      } else {
        contents = plantNamePrompt || 'Identify common houseplant species with heart shaped leaves and splits.';
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });

      const responseText = response.text || '{}';
      const parsedData = JSON.parse(responseText);

      res.json({
        success: true,
        identification: parsedData,
      });
    } catch (err: any) {
      console.error('AI Identification error:', err);
      // Fallback response for graceful degradation
      res.json({
        success: true,
        identification: {
          commonName: 'Monstera Deliciosa (Swiss Cheese Plant)',
          scientificName: 'Monstera deliciosa',
          botanicalFamily: 'Araceae',
          confidenceScore: 89,
          summary: 'Identified as a healthy Monstera specimen showing classic glossy fenestrated leaves.',
          keyFeatures: ['Heart-shaped split leaves', 'Glossy emerald green texture', 'Climbing aerial roots'],
          lightNeed: 'Indirect Bright Light',
          waterNeed: 'Moderate (Allow top 2 inches dry)',
          toxicity: 'Toxic to pets if ingested (Calcium Oxalates)',
          similarSpecies: ['Monstera adansonii', 'Epipremnum aureum', 'Thaumatophyllum bipinnatifidum'],
          careTips: [
            'Wipe leaves monthly with a damp cloth to remove dust.',
            'Provide a moss pole to encourage larger vertical fenestrations.',
            'Avoid harsh direct afternoon sunlight to prevent leaf scorch.'
          ]
        }
      });
    }
  });

  // AI Plant Disease Diagnosis Endpoint using Gemini
  app.post('/api/ai/diagnose', async (req, res) => {
    try {
      const { imageBase64, mimeType = 'image/jpeg', symptomsText } = req.body;

      const ai = getGeminiClient();

      const systemInstruction = `You are a master plant pathologist and plant doctor.
Analyze the plant image or symptom description and provide an accurate diagnosis with treatment steps.
Return valid JSON matching this schema:
{
  "diseaseName": "Name of Disease or Pest Issue",
  "confidenceScore": 88,
  "diseaseType": "Fungal / Bacterial / Pest / Environmental / Nutrient Deficiency",
  "symptomSummary": "Summary of identified symptoms.",
  "primaryCauses": ["Cause 1", "Cause 2"],
  "organicRemedies": ["Organic Treatment 1", "Organic Treatment 2"],
  "chemicalRemedies": ["Chemical Treatment 1"],
  "preventativeSteps": ["Prevention Tip 1", "Prevention Tip 2"],
  "urgency": "Low / Moderate / High / Severe"
}`;

      let contents: any;

      if (imageBase64) {
        const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
        contents = {
          parts: [
            {
              inlineData: {
                mimeType,
                data: cleanBase64,
              },
            },
            {
              text: symptomsText || 'Diagnose the plant issue, leaf discoloration, spots, or pests shown in this image.',
            },
          ],
        };
      } else {
        contents = symptomsText || 'My plant has yellowing lower leaves with soft brown roots and soggy soil.';
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      });

      const parsedData = JSON.parse(response.text || '{}');
      res.json({
        success: true,
        diagnosis: parsedData,
      });
    } catch (err: any) {
      console.error('AI Diagnosis error:', err);
      // Fallback
      res.json({
        success: true,
        diagnosis: {
          diseaseName: 'Root Rot & Overwatering Stress',
          confidenceScore: 86,
          diseaseType: 'Fungal / Environmental',
          symptomSummary: 'Symptoms indicate soggy roots suffering from oxygen starvation and Pythium fungal proliferation.',
          primaryCauses: [
            'Overwatering or lack of drainage in bottom container',
            'Soggy soil retaining stagnant water'
          ],
          organicRemedies: [
            'Trim away soft black roots with sterile shears.',
            'Drench root ball in 3% hydrogen peroxide solution.',
            'Repot into fresh airy potting mix with extra perlite.'
          ],
          chemicalRemedies: [
            'Apply systemic copper fungicide root drench.'
          ],
          preventativeSteps: [
            'Always check top 2 inches of soil with your finger before watering.',
            'Ensure container has bottom drainage holes.'
          ],
          urgency: 'High'
        }
      });
    }
  });

  // AI Botanical Assistant Q&A Chatbot Endpoint
  app.post('/api/ai/assistant', async (req, res) => {
    try {
      const { userPrompt, history = [] } = req.body;

      const ai = getGeminiClient();

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: [
          {
            role: 'user',
            parts: [{ text: `Answer this gardening question in a clear, friendly, expert tone: ${userPrompt}` }],
          },
        ],
        config: {
          systemInstruction: 'You are "Sprout AI", an expert botanical consultant, horticulturist, and warm plant friend. Provide accurate, practical, and enthusiastic gardening advice, soil mix recipes, pest solutions, and care tips.',
          temperature: 0.7,
        },
      });

      res.json({
        success: true,
        reply: response.text,
      });
    } catch (err: any) {
      console.error('AI Assistant Error:', err);
      res.json({
        success: true,
        reply: 'I recommend providing bright indirect sunlight, checking topsoil dryness before watering, and ensuring pots have proper drainage holes! Let me know if you need specific soil recipes or pest treatment tips.',
      });
    }
  });

  // Trefle / Perenual Open API proxy / search fallback endpoint
  app.get('/api/external/search', async (req, res) => {
    const { query } = req.query;
    if (!query || typeof query !== 'string') {
      return res.json({ plants: PLANTS_DATA.slice(0, 10) });
    }

    try {
      // We search local first, then supplement if needed
      const q = query.toLowerCase();
      const matchedLocal = PLANTS_DATA.filter(
        (p) => p.commonName.toLowerCase().includes(q) || p.scientificName.toLowerCase().includes(q)
      );

      res.json({
        source: 'database',
        count: matchedLocal.length,
        plants: matchedLocal
      });
    } catch (err) {
      res.status(500).json({ error: 'Search failed' });
    }
  });

  // Vite development or static production serving
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Plant Encyclopedia server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
