import SearchIcon from "@mui/icons-material/Search";
import { useState, useRef, useEffect } from "react";
import { API_OPTIONS } from "../utils/constants.js";
import SearchResultCard from "./SearchResultCard.jsx";
import { RiGeminiLine } from "react-icons/ri";
import axiosInstance from "../services/axios.js";
import { toast } from "react-toastify";

const SearchBar = ({ isBasicSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [results, setResults] = useState([]);

  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
        setResults([]);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isBasicSearch) {
      const handler = setTimeout(() => {
        setDebouncedQuery(query);
      }, 1000);

      return () => clearTimeout(handler);
    }
  }, [query, isBasicSearch]);

  // Fetch search results whenever the debounced query changes
  useEffect(() => {
    if (isBasicSearch && debouncedQuery) {
      fetchSearchResults(debouncedQuery);
    }
  }, [debouncedQuery, isBasicSearch]);

  const fetchSearchResults = async (query) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${query}`,
        API_OPTIONS
      );
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleGPTSearch = async () => {
    try {
      setResults([]);
      const response = await axiosInstance.post("/searchAI", { prompt: query });
      const array = response.data;
      array.forEach(async (element) => {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/multi?query=${element}`,
          API_OPTIONS
        );
        const data = await res.json();
        setResults((prev) => [...prev, data.results[0]]);
      });
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div
      ref={searchRef}
      className={`relative text-gray60 flex flex-col gap-y-3 ${
        isOpen
          ? "bg-black10 border border-black15 rounded-lg p-2 max-w-52 md:max-w-72 lg:max-w-96"
          : "mt-2"
      }`}
    >
      {/* Search Bar */}
      <div className="flex items-center gap-x-3">
        {isBasicSearch ? (
          <>
            <SearchIcon
              fontSize="medium"
              className="!hidden md:!block cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
            <SearchIcon
              fontSize="small"
              className="md:!hidden cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
          </>
        ) : (
          <RiGeminiLine
            className="text-lg md:text-2xl cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        )}

        <input
          type="text"
          placeholder={isBasicSearch ? "Search Here" : "AI Search"}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`bg-transparent outline-none text-xs md:text-base ${
            isOpen ? "w-96" : "w-0"
          } transition-all`}
        />
        {isOpen && !isBasicSearch && (
          <button
            className="text-xs md:text-base w-fit"
            onClick={handleGPTSearch}
          >
            Search
          </button>
        )}
      </div>

      {/* Results Box */}
      {isOpen && query && results && (
        <div className="bg-black10 w-full max-h-96 overflow-y-scroll no-scrollbar rounded-lg mt-2 border-t border-black15">
          {results.map((result, index) => (
            <SearchResultCard key={index} result={result} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
