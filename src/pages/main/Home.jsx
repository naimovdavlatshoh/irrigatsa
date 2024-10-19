import React, { useEffect } from "react";
import MainCarousel from "./MainCarousel";
import SubCarousel from "./SubCarousel";
import News from "./News";
import { Announcement, Prizes, Videos } from "../data";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log("hello");

    return (
        <div>
            <MainCarousel />
            <SubCarousel />
            <News />
            <Announcement />
            <Prizes />
            <Videos />
        </div>
    );
};

export default Home;
