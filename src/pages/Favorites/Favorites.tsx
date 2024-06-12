import { useState, useEffect } from "react";
import PokemonCard from "components/PokemonCard/PokemonCard";
import PokeballLoading from "components/Loading/PokeballLoading";
import useLoading from "hooks/useLoading";
import { PokemonDetails } from "types/pokemonTypes";
import { fetchFavoritePokemon } from "services/api/pokemonApi";

const FavoritesPage = () => {
  const [favoritePokemon, setFavoritePokemon] = useState<PokemonDetails[]>([]);
  const { isLoading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    fetchFavoritePokemon({ startLoading, stopLoading, setFavoritePokemon });
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
