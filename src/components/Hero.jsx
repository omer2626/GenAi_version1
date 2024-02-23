import React from "react";
import Globe from "./Globe";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="text-white flex w-full h-[90vh] items-center ">
      {/* <div className="absolute bg-radial-gradient w-[120%] h-[220%]"></div> */}
      <div className="w-1/2 flex flex-col gap-4">
        <div>
          <div className="text-4xl  font-bold from-blue-500 to-sky-200  bg-gradient-to-r bg-clip-text text-transparent">
            Unleash Your Imagination
          </div>
          <div className="text-4xl font-bold">Your Portal to Creation</div>
        </div>
        <div className="text-lg">
          Experience the Power of AI: Turn Words into Art, Stories, and Music
        </div>
        <div>
          <Link to="/products">
            <button type="button" className="btn">
              <strong>Explore more</strong>
              <div id="container-stars">
                <div id="stars"></div>
              </div>

              <div id="glow">
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
            </button>
          </Link>
        </div>
      </div>
      <div className="w-1/2 h-[100%] overflow-hidden z-20">
        <Globe></Globe>
      </div>
    </div>
  );
};

export default Hero;
