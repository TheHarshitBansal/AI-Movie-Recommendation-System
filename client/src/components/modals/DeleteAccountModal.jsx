import axiosInstance from "../../services/axios.js";
import { useDispatch } from "react-redux";
import { removeUser } from "../../redux/slices/userSlice.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DeleteAccountModal = ({ setOpenModal, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProfileDelete = async () => {
    try {
      const response = await axiosInstance.delete("/user/profile", {
        data: { id: id },
      });
      dispatch(removeUser());
      toast.success(response?.data?.message);
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="absolute w-screen h-screen left-0 top-0 z-[999] text-white bg-black8 bg-opacity-50 flex items-center justify-center">
      <div className="bg-black6 p-6 md:p-8 lg:p-10 rounded-lg border border-red45 max-w-[600px] w-full ">
        <h1 className="font-semibold text-base md:text-lg lg:text-xl">
          Do you want to permanently delete your account?{" "}
          <span className="text-red45">(This cannot be undone)</span>
        </h1>
        <div className="flex justify-end gap-x-2 md:gap-x-3 lg:gap-x-5 mt-5">
          <button
            className="border border-red45 lg:px-5 lg:py-2 md:px-3 px-2 py-1 rounded-lg hover:bg-red45"
            onClick={handleProfileDelete}
          >
            Yes
          </button>
          <button
            className="border border-red45 lg:px-5 lg:py-2 md:px-3 px-2 py-1 rounded-lg hover:bg-red45"
            onClick={() => setOpenModal(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteAccountModal;
