import { useEffect, useRef, useState } from "react";

type SplashProps = {
  onComplete: () => void;
};

export function Splash({ onComplete }: SplashProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setFading(true);
      setTimeout(onComplete, 800);
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-contain"
        src="./Resources/MD7 Logo Flair.mp4"
        autoPlay
        muted
        playsInline
      />
    </div>
  );
}
