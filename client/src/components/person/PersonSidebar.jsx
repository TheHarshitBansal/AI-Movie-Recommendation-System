import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WcIcon from "@mui/icons-material/Wc";
import NearMeIcon from "@mui/icons-material/NearMe";

const PersonSidebar = ({ person }) => {
  return (
    <div className="p-10 flex flex-col gap-y-8 bg-black10 border border-black15 rounded-xl h-full">
      {/* //! Birth Date */}
      <div className="flex flex-col gap-y-1">
        <div className="text-gray60 font-medium text-lg flex items-center gap-x-2">
          <CalendarMonthIcon />
          <p>Born On</p>
        </div>
        <p className="font-semibold text-xl">{person?.birthday}</p>
      </div>

      {/* //! Birth Date */}
      {person.deathday && (
        <div className="flex flex-col gap-y-1">
          <div className="text-gray60 font-medium text-lg flex items-center gap-x-2">
            <CalendarMonthIcon />
            <p>Died On</p>
          </div>
          <p className="font-semibold text-xl">{person?.deathday}</p>
        </div>
      )}

      {/* //! Gender */}
      <div className="flex flex-col gap-y-1">
        <div className="text-gray60 font-medium text-lg flex items-center gap-x-2">
          <WcIcon />
          <p>Gender</p>
        </div>
        <p className="font-semibold text-xl">
          {person?.gender === 1
            ? "Female"
            : person?.gender === 2
            ? "Male"
            : "Non-Binary"}
        </p>
      </div>

      {/* //! Birth Place */}
      <div className="flex flex-col gap-y-1">
        <div className="text-gray60 font-medium text-lg flex items-center gap-x-2">
          <NearMeIcon />
          <p>Birth Place</p>
        </div>
        <p className="font-semibold text-xl">{person?.place_of_birth}</p>
      </div>
    </div>
  );
};

export default PersonSidebar;
