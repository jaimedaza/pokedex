import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { PokemonDetails } from "types/pokemonTypes";

interface PokemonCardProps {
  pokemon: PokemonDetails;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prevState) => !prevState);
  };

  return (
    <div key={pokemon.id} className="bg-sky-500 rounded relative">
      <div className="absolute top-0 right-0 bg-white px-2 rounded-bl rounded-tr">
        <button onClick={toggleFavorite}>
          <FontAwesomeIcon
            icon={isFavorite ? solidHeart : regularHeart}
            className="text-red-500"
          />
        </button>
      </div>
      <Link
        to={`/details/${pokemon.name}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="absolute top-0 left-0 bg-yellow-300 text-white font-semibold font-mono italic px-2 rounded-br rounded-tl">
          <span className="text-xs">#{pokemon.id}</span>
        </div>
        <div className="flex flex-col p-4">
          <img
            src={pokemon.sprites.front_default}
            alt={`${pokemon.name} sprite`}
            className="mx-auto"
          />
          <h5 className="text-center mt-2 font-mono text-white font-semibold italic capitalize">
            {pokemon.name}
          </h5>
        </div>
      </Link>
    </div>
  );
};

export default PokemonCard;
