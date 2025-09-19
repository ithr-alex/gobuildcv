export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  location: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  companyName: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  achievements: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  graduationYear: string;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  category?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  languages: Language[];
  projects: Project[];
  template: 'modern' | 'classic' | 'minimal' | 'creative' | 'executive';
}

export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    location: ''
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  certifications: [],
  languages: [],
  projects: [],
  template: 'modern'
};