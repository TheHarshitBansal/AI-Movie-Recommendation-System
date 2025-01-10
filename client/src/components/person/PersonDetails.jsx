import MovieOverview from "../movie/MovieOverview.jsx";
import PersonSidebar from "./PersonSidebar.jsx";
import PersonImages from "./PersonImages.jsx";
import PersonCredits from "./PersonCredits.jsx";

const PersonDetails = ({ person }) => {
  return (
    <div className="text-white my-10 flex flex-col gap-y-5 w-full">
      <div className="flex gap-x-5">
        <div className="w-[70%] flex flex-col gap-y-5 h-full">
          <MovieOverview desc={person.biography} />
          <PersonCredits id={person.id} />
          <PersonCredits id={person.id} show={true} />
        </div>
        <div className="w-[30%]">
          <PersonSidebar person={person} />
        </div>
      </div>
      <PersonImages id={person.id} />
    </div>
  );
};

export default PersonDetails;
