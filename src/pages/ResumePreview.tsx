import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Edit, Eye, Palette } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ResumeData, defaultResumeData } from "@/types/resume";
import ResumeTemplate from "@/components/resume/ResumeTemplate";
import { generatePDF } from "@/utils/pdfGenerator";
import { useToast } from "@/hooks/use-toast";

const ResumePreview = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch (error) {
        console.error('Failed to load resume data:', error);
        toast({
          title: "Error Loading Data",
          description: "Failed to load your resume data. Please go back and re-enter your information.",
          variant: "destructive"
        });
      }
    }
  }, [toast]);

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    
    try {
      await generatePDF(resumeData);
      toast({
        title: "Success!",
        description: "Your resume has been downloaded as a PDF.",
      });
    } catch (error) {
      console.error('PDF generation failed:', error);
      toast({
        title: "Download Failed", 
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const templates = [
    { id: 'modern', name: 'Modern', description: 'Clean and contemporary design' },
    { id: 'classic', name: 'Classic', description: 'Traditional professional layout' },
    { id: 'minimal', name: 'Minimal', description: 'Simple and elegant design' },
    { id: 'executive', name: 'Executive', description: 'Premium professional style' }
  ] as const;

  const handleTemplateChange = (templateId: 'modern' | 'classic' | 'minimal' | 'executive') => {
    const updatedData = { ...resumeData, template: templateId };
    setResumeData(updatedData);
    localStorage.setItem('resumeData', JSON.stringify(updatedData));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-gray-800">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-0">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/builder')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Editor
                </Button>
                <div className="flex items-center space-x-2">
                  <Eye className="h-6 w-6 text-primary" />
                  <span className="text-lg font-semibold">Resume Preview</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <Button 
                  variant="outline"
                  onClick={() => navigate('/builder')}
                  className="w-full sm:w-auto"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Resume
                </Button>
                
                <Button 
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPDF}
                  className="bg-success hover:bg-success/90 w-full sm:w-auto"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
                </Button>
              </div>
            </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar - Templates & Options */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Palette className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Choose Template</h3>
                </div>
                
                <div className="space-y-3">
                  {templates.map((template) => (
                    <div 
                      key={template.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-all hover:border-primary ${
                        resumeData.template === template.id ? 'border-primary bg-primary/5' : 'border-border'
                      }`}
                      onClick={() => handleTemplateChange(template.id)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{template.name}</span>
                        {resumeData.template === template.id && (
                          <Badge variant="secondary" className="text-xs">Current</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{template.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/builder')}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Content
                </Button>
                
                <Button 
                  size="sm"
                  className="w-full bg-primary hover:bg-primary-dark"
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPDF}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {isGeneratingPDF ? 'Generating...' : 'Download'}
                </Button>
              </div>

              {/* Tips */}
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-medium text-sm mb-2">📋 Final Checklist</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>✓ Contact information is complete</li>
                  <li>✓ No spelling or grammar errors</li>
                  <li>✓ Achievements are quantified</li>
                  <li>✓ File name includes your name</li>
                </ul>
              </div>
            </Card>
          </div>

          {/* Resume Preview */}
          <div className="lg:col-span-3">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div id="resume-content">
                <ResumeTemplate resumeData={resumeData} />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/builder')}
              >
                <Edit className="h-5 w-5 mr-2" />
                Make Changes
              </Button>
              
              <Button 
                size="lg"
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="bg-success hover:bg-success/90 px-8"
              >
                <Download className="h-5 w-5 mr-2" />
                {isGeneratingPDF ? 'Generating PDF...' : 'Download Resume'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;