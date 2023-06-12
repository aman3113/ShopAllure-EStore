import React from "react";
import menImg from "../../Images/menbg.jpg";
import menBg from "../../Images/menbg2.jpg";
import { Link } from "react-router-dom";

const MenSection = () => {
  return (
    <section className="w-full my-4">
      <div className="flex flex-col md:flex-row w-full  gap-8 py-3">
        <div className=" w-full flex flex-col items-center  md:w-[50%]">
          <img src={menImg} alt="" />
          <div className="flex flex-col items-center p-4    ">
            <p>MEN</p>
            <p className="font-bold text-2xl md:text-4xl">
              The base collection- Ideal{" "}
            </p>
            <p className="font-bold text-2xl md:text-4xl">everyday.</p>
            <div className="mt-5">
              <Link to="/men" className="border bg-black px-3 py-2 text-white">
                Shop Collection
              </Link>
            </div>
          </div>
        </div>
        <div
          className="hidden sm:block w-[50%] "
          style={{ backgroundImage: `url(${menBg})` }}
        ></div>
      </div>
    </section>
  );
};

export default MenSection;
