import { CircularProgress } from "@mui/joy";
import Footer from "../../components/Footer.jsx";
import Header from "../../components/Header.jsx";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../../services/axios.js";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const forgetPasswordSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid Email")
      .required("Email is required")
      .trim(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(forgetPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/user/reset", data);
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="w-screen h-fit py-40">
        <div className=" flex justify-center w-full h-full">
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="bg-black6 border w-[90vw] h-fit space-y-5 border-black15 backdrop-blur-md rounded-lg p-6 shadow-lg px-10 md:px-[70px] py-10 flex flex-col md:w-fit" // Adjust the height and width here
          >
            <h1 className="text-white text-2xl md:text-3xl font-bold mb-3 text-start">
              Forget Password
            </h1>
            <div className="flex flex-col md:flex-row md:items-center md:gap-x-3 gap-y-3 md:gap-y-0">
              <div className="space-y-5">
                <div className="flex flex-col space-y-2">
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    placeholder="Enter your Email"
                    className="bg-black8 text-white p-4 text-sm border md:w-96 md:min-w-fit border-black15 rounded-md"
                  />
                </div>
              </div>
              <button
                disabled={isSubmitting}
                type="submit"
                className="text-white self-start md:self-center w-fit disabled:bg-opacity-50 text-ssm md:text-base font-semibold px-3 py-2 md:px-6 md:py-4 rounded-md bg-red45 hover:bg-opacity-80"
              >
                {isSubmitting ? (
                  <CircularProgress variant="plain" color="danger" size="sm" />
                ) : (
                  "Send Link"
                )}
              </button>
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs font-semibold">
                {errors.email.message}
              </p>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgetPassword;
