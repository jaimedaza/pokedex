import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PokemonDetails } from "types/pokemonTypes";

const DetailsPage = () => {
  const { name } = useParams();
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null
  );

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        setPokemonDetails(response.data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    fetchPokemonDetails();
  }, [name]);

  return (
    <div>
      <h2>Details for Pokémon: {name}</h2>
      {pokemonDetails && (
        <div>
          <p>ID: {pokemonDetails.id}</p>
          <p>Name: {pokemonDetails.name}</p>
          <p>
            Types:{" "}
            {pokemonDetails.types.map((type) => type.type.name).join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
