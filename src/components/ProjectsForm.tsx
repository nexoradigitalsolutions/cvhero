'use client';

import { useCVStore } from '@/lib/store';
import { Project } from '@/types/cv';
import { useState } from 'react';

export default function ProjectsForm() {
  const { cvData, addProject, updateProject, removeProject } = useCVStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    description: '',
    technologies: [],
    link: '',
    type: 'project',
  });
  const [techInput, setTechInput] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      setFormData({
        ...formData,
        technologies: [...(formData.technologies || []), techInput.trim()],
      });
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: (formData.technologies || []).filter((t) => t !== tech),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateProject(editingId, formData);
      setEditingId(null);
    } else {
      const newProject: Project = {
        id: Date.now().toString(),
        title: formData.title || '',
        description: formData.description || '',
        technologies: formData.technologies || [],
        link: formData.link,
        type: (formData.type as 'project' | 'certificate') || 'project',
      };
      addProject(newProject);
    }
    setIsAdding(false);
    setFormData({
      title: '',
      description: '',
      technologies: [],
      link: '',
      type: 'project',
    });
    setTechInput('');
  };

  const handleEdit = (project: Project) => {
    setFormData(project);
    setEditingId(project.id);
    setIsAdding(true);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-bold text-white">Projects/Certificates</h2>

      {cvData.projects.map((project) => (
        <div key={project.id} className="bg-slate-700/30 border border-slate-600 p-4 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-base sm:text-lg text-white">{project.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  project.type === 'certificate'
                    ? 'bg-purple-600/30 text-purple-300 border border-purple-600'
                    : 'bg-blue-600/30 text-blue-300 border border-blue-600'
                }`}>
                  {project.type === 'certificate' ? '🏆 Certificate' : '📁 Project'}
                </span>
              </div>
              <p className="text-sm text-slate-200 mt-1">{project.description}</p>
              {project.technologies && project.technologies.length > 0 && (
                <p className="text-xs sm:text-sm text-slate-400 mt-2">
                  Tech: {project.technologies.join(', ')}
                </p>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline text-xs sm:text-sm mt-2 inline-block"
                >
                  {project.link}
                </a>
              )}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => handleEdit(project)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => removeProject(project.id)}
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
            <label className="block text-sm font-semibold text-slate-200 mb-1">Type *</label>
            <select
              name="type"
              value={formData.type || 'project'}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2 border border-slate-600 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="project">📁 Project</option>
              <option value="certificate">🏆 Certificate</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-1">{formData.type === 'certificate' ? 'Certificate' : 'Project'} Title *</label>
            <input
              type="text"
              name="title"
              placeholder={formData.type === 'certificate' ? 'e.g., AWS Certified Solutions Architect, Google Cloud Professional' : 'e.g., E-Commerce Platform, Portfolio Website, Mobile App'}
              value={formData.title || ''}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2 border border-slate-600 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-1">{formData.type === 'certificate' ? 'Certificate' : 'Project'} Description *</label>
            <textarea
              name="description"
              placeholder={formData.type === 'certificate' ? "Describe the certificate and issuing organization. Example: 'AWS Certified Solutions Architect Professional. Demonstrates expertise in designing distributed systems on AWS.'" : "Describe what the project does and your role. Example: 'Built a full-stack e-commerce platform using React and Node.js. Implemented payment gateway integration, shopping cart functionality, and user authentication. The site receives 10k+ monthly visits.'"}
              value={formData.description || ''}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 sm:px-4 py-2 border border-slate-600 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 text-sm"
              required
            />
            <p className="text-xs text-slate-400 mt-1">{formData.type === 'certificate' ? 'Focus on the issuing organization and what you learned' : 'Focus on impact, features you built, and measurable results'}</p>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-200">
              {formData.type === 'certificate' ? 'Skills/Topics Covered' : 'Technologies Used'}
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder={formData.type === 'certificate' ? 'e.g., Cloud Architecture, AWS EC2, Security' : 'e.g., React, Node.js, MongoDB, AWS'}
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTechnology();
                  }
                }}
                className="flex-1 px-3 sm:px-4 py-2 border border-slate-600 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 text-sm"
              />
              <button
                type="button"
                onClick={addTechnology}
                className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition text-sm whitespace-nowrap"
              >
                Add
              </button>
            </div>
            <p className="text-xs text-slate-400">{formData.type === 'certificate' ? 'List the skills and topics covered in the certificate' : 'List all programming languages, frameworks, tools, and platforms used'}</p>
            {(formData.technologies || []).length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.technologies!.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm flex items-center gap-2"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="text-white hover:text-blue-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-1">Project Link (Optional)</label>
            <input
              type="url"
              name="link"
              placeholder="https://github.com/username/project or https://liveproject.com"
              value={formData.link || ''}
              onChange={handleInputChange}
              className="w-full px-3 sm:px-4 py-2 border border-slate-600 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 text-sm"
            />
            <p className="text-xs text-slate-400 mt-1">Link to GitHub repo, live demo, or portfolio page</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="submit"
              className="px-4 sm:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition text-sm sm:text-base"
            >
              {editingId ? 'Update' : 'Add'} Project
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingId(null);
                setFormData({
                  title: '',
                  description: '',
                  technologies: [],
                  link: '',
                });
                setTechInput('');
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
          + Add Project
        </button>
      )}
    </div>
  );
}
