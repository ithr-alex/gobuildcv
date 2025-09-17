import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ResumeData } from "@/types/resume";

interface SummaryFormProps {
  resumeData: ResumeData;
  updateResumeData: (data: ResumeData) => void;
}

const SummaryForm = ({ resumeData, updateResumeData }: SummaryFormProps) => {
  const handleSummaryChange = (value: string) => {
    updateResumeData({
      ...resumeData,
      summary: value
    });
  };

  const wordCount = resumeData.summary.trim().split(' ').filter(word => word).length;

  return (
    <div className="space-y-6">
      <div className="form-tip">
        💡 <strong>Tip:</strong> Write a compelling 2-3 sentence summary highlighting your key skills, experience, and career goals. Use keywords from the job description.
      </div>

      <div className="input-group">
        <Label htmlFor="summary" className="text-sm font-medium">
          Professional Summary
        </Label>
        <Textarea
          id="summary"
          value={resumeData.summary}
          onChange={(e) => handleSummaryChange(e.target.value)}
          placeholder="e.g. Experienced software engineer with 5+ years developing scalable web applications. Proven track record of leading cross-functional teams and delivering projects 20% ahead of schedule. Seeking to leverage technical expertise and leadership skills to drive innovation at a forward-thinking technology company."
          className="mt-1 min-h-[120px] resize-none"
          maxLength={500}
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Keep it concise and impactful (50-100 words recommended)</span>
          <span className={wordCount > 100 ? 'text-warning' : ''}>
            {wordCount} words
          </span>
        </div>
      </div>

      {/* Example summaries */}
      <div className="bg-muted/30 p-4 rounded-lg">
        <h4 className="font-medium text-sm mb-3">Example Summaries:</h4>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="p-3 bg-white rounded border-l-2 border-primary">
            <p className="font-medium text-foreground mb-1">Software Engineer:</p>
            <p>"Full-stack developer with 3+ years building responsive web applications using React and Node.js. Delivered 15+ projects increasing user engagement by 40%. Passionate about clean code and user-centered design."</p>
          </div>
          
          <div className="p-3 bg-white rounded border-l-2 border-accent">
            <p className="font-medium text-foreground mb-1">Marketing Manager:</p>
            <p>"Results-driven marketing professional with 5 years experience in digital campaigns and brand management. Led initiatives that increased brand awareness by 60% and generated $2M in revenue. Expert in data-driven strategy and team leadership."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryForm;