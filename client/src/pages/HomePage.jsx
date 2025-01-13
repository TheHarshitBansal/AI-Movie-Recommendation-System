import { useEffect, useState } from "react";
import ContactForm from "../components/ContactForm.jsx";
import FAQCard from "../components/FAQCard.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import faq from "../data/FAQ.js";
import FeatureCard from "../components/FeatureCard.jsx";
import AbstractDesign from "../assets/AbstractDesign.png";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies.js";
import Poster from "../components/movie/Poster.jsx";
import usePopularMovies from "../hooks/usePopularMovies.js";
import thumbsUp from "../assets/features/thumbsUp.svg";
import info from "../assets/features/info.svg";
import trending from "../assets/features/trending.svg";
import devices from "../assets/features/devices.svg";
import interfaceSVG from "../assets/features/interface.svg";
import prohibited from "../assets/features/prohibited.svg";

const features = [
  {
    heading: "Top Recommendations",
    description:
      "StreamVibe brings you a carefully curated list of the most highly-rated movies and shows. Discover hidden gems and trending titles that you won’t find anywhere else.",
    svg: thumbsUp,
  },
  {
    heading: "In-Depth Information",
    description:
      "From plot summaries and cast details to viewer reviews and ratings, StreamVibe provides a comprehensive overview of every title.",
    svg: info,
  },
  {
    heading: "Trending Highlights",
    description:
      "Stay with the hottest trends in entertainment. Whether it’s the latest buzzworthy release or a show that’s gone viral, StreamVibe ensures you’re always ahead of the curve.",
    svg: trending,
  },
  {
    heading: "Seamless Integration",
    description:
      "StreamVibe is available on all your devices. Whether you are on your laptop, tablet, or smartphone, you can enjoy a seamless experience across all platforms.",
    svg: devices,
  },
  {
    heading: "User-Friendly Interface",
    description:
      "Our clean and intuitive interface makes it easy to find the movies and shows you love. Here you can spend less time searching and more time watching your favorite content.",
    svg: interfaceSVG,
  },
  {
    heading: "No Ads or Subscriptions",
    description:
      "StreamVibe is entirely free to use, with no subscription fees or intrusive ads. Enjoy a seamless browsing experience while exploring the best in entertainment.",
    svg: prohibited,
  },
];

const HomePage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { getNowPlayingMovies } = useNowPlayingMovies();
  const { getPopularMovies } = usePopularMovies();

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        const yOffset = -100;
        const yPosition =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: yPosition, behavior: "smooth" });
      }
    }
  }, [location]);

  useEffect(() => {
    getNowPlayingMovies(1);
    getPopularMovies(1);
  }, [getNowPlayingMovies, getPopularMovies]);

  const nowPlayingMovies = useSelector((state) => state.movie.nowPlaying);
  const popularMovies = useSelector((state) => state.movie.popular);

  return (
    <>
      <Header />
      <div className="absolute -z-1 flex flex-wrap gap-2 justify-around h-screen w-screen overflow-y-clip">
        {nowPlayingMovies &&
          nowPlayingMovies.map((movie) => (
            <Poster key={movie.id} url={movie.poster_path} width={150} />
          ))}
        {popularMovies &&
          popularMovies.map((movie) => (
            <Poster key={movie.id} url={movie.poster_path} width={150} />
          ))}
      </div>
      <div className="bg-black/85 h-screen w-screen absolute top-0 left-0 z-[1]"></div>
      <div className="lg:mx-20 mx-5 md:mx-10">
        {/* //!Home Section */}
        <div className="relative z-50 pt-10 lg:pt-40">
          <div className="flex items-center justify-center py-10 md::py-20">
            <img
              src={AbstractDesign}
              alt="Abstract"
              className="w-32 md:w-fit"
            />
          </div>
          <div className="flex flex-col gap-y-10 items-center">
            <div className="space-y-5 text-center px-20">
              <h1 className="text-white font-bold text-4xl md:text-5xl">
                The Best Experience
              </h1>
              <p className="text-gray60 text-sm">
                StreamVibe is the best platform for finding your favorite movies
                and shows on demand, anytime, anywhere. With StreamVibe, you can
                enjoy a wide variety of content, including the latest
                blockbusters, classic movies, popular TV shows, and more. You
                can also use AI, so you can easily find the content you want to
                watch.
              </p>
            </div>
            <button
              className="text-white cursor-pointer flex items-center justify-center text-sm font-semibold px-5 py-2 rounded-lg bg-red45 w-fit hover:bg-opacity-80"
              onClick={() => {
                user ? navigate("/browse") : navigate("/auth/signin");
              }}
            >
              <span>
                <PlayArrowRoundedIcon fontSize="medium" />
              </span>
              Start Watching Now
            </button>
          </div>
        </div>

        {/* //!Features Section */}
        <div className="mb-20 mt-60 lg:mt-80" id="features">
          <div className="space-y-3 pe-5 lg:pe-40 mb-14">
            <h1 className="text-3xl text-white font-bold">
              Discover the Features of StreamVibe
            </h1>
            <p className="text-gray60 text-base">
              StreamVibe is more than just an information platform—it’s your
              personalized gateway to discovering the world of movies and shows.
              With features designed to cater to your preferences, we make it
              easier than ever to find the perfect content for every mood.
            </p>
          </div>
          <div className="flex items-center justify-between gap-y-5 flex-wrap">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                heading={feature.heading}
                description={feature.description}
                svg={feature.svg}
              />
            ))}
          </div>
        </div>

        {/* //! FAQ Section */}
        <div className="space-y-14 my-20" id="faq">
          <div className="space-y-3">
            <h1 className="text-3xl text-white font-bold">
              Frequently Asked Questions
            </h1>
            <p className="text-gray60 text-base">
              Got questions? We&apos;ve got answers! Check out our FAQ section
              to find answers to the most common questions about StreamVibe.
            </p>
          </div>
          <div className="flex flex-col flex-wrap lg:h-[580px] h-full max-h-fit">
            {faq.map((item, index) => (
              <FAQCard
                key={index}
                num={index}
                question={item.question}
                ans={item.answer}
                open={openFAQ == index}
                setOpen={setOpenFAQ}
              />
            ))}
          </div>
        </div>

        {/* //! Contact Form Section */}
        <div
          className="flex flex-col lg:flex-row lg:space-x-10 my-20 lg:space-y-0 space-y-5"
          id="contact"
        >
          <div className="space-y-2">
            <div className="space-y-3">
              <h1 className="font-bold text-3xl text-white">Reach Us Out</h1>
              <p className="text-gray60 text-base">
                We&apos;re here to help you with any problems you may be having
                with our product.
              </p>
            </div>
            <div className="max-w-[40vw] max-h-[55vh] overflow-clip rounded-lg border-[6px] border-black15 px-1 pt-3 hidden lg:block">
              <div className="grid grid-cols-4 gap-x-10 gap-y-5 h-fit w-fit bg-gray50">
                {popularMovies &&
                  popularMovies.map((movie) => (
                    <Poster
                      key={movie.id}
                      url={movie.poster_path}
                      width="100px"
                    />
                  ))}
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
