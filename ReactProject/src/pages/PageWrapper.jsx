import { useScale } from "./useScale";

export default function PageWrapper({ children, baseWidth = 365, baseHeight = 665}) {
  const scale = useScale(baseWidth, baseHeight);
  return (
    <div className="Main">
      <div
        className="Stage"
        style={{ transform: `translateX(-50%) scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}