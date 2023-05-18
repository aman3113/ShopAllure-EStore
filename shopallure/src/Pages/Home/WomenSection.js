import { Link } from "react-router-dom";
import WomenBg from "../../Images/womenbg.png";

import React from "react";

const WomenSection = () => {
  return (
    <section className="w-full md:flex bg-[#FAEDEB] my-4">
      <div className="w-full md:w-[50%] flex flex-col gap-8  p-3 justify-center">
        <div>
          <p className="text-base text-[#8B8583]">WOMEN</p>
          <h2 className="font-bold text-4xl md:text-6xl">
            Slick.Modern. <span>Awesome.</span>
          </h2>
        </div>

        <div>
          <Link to="/clothes" className="border bg-black px-3 py-2 text-white">
            Shop Collection
          </Link>
        </div>
      </div>
      <div className="w-full p-8 md:p-0 md:w-[50%]">
        <img className="w-full h-full" src={WomenBg} alt="women img" />
      </div>
    </section>
  );
};

export default WomenSection;
