'use client';

import { useCVStore } from '@/lib/store';
import { importCVFromJSON, exportCVAsJSON } from '@/lib/cvImportExport';
import { useState, useRef } from 'react';

export default function CVImportExport() {
  const { cvData } = useCVStore();
  const [importing, setImporting] = useState(false);
  const [showMessage, setShowMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setShowMessage(null);

    try {
      const importedCV = await importCVFromJSON(file);
      const store = useCVStore.getState();
      
      // Load all the CV data into the store
      store.setPersonalInfo(importedCV.personalInfo);
      store.setDesignTemplate(importedCV.designTemplate);
      store.setColorScheme(importedCV.colorScheme);
      
      // Clear existing data
      store.cvData.experiences.forEach(exp => store.removeExperience(exp.id));
      store.cvData.education.forEach(edu => store.removeEducation(edu.id));
      store.cvData.skills.forEach(skill => store.removeSkill(skill.id));
      store.cvData.projects.forEach(proj => store.removeProject(proj.id));
      
      // Add imported data
      importedCV.experiences.forEach(exp => store.addExperience(exp));
      importedCV.education.forEach(edu => store.addEducation(edu));
      importedCV.skills.forEach(skill => store.addSkill(skill));
      importedCV.projects.forEach(proj => store.addProject(proj));
      
      setShowMessage({ type: 'success', message: '✅ CV imported successfully!' });
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setTimeout(() => setShowMessage(null), 3000);
    } catch (err) {
      setShowMessage({ 
        type: 'error', 
        message: `❌ ${err instanceof Error ? err.message : 'Failed to import CV'}` 
      });
    } finally {
      setImporting(false);
    }
  };

  const handleExportJSON = () => {
    exportCVAsJSON(cvData, `cv-${cvData.personalInfo.fullName || 'export'}.json`);
    setShowMessage({ type: 'success', message: '✅ CV exported as JSON!' });
    setTimeout(() => setShowMessage(null), 3000);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileSelect}
          disabled={importing}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={importing}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-600 font-medium text-sm transition flex items-center gap-2"
        >
          📤 {importing ? 'Importing...' : 'Import'}
        </button>
        <button
          onClick={handleExportJSON}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm transition flex items-center gap-2"
        >
          📥 Export
        </button>
      </div>
      {showMessage && (
        <div className={`text-sm px-3 py-1 rounded ${
          showMessage.type === 'success' 
            ? 'bg-green-600/30 text-green-300' 
            : 'bg-red-600/30 text-red-300'
        }`}>
          {showMessage.message}
        </div>
      )}
    </div>
  );
}
