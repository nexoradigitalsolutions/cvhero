'use client';

import { useCVStore } from '@/lib/store';
import { Education } from '@/types/cv';
import { useState } from 'react';

export default function EducationForm() {
  const { cvData, addEducation, updateEducation, removeEducation } = useCVStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Education>>({
    institution: '',
    degree: '',
    field: '',
    graduationDate: '',
    description: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateEducation(editingId, formData);
      setEditingId(null);
    } else {
      const newEdu: Education = {
        id: Date.now().toString(),
        institution: formData.institution || '',
        degree: formData.degree || '',
        field: formData.field || '',
        graduationDate: formData.graduationDate || '',
        description: formData.description || '',
      };
      addEducation(newEdu);
    }
    setIsAdding(false);
    setFormData({
      institution: '',
      degree: '',
      field: '',
      graduationDate: '',
      description: '',
    });
  };

  const handleEdit = (edu: Education) => {
    setFormData(edu);
    setEditingId(edu.id);
    setIsAdding(true);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-bold text-white">Education</h2>

      {cvData.education.map((edu) => (
        <div key={edu.id} className="bg-slate-700/30 border border-slate-600 p-4 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div className="flex-1">
              <h3 className="font-bold text-base sm:text-lg text-white">{edu.degree}</h3>
              <p className="text-sm sm:text-base text-slate-300">{edu.institution}</p>
              <p className="text-xs sm:text-sm text-slate-400">{edu.field}</p>
              <p className="text-xs sm:text-sm text-slate-400">Graduated: {edu.graduationDate}</p>
              {edu.description && <p className="mt-2 text-sm text-slate-200">{edu.description}</p>}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => handleEdit(edu)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => removeEducation(edu.id)}
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
            <label className="block text-sm font-semibold text-slate-200 mb-1">School/University/Institution *</label>
            <input
              type="text"
              name="institution"
              placeholder="e.g., University of California, Berkeley"
              value={formData.institution || ''}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2 border border-slate-600 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 text-sm"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-1">Degree *</label>
              <input
                type="text"
                name="degree"
                placeholder="e.g., Bachelor, Master, PhD"
                value={formData.degree || ''}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 border border-slate-600 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 text-sm"
                required
              />
              <p className="text-xs text-slate-400 mt-1">Include degree level and type</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-1">Field of Study *</label>
              <input
                type="text"
                name="field"
                placeholder="e.g., Computer Science, Business Administration"
                value={formData.field || ''}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 border border-slate-600 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 text-sm"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-1">Graduation Date *</label>
            <input
              type="text"
              name="graduationDate"
              placeholder="e.g., May 2023 or 05/2023"
              value={formData.graduationDate || ''}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2 border border-slate-600 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-1">Additional Details (Optional)</label>
            <textarea
              name="description"
              placeholder="GPA, honors, relevant coursework, scholarships, etc. Example: 'GPA: 3.8/4.0 • Cum Laude • Dean's List'"
              value={formData.description || ''}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 sm:px-4 py-2 border border-slate-600 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 text-sm"
            />
            <p className="text-xs text-slate-400 mt-1">Add GPA, honors, scholarships, or relevant coursework</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="submit"
              className="px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition text-sm sm:text-base"
            >
              {editingId ? 'Update' : 'Add'} Education
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                setFormData({
                  institution: '',
                  degree: '',
                  field: '',
                  graduationDate: '',
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
          + Add Education
        </button>
      )}
    </div>
  );
}
