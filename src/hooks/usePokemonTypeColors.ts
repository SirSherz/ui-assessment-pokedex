import { useMemo } from 'react';

// This hook provides a way to get the color associated with each Pokemon type.
// It uses useMemo to memoize the type colors and the function to get the color,
// ensuring that they are only recalculated when necessary.
// Returns an object containing the getPokemonTypeColor function.

export type PokemonType =
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'ice'
  | 'dragon'
  | 'fairy'
  | 'normal'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'steel';

export const usePokemonTypeColors = () => {
  const typeColors: Record<string, string> = useMemo(
    () => ({
      fire: '#ff6b6b',
      water: '#4ecdc4',
      grass: '#27ae60',
      electric: '#f1c40f',
      ice: '#85c1e9',
      dragon: '#8e44ad',
      fairy: '#fd79a8',
      normal: '#95a5a6',
      fighting: '#e67e22',
      poison: '#a29bfe',
      ground: '#d4ac0d',
      flying: '#85c1e9',
      bug: '#58d68d',
      rock: '#7d6608',
      ghost: '#6c5ce7',
      steel: '#b2bec3',
    }),
    []
  );

  const getPokemonTypeColor = useMemo(
    () => (type: string) => {
      return typeColors[type.toLowerCase()] || '#95a5a6';
    },
    [typeColors]
  );

  return {
    getPokemonTypeColor,
  };
};
