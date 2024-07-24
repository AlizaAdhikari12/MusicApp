import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Library } from "../Library/Library";
import { Liked } from "../Liked/Liked";
import { Feed } from "../Feed/Feed";
import { Trending } from "../Trending/Trending";
import { SideBar } from "../../SideBar/SideBar";
import "../../Shared/Home.css";
import { Player } from "../Player/Player";
import { setClientToken } from "../../../../spotify"; // Adjust the import path as necessary
import { Login } from "./../auth/Login";

export const Home = () => {
  const [token, setToken] = useState(""); // Initialize as a string

  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";

    if (!storedToken && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token);
      console.log("New Token from URL:", _token);
    } else {
      setToken(storedToken);
      setClientToken(storedToken);
      console.log("Stored Token:", storedToken);
    }
  }, []);

  return !token ? (
    <Login />
  ) : (
    <Router>
      <div className="main-div">
        <SideBar />
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/Liked" element={<Liked />} />
          <Route path="/Player" element={<Player />} />
          <Route path="/Trending" element={<Trending />} />
          <Route path="/Feed" element={<Feed />} />
        </Routes>
      </div>
    </Router>
  );
};
