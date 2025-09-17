import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileText, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <FileText className="h-20 w-20 text-primary mx-auto mb-4" />
          <h1 className="mb-4 text-6xl font-bold text-foreground">404</h1>
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Page Not Found</h2>
          <p className="mb-8 text-muted-foreground">
            Sorry, the page you're looking for doesn't exist. Let's get you back to building your resume.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={() => window.location.href = '/'}
            className="bg-primary hover:bg-primary-dark"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => window.location.href = '/builder'}
          >
            Resume Builder
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
