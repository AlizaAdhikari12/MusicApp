import React from "react";
import "./AudioPlayer.css";
import { ProgressCircle } from "./ProgressCircle";
export const AudioPlayer = ({ currentTrack }) => {
  const artists = [];
  currentTrack?.album?.artists.forEach((Element) => {
    artists.push(Element.name);
    console.log(Element.name);
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
        <div className="right-body">
          <p className="song-title">{currentTrack?.album?.name}</p>
          <p>{artists?.join(",")}</p>
          <div className="player-right-bottom">
           <div className="song-duration">
           <p className="duration"></p>
            <WaveAnimation/>
            <p className="duration"></p>
           </div>
         <Controls
         isPlaying={isPlaying}
         setIsPlaying={setIsPlaying}
         handleNext={handlesNext}
         handlePrev={handlePrev}
         total={total}
         />
          </div>
        </div>
      </div>
    </>
  );
};
