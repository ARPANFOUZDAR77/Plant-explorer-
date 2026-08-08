import React, { useState, useRef } from 'react';
import { Camera, Upload, Sparkles, CheckCircle, AlertCircle, RefreshCw, Info, ArrowRight } from 'lucide-react';
import { AIIdentifyResult } from '../types';

interface PlantIdentificationProps {
  onToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const PlantIdentification: React.FC<PlantIdentificationProps> = ({ onToast }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [promptInput, setPromptInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AIIdentifyResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      onToast('Image size exceeds 10MB limit.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleIdentify = async () => {
    if (!selectedImage && !promptInput.trim()) {
      onToast('Please upload a plant photo or describe physical leaf features.', 'info');
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/ai/identify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: selectedImage,
          plantNamePrompt: promptInput,
        }),
      });

      const data = await response.json();
      if (data.success && data.identification) {
        setResult(data.identification);
        onToast('Plant identified successfully!', 'success');
      } else {
        onToast('Could not identify plant. Please try a clearer photo.', 'error');
      }
    } catch (err) {
      console.error(err);
      onToast('Error identifying plant.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
          <Camera className="w-4 h-4 text-emerald-500" />
          <span>Gemini AI Visual Vision</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">
          AI Instant Plant Identification
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto">
          Upload any photo of leaves, flowers, or bark to identify species taxonomy, confidence ratings, and care guides instantly.
        </p>
      </div>

      {/* Main Upload Box */}
      <div className="p-8 rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-emerald-500/20 shadow-2xl space-y-6">
        
        {/* Dropzone */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all ${
            selectedImage
              ? 'border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/20'
              : 'border-zinc-300 dark:border-zinc-800 hover:border-emerald-500 bg-zinc-50/50 dark:bg-zinc-800/30'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {selectedImage ? (
            <div className="space-y-4">
              <img
                src={selectedImage}
                alt="Selected Plant"
                className="max-h-64 mx-auto rounded-2xl object-cover shadow-lg"
              />
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                Photo Uploaded. Click "Analyze & Identify" below or tap image to change.
              </p>
            </div>
          ) : (
            <div className="space-y-3 py-6">
              <div className="p-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 w-16 h-16 mx-auto flex items-center justify-center shadow-md">
                <Upload className="w-8 h-8" />
              </div>
              <p className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Click to upload or drag & drop plant photo
              </p>
              <p className="text-xs text-zinc-400">
                Supports JPG, PNG, WEBP (Max 10MB)
              </p>
            </div>
          )}
        </div>

        {/* Text Prompt Input */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
            Optional Notes or Physical Description
          </label>
          <input
            type="text"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            placeholder="e.g. Heart-shaped split leaves, variegated white spots, found in tropical conservatory"
            className="w-full px-4 py-3 rounded-2xl text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700"
          />
        </div>

        {/* Identify Button */}
        <button
          onClick={handleIdentify}
          disabled={isLoading}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Analyzing Botanical Vision with Gemini...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Analyze & Identify Plant</span>
            </>
          )}
        </button>

      </div>

      {/* AI Identification Result Display */}
      {result && (
        <div className="p-8 rounded-3xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-emerald-500/30 shadow-2xl space-y-6 animate-in slide-in-from-bottom-4">
          
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {result.botanicalFamily}
              </span>
              <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">
                {result.commonName}
              </h3>
              <p className="text-sm italic text-zinc-500 dark:text-zinc-400">
                {result.scientificName}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-center">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Confidence</span>
              <span className="text-2xl font-black">{result.confidenceScore}%</span>
            </div>
          </div>

          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
            {result.summary}
          </p>

          {/* Key Identification Features */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Key Diagnostic Features Identified
            </h4>
            <div className="flex flex-wrap gap-2">
              {result.keyFeatures.map((feat, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold flex items-center gap-1.5"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Care Needs Snapshot */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800">
              <span className="text-zinc-400 font-bold block text-[10px] uppercase">Light Need</span>
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">{result.lightNeed}</span>
            </div>
            <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800">
              <span className="text-zinc-400 font-bold block text-[10px] uppercase">Watering</span>
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">{result.waterNeed}</span>
            </div>
            <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-800">
              <span className="text-zinc-400 font-bold block text-[10px] uppercase">Safety</span>
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">{result.toxicity}</span>
            </div>
          </div>

          {/* Care Tips */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              AI Essential Care Tips
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
              {result.careTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      )}

    </div>
  );
};
