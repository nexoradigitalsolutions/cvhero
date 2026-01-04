'use client';

import { useState } from 'react';
import PersonalInfoForm from '@/components/PersonalInfoForm';
import ExperienceForm from '@/components/ExperienceForm';
import EducationForm from '@/components/EducationForm';
import SkillsForm from '@/components/SkillsForm';
import ProjectsForm from '@/components/ProjectsForm';
import CVPreview from '@/components/CVPreview';
import CVImportExport from '@/components/CVImportExport';
import { ClientOnly } from '@/components/ClientOnly';

export default function BuilderPage() {
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'skills', label: 'Skills', icon: '⭐' },
    { id: 'projects', label: 'Projects', icon: '📁' },
  ];

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'personal':
        return <PersonalInfoForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'education':
        return <EducationForm />;
      case 'skills':
        return <SkillsForm />;
      case 'projects':
        return <ProjectsForm />;
      default:
        return null;
    }
  };

  return (
    <ClientOnly>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            🚀 CV Hero
          </h1>
          <p className="text-gray-600 mt-1">
            Free CV Creator Online | No Signup Required
          </p>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              activeTab === 'form'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            📝 Edit CV
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              activeTab === 'preview'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            👁️ Preview & Export
          </button>
        </div>

        {/* Content */}
        {activeTab === 'form' ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <nav className="bg-white rounded-lg shadow-sm p-4 space-y-2 sticky top-6">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 transition font-medium"
                  >
                    {section.icon} {section.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Main Form Area */}
            <div className="lg:col-span-3 space-y-8">
              {/* Import/Export at the top */}
              <div className="bg-white rounded-lg shadow-sm p-8 scroll-mt-20">
                <CVImportExport />
              </div>

              {/* Form sections */}
              {sections.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="bg-white rounded-lg shadow-sm p-8 scroll-mt-20"
                >
                  {renderSection(section.id)}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <CVPreview />
          </div>
        )}
      </div>
    </div>
    </ClientOnly>
  );
}
