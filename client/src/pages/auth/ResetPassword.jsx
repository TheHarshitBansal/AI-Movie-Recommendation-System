import { CircularProgress } from "@mui/joy";
import Footer from "../../components/Footer.jsx";
import Header from "../../components/Header.jsx";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import axiosInstance from "../../services/axios.js";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { resetId } = useParams();

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const forgetPasswordSchema = yup.object({
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must have an alphabet, a special symbol and a number"
      ),
    confirmPassword: yup
      .string()
      .equals([yup.ref("password")], "Passwords must match"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(forgetPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(`/user/reset/${resetId}`, data);
      toast.success(response?.data?.message);
      navigate("/auth/signin");
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
              Reset Password
            </h1>
            <div className="space-y-5">
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="password"
                  className="font-semibold text-base text-white"
                >
                  Password
                </label>
                <span className="bg-black8 flex w-full items-center justify-between text-white p-4 text-sm border border-black15 rounded-md">
                  <input
                    type={`${showPassword.password ? "text" : "password"}`}
                    id="password"
                    {...register("password")}
                    className="bg-black8 w-full text-white outline-none"
                    placeholder="Enter your Password"
                  />
                  {showPassword.password ? (
                    <VisibilityOffIcon
                      onClick={() =>
                        setShowPassword({ ...showPassword, password: false })
                      }
                      className="hover:cursor-pointer"
                    />
                  ) : (
                    <VisibilityIcon
                      onClick={() =>
                        setShowPassword({ ...showPassword, password: true })
                      }
                      className="hover:cursor-pointer"
                    />
                  )}
                </span>
                {errors.password && (
                  <p className="text-red-500 text-xs font-semibold">
                    {errors.password.message}
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
            <button
              disabled={isSubmitting}
              type="submit"
              className="text-white self-center w-full disabled:bg-opacity-50 text-base font-semibold px-6 py-4 rounded-md bg-red45 hover:bg-opacity-80"
            >
              {isSubmitting ? (
                <CircularProgress variant="plain" color="danger" size="sm" />
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
