import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  const Home = [
    { name: "Categories", url: "/browse" },
    { name: "Features", url: "/#features" },
    { name: "FAQ", url: "/#faq" },
    { name: "Contact", url: "/#contact" },
  ];
  const Movies = [
    { name: "Playing Now", url: "/browse#playingNowMovies" },
    { name: "Popular", url: "/browse#popularMovies" },
    { name: "Top Rated", url: "/browse#topRatedMovies" },
    { name: "Upcoming", url: "/browse#upcomingMovies" },
  ];

  const Shows = [
    { name: "Airing Today", url: "/browse#airingTodayShows" },
    { name: "Popular", url: "/browse#popularShows" },
    { name: "Top Rated", url: "/browse#topRatedShows" },
  ];

  return (
    <div className="bg-[#0F0F0F] w-full h-fit text-[#999999] text-base font-light px-20 pt-20 pb-10">
      <div className="flex justify-between">
        <div className="flex gap-x-40">
          <ul className="space-y-5">
            <p className="text-white font-medium text-lg">Home</p>
            <div className="flex flex-col gap-y-2">
              {Home.map((item, index) => {
                return (
                  <li key={index}>
                    <Link to={item.url}>{item.name}</Link>
                  </li>
                );
              })}
            </div>
          </ul>
          <ul className="space-y-5">
            <p className="text-white font-medium text-lg">Movies</p>
            <div className="flex flex-col gap-y-2">
              {Movies.map((item, index) => {
                return (
                  <li key={index}>
                    <Link to={item.url}>{item.name}</Link>
                  </li>
                );
              })}
            </div>
          </ul>
          <ul className="space-y-5">
            <p className="text-white font-medium text-lg">Shows</p>
            <div className="flex flex-col gap-y-2">
              {Shows.map((item, index) => {
                return (
                  <li key={index}>
                    <Link to={item.url}>{item.name}</Link>
                  </li>
                );
              })}
            </div>
          </ul>
        </div>
        <ul className="text-white text-xl font-medium space-y-5">
          <p>Connect With Us</p>
          <div className="flex gap-x-2">
            <li>
              <Link>
                <div className="p-2 bg-[#1A1A1A] rounded-lg border-[2px] border-[#1f1f1f]">
                  <FacebookIcon fontSize="large" />
                </div>
              </Link>
            </li>
            <li>
              <Link>
                <div className="p-2 bg-[#1A1A1A] rounded-lg border-[2px] border-[#1f1f1f]">
                  <InstagramIcon fontSize="large" />
                </div>
              </Link>
            </li>
            <li>
              <Link>
                <div className="p-2 bg-[#1A1A1A] rounded-lg border-[2px] border-[#1f1f1f]">
                  <LinkedInIcon fontSize="large" />
                </div>
              </Link>
            </li>
          </div>
        </ul>
      </div>
      <div className="flex justify-between mt-20 border-t-[1.5px] pt-5 border-[#262626]">
        <p>@2025 StreamVibe, All Rights Reserved</p>
        <div className="flex text-sm gap-x-5">
          <p className="cursor-pointer">Terms of Use</p>
          <p className="px-5 border-x border-[#373737] cursor-pointer">
            Privacy Policy
          </p>
          <p className="cursor-pointer">Cookie Policy</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
