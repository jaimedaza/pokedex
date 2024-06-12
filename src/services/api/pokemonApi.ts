import { fetchData } from "./fetchData";
import {
  FetchPokemonDetailsProps,
  FetchPokemonProps,
  PokemonListResponse,
  FetchFavoritePokemonProps,
} from "types/fetchDataTypes";
import { Pokemon, PokemonDetails } from "types/pokemonTypes";

export const fetchPokemon = async ({
  currentPage,
  startLoading,
  stopLoading,
  setPokemonList,
  setTotalPages,
}: FetchPokemonProps) => {
  startLoading();
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${
      (currentPage - 1) * 20
    }&limit=20`;
    const { results, count } = await fetchData<PokemonListResponse>(url);

    const pokemonDetailsPromises = results.map(async (pokemon: Pokemon) => {
      return await fetchData<PokemonDetails>(pokemon.url);
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

export const fetchPokemonDetails = async ({
  name,
  startLoading,
  stopLoading,
  setPokemonDetails,
}: FetchPokemonDetailsProps) => {
  if (!name) {
    console.error("Error: Pokémon name is undefined.");
    return;
  }

  startLoading();
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const data = await fetchData<PokemonDetails>(url);
    setPokemonDetails(data);
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
  } finally {
    stopLoading();
  }
};

export const fetchFavoritePokemon = async ({
  startLoading,
  stopLoading,
  setFavoritePokemon,
}: FetchFavoritePokemonProps): Promise<void> => {
  startLoading();
  try {
    const favorites = new Set<number>(
      JSON.parse(localStorage.getItem("favorites") || "[]")
    );

    const promises = Array.from(favorites).map(async (id: number) => {
      return await fetchData<PokemonDetails>(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
    });

    const favoritePokemonDetails = await Promise.all(promises);
    favoritePokemonDetails.sort((a, b) => a.id - b.id);
    setFavoritePokemon(favoritePokemonDetails);
  } catch (error) {
    console.error("Error fetching favorite Pokémon:", error);
  } finally {
    stopLoading();
  }
};
