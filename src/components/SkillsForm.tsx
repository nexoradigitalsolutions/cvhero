'use client';

import { useCVStore } from '@/lib/store';
import { Skill } from '@/types/cv';
import { useState } from 'react';

export default function SkillsForm() {
  const { cvData, addSkill, updateSkill, removeSkill } = useCVStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Skill>>({
    name: '',
    level: 'intermediate',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateSkill(editingId, formData);
      setEditingId(null);
    } else {
      const newSkill: Skill = {
        id: Date.now().toString(),
        name: formData.name || '',
        level: (formData.level as Skill['level']) || 'intermediate',
      };
      addSkill(newSkill);
    }
    setIsAdding(false);
    setFormData({ name: '', level: 'intermediate' });
  };

  const handleEdit = (skill: Skill) => {
    setFormData(skill);
    setEditingId(skill.id);
    setIsAdding(true);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-bold text-white">Skills</h2>

      {cvData.skills.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {cvData.skills.map((skill) => (
            <div
              key={skill.id}
              className="bg-slate-700/30 border border-slate-600 p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-2"
            >
              <div>
                <h3 className="font-semibold text-sm sm:text-base text-white">{skill.name}</h3>
                <p className="text-xs sm:text-sm text-slate-400 capitalize">{skill.level}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleEdit(skill)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isAdding ? (
        <form onSubmit={handleSubmit} className="bg-slate-700/50 backdrop-blur border border-slate-600 p-4 sm:p-6 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-1">Skill Name *</label>
            <input
              type="text"
              name="name"
              placeholder="e.g., React, Python, Figma, Project Management, Leadership"
              value={formData.name || ''}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2 border border-slate-600 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 text-sm"
              required
            />
            <p className="text-xs text-slate-400 mt-1">Include technical skills, software, languages, or soft skills</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-1">Proficiency Level *</label>
            <select
              name="level"
              value={formData.level || 'intermediate'}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2 border border-slate-600 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="beginner">Beginner - Learning phase</option>
              <option value="intermediate">Intermediate - Solid working knowledge</option>
              <option value="advanced">Advanced - Expert level</option>
              <option value="expert">Expert - Can teach/mentor others</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="submit"
              className="px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition text-sm sm:text-base"
            >
              {editingId ? 'Update' : 'Add'} Skill
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                setFormData({ name: '', level: 'intermediate' });
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
          + Add Skill
        </button>
      )}
    </div>
  );
}
