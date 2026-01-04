'use client';

import { useCVStore } from '@/lib/store';
import { Experience } from '@/types/cv';
import { useState } from 'react';

export default function ExperienceForm() {
  const { cvData, addExperience, updateExperience, removeExperience } = useCVStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Experience>>({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    description: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateExperience(editingId, formData);
      setEditingId(null);
    } else {
      const newExp: Experience = {
        id: Date.now().toString(),
        company: formData.company || '',
        position: formData.position || '',
        startDate: formData.startDate || '',
        endDate: formData.endDate || '',
        currentlyWorking: formData.currentlyWorking || false,
        description: formData.description || '',
      };
      addExperience(newExp);
    }
    setIsAdding(false);
    setFormData({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      description: '',
    });
  };

  const handleEdit = (exp: Experience) => {
    setFormData(exp);
    setEditingId(exp.id);
    setIsAdding(true);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-bold text-white">Work Experience</h2>

      {cvData.experiences.map((exp) => (
        <div key={exp.id} className="bg-slate-700/30 border border-slate-600 p-4 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div className="flex-1">
              <h3 className="font-bold text-base sm:text-lg text-white">{exp.position}</h3>
              <p className="text-sm sm:text-base text-slate-300">{exp.company}</p>
              <p className="text-xs sm:text-sm text-slate-400">
                {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
              </p>
              <p className="mt-2 text-sm text-slate-200">{exp.description}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => handleEdit(exp)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => removeExperience(exp.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {isAdding ? (
        <form onSubmit={handleSubmit} className="bg-slate-700/50 backdrop-blur border border-slate-600 p-4 sm:p-6 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-1">Company Name *</label>
            <input
              type="text"
              name="company"
              placeholder="e.g., Acme Corporation, Tech Startup Inc."
              value={formData.company || ''}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2 border border-slate-600 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 text-sm"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-1">Job Title/Position *</label>
              <input
                type="text"
                name="position"
                placeholder="e.g., Senior Software Engineer"
                value={formData.position || ''}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 border border-slate-600 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-1">Start Date *</label>
              <input
                type="text"
                name="startDate"
                placeholder="e.g., Jan 2020 or 01/2020"
                value={formData.startDate || ''}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 border border-slate-600 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 text-sm"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-1">End Date {formData.currentlyWorking && '(Leave blank for current position)'}</label>
            <input
              type="text"
              name="endDate"
              placeholder="e.g., Dec 2023 or 12/2023"
              value={formData.endDate || ''}
              onChange={handleInputChange}
              disabled={formData.currentlyWorking}
              className="w-full px-3 sm:px-4 py-2 border border-slate-600 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 text-sm disabled:bg-slate-800"
            />
          </div>
          <label className="flex items-center gap-2 p-2 bg-blue-600/20 rounded-lg border border-blue-600/50">
            <input
              type="checkbox"
              name="currentlyWorking"
              checked={formData.currentlyWorking || false}
              onChange={handleInputChange}
              className="w-4 h-4 cursor-pointer"
            />
            <span className="text-slate-200 cursor-pointer">I currently work here</span>
          </label>
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-1">Job Description & Achievements</label>
            <textarea
              name="description"
              placeholder="Describe your responsibilities and key achievements. Example: 'Led a team of 3 developers to build a React-based dashboard that reduced reporting time by 40%. Implemented CI/CD pipeline using Docker and GitHub Actions.'"
              value={formData.description || ''}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 sm:px-4 py-2 border border-slate-600 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 text-sm"
            />
            <p className="text-xs text-slate-400 mt-1">Use bullet points or paragraphs. Focus on impact and results.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="submit"
              className="px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition text-sm sm:text-base"
            >
              {editingId ? 'Update' : 'Add'} Experience
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                setFormData({
                  company: '',
                  position: '',
                  startDate: '',
                  endDate: '',
                  currentlyWorking: false,
                  description: '',
                });
              }}
              className="px-4 sm:px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition text-sm sm:text-base"
        >
          + Add Experience
        </button>
      )}
    </div>
  );
}
