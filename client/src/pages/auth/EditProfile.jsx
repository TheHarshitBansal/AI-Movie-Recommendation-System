import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer.jsx";
import Header from "../../components/Header.jsx";
import { CircularProgress } from "@mui/joy";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../services/axios.js";
import { toast } from "react-toastify";
import { addUser } from "../../redux/slices/userSlice.js";

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user); // User details from Redux store
  const [avatar, setAvatar] = useState(user?.avatar?.secure_url || null); // Avatar preview

  // Validation schema
  const updateSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Enter a valid Email")
      .required("Email is required"),
    avatar: yup.mixed(),
  });

  // Initialize React Hook Form
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting, isLoading },
  } = useForm({
    resolver: yupResolver(updateSchema),
    defaultValues: {
      name: user.name, // Set default values
      email: user.email,
    },
  });

  // Set form values when the component mounts (for prefilling user data)
  useEffect(() => {
    setValue("name", user.name);
    setValue("email", user.email);
    setValue("avatar", user?.avatar?.secure_url);
  }, [setValue, user]);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Generate a preview
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result);
      reader.readAsDataURL(file);

      // Set the file in React Hook Form
      setValue("avatar", file, { shouldValidate: true });
    }
  };

  // Form submission
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.put(
        "/user/profile",
        { ...data, id: user._id },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response?.data?.message);
      dispatch(addUser(response?.data?.user));
      navigate("/profile");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="w-full h-full py-40">
        <div className="flex justify-center w-full h-full">
          <form
            noValidate
            encType="multipart/form-data"
            onSubmit={handleSubmit(onSubmit)}
            className="bg-black6 border space-y-5 border-black15 backdrop-blur-md rounded-lg p-6 shadow-lg px-[70px] py-10 flex flex-col h-fit min-h-fit w-[450px]"
          >
            <h1 className="text-white text-3xl font-bold text-start">
              Edit Profile
            </h1>
            <div className="space-y-3">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center">
                <label
                  htmlFor="avatar"
                  className="font-semibold text-white hover:cursor-pointer hover:opacity-50 w-fit"
                >
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="avatar"
                      className="w-24 h-24 rounded-lg"
                    />
                  ) : (
                    <div className="w-24 h-24 m-auto bg-red45 rounded-lg text-white text-6xl text-center font-semibold flex items-center justify-center uppercase">
                      {user.name[0]}
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
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

              {/* Name Field */}
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

              {/* Email Field */}
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
            </div>

            {/* Submit and Go Back Buttons */}
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

export default EditProfile;
