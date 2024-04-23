import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { PokemonDetails } from "types/pokemonTypes";
import usePagination from "hooks/usePagination";
import PaginationButtons from "components/PaginationButtons/PaginationButtons";

interface Pokemon {
  name: string;
  url: string;
}

const Home = () => {
  const [pokemonList, setPokemonList] = useState<PokemonDetails[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { currentPage, handlePreviousPage, handleNextPage } = usePagination({
    totalPages: totalPages,
  });

  // Fetch data from PokeAPI on component mount
  useEffect(() => {
    const fetchPokemon = async () => {
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
      }
    };

    fetchPokemon();
  }, [currentPage]);

  return (
    <div className="flex justify-center w-full items-center">
      <div>
        <p>This is the content for logged-in users.</p>
        <div>
          <h1>Pokémon List</h1>
          <ul>
            {pokemonList.map((pokemon) => (
              <li key={pokemon.id}>
                <Link
                  to={`/details/${pokemon.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {pokemon.name} -{" "}
                  {pokemon.types.map((type) => type.type.name).join(", ")}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <PaginationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
        />
      </div>
    </div>
  );
};

export default Home;
