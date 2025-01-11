import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer.jsx";
import Header from "../../components/Header.jsx";
import EditIcon from "@mui/icons-material/Edit";
import PasswordIcon from "@mui/icons-material/Password";
import DeleteIcon from "@mui/icons-material/Delete";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import { useNavigate } from "react-router-dom";
import DeleteAccountModal from "../../components/modals/DeleteAccountModal.jsx";
import axiosInstance from "../../services/axios.js";
import { useState } from "react";
import { toast } from "react-toastify";
import { addUser } from "../../redux/slices/userSlice.js";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [openModal, setOpenModal] = useState(false);

  const handlePayment = async () => {
    const response = await axiosInstance.post("/payment", { id: user._id });
    const data = response.data;
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data?.order?.amount,
      currency: data?.order?.currency,
      name: "StreamVibe Plus",
      description: "Lifetime Subscription",
      order_id: data?.order?.id,
      handler: async function (response) {
        try {
          const payment_id = response.razorpay_payment_id;
          const signature = response.razorpay_signature;
          const verification = await axiosInstance.post("/payment/verify", {
            payment_id,
            signature,
            id: user._id,
          });

          dispatch(addUser(verification?.data?.user));
          toast.success(verification?.data?.message);
        } catch (error) {
          toast.error(error?.response?.data?.message);
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
      },
      theme: {
        color: "#ff0000",
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center mt-28 md:mt-40 mx-5 md:mx-10 lg:mx-20 text-white">
        <div className="flex items-end space-x-2 md:space-x-5">
          {user?.avatar?.secure_url ? (
            <img
              src={user.avatar.secure_url}
              alt={user.name}
              className="lg:w-60 lg:h-60 md:w-40 md:h-40 w-32 h-32 hover:cursor-pointer rounded-lg"
            />
          ) : (
            <div className="lg:w-60 lg:h-60 md:w-40 md:h-40 w-32 h-32 hover:cursor-pointer rounded-lg text-2xl md:text-6xl lg:text-9xl bg-red45 text-center text-white font-semibold flex items-center justify-center uppercase">
              {user.name[0]}
            </div>
          )}
          <div className="flex flex-col md:gap-y-2">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold">
              {user.name}
            </h1>
            <h2 className="text-sm md:text-xl lg:text-2xl text-gray60 font-semibold">
              {user.email}
            </h2>
            <h3 className="text-xs md:text-lg lg:text-xl font-medium bg-black20 border border-black15 w-fit p-2 rounded-lg">
              Subscription Status :{" "}
              <span
                className={`${
                  user.subscription.status ? "text-green-500" : "text-red-500"
                }`}
              >
                {user.subscription.status ? "Active" : "Inactive"}
              </span>
            </h3>
          </div>
        </div>
        {/* //! Buttons */}
        <div className="flex flex-col md:flex-row lg:gap-x-10 md:gap-x-5 gap-y-2 my-10 text-sm md:text-base lg:text-lg">
          <button
            className="w-full md:w-fit flex items-center gap-x-1 border justify-center border-red45 py-2 px-4 rounded-lg hover:bg-red45"
            onClick={() => navigate("/profile/edit-profile")}
          >
            Edit Profile <EditIcon />
          </button>
          <button
            className="w-full md:w-fit flex items-center justify-center gap-x-1 border border-red45 py-2 px-4 rounded-lg hover:bg-red45"
            onClick={() => navigate("/profile/change-password")}
          >
            Change Password <PasswordIcon />
          </button>
          {!user.subscription.status && (
            <button
              className="w-full md:w-fit flex items-center justify-center gap-x-1 border border-red45 py-2 px-4 rounded-lg hover:bg-red45"
              onClick={handlePayment}
            >
              Get Subscription <CardMembershipIcon />
            </button>
          )}
          <button
            className="w-full md:w-fit flex items-center justify-center gap-x-1 bg-red55 border border-black15 py-2 px-4 rounded-lg hover:bg-red45"
            onClick={() => setOpenModal(true)}
          >
            Delete Account <DeleteIcon />
          </button>
        </div>
      </div>
      <Footer />
      {openModal && (
        <DeleteAccountModal setOpenModal={setOpenModal} id={user._id} />
      )}
    </div>
  );
};

export default Profile;
