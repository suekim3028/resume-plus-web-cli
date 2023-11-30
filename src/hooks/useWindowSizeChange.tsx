import { useCallback, useEffect, useState } from "react";

export const useWindowSizeChange = () => {
  const [viewport, setViewport] = useState<{
    width: number;
    scale: number;
    height: number;
  }>({
    width: 0,
    scale: 1,
    height: 0,
  });

  const getSize = useCallback(() => {
    const width =
      typeof window === "undefined"
        ? WINDOW_MAX_WIDTH
        : Math.max(
            Math.min(window.innerWidth, WINDOW_MAX_WIDTH),
            WINDOW_MIN_WIDTH
          );
    const scale = typeof window === "undefined" ? 1 : window.innerWidth / width;
    const height = typeof window === "undefined" ? 0 : window.innerHeight;
    return { width, scale, height };
  }, []);

  const handleResize = useCallback(() => {
    setViewport(getSize());
  }, []);

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { ...viewport };
};

const WINDOW_MAX_WIDTH = 500;
const WINDOW_MIN_WIDTH = 350;
