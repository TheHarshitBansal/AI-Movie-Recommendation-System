import { IMAGE_URL } from "../../utils/constants.js";

const ProviderLogo = ({ name, profile }) => {
  if (!profile) {
    return null;
  }

  const imgUrl = IMAGE_URL + profile;

  return (
    <div className="bg-black8 rounded-xl h-[30px] min-w-[30px] md:h-[40px] md:min-w-[40px] lg:h-[50px] lg:min-w-[50px]">
      <img
        src={imgUrl}
        alt={name}
        className="object-cover h-[30px] min-w-[30px] md:h-[40px] md:min-w-[40px] lg:h-[50px] lg:min-w-[50px] rounded-lg"
      />
    </div>
  );
};

export default ProviderLogo;
