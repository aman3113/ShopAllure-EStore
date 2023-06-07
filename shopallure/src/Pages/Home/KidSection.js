import { Link } from "react-router-dom";
import KidsBg from "../../Images/kidsbg.jpg";

const KidsSection = () => {
  return (
    <section
      className="w-full h-[50vh] md:h-[80vh] lg:h-[100vh]  bg-cover bg-center md:bg-fixed my-4 bg-no-repeat border-2 border-yellow-700 "
      style={{ backgroundImage: `url(${KidsBg})` }}
    >
      <div className=" w-full h-full flex items-center justify-center bg-black bg-opacity-30">
        <div className="text-white text-center z-10 bg-transparent">
          <p>NEW COLLECTION</p>
          <h1 className="font-bold text-3xl md:text-4xl">
            Be different in your own way!
          </h1>
          <h3 className="font-semibold text-xl md:text-2xl">
            Find your unique style
          </h3>
          <div className="mt-5">
            <Link to="/kids" className="border bg-black px-3 py-2 text-white">
              Shop Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KidsSection;
