import { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "components/PokemonCard/PokemonCard";
import PokeballLoading from "components/Loading/PokeballLoading";
import useLoading from "hooks/useLoading";
import { PokemonDetails } from "types/pokemonTypes";

const FavoritesPage = () => {
  const [favoritePokemon, setFavoritePokemon] = useState<PokemonDetails[]>([]);
  const { isLoading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    const fetchFavoritePokemon = async () => {
      startLoading(); // Start loading
      try {
        // Retrieve list of favorite Pokemon IDs from local storage
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

        // Fetch details of each favorite Pokemon
        const promises = favorites.map(async (id: number) => {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${id}`
          );
          return response.data;
        });

        const favoritePokemonDetails = await Promise.all(promises);
        // Sort favorite Pokemon by ID before setting state
        favoritePokemonDetails.sort((a, b) => a.id - b.id);
        setFavoritePokemon(favoritePokemonDetails);
      } catch (error) {
        console.error("Error fetching favorite Pokémon:", error);
      } finally {
        stopLoading();
      }
    };

    fetchFavoritePokemon();
  }, []);

  return (
    <div className="flex justify-center w-full overflow-y-scroll pt-4">
      {isLoading ? (
        <PokeballLoading />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-5 grid-flow-row gap-4">
          {favoritePokemon.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
