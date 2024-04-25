import { useState, useEffect } from "react";
import { PokemonDetails } from "types/pokemonTypes";

const useFavorites = (pokemon: PokemonDetails) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prevIsFavorite) => {
      const newIsFavorite = !prevIsFavorite;
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      if (newIsFavorite) {
        // Add to favorites list
        favorites.push(pokemon.id);
      } else {
        // Remove from favorites list
        const index = favorites.indexOf(pokemon.id);
        if (index !== -1) {
          favorites.splice(index, 1);
        }
      }
      // Update local storage
      localStorage.setItem("favorites", JSON.stringify(favorites));
      return newIsFavorite;
    });
  };

  useEffect(() => {
    // Check if this Pokemon is in the favorites list when component mounts
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(pokemon.id));
  }, [pokemon.id]);

  return { isFavorite, toggleFavorite };
};

export default useFavorites;
