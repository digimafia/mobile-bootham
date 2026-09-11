import { useEffect, useState } from "react";

type Props = { onComplete: () => void };

const messages = [
  "Bootham list-ah check pannuthu... 👀",
  "Phone usage report paakuthu... 📱",
  "Aiyo... peru kandupidichachu! 😈",
];

export default function CheckingScreen({ onComplete }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setIndex(1), 1200),
      window.setTimeout(() => setIndex(2), 2400),
      window.setTimeout(onComplete, 3500),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [onComplete]);

  return (
    <section className="screen checking-screen">
      <video
        className="loading-background-video"
        src="/loading.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="loading-night-overlay" />
      <div className="checking-content">
        <div className="loader" aria-hidden="true"><span /></div>
        <h2>{messages[index]}</h2>
        <div className="loading-bar"><div className="loading-fill" /></div>
      </div>
    </section>
  );
}
