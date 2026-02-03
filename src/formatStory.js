export function formatStory(story) {
  // Split story into sentences
  const sentences = story.match(/[^.!?]+[.!?]+/g) || [story];
  
  // Randomly add line breaks between sentences (30% chance)
  let formattedStory = sentences.map((sentence, index) => {
    const addBreak = Math.random() > 0.7 && index < sentences.length - 1;
    return sentence.trim() + (addBreak ? '\n\n' : ' ');
  }).join('');

  // Randomly bold or italicize words (20% chance per word)
  const words = formattedStory.split(' ');
  const styledWords = words.map(word => {
    const rand = Math.random();
    if (rand > 0.9) {
      return `**${word}**`; // Bold marker
    } else if (rand > 0.8) {
      return `*${word}*`; // Italic marker
    } 
    return word;
  });

  return styledWords.join(' ');
}

export function getRandomBoxSize() {
  const widths = [400, 450, 500, 550, 600];
  const heights = [500, 550, 600, 650, 700];
  
  return {
    width: widths[Math.floor(Math.random() * widths.length)],
    height: heights[Math.floor(Math.random() * heights.length)]
  };
}