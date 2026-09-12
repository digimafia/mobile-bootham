import { useEffect, useState } from "react";

const COUNTER_ENDPOINT = "https://api.counterapi.dev/v1/mobile-bootham/visits";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const alreadyCounted = sessionStorage.getItem("mobile-bootham-visitor-counted");

    const loadCount = async () => {
      try {
        const response = await fetch(alreadyCounted ? COUNTER_ENDPOINT : `${COUNTER_ENDPOINT}/up`);
        if (!response.ok) throw new Error("Counter request failed");
        const data = (await response.json()) as { count?: number };
        if (!cancelled && typeof data.count === "number") setCount(data.count);
        if (!alreadyCounted) sessionStorage.setItem("mobile-bootham-visitor-counted", "true");
      } catch {
        if (!cancelled) setCount(null);
      }
    };

    void loadCount();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="visitor-counter" aria-live="polite" title="Total visitors">
      <span className="visitor-counter__dot" aria-hidden="true" />
      <span>Visitors</span>
      <strong>{count === null ? "—" : count.toLocaleString("en-IN")}</strong>
    </div>
  );
}
