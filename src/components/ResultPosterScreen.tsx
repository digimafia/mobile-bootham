import { useRef, useState } from "react";
import { toBlob } from "html-to-image";
import type { KidDetails } from "../App";
import { publicAsset } from "../publicAsset";

type Props = { kid: KidDetails; onRestart: () => void };
type Action = "download" | null;

const EXPORT_WIDTH = 1080;
const EXPORT_HEIGHT = 1350;

export default function ResultPosterScreen({ kid, onRestart }: Props) {
  const posterRef = useRef<HTMLDivElement>(null);
  const [activeAction, setActiveAction] = useState<Action>(null);
  const [status, setStatus] = useState("");

  const safeName = kid.name.trim() || "BOOTHAM FRIEND";
  const fileName = `mobile-bootham-${safeName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "poster"}.png`;
  const shareText = `${safeName}! Phone romba paakureengala? 👀 Aduthu neenga thaan! 👻 — Mobile Bootham`;

  const createPosterBlob = async () => {
    const posterElement = posterRef.current;
    if (!posterElement) throw new Error("Poster is not ready");
    if (document.fonts?.ready) await document.fonts.ready;

    const previewWidth = posterElement.offsetWidth;
    const previewHeight = posterElement.offsetHeight;
    const exportScale = Math.min(
      EXPORT_WIDTH / previewWidth,
      EXPORT_HEIGHT / previewHeight,
    );

    const blob = await toBlob(posterElement, {
      width: previewWidth,
      height: previewHeight,
      pixelRatio: exportScale,
      cacheBust: true,
      backgroundColor: "#1a0828",
      style: {
        borderRadius: "0",
      },
    });

    if (!blob) throw new Error("PNG could not be created");
    return blob;
  };

  const downloadBlob = (blob: Blob) => {
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  };

  const downloadPoster = async () => {
    setActiveAction("download");
    setStatus("Poster ready pannuren...");
    try {
      downloadBlob(await createPosterBlob());
      setStatus("Poster PNG save aagiduchu! ✅");
    } catch {
      setStatus("Poster save panna mudiyala. Thirumba try pannunga.");
    } finally {
      setActiveAction(null);
    }
  };

  const openWhatsApp = () => {
    const pageUrl = /^https?:/.test(window.location.href) ? `\n\n${window.location.href}` : "";
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + pageUrl)}`, "_blank", "noopener,noreferrer");
    setStatus("WhatsApp open aaguthu. Poster image-ah attach panni share pannunga.");
  };

  return (
    <section className="screen result-screen">
      <p className="eyebrow">👻 Bootham Message Ready!</p>
      <div
        ref={posterRef}
        className="poster"
        style={{ backgroundImage: `url(${publicAsset("poster.png")})` }}
      >
        <div className="poster-content">
          <p className="poster-kicker">MOBILE BOOTHAM WARNING</p>
          <h1>{safeName.toLocaleUpperCase()}!</h1>
          <p className="poster-question">Phone romba paakureengala? 👀</p>
          <h2>ADUTHU NEENGA THAAN!</h2>
          <span>👻 Mobile Bootham</span>
        </div>
      </div>
      <div className="result-actions">
        <button className="primary-btn" onClick={downloadPoster} disabled={activeAction !== null}>
          {activeAction === "download" ? "⏳ Ready Aaguthu..." : "⬇️ Image Save Pannu"}
        </button>
        <a
          className="primary-btn instagram-btn"
          href="https://www.instagram.com/mobilebootham?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noreferrer"
        >
          📸 Follow Mobile Bootham
        </a>
        <button className="whatsapp-btn" onClick={openWhatsApp} disabled={activeAction !== null}>
          💬 WhatsApp-la Share Pannu
        </button>
        <button className="text-btn" onClick={onRestart}>➕ Vera Peru Add Pannu</button>
      </div>
      <p className="action-status" role="status" aria-live="polite">{status}</p>
    </section>
  );
}
