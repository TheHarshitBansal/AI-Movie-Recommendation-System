import usePersonImages from "../../hooks/usePersonImages";

const PersonImages = ({ id }) => {
  const images = usePersonImages(id);
  if (!images) {
    return null;
  }
  return (
    <div className="p-5 lg:p-10 flex flex-col gap-y-2 md:gap-y-3 bg-black10 border border-black15 rounded-xl">
      <h1 className="font-medium text-gray60 lg:text-lg md:text-base text-sm">
        Images
      </h1>
      <div className="flex gap-x-2 md:gap-x-3 lg:gap-x-5 overflow-x-scroll no-scrollbar">
        {images.map((image) => (
          <img
            key={image.file_path}
            src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
            alt={image.file_path}
            className="rounded-xl"
          />
        ))}
      </div>
    </div>
  );
};

export default PersonImages;
