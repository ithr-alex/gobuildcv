import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { ResumeData, Skill } from "@/types/resume";

interface SkillsFormProps {
  resumeData: ResumeData;
  updateResumeData: (data: ResumeData) => void;
}

const SkillsForm = ({ resumeData, updateResumeData }: SkillsFormProps) => {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (!newSkill.trim()) return;
    
    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.trim(),
      category: 'General'
    };
    
    updateResumeData({
      ...resumeData,
      skills: [...resumeData.skills, skill]
    });
    
    setNewSkill('');
  };

  const removeSkill = (id: string) => {
    updateResumeData({
      ...resumeData,
      skills: resumeData.skills.filter(skill => skill.id !== id)
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const suggestedSkills = {
    'Technical': [
      'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'AWS', 'Docker', 'Git',
      'TypeScript', 'Java', 'C++', 'HTML/CSS', 'MongoDB', 'PostgreSQL'
    ],
    'Design': [
      'Adobe Creative Suite', 'Figma', 'Sketch', 'Photoshop', 'Illustrator',
      'UI/UX Design', 'Wireframing', 'Prototyping'
    ],
    'Marketing': [
      'Google Analytics', 'SEO', 'SEM', 'Social Media Marketing', 'Content Marketing',
      'Email Marketing', 'PPC', 'Facebook Ads', 'Google Ads'
    ],
    'Business': [
      'Project Management', 'Agile', 'Scrum', 'Leadership', 'Strategic Planning',
      'Data Analysis', 'Financial Modeling', 'Budgeting', 'Team Management'
    ],
    'Languages': [
      'Spanish', 'French', 'German', 'Mandarin', 'Japanese', 'Portuguese', 'Italian'
    ]
  };

  const addSuggestedSkill = (skillName: string) => {
    if (resumeData.skills.some(skill => skill.name.toLowerCase() === skillName.toLowerCase())) {
      return; // Skill already exists
    }
    
    const skill: Skill = {
      id: Date.now().toString(),
      name: skillName,
      category: 'General'
    };
    
    updateResumeData({
      ...resumeData,
      skills: [...resumeData.skills, skill]
    });
  };

  return (
    <div className="space-y-6">
      <div className="form-tip">
        💡 <strong>Tip:</strong> Include both hard skills (technical abilities) and soft skills (communication, leadership). Match skills mentioned in the job description.
      </div>

      {/* Add New Skill */}
      <div className="flex gap-2">
        <div className="flex-1">
          <Label htmlFor="new-skill" className="text-sm font-medium">Add Skills</Label>
          <Input
            id="new-skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g. JavaScript, Project Management, Adobe Photoshop"
            className="mt-1"
          />
        </div>
        <Button 
          onClick={addSkill}
          className="mt-6 bg-primary hover:bg-primary-dark"
          disabled={!newSkill.trim()}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Current Skills */}
      {resumeData.skills.length > 0 && (
        <div>
          <Label className="text-sm font-medium mb-3 block">Your Skills</Label>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill) => (
              <Badge 
                key={skill.id} 
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1"
              >
                {skill.name}
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Suggested Skills */}
      <div className="space-y-4">
        <Label className="text-sm font-medium">Popular Skills by Category</Label>
        
        {Object.entries(suggestedSkills).map(([category, skills]) => (
          <div key={category} className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-medium text-sm mb-2 text-foreground">{category}</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skillName) => {
                const isAdded = resumeData.skills.some(
                  skill => skill.name.toLowerCase() === skillName.toLowerCase()
                );
                
                return (
                  <Button
                    key={skillName}
                    variant={isAdded ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => addSuggestedSkill(skillName)}
                    disabled={isAdded}
                    className="text-xs h-7"
                  >
                    {isAdded && <span className="mr-1">✓</span>}
                    {skillName}
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {resumeData.skills.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-muted-foreground mb-4">No skills added yet</p>
          <p className="text-sm text-muted-foreground">
            Start typing a skill name above or click on suggested skills below
          </p>
        </div>
      )}
    </div>
  );
};

export default SkillsForm;