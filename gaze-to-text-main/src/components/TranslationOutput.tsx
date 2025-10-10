import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Save, Volume2, Check } from "lucide-react";
import { toast } from "sonner";

interface TranslationOutputProps {
  text: string;
  isLoading: boolean;
}

const TranslationOutput = ({ text, isLoading }: TranslationOutputProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "translation.txt";
    a.click();
    toast.success("Translation saved");
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
      toast.success("Playing audio");
    } else {
      toast.error("Text-to-speech not supported");
    }
  };

  return (
    <Card className="p-6 space-y-4 shadow-medium">
      <h3 className="text-lg font-semibold">Translation Result</h3>
      
      <div className="min-h-[200px] bg-muted rounded-lg p-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">Translating your video...</p>
          </div>
        ) : text ? (
          <p className="text-foreground leading-relaxed">{text}</p>
        ) : (
          <p className="text-muted-foreground text-center">Your translation will appear here</p>
        )}
      </div>

      {text && !isLoading && (
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="gap-2"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            className="gap-2"
          >
            <Save className="w-4 h-4" />
            Save
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSpeak}
            className="gap-2"
          >
            <Volume2 className="w-4 h-4" />
            Speak
          </Button>
        </div>
      )}
    </Card>
  );
};

export default TranslationOutput;
