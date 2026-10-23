import { useLayoutEffect, useRef } from "react";
import { KeyboardScrollArea } from "../styles/MusicStyles";

export default function KeyboardViewport({ children }) {
  const viewportRef = useRef(null);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const middleC = viewport.querySelector('[data-note="C4"]');
    if (!middleC) return;

    let positioned = false;
    const positionKeyboard = () => {
      if (positioned || viewport.scrollWidth <= viewport.clientWidth) return;
      viewport.scrollLeft = middleC.offsetLeft + middleC.offsetWidth / 2
        - viewport.clientWidth / 2;
      positioned = true;
    };

    positionKeyboard();
    const observer = new ResizeObserver(positionKeyboard);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  return (
    <KeyboardScrollArea
      ref={viewportRef}
      role="region"
      aria-label="鋼琴鍵盤，可左右滑動"
      tabIndex={0}
    >
      {children}
    </KeyboardScrollArea>
  );
}
