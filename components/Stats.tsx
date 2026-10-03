export const Stats = ({ className }: { className?: string }) => (
  <div
    className={`wrap ${className}`}
  >
    <div className="card stats">
      {[
        ["10+ Years", "In Operation"],
        ["250+", "Projects Delivered"],
        ["16 +", "Technology Partners"],
        ["4 Cities", "Nationwide"]].map(([a, b]) => (
          <div
            className="card stat gborder-new"
            key={a}><b>{a}</b><span>{b}</span></div>)
        )}
    </div></div>
);
