import { useState, useEffect } from "react";
import axios from "axios";

import PaginationButtons from "components/PaginationButtons/PaginationButtons";
import PokemonCard from "components/PokemonCard/PokemonCard";
import PokeballLoading from "components/Loading/PokeballLoading";
import TypeAhead from "components/Input/TypeAhead";

import usePagination from "hooks/usePagination";
import useLoading from "hooks/useLoading";

import { PokemonDetails } from "types/pokemonTypes";
import useVisibilityTimer from "hooks/useVisibilityTimer";

interface Pokemon {
  name: string;
  url: string;
}

const Home = () => {
  const [pokemonList, setPokemonList] = useState<PokemonDetails[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { isLoading, startLoading, stopLoading } = useLoading();
  const { currentPage, handlePreviousPage, handleNextPage, goToPage } =
    usePagination({
      totalPages: totalPages,
    });
  const isVisible = useVisibilityTimer();

  // Fetch data from PokeAPI on component mount
  useEffect(() => {
    const fetchPokemon = async () => {
      startLoading();
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/?offset=${
            (currentPage - 1) * 20
          }&limit=20`
        );
        const { results, count } = response.data;

        const pokemonDetailsPromises = results.map(async (pokemon: Pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url);
          return pokemonResponse.data;
        });

        const pokemonDetails = await Promise.all(pokemonDetailsPromises);
        setPokemonList(pokemonDetails);
        setTotalPages(Math.ceil(count / 20));
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      } finally {
        stopLoading();
      }
    };

    fetchPokemon();
  }, [currentPage]);

  return (
    <div className="flex justify-center w-full overflow-y-scroll">
      {isLoading ? (
        <PokeballLoading />
      ) : (
        <div className="flex flex-col">
          <div
            className={`z-10 my-8 transition duration-300 ease-in-out transform hover:scale-105 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-6"
            }`}
          >
            <TypeAhead pokemonList={pokemonList} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 grid-flow-row gap-4">
            {pokemonList.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
          <div
            className={`mt-4 transition duration-300 ease-in-out transform hover:scale-105 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-6"
            }`}
          >
            <PaginationButtons
              currentPage={currentPage}
              goToPage={goToPage}
              handlePreviousPage={handlePreviousPage}
              handleNextPage={handleNextPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
