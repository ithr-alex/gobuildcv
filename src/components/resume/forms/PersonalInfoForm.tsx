import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResumeData } from "@/types/resume";

interface PersonalInfoFormProps {
  resumeData: ResumeData;
  updateResumeData: (data: ResumeData) => void;
}

const PersonalInfoForm = ({ resumeData, updateResumeData }: PersonalInfoFormProps) => {
  const updatePersonalInfo = (field: string, value: string) => {
    updateResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="form-tip">
        💡 <strong>Tip:</strong> Use your full legal name as it appears on official documents. Your job title should match the role you're applying for.
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="input-group">
          <Label htmlFor="fullName" className="text-sm font-medium">
            Full Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="fullName"
            value={resumeData.personalInfo.fullName}
            onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
            placeholder="e.g. John Smith"
            className="mt-1"
          />
        </div>

        <div className="input-group">
          <Label htmlFor="jobTitle" className="text-sm font-medium">
            Job Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="jobTitle"
            value={resumeData.personalInfo.jobTitle}
            onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
            placeholder="e.g. Software Engineer"
            className="mt-1"
          />
        </div>

        <div className="input-group">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={resumeData.personalInfo.email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            placeholder="john.smith@email.com"
            className="mt-1"
          />
        </div>

        <div className="input-group">
          <Label htmlFor="phone" className="text-sm font-medium">
            Phone Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            value={resumeData.personalInfo.phone}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            placeholder="(555) 123-4567"
            className="mt-1"
          />
        </div>

        <div className="input-group">
          <Label htmlFor="location" className="text-sm font-medium">
            Location
          </Label>
          <Input
            id="location"
            value={resumeData.personalInfo.location}
            onChange={(e) => updatePersonalInfo('location', e.target.value)}
            placeholder="City, State"
            className="mt-1"
          />
        </div>

        <div className="input-group">
          <Label htmlFor="linkedin" className="text-sm font-medium">
            LinkedIn Profile
          </Label>
          <Input
            id="linkedin"
            value={resumeData.personalInfo.linkedin}
            onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
            placeholder="linkedin.com/in/yourprofile"
            className="mt-1"
          />
        </div>

        <div className="input-group md:col-span-2">
          <Label htmlFor="portfolio" className="text-sm font-medium">
            Portfolio/Website
          </Label>
          <Input
            id="portfolio"
            value={resumeData.personalInfo.portfolio}
            onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
            placeholder="www.yourportfolio.com"
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;