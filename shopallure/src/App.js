import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import Clothes from "./Pages/Clothes";
import Men from "./Pages/Men";
import Women from "./Pages/Women";
import Kids from "./Pages/Kids";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index={true} element={<Home />} />
        <Route path="clothes" element={<Clothes />} />
        <Route path="men" element={<Men />} />
        <Route path="women" element={<Women />} />
        <Route path="kids" element={<Kids />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
