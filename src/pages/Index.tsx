import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, FileText, Download, Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FileText className="h-6 w-6 text-primary" />,
      title: "ATS-Friendly Format",
      description: "Resumes optimized for Applicant Tracking Systems"
    },
    {
      icon: <Download className="h-6 w-6 text-primary" />,
      title: "Instant PDF Download",
      description: "High-quality PDF generation ready for applications"
    },
    {
      icon: <Star className="h-6 w-6 text-primary" />,
      title: "Professional Templates",
      description: "Multiple clean, recruiter-approved designs"
    }
  ];

  const benefits = [
    "100% Free - No hidden fees or subscriptions",
    "No account required - Start building immediately",
    "ATS-optimized formatting for maximum visibility",
    "Professional templates used by Fortune 500 companies",
    "Instant PDF download - No waiting or processing time",
    "Mobile-friendly design - Build on any device"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-gray-800">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">SmartResume</span>
            </div>
            <Badge variant="secondary" className="hidden sm:block">
              100% Free Forever
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Create Your Free
            <span className="block text-primary">Professional Resume</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto px-4">
            Fill in your details and instantly get a recruiter-approved, ATS-friendly resume in PDF format. 
            No signup required, completely free.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => navigate('/builder')}
              className="text-lg px-8 py-6 bg-primary hover:bg-primary-dark"
            >
              Start Building Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/builder')}
              className="text-lg px-8 py-6"
            >
              See Templates
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>No Registration Required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>Completely Free</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>ATS Optimized</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Why Choose SmartResume Builder?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-card rounded-2xl p-6 sm:p-8 md:p-12 shadow-lg max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">
            Everything You Need to Land Your Dream Job
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button 
              size="lg"
              onClick={() => navigate('/builder')}
              className="bg-primary hover:bg-primary-dark text-lg px-8 py-6"
            >
              Start Creating Your Resume
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 SmartResume Builder. Create professional resumes for free.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;