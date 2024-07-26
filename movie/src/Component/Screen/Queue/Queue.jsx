import React from "react";
import "./Queue.css";
export const Queue = ({ tracks, setCurrentIndex }) => {
  const formatDuration = (durationMs) => {
    const totalSeconds = Math.floor(durationMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${formattedSeconds}`;
  };
  return (
    <>
      <div className="queue-container flex">
        <div className="queue flex">
          <p className="upNext"> Up Next</p>
          <div className="queue-list">
            {tracks?.map((track, index) => {
              return (
                <div
                  key={index}
                  className="queue-item flex"
                  onClick={() => setCurrentIndex(index)}
                >
                  <p className="queue-name">{track?.track?.name}</p>
                  <p className="queue-duration">
                    {formatDuration(track?.track?.duration_ms)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
