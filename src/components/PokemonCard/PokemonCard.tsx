import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import useFavorites from "hooks/useFavorites";
import { PokemonCardProps } from "types/pokemonTypes";

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites(pokemon);

  return (
    <div
      key={pokemon.id}
      className="bg-sky-500 rounded relative hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
    >
      <div className="absolute top-0 right-0 bg-white px-2 rounded-bl rounded-tr">
        <button
          onClick={toggleFavorite}
          className="transition-colors duration-300 ease-in-out focus:outline-none"
        >
          <FontAwesomeIcon
            icon={isFavorite ? solidHeart : regularHeart}
            className={`text-red-500 ${isFavorite && "fa-beat"}`}
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
            src={pokemon.sprites.front_default || "/pokemonPlaceholder.png"}
            alt={`${pokemon.name} sprite`}
            className={`mx-auto max-w-24 ${
              !pokemon.sprites.front_default && "py-4"
            }`}
          />
          <h5 className="text-center mt-2 font-mono text-white font-semibold italic capitalize max-w-24">
            {pokemon.name}
          </h5>
        </div>
      </Link>
    </div>
  );
};

export default PokemonCard;
