import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

interface ResumeTemplateProps {
  resumeData: ResumeData;
}

const ResumeTemplate = ({ resumeData }: ResumeTemplateProps) => {
  const { personalInfo, summary, experience, education, skills, certifications, languages, projects, template } = resumeData;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const formatDateRange = (startDate: string, endDate: string, current: boolean) => {
    const start = formatDate(startDate);
    const end = current ? 'Present' : formatDate(endDate);
    return `${start} - ${end}`;
  };

  // Modern Template
  if (template === 'modern') {
    return (
      <div className="resume-page bg-white text-gray-800 font-sans leading-relaxed">
        {/* Header */}
        <header className="mb-8 border-b-2 border-primary pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{personalInfo.fullName}</h1>
          <h2 className="text-xl text-primary font-medium mb-4">{personalInfo.jobTitle}</h2>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="h-4 w-4" />
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.portfolio && (
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span>{personalInfo.portfolio}</span>
              </div>
            )}
          </div>
        </header>

        {/* Professional Summary */}
        {summary && (
          <section className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">Professional Summary</h3>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">Professional Experience</h3>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{exp.jobTitle}</h4>
                      <p className="text-primary font-medium">{exp.companyName} • {exp.location}</p>
                    </div>
                    <span className="text-sm text-gray-600 whitespace-nowrap">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  {exp.achievements.length > 0 && (
                    <ul className="ml-4 space-y-1">
                      {exp.achievements.map((achievement, idx) => (
                        achievement.trim() && (
                          <li key={idx} className="text-gray-700 text-sm flex items-start">
                            <span className="text-primary mr-2 mt-1.5">•</span>
                            <span>{achievement}</span>
                          </li>
                        )
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">Education</h3>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                    <p className="text-gray-600">{edu.school} • {edu.location}</p>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                  <span className="text-sm text-gray-600">{edu.graduationYear}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">Core Skills</h3>
            <div className="grid grid-cols-3 gap-2">
              {skills.map((skill) => (
                <div key={skill.id} className="text-sm text-gray-700 flex items-center">
                  <span className="text-primary mr-2">•</span>
                  {skill.name}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Additional Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-wide text-sm">Certifications</h3>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id} className="text-sm">
                    <p className="font-medium text-gray-900">{cert.name}</p>
                    <p className="text-gray-600">{cert.issuer}</p>
                    <p className="text-gray-500">{formatDate(cert.date)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section>
              <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-wide text-sm">Languages</h3>
              <div className="space-y-1">
                {languages.map((lang) => (
                  <div key={lang.id} className="text-sm flex justify-between">
                    <span className="text-gray-900">{lang.name}</span>
                    <span className="text-gray-600">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h3 className="font-bold text-gray-900 mb-3 uppercase tracking-wide text-sm">Projects</h3>
              <div className="space-y-2">
                {projects.slice(0, 3).map((project) => (
                  <div key={project.id} className="text-sm">
                    <p className="font-medium text-gray-900">{project.name}</p>
                    <p className="text-gray-600 text-xs leading-relaxed">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <p className="text-gray-500 text-xs">{project.technologies.join(', ')}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  // Classic Template
  if (template === 'classic') {
    return (
      <div className="resume-page bg-white text-gray-900 font-sans">
        {/* Header */}
        <header className="text-center mb-8 border-b border-gray-300 pb-6">
          <h1 className="text-2xl font-bold mb-2">{personalInfo.fullName}</h1>
          <h2 className="text-lg text-gray-700 mb-3">{personalInfo.jobTitle}</h2>
          
          <div className="text-sm text-gray-600 space-y-1">
            {personalInfo.email && <p>{personalInfo.email}</p>}
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.location && <p>{personalInfo.location}</p>}
            {personalInfo.linkedin && <p>{personalInfo.linkedin}</p>}
          </div>
        </header>

        {/* Summary */}
        {summary && (
          <section className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">PROFESSIONAL SUMMARY</h3>
            <p className="text-gray-800">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">WORK EXPERIENCE</h3>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between mb-1">
                  <h4 className="font-bold">{exp.jobTitle}</h4>
                  <span className="text-sm text-gray-600">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <p className="text-gray-700 mb-2">{exp.companyName}, {exp.location}</p>
                {exp.achievements.length > 0 && (
                  <ul className="ml-5 list-disc space-y-1">
                    {exp.achievements.map((achievement, idx) => (
                      achievement.trim() && (
                        <li key={idx} className="text-gray-800 text-sm">{achievement}</li>
                      )
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">EDUCATION</h3>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-semibold">{edu.degree}</h4>
                    <p className="text-gray-700">{edu.school}, {edu.location}</p>
                  </div>
                  <span className="text-gray-600">{edu.graduationYear}</span>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">SKILLS</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {skills.map((skill, idx) => (
                <span key={skill.id} className="text-gray-800">
                  {skill.name}{idx < skills.length - 1 ? ',' : ''}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  // Minimal Template
  return (
    <div className="resume-page bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-light mb-1">{personalInfo.fullName}</h1>
        <h2 className="text-base text-gray-600 mb-4">{personalInfo.jobTitle}</h2>
        
        <div className="text-sm text-gray-600 flex flex-wrap gap-4">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-8">
          <p className="text-gray-800 leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Experience</h3>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-6">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-medium">{exp.jobTitle}, {exp.companyName}</h4>
                <span className="text-sm text-gray-500">
                  {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                </span>
              </div>
              {exp.achievements.length > 0 && (
                <div className="mt-2 space-y-1">
                  {exp.achievements.map((achievement, idx) => (
                    achievement.trim() && (
                      <p key={idx} className="text-sm text-gray-700 leading-relaxed">
                        {achievement}
                      </p>
                    )
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-8">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Education</h3>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <span className="font-medium">{edu.degree}</span>
                <span className="text-sm text-gray-500">{edu.graduationYear}</span>
              </div>
              <p className="text-sm text-gray-600">{edu.school}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Skills</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {skills.map(skill => skill.name).join(', ')}
          </p>
        </section>
      )}
    </div>
  );
};

export default ResumeTemplate;