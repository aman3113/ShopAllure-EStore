import WomenSection from "./WomenSection";
import KidsSection from "./KidSection";
import MenSection from "./MenSection";
import { useSelector } from "react-redux";
import SingleItem from "../../Components/SingleItem";

const Home = () => {
  const products = useSelector((store) => store.products.array);
  const trendingProducts = products
    ?.filter((product) => product.trending && product.in_stock)
    .slice(0, 5);
  return (
    <div className="flex flex-col gap-10">
      <WomenSection />
      <div>
        <p className="font-bold text-2xl text-center">Trending Products</p>
        <div className="flex gap-4 max-w-[100vw] overflow-x-auto p-4">
          {trendingProducts?.map((product) => (
            <SingleItem product={product} key={product._id} />
          ))}
        </div>
      </div>

      <KidsSection />
      <MenSection />
    </div>
  );
};

export default Home;
