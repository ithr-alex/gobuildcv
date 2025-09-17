import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { ResumeData, Experience } from "@/types/resume";

interface ExperienceFormProps {
  resumeData: ResumeData;
  updateResumeData: (data: ResumeData) => void;
}

const ExperienceForm = ({ resumeData, updateResumeData }: ExperienceFormProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      jobTitle: '',
      companyName: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      achievements: ['']
    };
    
    updateResumeData({
      ...resumeData,
      experience: [...resumeData.experience, newExperience]
    });
    
    setExpandedId(newExperience.id);
  };

  const updateExperience = (id: string, field: string, value: any) => {
    const updated = resumeData.experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    
    updateResumeData({
      ...resumeData,
      experience: updated
    });
  };

  const removeExperience = (id: string) => {
    updateResumeData({
      ...resumeData,
      experience: resumeData.experience.filter(exp => exp.id !== id)
    });
  };

  const addAchievement = (experienceId: string) => {
    const updated = resumeData.experience.map(exp => 
      exp.id === experienceId 
        ? { ...exp, achievements: [...exp.achievements, ''] }
        : exp
    );
    
    updateResumeData({
      ...resumeData,
      experience: updated
    });
  };

  const updateAchievement = (experienceId: string, achievementIndex: number, value: string) => {
    const updated = resumeData.experience.map(exp => 
      exp.id === experienceId 
        ? {
            ...exp,
            achievements: exp.achievements.map((ach, idx) => 
              idx === achievementIndex ? value : ach
            )
          }
        : exp
    );
    
    updateResumeData({
      ...resumeData,
      experience: updated
    });
  };

  const removeAchievement = (experienceId: string, achievementIndex: number) => {
    const updated = resumeData.experience.map(exp => 
      exp.id === experienceId 
        ? {
            ...exp,
            achievements: exp.achievements.filter((_, idx) => idx !== achievementIndex)
          }
        : exp
    );
    
    updateResumeData({
      ...resumeData,
      experience: updated
    });
  };

  return (
    <div className="space-y-6">
      <div className="form-tip">
        💡 <strong>Tip:</strong> Start with action verbs (managed, developed, increased) and quantify achievements with numbers, percentages, or dollar amounts.
      </div>

      {resumeData.experience.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-muted-foreground mb-4">No work experience added yet</p>
          <Button onClick={addExperience} className="bg-primary hover:bg-primary-dark">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Job
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {resumeData.experience.map((experience, index) => (
            <Card key={experience.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-sm text-muted-foreground">
                    Position #{index + 1}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedId(expandedId === experience.id ? null : experience.id)}
                  >
                    {expandedId === experience.id ? 'Collapse' : 'Expand'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExperience(experience.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="input-group">
                  <Label className="text-sm font-medium">Job Title</Label>
                  <Input
                    value={experience.jobTitle}
                    onChange={(e) => updateExperience(experience.id, 'jobTitle', e.target.value)}
                    placeholder="e.g. Senior Software Engineer"
                  />
                </div>

                <div className="input-group">
                  <Label className="text-sm font-medium">Company Name</Label>
                  <Input
                    value={experience.companyName}
                    onChange={(e) => updateExperience(experience.id, 'companyName', e.target.value)}
                    placeholder="e.g. Google Inc."
                  />
                </div>

                <div className="input-group">
                  <Label className="text-sm font-medium">Location</Label>
                  <Input
                    value={experience.location}
                    onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                    placeholder="e.g. San Francisco, CA"
                  />
                </div>

                <div className="input-group">
                  <Label className="text-sm font-medium">Start Date</Label>
                  <Input
                    type="month"
                    value={experience.startDate}
                    onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <Label className="text-sm font-medium">End Date</Label>
                  <Input
                    type="month"
                    value={experience.endDate}
                    onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                    disabled={experience.current}
                    placeholder={experience.current ? "Present" : ""}
                  />
                </div>

                <div className="flex items-center space-x-2 mt-6">
                  <Checkbox
                    id={`current-${experience.id}`}
                    checked={experience.current}
                    onCheckedChange={(checked) => updateExperience(experience.id, 'current', checked)}
                  />
                  <Label htmlFor={`current-${experience.id}`} className="text-sm">
                    I currently work here
                  </Label>
                </div>
              </div>

              {expandedId === experience.id && (
                <div className="space-y-4 border-t pt-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Key Achievements & Responsibilities
                    </Label>
                    
                    <div className="space-y-2">
                      {experience.achievements.map((achievement, achIndex) => (
                        <div key={achIndex} className="flex gap-2">
                          <Textarea
                            value={achievement}
                            onChange={(e) => updateAchievement(experience.id, achIndex, e.target.value)}
                            placeholder="• Increased team productivity by 25% through implementation of automated testing workflows"
                            className="resize-none"
                            rows={2}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAchievement(experience.id, achIndex)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addAchievement(experience.id)}
                      className="mt-2"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Achievement
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      <Button 
        onClick={addExperience} 
        variant="outline" 
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Position
      </Button>
    </div>
  );
};

export default ExperienceForm;