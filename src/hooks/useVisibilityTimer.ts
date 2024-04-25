import { useState, useEffect } from "react";

const useVisibilityTimer = (
  initialVisibility: boolean = false,
  delay: number = 500
) => {
  const [isVisible, setIsVisible] = useState(initialVisibility);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isVisible;
};

export default useVisibilityTimer;
