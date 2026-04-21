 //Не використовується
import { useEffect, useState } from "react";
import "./Main.css";

export default function RotateBlocker({ children }) {
  const [isPortrait, setIsPortrait] = useState(window.innerHeight >= window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight >= window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  if (!isPortrait) {
    return (
      <div className="rotate-warning">
        Переверніть телефон у вертикальне положення
      </div>
    );
  }

  return children;
}
