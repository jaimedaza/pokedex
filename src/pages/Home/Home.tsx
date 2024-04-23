import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { PokemonDetails } from "types/pokemonTypes";

interface Pokemon {
  name: string;
  url: string;
}

const Home = () => {
  const [pokemonList, setPokemonList] = useState<PokemonDetails[]>([]);

  // Fetch data from PokeAPI on component mount
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon/");
        const { results } = response.data;

        // Map over the array of Pokémon and fetch details for each one
        const pokemonDetailsPromises = results.map(async (pokemon: Pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url);
          return pokemonResponse.data;
        });

        // Wait for all requests to resolve
        const pokemonDetails = await Promise.all(pokemonDetailsPromises);
        console.log("pokemon details: ", pokemonDetails);
        setPokemonList(pokemonDetails);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    };

    fetchPokemon();
  }, []);

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
      </div>
    </div>
  );
};

export default Home;
