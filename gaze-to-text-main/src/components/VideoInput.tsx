import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video, Upload, StopCircle, Play } from "lucide-react";
import { toast } from "sonner";

interface VideoInputProps {
  onVideoSubmit: (videoBlob: Blob) => void;
}

const VideoInput = ({ onVideoSubmit }: VideoInputProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks: Blob[] = [];
      
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        setRecordedBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      toast.success("Recording started");
    } catch (error) {
      toast.error("Failed to access camera");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.success("Recording stopped");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedVideo(file);
      setRecordedBlob(null);
      toast.success("Video uploaded");
    }
  };

  const handleSubmit = () => {
    const videoToSubmit = recordedBlob || uploadedVideo;
    if (videoToSubmit) {
      onVideoSubmit(videoToSubmit);
    } else {
      toast.error("Please record or upload a video first");
    }
  };

  return (
    <Card className="p-6 space-y-6 shadow-medium hover:shadow-strong transition-shadow">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Webcam Recording */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Video className="w-5 h-5 text-primary" />
            Record Live
          </h3>
          <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full h-full object-cover"
            />
          </div>
          {!isRecording ? (
            <Button 
              onClick={startRecording} 
              className="w-full gap-2"
              variant="default"
            >
              <Play className="w-4 h-4" />
              Start Recording
            </Button>
          ) : (
            <Button 
              onClick={stopRecording} 
              className="w-full gap-2"
              variant="destructive"
            >
              <StopCircle className="w-4 h-4" />
              Stop Recording
            </Button>
          )}
        </div>

        {/* Video Upload */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Upload className="w-5 h-5 text-secondary" />
            Upload Video
          </h3>
          <div 
            className="relative aspect-video bg-muted rounded-lg border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer flex items-center justify-center"
            onClick={() => fileInputRef.current?.click()}
          >
            {uploadedVideo ? (
              <div className="text-center p-4">
                <Video className="w-12 h-12 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">{uploadedVideo.name}</p>
              </div>
            ) : (
              <div className="text-center p-4">
                <Upload className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Click to upload video</p>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>

      <Button 
        onClick={handleSubmit} 
        className="w-full gap-2"
        size="lg"
        disabled={!recordedBlob && !uploadedVideo}
      >
        Translate Video
      </Button>
    </Card>
  );
};

export default VideoInput;
