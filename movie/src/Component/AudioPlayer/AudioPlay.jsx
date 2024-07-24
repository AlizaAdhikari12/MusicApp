import React from "react";
import "./AudioPlayer.css";
import { WaveAnimation } from "./WaveAnimation";
import { useState,useRef } from "react";
import { Controls } from "./Controls";
import { ProgressCircle } from "./ProgressCircle";
export const AudioPlayer = ({
  currentTrack
}) => {

  const artists = [];
  currentTrack?.album?.artists.forEach((Element) => {
    artists.push(Element.name);
  });
  return (
    <>
      <div className="player-body flex">
        <div className="left-body">
          <ProgressCircle
            percentage={75}
            isPlaying={true}
            image={currentTrack?.album?.images[0]?.url}
            size={250}
            color="#C96850"
          />
        </div>
        <div className="right-body flex">
          <p className="song-title">{currentTrack?.album?.name}</p>
          <p className="song-artist">{artists?.join(",")}</p>
          <div className="player-right-bottom flex ">
            <div className="song-duration flex">
              <p className="duration">0.3</p>
              <WaveAnimation isPlaying={true} />
              <p className="duration">0.3</p>
            </div>
            <Controls
            //   isPlaying={isPlaying}
            //   setIsPlaying={setIsPlaying}
            //   handleNext={handlesNext}
            //   handlePrev={handlePrev}
            //   total={total}
            />
          </div>
        </div>
      </div>
    </>
  );
};
