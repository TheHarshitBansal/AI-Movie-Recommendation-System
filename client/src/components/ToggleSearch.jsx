import { RiGeminiLine } from "react-icons/ri";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleGpt } from "../redux/slices/gptSlice.js";

const ToggleSearch = ({ isBasicSearch, setIsBasicSearch }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleGpt(!isBasicSearch));
  }, [isBasicSearch, dispatch]);
  return (
    <div
      className={`text-gray60 text-lg md:text-xl flex cursor-pointer h-8 w-16 md:h-10 md:w-20 bg-black10 border border-black15 gap-x-1 p-1 rounded-lg items-center`}
      onClick={() => setIsBasicSearch(!isBasicSearch)}
    >
      <div
        className={`rounded-lg translate-1/2 bg-black transition-all duration-300 ${
          isBasicSearch ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <span
          className={`flex items-center p-1 md:p-2 rounded-lg ${
            isBasicSearch ? "block" : "hidden"
          }`}
        >
          <SearchIcon fontSize="small" />
        </span>

        <span
          className={`flex items-center p-1 md:p-2 rounded-lg ${
            isBasicSearch ? "hidden" : "block"
          }`}
        >
          <RiGeminiLine />
        </span>
      </div>
    </div>
  );
};
export default ToggleSearch;
