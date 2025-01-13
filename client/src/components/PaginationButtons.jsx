import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const PaginationButtons = ({ hook, next, page, nextPage, prevPage }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    hook(page);
  }, [page, hook]);

  const handleNextPage = async () => {
    await dispatch(nextPage());
  };
  const handlePrevPage = async () => {
    await dispatch(prevPage());
  };

  return (
    <div className="rounded-xl p-1 md:p-3 flex gap-x-1 md:gap-x-2 items-center">
      <button
        disabled={page === 1}
        className="bg-black6 border border-black12 rounded-md p-1 md:p-2 hover:bg-black10 disabled:bg-gray-950"
        onClick={handlePrevPage}
      >
        <KeyboardDoubleArrowLeftRoundedIcon fontSize="medium" />
      </button>
      <button
        className="bg-black6 border border-black12 rounded-md p-1 md:p-2 hover:bg-black10 disabled:bg-gray-950"
        onClick={handleNextPage}
        disabled={!next}
      >
        <KeyboardDoubleArrowRightRoundedIcon fontSize="medium" />
      </button>
    </div>
  );
};

export default PaginationButtons;
