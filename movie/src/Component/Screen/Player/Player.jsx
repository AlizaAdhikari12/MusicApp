import React, { useEffect, useState } from "react";
import "./Player.css";
import "../../Shared/globalStyle.css";
import { useLocation } from "react-router-dom";
import { SongCard } from "../SongCard/SongCard";
import { Queue } from "../Queue/Queue";
import apiClient from "../../../../spotify";
import { AudioPlayer } from "../../AudioPlayer/AudioPlay";

export const Player = () => {
  const location = useLocation()
  const [tracks, setTrack] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
console.log(location)
  useEffect(() => {
    if (location) {
      apiClient
        .get("playlists/" + location.state?.id + "/tracks")
        .then((response) => {
          setTrack(response.data.items);
          setCurrentTrack(response.data.items[0].track);
        });
    }
  }, []);

  useEffect(() => {
    if (tracks.length > 0) {
      setCurrentTrack(tracks[currentIndex].track);
    }
  }, [currentIndex, tracks]);

  return (
    <>
      <div className="screen-container flex">
        <div className="left_body">
          <AudioPlayer
            currentTrack={currentTrack}
            total={tracks}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </div>
        <div className="right_body ">
          <SongCard album={currentTrack.album} />
          <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
        </div>
      </div>
    </>
  );
};
