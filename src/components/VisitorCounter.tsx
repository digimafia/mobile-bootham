const COUNTER_BADGE_URL =
  "https://visitor-badge.laobi.icu/badge?page_id=digimafia.mobile-bootham";

export default function VisitorCounter() {
  return (
    <div className="visitor-counter" title="Total visitors">
      <span className="visitor-counter__dot" aria-hidden="true" />
      <span>Visitors</span>
      <img src={COUNTER_BADGE_URL} alt="Visitor count" />
    </div>
  );
}
