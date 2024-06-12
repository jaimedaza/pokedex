import { PokemonDetails, Pokemon } from "./pokemonTypes";

export interface FetchPokemonProps {
  currentPage: number;
  startLoading: () => void;
  stopLoading: () => void;
  setPokemonList: (pokemon: PokemonDetails[]) => void;
  setTotalPages: (total: number) => void;
}

export interface FetchPokemonDetailsProps {
  name: string | undefined;
  startLoading: () => void;
  stopLoading: () => void;
  setPokemonDetails: (details: PokemonDetails) => void;
}

export interface PokemonListResponse {
  results: Pokemon[];
  count: number;
}

export interface FetchFavoritePokemonProps {
  startLoading: () => void;
  stopLoading: () => void;
  setFavoritePokemon: (details: PokemonDetails[]) => void;
}
