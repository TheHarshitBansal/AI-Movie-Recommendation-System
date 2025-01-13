import MovieOverview from "../movie/MovieOverview.jsx";
import PersonSidebar from "./PersonSidebar.jsx";
import PersonImages from "./PersonImages.jsx";
import PersonCredits from "./PersonCredits.jsx";

const PersonDetails = ({ person }) => {
  return (
    <div className="text-white my-10 flex flex-col gap-y-2 md:gap-y-3 lg:gap-y-5 w-full">
      <div className="flex gap-x-2 md:gap-x-3 lg:gap-x-5">
        <div className="lg:w-[70%] md:w-[60%] w-[50%] flex flex-col gap-y-2 md:gap-y-3 lg:gap-y-5 h-full">
          <MovieOverview desc={person.biography} />
        </div>
        <div className="lg:w-[30%] md:w-[40%] w-[50%]">
          <PersonSidebar person={person} />
        </div>
      </div>
      <PersonCredits id={person.id} />
      <PersonCredits id={person.id} show={true} />
      <PersonImages id={person.id} />
    </div>
  );
};

export default PersonDetails;
