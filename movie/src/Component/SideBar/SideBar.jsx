import "../Shared/Shared.css";
import { useState, useEffect } from "react";
import { SideButton } from "./SideButton";
import { IoMdHeart } from "react-icons/io";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { MdOutlineFeed } from "react-icons/md";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { GiPlayButton } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";
import apiClient from "../../../spotify";
export const SideBar = () => {
  const [logo, setLogo] = useState("Music");
  useEffect(() => {
    apiClient.get("me").then(
      (response) => {
        setLogo(response.data.images[0].url);
      },
      (error) => {
        console.error("Error fetching user data:", error);
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized: Token might be invalid or expired");
          // Optionally, redirect to login or refresh token
        }
      }
    );
  }, []);
  return (
    <>
      <div className="sidebar">
        <div className="logo-container">
          <img src={logo} alt="uers's image`" />
        </div>
        <div className="sidebar-container">
          <SideButton
            title="Library"
            to="/"
            icon={<HiOutlineBuildingLibrary />}
          />
          <SideButton title="Feed" to="/Feed" icon={<MdOutlineFeed />} />
          <SideButton title="Liked" to="/Liked" icon={<IoMdHeart />} />
          <SideButton title="Player" to="/Player" icon={<GiPlayButton />} />
          <SideButton
            title="Trending"
            to="/Trending"
            icon={<FaMoneyBillTrendUp />}
          />
        </div>
        <div className="sidebar-footer">
          <SideButton title="Login" to="/Login" icon={<FaRegUser />} />
        </div>
      </div>
    </>
  );
};
