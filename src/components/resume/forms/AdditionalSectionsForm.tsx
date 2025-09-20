import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Award, Globe, Code } from "lucide-react";
import { ResumeData, Certification, Language, Project } from "@/types/resume";

interface AdditionalSectionsFormProps {
  resumeData: ResumeData;
  updateResumeData: (data: ResumeData) => void;
}

const AdditionalSectionsForm = ({ resumeData, updateResumeData }: AdditionalSectionsFormProps) => {
  // Certifications
  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: ''
    };
    
    updateResumeData({
      ...resumeData,
      certifications: [...resumeData.certifications, newCert]
    });
  };

  const updateCertification = (id: string, field: string, value: string) => {
    const updated = resumeData.certifications.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    );
    
    updateResumeData({
      ...resumeData,
      certifications: updated
    });
  };

  const removeCertification = (id: string) => {
    updateResumeData({
      ...resumeData,
      certifications: resumeData.certifications.filter(cert => cert.id !== id)
    });
  };

  // Languages
  const addLanguage = () => {
    const newLang: Language = {
      id: Date.now().toString(),
      name: '',
      proficiency: ''
    };
    
    updateResumeData({
      ...resumeData,
      languages: [...resumeData.languages, newLang]
    });
  };

  const updateLanguage = (id: string, field: string, value: string) => {
    const updated = resumeData.languages.map(lang => 
      lang.id === id ? { ...lang, [field]: value } : lang
    );
    
    updateResumeData({
      ...resumeData,
      languages: updated
    });
  };

  const removeLanguage = (id: string) => {
    updateResumeData({
      ...resumeData,
      languages: resumeData.languages.filter(lang => lang.id !== id)
    });
  };

  // Projects
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      link: ''
    };
    
    updateResumeData({
      ...resumeData,
      projects: [...resumeData.projects, newProject]
    });
  };

  const updateProject = (id: string, field: string, value: any) => {
    const updated = resumeData.projects.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    );
    
    updateResumeData({
      ...resumeData,
      projects: updated
    });
  };

  const removeProject = (id: string) => {
    updateResumeData({
      ...resumeData,
      projects: resumeData.projects.filter(project => project.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      <div className="form-tip">
        💡 <strong>Tip:</strong> These sections are optional but can help you stand out. Include certifications relevant to your field, languages if applicable to the job, and projects that demonstrate your skills.
      </div>

      <Tabs defaultValue="certifications" className="w-full">
        <TabsList className="grid w-full grid-cols-3 gap-1 mb-6">
          <TabsTrigger value="certifications" className="flex items-center gap-1 text-xs sm:text-sm px-2 py-2">
            <Award className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Certifications</span>
            <span className="xs:hidden">Certs</span>
          </TabsTrigger>
          <TabsTrigger value="languages" className="flex items-center gap-1 text-xs sm:text-sm px-2 py-2">
            <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Languages</span>
            <span className="xs:hidden">Lang</span>
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-1 text-xs sm:text-sm px-2 py-2">
            <Code className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Projects</span>
            <span className="xs:hidden">Proj</span>
          </TabsTrigger>
        </TabsList>

        {/* Certifications Tab */}
        <TabsContent value="certifications" className="space-y-4">
          {resumeData.certifications.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
              <Award className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground mb-4">No certifications added yet</p>
              <Button onClick={addCertification} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Certification
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {resumeData.certifications.map((cert) => (
                <Card key={cert.id} className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium text-sm">Certification</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCertification(cert.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="input-group">
                      <Label className="text-sm">Certification Name</Label>
                      <Input
                        value={cert.name}
                        onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                        placeholder="e.g. AWS Certified Solutions Architect"
                      />
                    </div>
                    
                    <div className="input-group">
                      <Label className="text-sm">Issuing Organization</Label>
                      <Input
                        value={cert.issuer}
                        onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                        placeholder="e.g. Amazon Web Services"
                      />
                    </div>
                    
                    <div className="input-group">
                      <Label className="text-sm">Date Obtained</Label>
                      <Input
                        type="month"
                        value={cert.date}
                        onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
          
          <Button onClick={addCertification} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Certification
          </Button>
        </TabsContent>

        {/* Languages Tab */}
        <TabsContent value="languages" className="space-y-4">
          {resumeData.languages.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
              <Globe className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground mb-4">No languages added yet</p>
              <Button onClick={addLanguage} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Language
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {resumeData.languages.map((lang) => (
                <Card key={lang.id} className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium text-sm">Language</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLanguage(lang.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="input-group">
                      <Label className="text-sm">Language</Label>
                      <Input
                        value={lang.name}
                        onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                        placeholder="e.g. Spanish"
                      />
                    </div>
                    
                    <div className="input-group">
                      <Label className="text-sm">Proficiency Level</Label>
                      <select 
                        className="w-full p-2 border border-input rounded-md bg-background"
                        value={lang.proficiency}
                        onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)}
                      >
                        <option value="">Select level</option>
                        <option value="Native">Native</option>
                        <option value="Fluent">Fluent</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Beginner">Beginner</option>
                      </select>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
          
          <Button onClick={addLanguage} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Language
          </Button>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-4">
          {resumeData.projects.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
              <Code className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground mb-4">No projects added yet</p>
              <Button onClick={addProject} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {resumeData.projects.map((project) => (
                <Card key={project.id} className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium text-sm">Project</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeProject(project.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="input-group">
                        <Label className="text-sm">Project Name</Label>
                        <Input
                          value={project.name}
                          onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                          placeholder="e.g. E-commerce Website"
                        />
                      </div>
                      
                      <div className="input-group">
                        <Label className="text-sm">Project Link (Optional)</Label>
                        <Input
                          value={project.link || ''}
                          onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                          placeholder="e.g. https://github.com/username/project"
                        />
                      </div>
                    </div>
                    
                    <div className="input-group">
                      <Label className="text-sm">Description</Label>
                      <Textarea
                        value={project.description}
                        onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                        placeholder="Brief description of the project and your role..."
                        rows={3}
                      />
                    </div>
                    
                    <div className="input-group">
                      <Label className="text-sm">Technologies Used</Label>
                      <Input
                        value={project.technologies.join(', ')}
                        onChange={(e) => updateProject(project.id, 'technologies', e.target.value.split(',').map(t => t.trim()).filter(t => t))}
                        placeholder="e.g. React, Node.js, MongoDB"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
          
          <Button onClick={addProject} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdditionalSectionsForm;