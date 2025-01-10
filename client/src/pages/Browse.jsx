import { Suspense, lazy } from "react";
import Loader from "../components/Loader.jsx";

// Lazy-load components
const MainContainer = lazy(() =>
  import("../components/browse/MainContainer.jsx")
);
const SecondaryContainer = lazy(() =>
  import("../components/browse/SecondaryContainer.jsx")
);
const Header = lazy(() => import("../components/Header.jsx"));
const Footer = lazy(() => import("../components/Footer.jsx"));

const Browse = () => {
  return (
    <Suspense fallback={<Loader />}>
      <div className="w-full h-full text-white">
        <Header />
        <MainContainer />
        <SecondaryContainer />
        <Footer />
      </div>
    </Suspense>
  );
};

export default Browse;
