import { useEffect } from "react";

export const useEvent = (event, handler, passive = false) => {
  useEffect(() => {
    window.addEventListener(event, handler, passive);
    return () => {
      window.removeEventListener(event, handler);
    };
  });
};
