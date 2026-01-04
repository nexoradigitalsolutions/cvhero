import { create } from 'zustand';
import { CVData, Experience, Education, Skill, Project } from '@/types/cv';

interface CVStore {
  cvData: CVData;
  setPersonalInfo: (info: Partial<CVData['personalInfo']>) => void;
  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addEducation: (edu: Education) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: Skill) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  removeProject: (id: string) => void;
  setDesignTemplate: (template: CVData['designTemplate']) => void;
  setColorScheme: (scheme: CVData['colorScheme']) => void;
  setCVData: (data: CVData) => void;
  resetCV: () => void;
}

const initialState: CVData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
  },
  experiences: [],
  education: [],
  skills: [],
  projects: [],
  designTemplate: 'modern',
  colorScheme: 'blue',
};

export const useCVStore = create<CVStore>((set) => ({
  cvData: initialState,

  setPersonalInfo: (info) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        personalInfo: { ...state.cvData.personalInfo, ...info },
      },
    })),

  addExperience: (exp) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        experiences: [...state.cvData.experiences, exp],
      },
    })),

  updateExperience: (id, exp) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        experiences: state.cvData.experiences.map((e) =>
          e.id === id ? { ...e, ...exp } : e
        ),
      },
    })),

  removeExperience: (id) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        experiences: state.cvData.experiences.filter((e) => e.id !== id),
      },
    })),

  addEducation: (edu) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        education: [...state.cvData.education, edu],
      },
    })),

  updateEducation: (id, edu) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        education: state.cvData.education.map((e) =>
          e.id === id ? { ...e, ...edu } : e
        ),
      },
    })),

  removeEducation: (id) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        education: state.cvData.education.filter((e) => e.id !== id),
      },
    })),

  addSkill: (skill) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        skills: [...state.cvData.skills, skill],
      },
    })),

  updateSkill: (id, skill) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        skills: state.cvData.skills.map((s) =>
          s.id === id ? { ...s, ...skill } : s
        ),
      },
    })),

  removeSkill: (id) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        skills: state.cvData.skills.filter((s) => s.id !== id),
      },
    })),

  addProject: (project) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        projects: [...state.cvData.projects, project],
      },
    })),

  updateProject: (id, project) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        projects: state.cvData.projects.map((p) =>
          p.id === id ? { ...p, ...project } : p
        ),
      },
    })),

  removeProject: (id) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        projects: state.cvData.projects.filter((p) => p.id !== id),
      },
    })),

  setDesignTemplate: (template) =>
    set((state) => ({
      cvData: { ...state.cvData, designTemplate: template },
    })),

  setColorScheme: (scheme) =>
    set((state) => ({
      cvData: { ...state.cvData, colorScheme: scheme },
    })),

  setCVData: (data) =>
    set(() => ({
      cvData: data,
    })),

  resetCV: () =>
    set(() => ({
      cvData: initialState,
    })),
}));
