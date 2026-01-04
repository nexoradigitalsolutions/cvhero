'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const PersonalInfoForm = dynamic(() => import('@/components/PersonalInfoForm'), { ssr: false });
const ExperienceForm = dynamic(() => import('@/components/ExperienceForm'), { ssr: false });
const EducationForm = dynamic(() => import('@/components/EducationForm'), { ssr: false });
const SkillsForm = dynamic(() => import('@/components/SkillsForm'), { ssr: false });
const ProjectsForm = dynamic(() => import('@/components/ProjectsForm'), { ssr: false });
const CVPreview = dynamic(() => import('@/components/CVPreview'), { ssr: false });
const CVImportExport = dynamic(() => import('@/components/CVImportExport'), { ssr: false });
const SampleDataButton = dynamic(() => import('@/components/SampleDataButton'), { ssr: false });
const PWARegister = dynamic(() => import('@/components/PWARegister'), { ssr: false });
const ClientOnly = dynamic(() => import('@/components/ClientOnly').then(mod => ({ default: mod.ClientOnly })), { ssr: false });

export default function BuilderPage() {
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: '👤' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'skills', label: 'Skills', icon: '⭐' },
    { id: 'projects', label: 'Projects/Certificates', icon: '📁' },
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
      <PWARegister />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Header */}
        <header className="bg-slate-800/50 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-start gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2 flex-wrap">
                🚀 CV Hero
              </h1>
              <p className="text-slate-400 mt-1 text-sm sm:text-base">
                Build your CV with AI assistance
              </p>
            </div>
            <div className="flex gap-2 flex-wrap justify-end">
              <SampleDataButton />
              <CVImportExport />
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex gap-2 sm:gap-4 mb-6 flex-wrap">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition text-sm sm:text-base ${
                activeTab === 'form'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              📝 Edit CV
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition text-sm sm:text-base ${
                activeTab === 'preview'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              👁️ Preview & Export
            </button>
          </div>

          {/* Content */}
          {activeTab === 'form' ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Sidebar Navigation */}
              <div className="lg:col-span-1">
                <nav className="bg-slate-800/50 backdrop-blur rounded-lg border border-slate-700/50 p-3 sm:p-4 space-y-2 sticky top-24 max-h-96 overflow-y-auto lg:max-h-none">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-slate-300 hover:bg-blue-600/20 hover:text-blue-400 transition font-medium text-sm sm:text-base"
                    >
                      {section.icon} <span>{section.label}</span>
                    </a>
                  ))}
                </nav>
              </div>

              {/* Main Form Area */}
              <div className="lg:col-span-3 space-y-4 sm:space-y-8">
                {/* Form sections */}
                {sections.map((section) => (
                  <div
                    key={section.id}
                    id={section.id}
                    className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-4 sm:p-8 scroll-mt-20"
                  >
                    {renderSection(section.id)}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <CVPreview />
            </div>
          )}
        </div>
      </div>
    </ClientOnly>
  );
}
