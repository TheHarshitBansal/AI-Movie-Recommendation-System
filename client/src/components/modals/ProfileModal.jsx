import { useNavigate } from "react-router-dom";
import { removeUser } from "../../redux/slices/userSlice.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";

const ProfileModal = ({ setIsProfileModalOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileRef = useRef(null);

  const handleLogout = async () => {
    try {
      await dispatch(removeUser());
      localStorage.clear();
      toast.success("Logged out successfully", { type: "success" });
      navigate("/");
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage, { type: "error" });
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsProfileModalOpen]);

  return (
    <div
      className="w-40 text-white h-fit bg-black flex flex-col absolute top-12 shadow-2xl rounded-xl"
      ref={profileRef}
    >
      <button
        className="bg-black12 w-full p-2 hover:bg-red60"
        onClick={() => navigate("/profile")}
      >
        My Profile
      </button>
      <button
        className="bg-black12 w-full p-2 hover:bg-red60"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileModal;
