import { Link } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar.jsx";
import ProfileModal from "./modals/ProfileModal.jsx";
import ToggleSearch from "./ToggleSearch.jsx";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBasicSearch, setIsBasicSearch] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex justify-center relative">
      <div
        className={`mx-auto fixed w-[90vw] overflow-y-visible max-h-20 top-0 py-4 z-[999] md:px-10 px-5 rounded-b-xl transition-all duration-300 ${
          isScrolled
            ? "bg-black/70 backdrop-blur-xl shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="flex justify-between items-start">
          <Link to={user ? "/browse" : "/"}>
            <img src={Logo} alt="Logo" className="w-24 md:w-32 lg:w-fit" />
          </Link>
          {user && (
            <div className="flex items-start gap-x-5">
              <SearchBar isBasicSearch={isBasicSearch} />
              {user?.subscription?.status && (
                <ToggleSearch
                  isBasicSearch={isBasicSearch}
                  setIsBasicSearch={setIsBasicSearch}
                />
              )}
              <div className="relative flex flex-col justify-center items-center">
                {user?.avatar?.secure_url ? (
                  <img
                    src={user.avatar.secure_url}
                    alt={user.name}
                    className="w-8 h-8 md:w-10 md:h-10 hover:cursor-pointer rounded-full"
                    onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}
                  />
                ) : (
                  <div
                    className="w-8 h-8 md:w-10 md:h-10 text-base md:text-xl hover:cursor-pointer rounded-full bg-red45 text-center text-white font-semibold flex items-center justify-center uppercase"
                    onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}
                  >
                    {user.name[0]}
                  </div>
                )}
                {isProfileModalOpen && (
                  <ProfileModal setIsProfileModalOpen={setIsProfileModalOpen} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
