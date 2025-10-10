import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Brain, Heart, Users, Zap } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
const About = () => {
  const heroAnimation = useScrollAnimation();
  const storyAnimation = useScrollAnimation();
  const featuresAnimation = useScrollAnimation();
  const features = [{
    icon: Brain,
    title: "AI-Powered Translation",
    description: "Advanced machine learning models trained on thousands of ASL signs for accurate real-time translation."
  }, {
    icon: Zap,
    title: "Instant Processing",
    description: "Get your translations in seconds, not minutes. Our optimized algorithms work at lightning speed."
  }, {
    icon: Users,
    title: "Inclusive Design",
    description: "Built with accessibility in mind, making communication easier for the deaf and hard-of-hearing community."
  }, {
    icon: Heart,
    title: "Community Driven",
    description: "Continuously improving through feedback from ASL users and experts worldwide."
  }];
  return <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <section className="pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            <div ref={heroAnimation.ref as any} className={`text-center space-y-4 transition-all duration-700 ${heroAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent pb-2">
                About Sign-ify
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our mission is to bridge communication gaps and make the world more
                accessible through innovative AI technology.
              </p>
            </div>

            <Card ref={storyAnimation.ref as any} className={`p-8 shadow-medium transition-all duration-700 delay-200 ${storyAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Sign-ify was born from a simple yet powerful idea: everyone
                  deserves to communicate freely, regardless of language barriers or
                  physical limitations.
                </p>
                <p>Using machine-learning, we've developed a platform that can understand American Sign Language and translate it into written text across multiple languages.</p>
                <p>Sign-ify was made by two high school students who simply are passionate about creating technology that truly makes a difference in people's lives.</p>
              </div>
            </Card>

            <div ref={featuresAnimation.ref as any} className={`grid md:grid-cols-2 gap-6 transition-all duration-700 delay-300 ${featuresAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              {features.map(feature => {
              const Icon = feature.icon;
              return <Card key={feature.title} className="p-6 hover:shadow-medium transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </Card>;
            })}
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default About;