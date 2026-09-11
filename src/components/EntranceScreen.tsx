import { useRef, useState } from "react";
import { publicAsset } from "../publicAsset";

type Props = { onNext: () => void };

export default function EntranceScreen({ onNext }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [videoUnavailable, setVideoUnavailable] = useState(false);

  const openDoor = async () => {
    if (videoUnavailable || !videoRef.current) {
      onNext();
      return;
    }

    setIsOpening(true);
    videoRef.current.currentTime = 0;
    videoRef.current.muted = false;

    try {
      await videoRef.current.play();
    } catch {
      setIsOpening(false);
      setVideoUnavailable(true);
    }
  };

  return (
    <section className={`screen entrance-screen${isOpening ? " is-opening" : ""}`}>
      <video
        ref={videoRef}
        className="door-video"
        src={publicAsset("door-open.mp4")}
        playsInline
        preload="auto"
        onEnded={onNext}
        onError={() => setVideoUnavailable(true)}
      />
      <div className="entrance-shade" />
      <div className="entrance-content">
        <button className="primary-btn glow-btn" onClick={openDoor} disabled={isOpening}>
          {isOpening ? "🚪 Door Open Aaguthu..." : "🚪 Bootham Door Open Pannu"}
        </button>
      </div>
    </section>
  );
}
