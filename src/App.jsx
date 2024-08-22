import React, { useEffect, useRef, useState } from 'react';
import DiscoLight from './DiscoLight';
import './App.css';

const colorsGroup1 = ['#FF0000', '#FF7F00', '#FFFF00'];
const colorsGroup2 = ['#00FF00', '#0000FF', '#4B0082'];
const colorsGroup3 = ['#FF00FF', '#00FFFF', '#8B00FF'];
const colorsGroup4 = ['#F0E68C', '#FFD700', '#ADFF2F'];
const colorsGroup5 = ['#FF1493', '#DB7093', '#FF69B4'];
const colorsGroup6 = ['#40E0D0', '#48D1CC', '#20B2AA'];
const colorsGroup7 = ['#DC143C', '#B22222', '#FF4500'];
const colorsGroup8 = ['#8A2BE2', '#9370DB', '#9400D3'];

const App = () => {
  const [audioContext, setAudioContext] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const audioRef = useRef(null);

  const handleStart = () => {
    if (!audioContext) {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = context.createAnalyser();
      analyser.fftSize = 256;
      setAudioContext(context);
      setAnalyser(analyser);

      if (audioRef.current) {
        const source = context.createMediaElementSource(audioRef.current);
        source.connect(analyser);
        analyser.connect(context.destination);
        audioRef.current.play();
      }
    }
  };

  const handlePauseResume = () => {
    if (audioContext && audioRef.current) {
      if (isPaused) {
        audioRef.current.play();
        audioContext.resume();
      } else {
        audioRef.current.pause();
        audioContext.suspend();
      }
      setIsPaused(!isPaused);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <audio ref={audioRef} controls className="mx-auto my-4 animate-pulse">
        <source src="./public/Audios/TeraGhata.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <div className="flex space-x-4 justify-center my-4">
        <button
          onClick={handleStart}
          className="bg-blue-500 text-white py-2 px-4 rounded animate-bounce hover:animate-none"
        >
          Start Disco Lights
        </button>
        <button
          onClick={handlePauseResume}
          className={`bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 ${
            isPaused ? '' : 'animate-pulse'
          }`}
        >
          {isPaused ? 'Resume Disco Lights' : 'Pause Disco Lights'}
        </button>
      </div>
      <div className="full-screen">
        {analyser && (
          <>
            <DiscoLight
              analyser={analyser}
              colors={colorsGroup1}
              delay={100}
              isPlaying={!isPaused}
            />
            <DiscoLight
              analyser={analyser}
              colors={colorsGroup2}
              delay={200}
              isPlaying={!isPaused}
            />
            <DiscoLight
              analyser={analyser}
              colors={colorsGroup3}
              delay={300}
              isPlaying={!isPaused}
            />
            <DiscoLight
              analyser={analyser}
              colors={colorsGroup4}
              delay={400}
              isPlaying={!isPaused}
            />
            <DiscoLight
              analyser={analyser}
              colors={colorsGroup5}
              delay={500}
              isPlaying={!isPaused}
            />
            <DiscoLight
              analyser={analyser}
              colors={colorsGroup6}
              delay={600}
              isPlaying={!isPaused}
            />
            <DiscoLight
              analyser={analyser}
              colors={colorsGroup7}
              delay={700}
              isPlaying={!isPaused}
            />
            <DiscoLight
              analyser={analyser}
              colors={colorsGroup8}
              delay={800}
              isPlaying={!isPaused}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
