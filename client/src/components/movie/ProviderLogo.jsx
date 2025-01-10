import { IMAGE_URL } from "../../utils/constants.js";

const ProviderLogo = ({ name, profile }) => {
  if (!profile) {
    return null;
  }

  const imgUrl = IMAGE_URL + profile;

  return (
    <div className="bg-black8 rounded-xl h-[50px] min-w-[50px]">
      <img
        src={imgUrl}
        alt={name}
        className="object-cover w-[50px] h-[50px] rounded-lg"
      />
    </div>
  );
};

export default ProviderLogo;
