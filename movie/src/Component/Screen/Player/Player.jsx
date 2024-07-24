import React, { useEffect, useState } from "react";
import "./Player.css";
import "../../Shared/globalStyle.css";
import { useLocation } from "react-router-dom";
import { SongCard } from "../SongCard/SongCard";
import { Queue } from "../Queue/Queue";
import apiClient from "../../../../spotify";
import { AudioPlayer } from "../../AudioPlayer/AudioPlay";

export const Player = () => {
  const location = useLocation();
  console.log(location);
  const [tracks, setTrack] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setcurrentIndex] = useState(0);

  useEffect(() => {
    if (location.state) {
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
          <AudioPlayer currentTrack={currentTrack} isPlaying={true} currentIndex={currentIndex} setcurrentIndex={setcurrentIndex} />
        </div>
        <div className="right_body ">
          <SongCard album={currentTrack.album} />
          <Queue tracks={tracks} setcurrentIndex={setcurrentIndex} />
        </div>
      </div>
    </>
  );
};
