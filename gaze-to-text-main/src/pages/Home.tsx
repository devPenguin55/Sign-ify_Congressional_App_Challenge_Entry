import { useState } from "react";
import Navigation from "@/components/Navigation";
import VideoInput from "@/components/VideoInput";
import LanguageSelector from "@/components/LanguageSelector";
import TranslationOutput from "@/components/TranslationOutput";
import OnboardingTooltip from "@/components/OnboardingTooltip";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import heroImage from "@/assets/hero-asl.jpg";

const Home = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [translatedText, setTranslatedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const heroAnimation = useScrollAnimation();
  const contentAnimation = useScrollAnimation();

  const handleVideoSubmit = async (videoBlob: Blob) => {
    setIsLoading(true);
    setTranslatedText("");

    try {
      const formData = new FormData();
      formData.append("video", videoBlob);
      formData.append("language", selectedLanguage);

      const response = await fetch("/videoTranslate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Translation failed");
      }

      const data = await response.json();
      setTranslatedText(data.text || "");
    } catch (error) {
      console.error("Translation error:", error);
      setTranslatedText("Error: Failed to translate video. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      <OnboardingTooltip />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src={heroImage}
            alt="ASL Translation"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            ref={heroAnimation.ref as any}
            className={`max-w-3xl mx-auto text-center space-y-6 transition-all duration-700 ${
              heroAnimation.isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Break Language Barriers
              </span>
              <br />
              with AI-Powered ASL Translation
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transform sign language into text instantly. Record or upload your
              ASL video and get accurate translations in multiple languages.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={contentAnimation.ref as any}
            className={`max-w-5xl mx-auto space-y-8 transition-all duration-700 delay-200 ${
              contentAnimation.isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-10"
            }`}
          >
            <VideoInput onVideoSubmit={handleVideoSubmit} />
            
            <div className="max-w-md">
              <LanguageSelector
                value={selectedLanguage}
                onChange={setSelectedLanguage}
              />
            </div>

            <TranslationOutput text={translatedText} isLoading={isLoading} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
