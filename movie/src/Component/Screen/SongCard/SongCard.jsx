import React from "react";
import "./SongCard.css";
import { AlbumImage } from "./albumimages/AlbumImage";
import { AlbumInfo } from "./albumInfo/AlbumInfo";
export const SongCard = ({ album }) => {
  console.log(album);
  return (
    <>
      <div className="songCard_body flex">
        <AlbumImage url={album?.images[0]?.url} />

        <AlbumInfo album={album} />
      </div>
    </>
  );
};
