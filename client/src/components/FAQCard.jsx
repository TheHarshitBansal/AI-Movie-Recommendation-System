import { Add, Remove } from "@mui/icons-material";

const FAQCard = ({ num, question, ans, open, setOpen }) => {
  return (
    <div className="max-w-[620px] max-h-[140px]">
      <div
        className={`flex p-6 gap-x-4 ${open ? "items-start" : "items-center"}`}
      >
        <span className="text-white bg-black12 border border-black15 p-4 text-base text-center font-semibold rounded-lg w-[50px] h-[50px]">
          {num + 1}
        </span>
        <div className="space-y-3 w-[450px]">
          <h1 className="text-white text-xl font-medium">{question}</h1>
          <p className={`text-gray60 text-base ${open ? "visible" : "hidden"}`}>
            {ans}
          </p>
        </div>
        <span
          className="h-6 w-6 text-white cursor-pointer"
          onClick={() => setOpen(open ? null : num)}
        >
          {!open ? <Add fontSize="medium" /> : <Remove fontSize="medium" />}
        </span>
      </div>
      <div
        className={`h-[1px] w-full bg-[linear-gradient(90deg,_rgba(229,_0,_0,_0)_0%,_rgba(229,_0,_0,_1)_17%,_rgba(229,_0,_0,_0)_100%)] ${
          num == 4 || num == 9 ? "hidden" : "block"
        }`}
      ></div>
    </div>
  );
};

export default FAQCard;
