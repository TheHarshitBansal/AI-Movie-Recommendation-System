import { BlinkBlur } from "react-loading-indicators";

const Loader = ({ text }) => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <BlinkBlur
        color="#FF0000"
        size="medium"
        text="Loading !"
        textColor="#141414"
      />
      {text && <p className="text-5xl font-bold text-red45">{text}</p>}
    </div>
  );
};

export default Loader;
