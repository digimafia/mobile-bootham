import { useEffect, useRef, useState } from "react";

type Props = { onNext: () => void };

export default function BoothamVideoScreen({ onNext }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoUnavailable, setVideoUnavailable] = useState(false);
  const [needsSound, setNeedsSound] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    void video.play().catch(() => {
      video.muted = true;
      setNeedsSound(true);
      void video.play();
    });
  }, []);

  const enableSound = async () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    await video.play();
    setNeedsSound(false);
  };

  return (
    <section className="screen bootham-video-screen">
      {!videoUnavailable ? (
        <video
          ref={videoRef}
          className="bootham-background-video"
          src="/booth-video.mp4"
          playsInline
          autoPlay
          loop
          onError={() => setVideoUnavailable(true)}
        />
      ) : (
        <div className="bootham-video-fallback" role="img" aria-label="Bootham video placeholder">
          <span>👻</span>
        </div>
      )}
      <div className="video-night-overlay" />
      {needsSound && (
        <button className="sound-btn" onClick={enableSound}>
          🔊 Sound On
        </button>
      )}
      <div className="bootham-overlay-content">
        <p>
          Unga veetla phone romba paakura pasanga irundha, avanga pera sollunga
        </p>
        <button className="primary-btn glow-btn" onClick={onNext}>
          👻 Perai Sollunga
        </button>
      </div>
    </section>
  );
}
