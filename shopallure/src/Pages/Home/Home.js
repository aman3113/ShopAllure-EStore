import WomenSection from "./WomenSection";
import KidsSection from "./KidSection";
import { useEffect } from "react";
import { getProducts } from "../../api";
import { useDispatch } from "react-redux";
import { setProducts } from "../../Redux/ProductsSlice";
import { getCartData } from "../../Redux/cartSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      const data = await getProducts();
      dispatch(setProducts(data.products));
    }
    getData();
  }, []);
  return (
    <div>
      <WomenSection />
      <KidsSection />
    </div>
  );
};

export default Home;
