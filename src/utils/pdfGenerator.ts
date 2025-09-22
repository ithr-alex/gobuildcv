import html2pdf from 'html2pdf.js';
import { ResumeData } from '@/types/resume';

export const generatePDF = async (resumeData: ResumeData): Promise<void> => {
  try {
    // Get the resume content element
    const element = document.getElementById('resume-content');
    
    if (!element) {
      throw new Error('Resume content element not found');
    }

    // Configure PDF options
    const options = {
      margin: [0.4, 0.4, 0.4, 0.4], // Smaller, uniform margins
      filename: `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
      image: { 
        type: 'jpeg', 
        quality: 0.95 
      },
      html2canvas: { 
        scale: 1.5, // Reduced scale to prevent oversizing
        useCORS: true,
        letterRendering: true,
        allowTaint: false,
        height: window.innerHeight,
        width: 850 // Fixed width to match A4 proportions
      },
      jsPDF: { 
        unit: 'in', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true
      },
      pagebreak: { 
        mode: ['css'] // Simpler page break handling
      }
    };

    // Generate and download PDF
    await html2pdf().set(options).from(element).save();
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};

export const generatePDFBlob = async (resumeData: ResumeData): Promise<Blob> => {
  try {
    const element = document.getElementById('resume-content');
    
    if (!element) {
      throw new Error('Resume content element not found');
    }

    const options = {
      margin: [0.5, 0.5, 0.3, 0.5], // top, right, bottom, left - reduced bottom margin
      image: { 
        type: 'jpeg', 
        quality: 0.98 
      },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true,
        height: null, // Let it auto-calculate height
        width: null   // Let it auto-calculate width
      },
      jsPDF: { 
        unit: 'in', 
        format: 'a4', 
        orientation: 'portrait',
        hotfixes: ['px_scaling'] // Fix scaling issues that might cause empty pages
      },
      pagebreak: { 
        mode: ['avoid-all', 'css', 'legacy']  // Better page break handling
      }
    };

    const pdf = await html2pdf().set(options).from(element).outputPdf('blob');
    return pdf;
    
  } catch (error) {
    console.error('Error generating PDF blob:', error);
    throw new Error('Failed to generate PDF blob.');
  }
};

// Utility function to validate resume data before PDF generation
export const validateResumeForPDF = (resumeData: ResumeData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Check required personal information
  if (!resumeData.personalInfo.fullName?.trim()) {
    errors.push('Full name is required');
  }
  
  if (!resumeData.personalInfo.email?.trim()) {
    errors.push('Email address is required');
  }
  
  if (!resumeData.personalInfo.phone?.trim()) {
    errors.push('Phone number is required');
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (resumeData.personalInfo.email && !emailRegex.test(resumeData.personalInfo.email)) {
    errors.push('Please enter a valid email address');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};