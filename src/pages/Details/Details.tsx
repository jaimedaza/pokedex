import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import PokeballLoading from "components/Loading/PokeballLoading";

import useLoading from "hooks/useLoading";

import { PokemonDetails } from "types/pokemonTypes";
import PokemonDetailCard from "components/PokemonCard/PokemonDetailCard";

const DetailsPage = () => {
  const { name } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null
  );
  const { isLoading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      startLoading();
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        setPokemonDetails(response.data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      } finally {
        stopLoading();
      }
    };

    fetchPokemonDetails();
  }, [name]);

  return (
    <div className="flex justify-center w-full items-center">
      {isLoading ? (
        <PokeballLoading />
      ) : (
        <>{pokemonDetails && <PokemonDetailCard pokemon={pokemonDetails} />}</>
      )}
    </div>
  );
};

export default DetailsPage;
