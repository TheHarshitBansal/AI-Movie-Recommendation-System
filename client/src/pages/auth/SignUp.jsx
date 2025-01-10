import Header from "../../components/Header.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, CircularProgress } from "@mui/joy";
import Footer from "../../components/Footer.jsx";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useState } from "react";
import axiosInstance from "../../services/axios.js";
import { addUser } from "../../redux/slices/userSlice.js";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //! Yup Schema
  const signupSchema = yup.object({
    name: yup.string().required("Name is required"),
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
        "Password must have an alphabet, a special symbol, and a number"
      ),
    avatar: yup.mixed(),
    terms: yup.bool().oneOf([true], "You must agree with Terms of Use"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      //? Generate a preview
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result);
      reader.readAsDataURL(file);

      //? Set the file in React Hook Form
      setValue("avatar", file, { shouldValidate: true });
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      //! Dispatch the action
      const response = await axiosInstance.post(
        "/user/signup",
        {
          ...data,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(addUser(response?.data?.user));
      toast.success(response?.data?.message, { type: "success" });
      navigate("/browse");
    } catch (error) {
      toast.error(error?.response?.data?.message, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="w-full h-full py-40">
        <div className=" flex justify-center w-full h-full">
          <form
            noValidate
            encType="multipart/form-data"
            onSubmit={handleSubmit(onSubmit)}
            className="bg-black6 border space-y-5 border-black15 backdrop-blur-md rounded-lg p-6 shadow-lg px-[70px] py-10 flex flex-col h-fit min-h-fit w-[450px]" // Adjust the height and width here
          >
            <h1 className="text-white text-3xl font-bold text-start">
              Sign Up
            </h1>
            <div className="space-y-3">
              <div className="flex flex-col items-center">
                <label
                  htmlFor="avatar"
                  className="font-semibold text-white hover:cursor-pointer hover:opacity-50 w-fit"
                >
                  {avatar ? (
                    <img src={avatar} alt="avatar" className="w-24 h-24" />
                  ) : (
                    <AccountBoxIcon className="min-w-24 min-h-24 m-auto" />
                  )}
                </label>
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  {...register("avatar")}
                  hidden
                  className="bg-black8 text-white p-4 text-sm border border-black15 rounded-md"
                  onChange={handleImageUpload}
                />
                {errors.avatar && (
                  <p className="text-red-500 text-xs font-semibold">
                    {errors.avatar.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="name"
                  className="font-semibold text-base text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  placeholder="Enter your Name"
                  className="bg-black8 text-white p-4 text-sm border border-black15 rounded-md"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs font-semibold">
                    {errors.name.message}
                  </p>
                )}
              </div>
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
            <Checkbox
              label="I agree with Terms of Use and Privacy Policy"
              {...register("terms")}
              variant="soft"
              className="!text-white font-light mb-5"
            />
            {errors.terms && (
              <p className="text-red-500 text-xs font-semibold">
                {errors.terms.message}
              </p>
            )}
            <button
              disabled={isSubmitting || loading}
              type="submit"
              className="text-white self-center w-full text-base font-semibold px-5 py-3 rounded-md bg-red45 hover:bg-opacity-80 disabled:bg-opacity-50"
            >
              {isSubmitting || loading ? (
                <CircularProgress variant="plain" color="danger" size="sm" />
              ) : (
                "Sign Up"
              )}
            </button>
            <span className="text-[#b8b7b7] text-base">
              Already have an account?{" "}
              <Link
                className="text-white hover:text-gray-300 hover:underline"
                to={"/auth/signin"}
              >
                Sign In{" "}
              </Link>
            </span>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
