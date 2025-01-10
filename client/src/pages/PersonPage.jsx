import { useParams } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import usePersonDetails from "../hooks/usePersonDetails.js";
import Loader from "../components/Loader.jsx";
import { IMAGE_URL } from "../utils/constants.js";
import PersonDetails from "../components/person/PersonDetails.jsx";

const PersonPage = () => {
  const { personId } = useParams();
  const person = usePersonDetails(personId);
  if (!person) return <Loader />;

  const imgUrl = IMAGE_URL + person.profile_path;

  return (
    <div className="relative text-white w-full h-full">
      <Header />
      <div className="relative mx-20">
        <div className="mt-32 flex items-end gap-x-10">
          <img
            src={imgUrl}
            alt={person.name}
            className="h-52 w-52 object-cover border-8 border-black15 rounded-3xl"
          />
          <div className="flex flex-col gap-y-3 mb-5">
            <span className="text-3xl font-medium text-gray60">
              {person?.known_for_department}
            </span>
            <h1 className="text-5xl font-semibold">{person.name}</h1>
          </div>
        </div>
        <PersonDetails person={person} />
      </div>
      <Footer />
    </div>
  );
};

export default PersonPage;
