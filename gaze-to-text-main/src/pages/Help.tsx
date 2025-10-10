import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Video, Upload, Globe, HelpCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Help = () => {
  const headerAnimation = useScrollAnimation();
  const guidesAnimation = useScrollAnimation();
  const faqAnimation = useScrollAnimation();

  const guides = [
    {
      icon: Video,
      title: "Recording with Webcam",
      steps: [
        "Click the 'Start Recording' button on the home page",
        "Allow camera access when prompted by your browser",
        "Position yourself so your hands and upper body are clearly visible",
        "Perform your ASL signs at a natural pace",
        "Click 'Stop Recording' when finished",
        "Review your recording and submit for translation",
      ],
    },
    {
      icon: Upload,
      title: "Uploading Video Files",
      steps: [
        "Click the upload area or 'Upload Video' button",
        "Select a video file from your device (MP4, MOV, WebM formats supported)",
        "Ensure the video clearly shows ASL signs",
        "Wait for the upload to complete",
        "Select your output language and submit",
      ],
    },
    {
      icon: Globe,
      title: "Choosing Languages",
      steps: [
        "Use the language dropdown below the video input",
        "Select from 10+ supported languages",
        "The translation will appear in your chosen language",
        "You can change languages and re-translate anytime",
      ],
    },
  ];

  const faqs = [
    {
      question: "What video formats are supported?",
      answer: "Sign-ify supports most common video formats including MP4, MOV, WebM, and AVI. For best results, use well-lit videos with clear visibility of hand movements.",
    },
    {
      question: "How accurate is the translation?",
      answer: "Our AI model has been trained on thousands of ASL signs and achieves high accuracy for common phrases and expressions. Accuracy may vary with lighting conditions, camera angle, and signing speed.",
    },
    {
      question: "Is my video data stored?",
      answer: "No, we do not store your videos. All processing happens in real-time and videos are immediately deleted after translation. We take your privacy seriously.",
    },
    {
      question: "Can I use this offline?",
      answer: "Currently, Sign-ify requires an internet connection to perform translations as processing happens on our servers. We're working on an offline mode for future releases.",
    },
    {
      question: "What if the translation isn't accurate?",
      answer: "Try recording in better lighting, ensuring your hands are clearly visible, and signing at a moderate pace. You can also submit feedback to help us improve.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <section className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            <div 
              ref={headerAnimation.ref as any}
              className={`text-center space-y-4 transition-all duration-700 ${
                headerAnimation.isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Help Center
              </h1>
              <p className="text-lg text-muted-foreground">
                Everything you need to know about using Sign-ify
              </p>
            </div>

            <div 
              ref={guidesAnimation.ref as any}
              className={`space-y-6 transition-all duration-700 delay-100 ${
                guidesAnimation.isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-2xl font-bold">Getting Started</h2>
              {guides.map((guide) => {
                const Icon = guide.icon;
                return (
                  <Card key={guide.title} className="p-6 shadow-medium">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-3">
                          {guide.title}
                        </h3>
                        <ol className="space-y-2">
                          {guide.steps.map((step, index) => (
                            <li key={index} className="flex gap-2">
                              <span className="text-primary font-semibold shrink-0">
                                {index + 1}.
                              </span>
                              <span className="text-muted-foreground">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div 
              ref={faqAnimation.ref as any}
              className={`space-y-6 transition-all duration-700 delay-200 ${
                faqAnimation.isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-primary" />
                Frequently Asked Questions
              </h2>
              <Card className="shadow-medium overflow-hidden">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="px-6 hover:bg-muted/50">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help;
