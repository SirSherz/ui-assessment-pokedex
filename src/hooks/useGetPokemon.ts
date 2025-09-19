import { useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import gql from 'graphql-tag';

export type DetailedPokemon = {
  id: string;
  name: string;
  number: number;
  types: string[];
  image: string;
  weight: {
    minimum: string;
    maximum: string;
  };
  height: {
    minimum: string;
    maximum: string;
  };
  classification: string;
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
};

export const GET_POKEMON = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const useGetPokemon = (pokemonId?: string, pokemonName?: string) => {
  const { data, ...queryRes } = useQuery(GET_POKEMON, {
    variables: {
      id: pokemonId,
      name: pokemonName,
    },
    skip: !pokemonId && !pokemonName,
  });

  const pokemon: DetailedPokemon | null = useMemo(() => {
    return data ? (data as { pokemon: DetailedPokemon }).pokemon : null;
  }, [data]);

  return {
    pokemon,
    ...queryRes,
  };
};
