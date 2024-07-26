import React, { useEffect, useRef, useState } from "react";
import "./AudioPlayer.css";
import { WaveAnimation } from "./WaveAnimation";
import { Controls } from "./Controls";
import { ProgressCircle } from "./ProgressCircle";

export const AudioPlayer = ({
  currentTrack,
  total,
  currentIndex,
  setCurrentIndex,
}) => {
  // tracking the playing button
  const [isPlaying, setIsPlaying] = useState(false);

  // tracking the track progress
  const [trackProgress, setTrackProgress] = useState(0);

  // identifying the audio source
  const audioSrc = total[currentIndex]?.track.preview_url;

  // reference to the audio element
  const audioRef = useRef(new Audio(total[0]?.track.preview_url));

  const intervalRef = useRef();
  const isReady = useRef(false);
  const { duration } = audioRef.current;
  const audioProgress = duration ? (trackProgress / duration) * 100 : 0;

  const handlePrev = () => {
    if (currentIndex - 1 < 0) {
      setCurrentIndex(total.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // start timer when the audio plays
  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);
    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [currentIndex]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);
  const handleNext = () => {
    if (currentIndex < total.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };
  const artists = currentTrack?.album?.artists
    .map((artist) => artist.name)
    .join(", ");

  const addZero = (n) => {
   return( n > 9 ? "" + n : "0" + n
  )};
  return (
    <div className="player-body flex">
      <div className="left-body">
        <ProgressCircle
          percentage={audioProgress}
          isPlaying={isPlaying}
          image={currentTrack?.album?.images[0]?.url}
          size={250}
          color="#C96850"
        />
      </div>
      <div className="right-body flex">
        <p className="song-title">{currentTrack?.album?.name}</p>
        <p className="song-artist">{artists}</p>
        <div className="player-right-bottom flex">
          <div className="song-duration flex">
            <p className="duration">0.{addZero(Math.round(trackProgress))}</p>
            <WaveAnimation isPlaying={isPlaying} />
            <p className="duration">0.29</p>
          </div>
          <Controls
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        </div>
      </div>
    </div>
  );
};
