export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  profilePhoto?: string; // base64 encoded image
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  type?: 'project' | 'certificate';
}

export interface CVData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  designTemplate: 'modern' | 'classic' | 'minimal' | 'creative';
  colorScheme: 'blue' | 'green' | 'purple' | 'red' | 'neutral';
}

export interface AIEnhancementRequest {
  section: 'summary' | 'experience' | 'description';
  content: string;
}

export interface AIEnhancementResponse {
  enhanced: string;
  suggestions: string[];
}
