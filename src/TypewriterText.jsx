import React, { useEffect, useState } from "react";

let timer;

export default function TypewriterText({ story, onComplete, onStartTyping }) {
  const [text, setText] = useState("");
  const [started, setStarted] = useState(false);

  const handleGenerate = () => {
    if (started) {
      return;
    }
    setStarted(true);
    if (onStartTyping) onStartTyping();
    
    let i = -1;
    timer = setInterval(() => {
      i++;
      if (i === story.length - 1) {
        clearInterval(timer);
        setStarted(false);
        if (onComplete) onComplete();
      }
      setText((prev) => prev + story[i]);
    }, 10);
  };

  const handleReset = () => {
    setText("");
    clearInterval(timer);
    setStarted(false);
  };

  // Auto-start when story changes
  useEffect(() => {
    handleReset();
    handleGenerate();
  }, [story]);

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      {text}
    </div>
  );
}