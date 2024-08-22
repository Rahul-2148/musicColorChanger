import React, { useEffect, useState } from 'react';

const DiscoLight = ({ analyser, colors, delay, isPlaying }) => {
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(dataArray);

      // Change color based on the audio frequency data
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, delay);

    return () => clearInterval(interval);
  }, [analyser, colors, delay, isPlaying]);

  return (
    <div
      className="color-section"
      style={{ backgroundColor: colors[colorIndex] }}
    ></div>
  );
};

export default DiscoLight;
