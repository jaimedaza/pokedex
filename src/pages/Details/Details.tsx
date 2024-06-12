import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import PokeballLoading from "components/Loading/PokeballLoading";

import useLoading from "hooks/useLoading";

import { PokemonDetails } from "types/pokemonTypes";
import PokemonDetailCard from "components/PokemonCard/PokemonDetailCard";
import { fetchPokemonDetails } from "services/api/pokemonApi";

const DetailsPage = () => {
  const { name } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null
  );
  const { isLoading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    fetchPokemonDetails({ name, startLoading, stopLoading, setPokemonDetails });
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
