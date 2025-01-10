const FeatureCard = ({ heading, description, svg }) => {
  return (
    <div className="relative p-10 w-[420px] bg-black6 rounded-xl">
      <div className="absolute top-0 left-0 w-full h-full rounded-xl bg-opacity-20 bg-[linear-gradient(215deg,_rgba(229,_0,_0,_0.1)_0%,_rgba(229,_0,_0,_0)_50%)]"></div>
      <div className="flex flex-col gap-y-5">
        {/* //!SVG and Heading */}
        <div className="flex items-center gap-x-3">
          <span className="p-3 bg-black8 rounded-lg border border-black12">
            <img src={svg} alt="svg" />
          </span>
          <span className="text-white font-semibold text-xl">{heading}</span>
        </div>
        {/* //!Description */}
        <p className="text-base text-gray60">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
