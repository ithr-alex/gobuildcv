import { ResumeData } from "@/types/resume";

interface ProgressBarProps {
  resumeData: ResumeData;
}

const ProgressBar = ({ resumeData }: ProgressBarProps) => {
  const calculateProgress = (): number => {
    let completed = 0;
    let total = 7; // Total sections

    // Personal Info (required fields)
    const { personalInfo } = resumeData;
    if (personalInfo.fullName && personalInfo.email && personalInfo.phone) {
      completed += 1;
    }

    // Summary
    if (resumeData.summary.trim()) {
      completed += 1;
    }

    // Experience
    if (resumeData.experience.length > 0) {
      completed += 1;
    }

    // Education
    if (resumeData.education.length > 0) {
      completed += 1;
    }

    // Skills
    if (resumeData.skills.length > 0) {
      completed += 1;
    }

    // Optional sections (count as one)
    if (resumeData.certifications.length > 0 || 
        resumeData.languages.length > 0 || 
        resumeData.projects.length > 0) {
      completed += 1;
    }

    // Job title
    if (personalInfo.jobTitle) {
      completed += 1;
    }

    return Math.round((completed / total) * 100);
  };

  const progress = calculateProgress();

  return (
    <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
      <div 
        className="progress-fill h-3 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-muted-foreground">Resume Completion</span>
        <span className="text-sm font-medium text-primary">{progress}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;