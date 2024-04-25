import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

import useFavorites from "hooks/useFavorites";
import { PokemonCardProps } from "types/pokemonTypes";
import { convertHeight, convertWeight } from "utils/utils";
import { typeColors, statAbbreviations, statColors } from "utils/constants";

const PokemonDetailCard = ({ pokemon }: PokemonCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites(pokemon);

  return (
    <>
      {pokemon && (
        <div
          key={pokemon.id}
          className="w-72 bg-sky-500 rounded relative hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
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

          <div className="absolute top-0 left-0 bg-yellow-300 text-white font-semibold font-mono italic px-2 rounded-br rounded-tl">
            <span className="text-xs">#{pokemon.id}</span>
          </div>
          <div className="flex flex-col p-4">
            {/* Image */}
            <img
              src={pokemon.sprites.front_default || "/pokemonPlaceholder.png"}
              alt={`${pokemon.name} sprite`}
              className={`w-48 mx-auto max-w-48 ${
                !pokemon.sprites.front_default && "py-4"
              }`}
            />

            {/* Name */}
            <h3 className="text-center mt-2 text-2xl font-mono text-white font-bold italic capitalize">
              {pokemon.name}
            </h3>

            {/* Types */}
            {/* <p>{pokemon.types.map((type) => type.type.name).join(", ")}</p> */}
            <div className="flex justify-evenly">
              {pokemon.types.map((type, index) => (
                <div
                  key={index}
                  className="text-white rounded-lg w-20 text-center text-sm font-mono"
                  style={{
                    backgroundColor:
                      typeColors[type.type.name as keyof typeof typeColors] ||
                      "#000",
                  }}
                >
                  {type.type.name}
                </div>
              ))}
            </div>

            {/* Weight and Height */}
            <div className="flex justify-evenly my-4 font-mono">
              <div className="w-20">
                <p className="font-bold text-yellow-400 text-center">
                  {convertWeight(pokemon.weight)}
                </p>
                <p className="text-xs text-center text-white">Weight</p>
              </div>
              <div className="w-20">
                <p className="font-bold text-yellow-400 text-center">
                  {convertHeight(pokemon.height)}
                </p>
                <p className="text-xs text-center text-white">Height</p>
              </div>
            </div>

            {/* Stats */}
            <div className="font-mono">
              <h5 className="font-mono text-center text-sm font-semibold text-yellow-400">
                Base Stats
              </h5>
              {pokemon.stats.map((stat, index) => (
                <div key={index} className="flex items-center py-1">
                  <div className="w-12">
                    <p className="text-xs">
                      {
                        statAbbreviations[
                          stat.stat.name as keyof typeof statAbbreviations
                        ]
                      }
                      :
                    </p>
                  </div>
                  <div className="relative bg-gray-200 rounded-lg h-6 w-full">
                    <div
                      className="h-full rounded-lg"
                      style={{
                        width: `${(stat.base_stat / 255) * 100}%`,
                        backgroundColor:
                          statColors[
                            stat.stat.name as keyof typeof statColors
                          ] || "#808080",
                      }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-600">
                      {stat.base_stat} / {255}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonDetailCard;
