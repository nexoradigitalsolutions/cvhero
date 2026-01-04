'use client';

import { useCVStore } from '@/lib/store';
import { exportCVToPDF } from '@/lib/pdfExport';
import { exportCVAsJSON } from '@/lib/cvImportExport';
import { useState } from 'react';

export default function CVPreview() {
  const { cvData, setDesignTemplate, setColorScheme } = useCVStore();
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      console.log('handleExportPDF called');
      await exportCVToPDF(
        cvData,
        `${cvData.personalInfo.fullName || 'CV'}.pdf`
      );
      console.log('PDF export successful');
      alert('✅ CV exported successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      const errorMsg = error instanceof Error ? error.message : String(error);
      alert(`❌ Failed to export PDF.\n\nError: ${errorMsg}\n\nPlease check the browser console for more details.`);
    } finally {
      setIsExporting(false);
    }
  };

  const templates = ['modern', 'classic', 'minimal', 'creative'] as const;
  const colorSchemes = ['blue', 'green', 'purple', 'red', 'neutral'] as const;

  const getColorClasses = () => {
    const colorMap: Record<string, string> = {
      blue: 'text-blue-400 bg-blue-600/20 border-blue-500',
      green: 'text-green-400 bg-green-600/20 border-green-500',
      purple: 'text-purple-400 bg-purple-600/20 border-purple-500',
      red: 'text-red-400 bg-red-600/20 border-red-500',
      neutral: 'text-slate-300 bg-slate-700 border-slate-600',
    };
    return colorMap[cvData.colorScheme];
  };

  const getTemplateStyles = () => {
    const template = cvData.designTemplate;
    const colorAccent = cvData.colorScheme;
    const colorMap: Record<string, { primary: string; accent: string; light: string }> = {
      blue: { primary: 'rgb(59, 130, 246)', accent: 'bg-blue-600', light: 'rgba(59, 130, 246, 0.08)' },
      green: { primary: 'rgb(34, 197, 94)', accent: 'bg-green-600', light: 'rgba(34, 197, 94, 0.08)' },
      purple: { primary: 'rgb(147, 51, 234)', accent: 'bg-purple-600', light: 'rgba(147, 51, 234, 0.08)' },
      red: { primary: 'rgb(239, 68, 68)', accent: 'bg-red-600', light: 'rgba(239, 68, 68, 0.08)' },
      neutral: { primary: 'rgb(107, 114, 128)', accent: 'bg-gray-600', light: 'rgba(107, 114, 128, 0.08)' },
    };
    
    const colors = colorMap[colorAccent];

    if (template === 'modern') {
      return {
        container: 'bg-white rounded-2xl shadow-2xl',
        headerBg: `linear-gradient(135deg, ${colors.light} 0%, rgba(99, 102, 241, 0.04) 100%)`,
        headerPadding: 'p-6 sm:p-10 lg:p-14',
        sectionGap: 'mb-8 sm:mb-10',
        cardStyle: 'p-5 sm:p-6 rounded-xl border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300',
        sectionIconSize: '1.75rem',
        sectionTitleSize: 'text-xl sm:text-2xl',
        primaryColor: colors.primary,
        accentColor: colors.accent,
      };
    }

    if (template === 'classic') {
      return {
        container: 'bg-white rounded-sm shadow-md',
        headerBg: 'transparent',
        headerPadding: 'p-6 sm:p-8',
        sectionGap: 'mb-6 sm:mb-8',
        cardStyle: 'border-b-2 border-gray-300 pb-4 sm:pb-6 mb-4',
        sectionIconSize: '1.25rem',
        sectionTitleSize: 'text-lg sm:text-xl',
        primaryColor: colors.primary,
        accentColor: colors.accent,
      };
    }

    if (template === 'minimal') {
      return {
        container: 'bg-white rounded-none shadow-none border-none',
        headerBg: 'transparent',
        headerPadding: 'p-6 sm:p-8',
        sectionGap: 'mb-5 sm:mb-7',
        cardStyle: 'pt-3 sm:pt-4 border-t border-gray-300',
        sectionIconSize: '1rem',
        sectionTitleSize: 'text-base sm:text-lg font-semibold',
        primaryColor: colors.primary,
        accentColor: colors.accent,
      };
    }

    // creative
    return {
      container: 'bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-2xl shadow-2xl',
      headerBg: `linear-gradient(135deg, ${colors.primary}20 0%, ${colors.primary}10 100%)`,
      headerPadding: 'p-8 sm:p-12 lg:p-16',
      sectionGap: 'mb-10 sm:mb-12',
      cardStyle: `p-6 sm:p-7 rounded-2xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-white to-gray-50/50`,
      sectionIconSize: '2rem',
      sectionTitleSize: 'text-2xl sm:text-3xl',
      primaryColor: colors.primary,
      accentColor: colors.accent,
    };
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 p-4 sm:p-6 rounded-lg space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Design Settings</h2>

        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Template
          </label>
          <select
            value={cvData.designTemplate}
            onChange={(e) =>
              setDesignTemplate(e.target.value as typeof cvData.designTemplate)
            }
            className="w-full px-3 sm:px-4 py-2 border border-slate-600 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            {templates.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200 mb-2">
            Color Scheme
          </label>
          <div className="flex gap-2 flex-wrap">
            {colorSchemes.map((scheme) => (
              <button
                key={scheme}
                onClick={() => setColorScheme(scheme)}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition text-sm ${
                  cvData.colorScheme === scheme
                    ? `${colorMap[scheme]} border-2`
                    : 'border border-slate-600 text-slate-300'
                }`}
              >
                {scheme.charAt(0).toUpperCase() + scheme.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            onClick={handleExportPDF}
            disabled={isExporting || !cvData.personalInfo.fullName}
            className="flex-1 py-2 sm:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-slate-600 disabled:cursor-not-allowed font-medium transition text-sm sm:text-base"
          >
            {isExporting ? '⏳ Exporting...' : '📄 Export as PDF'}
          </button>
          <button
            onClick={() =>
              exportCVAsJSON(
                cvData,
                `${cvData.personalInfo.fullName || 'CV'}.json`
              )
            }
            disabled={!cvData.personalInfo.fullName}
            className="flex-1 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed font-medium transition text-sm sm:text-base"
          >
            💾 Save CV Data
          </button>
        </div>
      </div>

      <div
        id="cv-preview"
        className={`${getTemplateStyles().container}`}
        style={{ 
          fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif', 
          lineHeight: 1.6,
          margin: '1.5rem auto',
          maxWidth: '900px',
          width: '100%',
          boxSizing: 'border-box',
          position: 'relative',
          backgroundColor: '#ffffff',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
          overflow: 'hidden',
          color: '#000000',
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact',
          colorAdjust: 'exact',
        }}
      >
        <div style={{ 
          padding: getTemplateStyles().headerPadding, 
          background: getTemplateStyles().headerBg, 
          borderRadius: cvData.designTemplate === 'minimal' ? '0' : '1rem',
          marginBottom: '0',
        }}>
          {/* Header Section */}
          <div style={{ 
            paddingBottom: '1.5rem',
            borderBottom: cvData.designTemplate !== 'minimal' ? 'none' : '2px solid #e5e7eb',
            marginBottom: '0rem',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {cvData.personalInfo.profilePhoto && (
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={cvData.personalInfo.profilePhoto}
                    alt="Profile"
                    style={{
                      width: cvData.designTemplate === 'minimal' ? '100px' : '140px',
                      height: cvData.designTemplate === 'minimal' ? '100px' : '140px',
                      borderRadius: cvData.designTemplate === 'creative' ? '2rem' : cvData.designTemplate === 'minimal' ? '0.5rem' : '1rem',
                      border: '4px solid white',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              )}
              <div style={{ textAlign: 'center', width: '100%' }}>
                <h1 style={{
                  fontSize: cvData.designTemplate === 'minimal' ? '1.75rem' : cvData.designTemplate === 'creative' ? '3rem' : '2.5rem',
                  fontWeight: cvData.designTemplate === 'minimal' ? '700' : '900',
                  lineHeight: 1.2,
                  marginBottom: '0.75rem',
                  color: '#000000',
                  letterSpacing: cvData.designTemplate === 'creative' ? '-0.02em' : '0',
                  margin: '0 0 0.75rem 0',
                  textAlign: 'center',
                  width: '100%',
                }}>
                  {cvData.personalInfo.fullName || 'Your Name'}
                </h1>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#555', width: '100%' }}>
                  {cvData.personalInfo.email && (
                    <span style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      backgroundColor: cvData.designTemplate === 'minimal' ? 'transparent' : '#f0f0f0',
                      borderRadius: cvData.designTemplate === 'minimal' ? '0' : '0.375rem',
                      border: 'none',
                    }}>
                      ✉️ {cvData.personalInfo.email}
                    </span>
                  )}
                  {cvData.personalInfo.phone && (
                    <span style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      backgroundColor: cvData.designTemplate === 'minimal' ? 'transparent' : '#f0f0f0',
                      borderRadius: cvData.designTemplate === 'minimal' ? '0' : '0.375rem',
                      border: 'none',
                    }}>
                      📱 {cvData.personalInfo.phone}
                    </span>
                  )}
                  {cvData.personalInfo.location && (
                    <span style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.75rem',
                      backgroundColor: cvData.designTemplate === 'minimal' ? 'transparent' : '#f0f0f0',
                      borderRadius: cvData.designTemplate === 'minimal' ? '0' : '0.375rem',
                      border: 'none',
                    }}>
                      📍 {cvData.personalInfo.location}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '1.5rem' }}>
          {/* Professional Summary */}
          {cvData.personalInfo.summary && (
            <div style={{
              marginBottom: '2rem',
              padding: '1.5rem',
              backgroundColor: '#f9fafb',
              borderRadius: '0.75rem',
              borderLeft: `4px solid ${getTemplateStyles().primaryColor}`,
            }}>
              <h2 style={{
                fontSize: '1.1rem',
                fontWeight: '700',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#000000',
                margin: '0 0 0.75rem 0',
              }}>
                <span style={{ fontSize: '1.25rem' }}>💼</span> Professional Summary
              </h2>
              <p style={{
                fontSize: '0.95rem',
                color: '#333333',
                lineHeight: 1.8,
                margin: 0,
              }}>
                {cvData.personalInfo.summary}
              </p>
            </div>
          )}

        {/* Experience */}
        {cvData.experiences.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🎯</span>
              <h2 style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                color: '#111827',
                borderBottom: '2px solid #d1d5db',
                paddingBottom: '0.5rem',
                flex: 1,
                margin: 0,
              }}>Work Experience</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {cvData.experiences.map((exp, idx) => (
                <div key={exp.id} style={{
                  padding: '1.25rem 1.5rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '0.75rem',
                  border: '1px solid #e5e7eb',
                  textAlign: 'left',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    <div style={{ textAlign: 'left', flex: 1 }}>
                      <h3 style={{ fontWeight: '700', color: '#111827', fontSize: '1rem', marginBottom: '0.25rem', margin: 0, textAlign: 'left' }}>{exp.position}</h3>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '600', margin: 0, textAlign: 'left' }}>{exp.company}</p>
                    </div>
                    <span style={{
                      fontSize: '0.75rem',
                      color: '#6b7280',
                      padding: '0.5rem 1rem',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '9999px',
                      whiteSpace: 'nowrap',
                      fontWeight: '600',
                      textAlign: 'right',
                    }}>
                      {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.6, marginTop: '0.75rem', margin: 0, textAlign: 'left' }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {cvData.education.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🎓</span>
              <h2 style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                color: '#111827',
                borderBottom: '2px solid #d1d5db',
                paddingBottom: '0.5rem',
                flex: 1,
                margin: 0,
              }}>Education</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {cvData.education.map((edu, idx) => (
                <div key={edu.id} style={{
                  padding: '1.25rem 1.5rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '0.75rem',
                  border: '1px solid #e5e7eb',
                  textAlign: 'left',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    <div style={{ textAlign: 'left', flex: 1 }}>
                      <h3 style={{ fontWeight: '700', color: '#111827', fontSize: '1rem', marginBottom: '0.25rem', margin: 0, textAlign: 'left' }}>{edu.degree}</h3>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '600', margin: 0, textAlign: 'left' }}>{edu.institution}</p>
                      <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0, textAlign: 'left' }}>{edu.field}</p>
                    </div>
                    <span style={{
                      fontSize: '0.75rem',
                      color: '#6b7280',
                      padding: '0.5rem 1rem',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '9999px',
                      whiteSpace: 'nowrap',
                      fontWeight: '600',
                      textAlign: 'right',
                    }}>
                      {edu.graduationDate}
                    </span>
                  </div>
                  {edu.description && (
                    <p style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.6, marginTop: '0.75rem', margin: 0, textAlign: 'left' }}>{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {cvData.skills.length > 0 && (
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>⚡</span>
              <h2 style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                color: '#111827',
                borderBottom: '2px solid #d1d5db',
                paddingBottom: '0.5rem',
                flex: 1,
                margin: 0,
              }}>Skills & Expertise</h2>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1rem',
              justifyItems: 'center',
            }}>
              {cvData.skills.map((skill) => (
                <div
                  key={skill.id}
                  style={{
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #e5e7eb',
                    backgroundColor: '#f9fafb',
                    width: '100%',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: '600', color: '#111827', fontSize: '0.9rem' }}>{skill.name}</span>
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: '700',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '9999px',
                      backgroundColor: getTemplateStyles().primaryColor,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: '1',
                    }}>
                      {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
                    </span>
                  </div>
                  <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '0.375rem', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        borderRadius: '9999px',
                        width: skill.level === 'expert' ? '100%' : skill.level === 'intermediate' ? '70%' : '40%',
                        backgroundColor: getTemplateStyles().primaryColor,
                        opacity: 0.85,
                      }}
                    />
                  </div>
                  <p style={{ fontSize: '0.65rem', color: '#9ca3af', marginTop: '0.25rem', margin: 0 }}>
                    {skill.level === 'expert' ? '3+ years' : skill.level === 'intermediate' ? '1-3 years' : 'Learning'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects and Certificates */}
        {cvData.projects.length > 0 && (
          <>
            {cvData.projects.filter((p) => p.type !== 'certificate').length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>📁</span>
                  <h2 style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    color: '#111827',
                    borderBottom: '2px solid #d1d5db',
                    paddingBottom: '0.5rem',
                    flex: 1,
                    margin: 0,
                  }}>Projects</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {cvData.projects.filter((p) => p.type !== 'certificate').map((project) => (
                    <div
                      key={project.id}
                      style={{
                        padding: '1.25rem 1.5rem',
                        backgroundColor: '#f9fafb',
                        borderRadius: '0.75rem',
                        border: '1px solid #e5e7eb',
                        textAlign: 'left',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                        <h3 style={{ fontWeight: '700', color: '#111827', fontSize: '1rem', margin: 0, textAlign: 'left', flex: 1 }}>{project.title}</h3>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: '0.875rem',
                              fontWeight: '700',
                              padding: '0.5rem 1rem',
                              borderRadius: '0.5rem',
                              color: 'white',
                              backgroundColor: getTemplateStyles().primaryColor,
                              textDecoration: 'none',
                              whiteSpace: 'nowrap',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                              textAlign: 'center',
                              display: 'inline-block',
                              minWidth: 'fit-content',
                            }}
                          >
                            View Project →
                          </a>
                        )}
                      </div>
                      <p style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.6, marginBottom: '1rem', margin: 0, textAlign: 'left' }}>{project.description}</p>
                      {project.technologies && project.technologies.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              style={{
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                padding: '0.375rem 0.75rem',
                                borderRadius: '0.5rem',
                                color: '#374151',
                                backgroundColor: '#e5e7eb',
                                border: 'none',
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {cvData.projects.filter((p) => p.type === 'certificate').length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>🏆</span>
                  <h2 style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    color: '#111827',
                    borderBottom: '2px solid #d1d5db',
                    paddingBottom: '0.5rem',
                    flex: 1,
                    margin: 0,
                  }}>Certifications</h2>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {cvData.projects.filter((p) => p.type === 'certificate').map((cert) => (
                    <div
                      key={cert.id}
                      style={{
                        padding: '1.25rem 1.5rem',
                        backgroundColor: '#f9fafb',
                        borderRadius: '0.75rem',
                        border: '1px solid #e5e7eb',
                        textAlign: 'left',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                        <h3 style={{ fontWeight: '700', color: '#111827', fontSize: '1rem', margin: 0, textAlign: 'left', flex: 1 }}>{cert.title}</h3>
                        {cert.link && (
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: '0.875rem',
                              fontWeight: '700',
                              padding: '0.5rem 1rem',
                              borderRadius: '0.5rem',
                              color: 'white',
                              backgroundColor: '#10b981',
                              textDecoration: 'none',
                              whiteSpace: 'nowrap',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                              textAlign: 'center',
                              display: 'inline-block',
                              minWidth: 'fit-content',
                            }}
                          >
                            View Cert →
                          </a>
                        )}
                      </div>
                      <p style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.6, marginBottom: '1rem', margin: 0, textAlign: 'left' }}>{cert.description}</p>
                      {cert.technologies && cert.technologies.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {cert.technologies.map((tech) => (
                            <span
                              key={tech}
                              style={{
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                padding: '0.375rem 0.75rem',
                                borderRadius: '0.5rem',
                                color: '#374151',
                                backgroundColor: '#dbeafe',
                                border: 'none',
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        </div>
      </div>
    </div>
  );
}

const colorMap: Record<string, string> = {
  blue: 'text-blue-600 bg-blue-50 border-blue-200',
  green: 'text-green-600 bg-green-50 border-green-200',
  purple: 'text-purple-600 bg-purple-50 border-purple-200',
  red: 'text-red-600 bg-red-50 border-red-200',
  neutral: 'text-gray-600 bg-gray-50 border-gray-200',
};
