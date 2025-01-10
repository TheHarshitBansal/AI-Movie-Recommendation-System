import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axiosInstance from "../../services/axios.js";
import { toast } from "react-toastify";
import Header from "../../components/Header.jsx";
import { CircularProgress } from "@mui/joy";
import Footer from "../../components/Footer.jsx";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useSelector } from "react-redux";

const ChangePassword = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const passwordSchema = yup.object({
    oldPassword: yup
      .string()
      .required("Old Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must have an alphabet, a special symbol and a number"
      ),
    newPassword: yup
      .string()
      .required("New Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must have an alphabet, a special symbol and a number"
      ),
    confirmPassword: yup
      .string()
      .equals([yup.ref("newPassword")], "Passwords must match"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isLoading },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(`/user/change-password`, {
        ...data,
        id: user._id,
      });
      toast.success(response?.data?.message);
      navigate("/profile");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="w-full h-fit py-40">
        <div className=" flex justify-center w-full h-full">
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="bg-black6 border h-fit space-y-5 border-black15 backdrop-blur-md rounded-lg p-6 shadow-lg px-[70px] py-10 flex flex-col w-fit" // Adjust the height and width here
          >
            <h1 className="text-white text-3xl font-bold mb-3 text-start">
              Change Password
            </h1>
            <div className="space-y-5">
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="oldPassword"
                  className="font-semibold text-base text-white"
                >
                  Old Password
                </label>
                <span className="bg-black8 flex w-full items-center justify-between text-white p-4 text-sm border border-black15 rounded-md">
                  <input
                    type={`${showPassword.oldPassword ? "text" : "password"}`}
                    id="oldPassword"
                    {...register("oldPassword")}
                    className="bg-black8 w-full text-white outline-none"
                    placeholder="Enter your current Password"
                  />
                  {showPassword.oldPassword ? (
                    <VisibilityOffIcon
                      onClick={() =>
                        setShowPassword({ ...showPassword, oldPassword: false })
                      }
                      className="hover:cursor-pointer"
                    />
                  ) : (
                    <VisibilityIcon
                      onClick={() =>
                        setShowPassword({ ...showPassword, oldPassword: true })
                      }
                      className="hover:cursor-pointer"
                    />
                  )}
                </span>
                {errors.oldPassword && (
                  <p className="text-red-500 text-xs font-semibold">
                    {errors.oldPassword.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-5">
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="newPassword"
                  className="font-semibold text-base text-white"
                >
                  New Password
                </label>
                <span className="bg-black8 flex w-full items-center justify-between text-white p-4 text-sm border border-black15 rounded-md">
                  <input
                    type={`${showPassword.newPassword ? "text" : "password"}`}
                    id="newPassword"
                    {...register("newPassword")}
                    className="bg-black8 w-full text-white outline-none"
                    placeholder="Enter your New Password"
                  />
                  {showPassword.newPassword ? (
                    <VisibilityOffIcon
                      onClick={() =>
                        setShowPassword({ ...showPassword, newPassword: false })
                      }
                      className="hover:cursor-pointer"
                    />
                  ) : (
                    <VisibilityIcon
                      onClick={() =>
                        setShowPassword({ ...showPassword, newPassword: true })
                      }
                      className="hover:cursor-pointer"
                    />
                  )}
                </span>
                {errors.newPassword && (
                  <p className="text-red-500 text-xs font-semibold">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-5">
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="font-semibold text-base text-white"
                >
                  Re-Enter Password
                </label>
                <span className="bg-black8 flex w-full items-center justify-between text-white p-4 text-sm border border-black15 rounded-md">
                  <input
                    type={`${
                      showPassword.confirmPassword ? "text" : "password"
                    }`}
                    id="confirmPassword"
                    {...register("confirmPassword")}
                    className="bg-black8 w-full text-white outline-none"
                    placeholder="Re-Enter your Password"
                  />
                  {showPassword.confirmPassword ? (
                    <VisibilityOffIcon
                      onClick={() =>
                        setShowPassword({
                          ...showPassword,
                          confirmPassword: false,
                        })
                      }
                      className="hover:cursor-pointer"
                    />
                  ) : (
                    <VisibilityIcon
                      onClick={() =>
                        setShowPassword({
                          ...showPassword,
                          confirmPassword: true,
                        })
                      }
                      className="hover:cursor-pointer"
                    />
                  )}
                </span>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs font-semibold">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between gap-x-5">
              <button
                disabled={isSubmitting || isLoading}
                type="submit"
                className="text-white self-center w-full text-base font-semibold px-5 py-3 rounded-md bg-red45 hover:bg-opacity-80 disabled:bg-opacity-50"
              >
                {isSubmitting || isLoading ? (
                  <CircularProgress variant="plain" color="danger" size="sm" />
                ) : (
                  "Update"
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="text-white self-center w-full text-base font-semibold px-5 py-3 rounded-md border border-red45 hover:bg-red45 hover:bg-opacity-80 disabled:bg-opacity-50"
              >
                Go Back
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default ChangePassword;
