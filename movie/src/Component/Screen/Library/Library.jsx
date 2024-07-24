import { useState, useEffect } from "react";
import apiClient from "../../../../spotify";
import "../../Shared/library.css";
import { IconContext } from "react-icons/lib";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
export const Library = () => {
  const [playList, setPlayList] = useState([]);
  useEffect(() => {
    apiClient
      .get("me/playlists")
      .then((response) => {
        setPlayList(response.data.items);
        console.log(response.data.items);
      })
      .catch((error) => {
        console.error("error while fetching data", error);
      });
  }, []);

  const navigate = useNavigate();

  const playPlaylist = (id) => {
    navigate("/Player", { state: { id: id } });
  };
  return (
    <>
      <div className="screen-container">
        <div className="library-body">
          {playList.length === 0
            ? "sorry not data"
            : playList.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="playlist-item"
                    onClick={() => playPlaylist(item.id)}
                  >
                    <img
                      src={item.images[0].url}
                      alt="playlist_img"
                      className="playlidt_image"
                    />
                    <p className="playList_title">{item.name}</p>
                    <p className="playList_subtitle">
                      {item.tracks.total} Songs
                    </p>
                    <div className="playlist_fade">
                      <IconContext.Provider
                        value={{ size: "50px", color: "#E99072" }}
                      >
                        <AiFillPlayCircle />
                      </IconContext.Provider>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};
