import React, { useState, useRef } from 'react';
import { Stethoscope, Upload, Sparkles, AlertTriangle, ShieldCheck, RefreshCw, Search, Bug, Droplets } from 'lucide-react';
import { DISEASES_DATA } from '../data/diseasesData';
import { AIDiagnosisResult, Disease } from '../types';

interface DiseaseDiagnosisProps {
  onToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const DiseaseDiagnosis: React.FC<DiseaseDiagnosisProps> = ({ onToast }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [symptomsInput, setSymptomsInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiDiagnosis, setAiDiagnosis] = useState<AIDiagnosisResult | null>(null);
  const [diseaseSearchQuery, setDiseaseSearchQuery] = useState('');
  const [selectedDirectoryDisease, setSelectedDirectoryDisease] = useState<Disease | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDiagnose = async () => {
    if (!selectedImage && !symptomsInput.trim()) {
      onToast('Please upload a leaf symptom photo or describe symptoms.', 'info');
      return;
    }

    setIsLoading(true);
    setAiDiagnosis(null);

    try {
      const response = await fetch('/api/ai/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: selectedImage,
          symptomsText: symptomsInput,
        }),
      });

      const data = await response.json();
      if (data.success && data.diagnosis) {
        setAiDiagnosis(data.diagnosis);
        onToast('Diagnosis generated!', 'success');
      } else {
        onToast('Could not generate diagnosis.', 'error');
      }
    } catch (err) {
      console.error(err);
      onToast('Error contacting Plant Doctor API.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredDirectory = DISEASES_DATA.filter(
    (d) =>
      d.name.toLowerCase().includes(diseaseSearchQuery.toLowerCase()) ||
      d.symptoms.some((s) => s.toLowerCase().includes(diseaseSearchQuery.toLowerCase())) ||
      d.type.toLowerCase().includes(diseaseSearchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-500/20">
          <Stethoscope className="w-4 h-4 text-rose-500" />
          <span>Botanical Doctor & Disease Clinic</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100">
          Plant Disease & Pest Diagnosis
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto">
          Diagnose leaf spots, yellowing, root rot, fungal infections, and pest infestations using AI analysis and our comprehensive disease library.
        </p>
      </div>

      {/* AI Doctor Scanner Section */}
      <div className="p-8 rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-rose-500/20 shadow-2xl space-y-6">
        <div className="flex items-center gap-2 font-bold text-lg text-zinc-900 dark:text-zinc-100">
          <Sparkles className="w-5 h-5 text-rose-500" />
          <span>AI Plant Symptom Scanner</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          
          {/* Upload Area */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-3xl p-6 text-center cursor-pointer transition-all ${
              selectedImage
                ? 'border-rose-500 bg-rose-50/20 dark:bg-rose-950/20'
                : 'border-zinc-300 dark:border-zinc-800 hover:border-rose-500 bg-zinc-50/50 dark:bg-zinc-800/30'
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
              <img
                src={selectedImage}
                alt="Symptom"
                className="max-h-48 mx-auto rounded-2xl object-cover shadow-md"
              />
            ) : (
              <div className="space-y-2 py-4">
                <Upload className="w-8 h-8 text-rose-500 mx-auto" />
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  Upload Affected Leaf or Pest Photo
                </p>
                <p className="text-xs text-zinc-400">JPG, PNG, WEBP</p>
              </div>
            )}
          </div>

          {/* Description & Button */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                Describe Symptoms
              </label>
              <textarea
                rows={4}
                value={symptomsInput}
                onChange={(e) => setSymptomsInput(e.target.value)}
                placeholder="e.g. Yellowing bottom leaves with brown crispy edges, tiny white cottony spots in leaf joints, soft black stems near soil..."
                className="w-full p-3 rounded-2xl text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700"
              />
            </div>

            <button
              onClick={handleDiagnose}
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs shadow-xl shadow-rose-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Diagnosing Pathogens with Gemini...</span>
                </>
              ) : (
                <>
                  <Stethoscope className="w-4 h-4" />
                  <span>Run Doctor AI Diagnosis</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Diagnosis Output Card */}
        {aiDiagnosis && (
          <div className="mt-6 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-rose-500/30 space-y-4 animate-in slide-in-from-bottom-2">
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
                  {aiDiagnosis.diseaseType}
                </span>
                <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100">
                  {aiDiagnosis.diseaseName}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-400 font-bold block uppercase">Urgency</span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500 text-white">
                  {aiDiagnosis.urgency}
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
              {aiDiagnosis.symptomSummary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Organic Remedies
                </h4>
                <ul className="list-disc list-inside space-y-1 text-zinc-700 dark:text-zinc-300">
                  {aiDiagnosis.organicRemedies.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Preventative Steps
                </h4>
                <ul className="list-disc list-inside space-y-1 text-zinc-700 dark:text-zinc-300">
                  {aiDiagnosis.preventativeSteps.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Directory Search Library */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Bug className="w-5 h-5 text-amber-500" />
            Common Diseases & Pests Directory
          </h3>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={diseaseSearchQuery}
              onChange={(e) => setDiseaseSearchQuery(e.target.value)}
              placeholder="Search diseases or symptoms..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDirectory.map((disease) => (
            <div
              key={disease.id}
              onClick={() => setSelectedDirectoryDisease(disease)}
              className="group p-5 rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800 hover:border-rose-500/40 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400">
                  {disease.type}
                </span>
                <h4 className="font-extrabold text-base text-zinc-900 dark:text-zinc-100 group-hover:text-rose-600 transition-colors">
                  {disease.name}
                </h4>
                <ul className="text-xs text-zinc-600 dark:text-zinc-300 space-y-1 list-disc list-inside line-clamp-3">
                  {disease.symptoms.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs font-semibold text-rose-500 flex items-center justify-between">
                <span>View Treatment Plan</span>
                <span className="text-lg">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Directory Disease Detail Modal */}
      {selectedDirectoryDisease && (
        <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative max-w-2xl w-full bg-white dark:bg-zinc-900 rounded-3xl border border-rose-500/30 p-6 space-y-6 text-zinc-900 dark:text-zinc-100">
            <button
              onClick={() => setSelectedDirectoryDisease(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
                {selectedDirectoryDisease.type}
              </span>
              <h3 className="text-2xl font-extrabold">{selectedDirectoryDisease.name}</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60">
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">Common Symptoms</h4>
                <ul className="list-disc list-inside space-y-1 text-zinc-600 dark:text-zinc-300">
                  {selectedDirectoryDisease.symptoms.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100">
                <h4 className="font-bold mb-1">Organic Treatments</h4>
                <ul className="list-disc list-inside space-y-1">
                  {selectedDirectoryDisease.organicTreatments.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60">
                <h4 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">Chemical Treatments</h4>
                <ul className="list-disc list-inside space-y-1 text-zinc-600 dark:text-zinc-300">
                  {selectedDirectoryDisease.chemicalTreatments.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
