import { Checkbox } from "@mui/joy";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const ContactForm = () => {
  const schema = yup
    .object({
      firstName: yup.string().required("First Name is required"),
      lastName: yup.string().required("Last Name is required"),
      email: yup
        .string()
        .email("Enter a valid Email")
        .required("Email is required")
        .trim(),
      message: yup
        .string()
        .required("Message is required")
        .min(20, "Message must be at least 20 characters"),
      terms: yup
        .boolean()
        .oneOf([true], "You must agree with Terms of Use and Privacy Policy"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="text-white relative lg:w-[800px]">
      <div className="bg-black6 border border-black15 p-10 rounded-xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-10"
          noValidate
        >
          <div className="flex flex-col sm:flex-row w-full gap-5">
            <div className="flex flex-col sm:w-1/2 space-y-3">
              <label htmlFor="firstName" className="font-semibold text-base">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                {...register("firstName")}
                placeholder="Enter First Name"
                className="bg-black8 p-4 text-sm border border-black15 rounded-md"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs font-semibold">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col sm:w-1/2 space-y-3">
              <label htmlFor="lastName" className="font-semibold text-base">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                {...register("lastName")}
                placeholder="Enter Last Name"
                className="bg-black8 p-4 text-sm border border-black15 rounded-md"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs font-semibold">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <label htmlFor="email" className="font-semibold text-base">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="Enter your Email"
              className="bg-black8 p-4 text-sm border border-black15 rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-xs font-semibold">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-3">
            <label htmlFor="message" className="font-semibold text-base">
              Message
            </label>
            <textarea
              id="message"
              {...register("message")}
              placeholder="Enter your message"
              className="bg-black8 p-4 text-sm border border-black15 rounded-md resize-none"
              rows={5}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-xs font-semibold">
                {errors.message.message}
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <Checkbox
                label="I agree with Terms of Use and Privacy Policy"
                variant="soft"
                {...register("terms")}
                className="!text-white font-light mb-5"
              />
              {errors.terms && (
                <p className="text-red-500 text-xs font-semibold">
                  {errors.terms.message}
                </p>
              )}
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className={`font-semibold bg-red45 hover:opacity-90 text-sm px-5 py-3 rounded-md ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
