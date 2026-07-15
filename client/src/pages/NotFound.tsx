import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home, MessageCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-lg mx-4 shadow-lg border border-border">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/10 rounded-full animate-pulse" />
              <AlertCircle className="relative h-16 w-16 text-cyan-600 dark:text-cyan-400" />
            </div>
          </div>

          <h1 className="text-5xl font-bold mb-2 font-[Sora]">404</h1>

          <h2 className="text-xl font-semibold mb-4">
            Page Not Found
          </h2>

          <p className="text-muted-foreground mb-8 leading-relaxed">
            Sorry, the page you are looking for doesn't exist.
            <br />
            It may have been moved or deleted.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleGoHome}
              className="btn-gradient"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
            <a
              href="https://wa.me/9779843818304?text=Hi%20Kishor%2C%20I%20need%20help%20recovering%20my%20account"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-xl transition-colors"
            >
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
