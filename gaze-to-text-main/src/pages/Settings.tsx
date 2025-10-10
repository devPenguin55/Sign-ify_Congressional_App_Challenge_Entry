import Navigation from "@/components/Navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { useSettings } from "@/contexts/SettingsContext";
import { Globe, Moon, Sun, Volume2, History } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
const languages = [{
  code: "en",
  name: "English"
}, {
  code: "es",
  name: "Spanish (Español)"
}, {
  code: "fr",
  name: "French (Français)"
}, {
  code: "de",
  name: "German (Deutsch)"
}, {
  code: "it",
  name: "Italian (Italiano)"
}, {
  code: "pt",
  name: "Portuguese (Português)"
}, {
  code: "zh",
  name: "Chinese (中文)"
}, {
  code: "ja",
  name: "Japanese (日本語)"
}, {
  code: "ko",
  name: "Korean (한국어)"
}, {
  code: "ar",
  name: "Arabic (العربية)"
}];
const Settings = () => {
  const {
    theme,
    setTheme
  } = useTheme();
  const {
    uiLanguage,
    setUILanguage,
    autoPlayTranslation,
    setAutoPlayTranslation,
    saveVideoHistory,
    setSaveVideoHistory
  } = useSettings();
  const headerAnimation = useScrollAnimation();
  const appearanceAnimation = useScrollAnimation();
  const languageAnimation = useScrollAnimation();
  const translationAnimation = useScrollAnimation();
  return <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div ref={headerAnimation.ref as any} className={`max-w-4xl mx-auto space-y-8 transition-all duration-700 ${headerAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent pb-2">Settings</h1>
            <p className="text-muted-foreground text-lg">
              Customize your Sign-ify experience
            </p>
          </div>

          <div className="space-y-6">
            {/* Appearance Settings */}
            <Card ref={appearanceAnimation.ref as any} className={`transition-all duration-700 delay-100 ${appearanceAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="w-5 h-5 text-primary" />
                  Appearance
                </CardTitle>
                <CardDescription>
                  Customize how Sign-ify looks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="theme" className="text-base">Theme</Label>
                    <p className="text-sm text-muted-foreground">
                      Choose between light and dark mode
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4" />
                    <Switch id="theme" checked={theme === "dark"} onCheckedChange={checked => setTheme(checked ? "dark" : "light")} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Language Settings */}
            <Card ref={languageAnimation.ref as any} className={`transition-all duration-700 delay-200 ${languageAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Language
                </CardTitle>
                <CardDescription>
                  Select your preferred interface language
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="ui-language">Interface Language</Label>
                  <Select value={uiLanguage} onValueChange={setUILanguage}>
                    <SelectTrigger id="ui-language" className="w-full">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map(lang => <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Note: Full translations coming soon. Currently affects select menus only.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Translation Settings */}
            <Card ref={translationAnimation.ref as any} className={`transition-all duration-700 delay-300 ${translationAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-primary" />
                  Translation Preferences
                </CardTitle>
                <CardDescription>
                  Configure how translations work
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-play" className="text-base">Auto-play Audio</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically play translated text as audio
                    </p>
                  </div>
                  <Switch id="auto-play" checked={autoPlayTranslation} onCheckedChange={setAutoPlayTranslation} />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="save-history" className="text-base flex items-center gap-2">
                      <History className="w-4 h-4" />
                      Save Translation History
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Keep a local record of your translations
                    </p>
                  </div>
                  <Switch id="save-history" checked={saveVideoHistory} onCheckedChange={setSaveVideoHistory} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>;
};
export default Settings;