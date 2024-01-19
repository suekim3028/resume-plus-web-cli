export const WINDOW_MIN_WIDTH = 320;

const SCREEN_WIDTH =
  typeof window !== "undefined"
    ? Math.max(window.innerWidth, WINDOW_MIN_WIDTH)
    : 0;
const SCREEN_HEIGHT = typeof window !== "undefined" ? window.innerHeight : 0;

export { SCREEN_WIDTH, SCREEN_HEIGHT };
