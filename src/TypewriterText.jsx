import React, { useEffect, useState, useRef } from "react";
import StyledText from "./StyledText";

export default function TypewriterText({ story, onComplete, onStartTyping }) {
  const [text, setText] = useState("");
  const timerRef = useRef(null);

  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Reset text
    setText("");

    // Notify typing started
    if (onStartTyping) onStartTyping();

    // Start typing animation
    let i = 0;
    timerRef.current = setInterval(() => {
      setText(story.slice(0, i + 1));
      i++;

      if (i > story.length) {
        clearInterval(timerRef.current);
        if (onComplete) onComplete();
      }
    }, 10);

    // Cleanup on unmount or story change
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [story]);

  return <StyledText text={text} />;
}