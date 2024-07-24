import "./albumInfo.css";
import React from "react";
export const AlbumInfo = ({ album }) => {
  console.log(album);
  const artists = [];
  album?.artists?.forEach((element) => {
    artists.push(element.name);
  });

  return (
    <>
      <div className="container">
        <div className="albumInfo-card">
          <div className="albumName-container">
            <div className="marquee">
              <p>{album?.name + "-" + artists?.join(",")}</p>
            </div>
          </div>
          <div className="album-info">
            <p>{`${album?.name} is an ${album?.album_type} by ${
              album?.name + "-" + artists?.join(",")
            } with ${album?.total_tracks} tracks`}</p>
          </div>
          <div className="album-release">
            <p> Release Date : {album?.release_date}</p>
          </div>
        </div>
      </div>
    </>
  );
};
