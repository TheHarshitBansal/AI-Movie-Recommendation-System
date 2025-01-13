import Header from "../../components/Header.jsx";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/joy";
import Footer from "../../components/Footer.jsx";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/slices/userSlice.js";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axiosInstance from "../../services/axios.js";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const signinSchema = yup
    .object({
      email: yup
        .string()
        .email("Enter a valid Email")
        .required("Email is required")
        .trim(),
      password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Password must have an alphabet, a special symbol and a number"
        ),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signinSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/user/login", data);
      dispatch(addUser(response?.data?.user));
      toast.success(response?.data?.message, { type: "success" });
      navigate("/browse");
    } catch (error) {
      toast.error(error?.response?.data?.message, { type: "error" });
    }
  };

  return (
    <div>
      <Header />
      <div className="w-full h-full py-40">
        <div className=" flex justify-center w-full h-full">
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="bg-black6 border space-y-5 border-black15 backdrop-blur-md rounded-lg p-6 shadow-lg px-[70px] py-10 flex flex-col h-fit min-h-[600px] w-[450px]" // Adjust the height and width here
          >
            <h1 className="text-white text-3xl font-bold mb-3 text-start">
              Sign In
            </h1>
            <div className="space-y-5">
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="email"
                  className="font-semibold text-base text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  placeholder="Enter your Email"
                  className="bg-black8 text-white p-4 text-sm border border-black15 rounded-md"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs font-semibold">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="password"
                  className="font-semibold text-base text-white"
                >
                  Password
                </label>
                <span className="bg-black8 flex w-full items-center justify-between text-white p-4 text-sm border border-black15 rounded-md">
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    id="password"
                    {...register("password")}
                    className="bg-black8 w-full text-white outline-none"
                    placeholder="Enter your Password"
                  />
                  {showPassword ? (
                    <VisibilityOffIcon
                      onClick={() => setShowPassword(false)}
                      className="hover:cursor-pointer"
                    />
                  ) : (
                    <VisibilityIcon
                      onClick={() => setShowPassword(true)}
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
            <button
              disabled={isSubmitting}
              type="submit"
              className="text-white self-center w-full disabled:bg-opacity-50 text-base font-semibold px-5 py-3 rounded-md bg-red45 hover:bg-opacity-80"
            >
              {isSubmitting ? (
                <CircularProgress variant="plain" color="danger" size="sm" />
              ) : (
                "Sign In"
              )}
            </button>
            <Link
              to="/auth/forget-password"
              className="text-white text-center text-base hover:text-gray-300 font-light hover:underline mb-5"
            >
              Forgot Password?
            </Link>
            <span className="text-[#b8b7b7] text-base">
              New to StreamVibe?{" "}
              <Link
                to="/auth/signup"
                className="text-white hover:text-gray-300 hover:underline"
              >
                Sign Up now{" "}
              </Link>
            </span>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
