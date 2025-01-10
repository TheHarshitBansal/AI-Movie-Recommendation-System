import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const NotFound = () => {
  return (
    <div>
      <Header />
      <div className="w-full h-screen flex flex-col justify-center items-center py-40">
        <div className="bg-black6 border h-fit space-y-5 border-black15 backdrop-blur-md rounded-lg p-6 shadow-lg px-[70px] py-10 flex flex-col items-center w-fit">
          <h1 className="text-white text-7xl font-bold mb-3 text-center">
            404
          </h1>
          <p className="text-white text-lg font-medium text-center">
            Oops! The page you are looking for doesn't exist.
          </p>
          <div className="flex justify-center mt-6">
            <Link
              to="/"
              className="text-white text-base font-semibold px-6 py-3 rounded-md bg-red45 hover:bg-opacity-80"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
