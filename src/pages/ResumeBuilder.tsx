import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ResumeData, defaultResumeData } from "@/types/resume";
import ProgressBar from "@/components/resume/ProgressBar";
import PersonalInfoForm from "@/components/resume/forms/PersonalInfoForm";
import SummaryForm from "@/components/resume/forms/SummaryForm";
import ExperienceForm from "@/components/resume/forms/ExperienceForm";
import EducationForm from "@/components/resume/forms/EducationForm";
import SkillsForm from "@/components/resume/forms/SkillsForm";
import AdditionalSectionsForm from "@/components/resume/forms/AdditionalSectionsForm";
import { useToast } from "@/hooks/use-toast";
import gotalentLogo from "@/assets/gotalent-logo.png";

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [currentSection, setCurrentSection] = useState(0);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch (error) {
        console.error('Failed to load resume data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever resumeData changes
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  const sections = [
    { title: "Personal Information", component: PersonalInfoForm },
    { title: "Professional Summary", component: SummaryForm },
    { title: "Work Experience", component: ExperienceForm },
    { title: "Education", component: EducationForm },
    { title: "Skills", component: SkillsForm },
    { title: "Additional Sections", component: AdditionalSectionsForm }
  ];

  const handlePreview = () => {
    // Validate required fields
    const { personalInfo } = resumeData;
    if (!personalInfo.fullName || !personalInfo.email || !personalInfo.phone) {
      toast({
        title: "Missing Required Information",
        description: "Please fill in at least your name, email, and phone number before previewing.",
        variant: "destructive"
      });
      setCurrentSection(0); // Go to personal info section
      return;
    }

    navigate('/preview');
  };

  const CurrentSectionComponent = sections[currentSection].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-gray-800">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center justify-between w-full sm:w-auto">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className="hidden xs:inline">Back to Home</span>
                <span className="xs:hidden">Back</span>
              </Button>
              <a 
                href="https://www.gotalent.agency/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 sm:ml-4 hover:opacity-80 transition-opacity"
              >
                <img 
                  src={gotalentLogo} 
                  alt="GoTalent Logo" 
                  className="h-8 w-auto"
                />
              </a>
            </div>
            
            <Button 
              onClick={handlePreview}
              className="bg-primary hover:bg-primary-dark w-full sm:w-auto"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview & Download
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <ProgressBar resumeData={resumeData} />

          {/* Section Navigation */}
          <div className="mb-8 mt-8 sm:mt-6">
            <div className="flex flex-wrap gap-2 mb-6">
              {sections.map((section, index) => (
                <Button
                  key={index}
                  variant={currentSection === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentSection(index)}
                  className={`text-xs ${currentSection === index ? 'bg-primary text-primary-foreground' : ''}`}
                >
                  {section.title}
                </Button>
              ))}
            </div>
          </div>

          {/* Current Section Form */}
          <Card className="p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {sections[currentSection].title}
              </h2>
            </div>

            <CurrentSectionComponent 
              resumeData={resumeData}
              updateResumeData={setResumeData}
            />

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                disabled={currentSection === 0}
              >
                Previous
              </Button>
              
              {currentSection < sections.length - 1 ? (
                <Button
                  onClick={() => setCurrentSection(currentSection + 1)}
                  className="bg-primary hover:bg-primary-dark"
                >
                  Next Section
                </Button>
              ) : (
                <Button
                  onClick={handlePreview}
                  className="bg-success hover:bg-success/90"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Resume
                </Button>
              )}
            </div>
          </Card>

          {/* Tips Card */}
          <Card className="mt-6 p-6 bg-muted/30 border-l-4 border-l-primary">
            <h3 className="font-semibold mb-2 text-foreground">💡 Pro Tips</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use strong action verbs like "achieved," "managed," "implemented"</li>
              <li>• Quantify your achievements with numbers and percentages</li>
              <li>• Keep bullet points concise and impactful</li>
              <li>• Tailor your resume to match the job description</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;