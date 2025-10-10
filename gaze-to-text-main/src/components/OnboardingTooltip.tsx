import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Hand, Globe, Sparkles } from "lucide-react";

const OnboardingTooltip = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenTooltip = localStorage.getItem("hasSeenOnboarding");
    if (!hasSeenTooltip) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("hasSeenOnboarding", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-6 space-y-6 shadow-strong animate-scale-in">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome to Sign-ify!
            </h2>
            <p className="text-muted-foreground">
              Get started in three simple steps:
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDismiss}
            className="shrink-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Hand className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">1. Sign your message</h3>
              <p className="text-sm text-muted-foreground">
                Record live using your webcam or upload a pre-recorded video
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">2. Choose a language</h3>
              <p className="text-sm text-muted-foreground">
                Select your desired output language from the dropdown
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">3. Get instant translation</h3>
              <p className="text-sm text-muted-foreground">
                Your ASL signs will be translated to text instantly
              </p>
            </div>
          </div>
        </div>

        <Button onClick={handleDismiss} className="w-full" size="lg">
          Got it, let's start!
        </Button>
      </Card>
    </div>
  );
};

export default OnboardingTooltip;
