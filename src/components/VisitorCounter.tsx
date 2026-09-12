const COUNTER_BADGE_URL =
  "https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fdigimafia.github.io%2Fmobile-bootham%2F&title=Visitors&edge_flat=false";

export default function VisitorCounter() {
  return (
    <div className="visitor-counter" title="Total visitors">
      <span className="visitor-counter__dot" aria-hidden="true" />
      <span>Visitors</span>
      <img src={COUNTER_BADGE_URL} alt="Visitor count" />
    </div>
  );
}
