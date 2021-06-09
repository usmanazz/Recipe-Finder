import { useEffect, useState } from "react";

const getWidth = () => window.innerWidth;

export const useCurrentWidth = () => {
  // current window width
  const [width, setWidth] = useState(getWidth());

  // only runs once to add resize listener because it has no dependencies
  useEffect(() => {
    const resizeListener = () => {
      // change width to new curr width
      setWidth(getWidth());
    };

    // set resize listener
    window.addEventListener("resize", resizeListener);

    // remove event listener
    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  return width;
};
