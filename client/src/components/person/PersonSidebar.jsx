import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WcIcon from "@mui/icons-material/Wc";
import NearMeIcon from "@mui/icons-material/NearMe";

const PersonSidebar = ({ person }) => {
  return (
    <div className="p-5 lg:p-10 flex flex-col gap-y-3 md:gap-y-5 lg:gap-y-8 bg-black10 border border-black15 rounded-xl h-full">
      {/* //! Birth Date */}
      <div className="flex flex-col gap-y-1">
        <div className="text-gray60 font-medium lg:text-lg md:text-base text-sm flex items-center gap-x-2">
          <CalendarMonthIcon />
          <p>Born On</p>
        </div>
        <p className="font-semibold lg:text-base md:text-sm text-xs">
          {person?.birthday}
        </p>
      </div>

      {/* //! Birth Date */}
      {person.deathday && (
        <div className="flex flex-col gap-y-1">
          <div className="text-gray60 font-medium lg:text-lg md:text-base text-sm flex items-center gap-x-2">
            <CalendarMonthIcon />
            <p>Died On</p>
          </div>
          <p className="font-semibold lg:text-base md:text-sm text-xs">
            {person?.deathday}
          </p>
        </div>
      )}

      {/* //! Gender */}
      <div className="flex flex-col gap-y-1">
        <div className="text-gray60 font-medium lg:text-lg md:text-base text-sm flex items-center gap-x-2">
          <WcIcon />
          <p>Gender</p>
        </div>
        <p className="font-semibold lg:text-base md:text-sm text-xs">
          {person?.gender === 1
            ? "Female"
            : person?.gender === 2
            ? "Male"
            : "Non-Binary"}
        </p>
      </div>

      {/* //! Birth Place */}
      <div className="flex flex-col gap-y-1">
        <div className="text-gray60 font-medium lg:text-lg md:text-base text-sm flex items-center gap-x-2">
          <NearMeIcon />
          <p>Birth Place</p>
        </div>
        <p className="font-semibold lg:text-base md:text-sm text-xs">
          {person?.place_of_birth}
        </p>
      </div>
    </div>
  );
};

export default PersonSidebar;
