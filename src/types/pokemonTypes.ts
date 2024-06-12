export interface Pokemon {
  name: string;
  url: string;
}
export interface PokemonDetails {
  id: number;
  height: number;
  name: string;
  sprites: { front_default: string };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: { type: { name: string } }[];
  weight: number;
}

export interface PokemonCardProps {
  pokemon: PokemonDetails;
}
