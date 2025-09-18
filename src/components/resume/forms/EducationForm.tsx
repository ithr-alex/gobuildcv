import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { ResumeData, Education } from "@/types/resume";

interface EducationFormProps {
  resumeData: ResumeData;
  updateResumeData: (data: ResumeData) => void;
}

const EducationForm = ({ resumeData, updateResumeData }: EducationFormProps) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      location: '',
      graduationYear: '',
      gpa: ''
    };
    
    updateResumeData({
      ...resumeData,
      education: [...resumeData.education, newEducation]
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    const updated = resumeData.education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    
    updateResumeData({
      ...resumeData,
      education: updated
    });
  };

  const removeEducation = (id: string) => {
    updateResumeData({
      ...resumeData,
      education: resumeData.education.filter(edu => edu.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      <div className="form-tip">
        💡 <strong>Tip:</strong> List your most recent education first. Include relevant coursework, honors, or projects if you're a recent graduate.
      </div>

      {resumeData.education.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-muted-foreground mb-4">No education added yet</p>
          <Button onClick={addEducation} className="bg-primary hover:bg-primary-dark">
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {resumeData.education.map((education, index) => (
            <Card key={education.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-sm text-muted-foreground">
                    Education #{index + 1}
                  </span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(education.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="input-group">
                  <Label className="text-sm font-medium">Degree</Label>
                  <Input
                    value={education.degree}
                    onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                    placeholder="e.g. Bachelor of Science in Computer Science"
                  />
                </div>

                <div className="input-group">
                  <Label className="text-sm font-medium">School/University</Label>
                  <Input
                    value={education.school}
                    onChange={(e) => updateEducation(education.id, 'school', e.target.value)}
                    placeholder="e.g. Stanford University"
                  />
                </div>

                <div className="input-group">
                  <Label className="text-sm font-medium">Location</Label>
                  <Input
                    value={education.location}
                    onChange={(e) => updateEducation(education.id, 'location', e.target.value)}
                    placeholder="e.g. Stanford, CA"
                  />
                </div>

                <div className="input-group">
                  <Label className="text-sm font-medium">Graduation Year</Label>
                  <Input
                    value={education.graduationYear}
                    onChange={(e) => updateEducation(education.id, 'graduationYear', e.target.value)}
                    placeholder="e.g. 2023"
                  />
                </div>

                <div className="input-group">
                  <Label className="text-sm font-medium">GPA (Optional)</Label>
                  <Input
                    value={education.gpa || ''}
                    onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                    placeholder="e.g. 3.8/4.0"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Only include if 3.5 or higher
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Button 
        onClick={addEducation} 
        variant="outline" 
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Education
      </Button>

      {/* Common Degrees Examples */}
      <div className="bg-muted/30 p-4 rounded-lg">
        <h4 className="font-medium text-sm mb-3">Common Degree Formats:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div>• Bachelor of Science in Computer Science</div>
          <div>• Master of Business Administration (MBA)</div>
          <div>• Bachelor of Arts in Marketing</div>
          <div>• Master of Science in Data Science</div>
          <div>• Associate Degree in Web Development</div>
          <div>• Certificate in Digital Marketing</div>
        </div>
      </div>
    </div>
  );
};

export default EducationForm;