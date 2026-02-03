import React from 'react';

export default function StyledText({ text }) {
  const renderText = () => {
    // Split by line breaks
    const lines = text.split('\n');
    
    return lines.map((line, lineIndex) => (
      <React.Fragment key={lineIndex}>
        {line.split(' ').map((word, wordIndex) => {
          // Check for bold (**word**)
          if (word.startsWith('**') && word.endsWith('**')) {
            const cleanWord = word.slice(2, -2);
            return (
              <strong key={`${lineIndex}-${wordIndex}`}>
                {cleanWord}{' '}
              </strong>
            );
          }
          // Check for italic (*word*)
          if (word.startsWith('*') && word.endsWith('*')) {
            const cleanWord = word.slice(1, -1);
            return (
              <em key={`${lineIndex}-${wordIndex}`}>
                {cleanWord}{' '}
              </em>
            );
          }
          return word + ' ';
        })}
        {lineIndex < lines.length - 1 && <><br /><br /></>}
      </React.Fragment>
    ));
  };

  return <div>{renderText()}</div>;
}