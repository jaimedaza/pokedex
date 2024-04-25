import { useState } from "react";
import { Link } from "react-router-dom";
import { PokemonDetails } from "types/pokemonTypes";

interface TypeAheadProps {
  pokemonList: PokemonDetails[];
}

const TypeAhead = ({ pokemonList }: TypeAheadProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Function to fetch suggestions
  const fetchSuggestions = (value: string) => {
    try {
      if (value.trim() === "") {
        // If input value is empty, clear suggestions
        setSuggestions([]);
        return;
      }

      const filteredPokemonNames = pokemonList
        .map((pokemon) => pokemon.name)
        .filter((name) => name.toLowerCase().includes(value.toLowerCase()));

      setSuggestions(filteredPokemonNames);
    } catch (error) {
      console.error("Error fetching Pokémon suggestions:", error);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          fetchSuggestions(e.target.value);
        }}
        className="w-full border text-sky-700 border-gray-300 rounded px-3 py-2 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
      />
      {suggestions.length > 0 && (
        <ul className="absolute w-full max-h-40 overflow-y-auto border border-gray-300 rounded bg-white shadow-md z-10 mt-1">
          {suggestions.map((suggestion, index) => (
            <Link
              to={`/details/${suggestion}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <li
                key={index}
                className="py-1 px-3 cursor-pointer text-sky-700 hover:bg-yellow-400 hover:text-white transition-all duration-300"
              >
                {suggestion}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TypeAhead;
