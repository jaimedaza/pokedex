import { useState, useEffect } from "react";
import { PokemonDetails } from "types/pokemonTypes";

const useFavorites = (pokemon: PokemonDetails) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prevIsFavorite) => {
      const newIsFavorite = !prevIsFavorite;
      const favorites = new Set<number>(
        JSON.parse(localStorage.getItem("favorites") || "[]")
      );
      if (newIsFavorite) {
        favorites.add(pokemon.id);
      } else {
        favorites.delete(pokemon.id);
      }
      localStorage.setItem("favorites", JSON.stringify(Array.from(favorites)));
      return newIsFavorite;
    });
  };

  useEffect(() => {
    // Check if this Pokemon is in the favorites set when component mounts
    const favorites = new Set<number>(
      JSON.parse(localStorage.getItem("favorites") || "[]")
    );
    setIsFavorite(favorites.has(pokemon.id));
  }, [pokemon.id]);

  return { isFavorite, toggleFavorite };
};

export default useFavorites;
