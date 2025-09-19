import React, { ChangeEvent, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPokemons, Pokemon } from '../../hooks/useGetPokemons';
import { PokemonModal } from '../Modal/PokemonModal';
import { PokemonImage } from '../PokemonImage/PokemonImage';
import { usePokemonTypeColors } from '../../hooks/usePokemonTypeColors';

export const PokemonList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { pokemonId } = useParams();
  const { pokemons, loading } = useGetPokemons();
  const { getPokemonTypeColor } = usePokemonTypeColors();
  const [searchInput, setSearchInput] = useState('');

  const filteredPokemons = useMemo(() => {
    if (!searchInput) return pokemons;

    return pokemons.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        pokemon.types.some((type) =>
          type.toLowerCase().includes(searchInput.toLowerCase())
        ) ||
        pokemon.number.toString().includes(searchInput)
    );
  }, [pokemons, searchInput]);

  const noResults =
    !loading && filteredPokemons.length === 0 && searchInput.length > 0;

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleOnClickPokemon = (pokemon: Pokemon) => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  const handleCloseModal = () => {
    navigate('/pokemon');
  };

  return (
    <div className={classes.root}>
      {loading && (
        <div style={{ color: 'white', fontSize: '18px' }}>Loading...</div>
      )}

      {!loading && (
        <input
          type="text"
          placeholder="Search Pokemon (Number, Name, or Type)"
          className={classes.searchInput}
          value={searchInput}
          onChange={handleChangeInput}
        />
      )}

      {noResults && (
        <div style={{ color: 'white', fontSize: '18px' }}>No results found</div>
      )}
      <ul className={classes.list}>
        {filteredPokemons.map((pokemon) => (
          <li
            key={pokemon.id}
            className={classes.listItem}
            onClick={() => handleOnClickPokemon(pokemon)}
          >
            <PokemonImage pokemon={pokemon} />
            <p className={classes.pokemonNumber}>#{pokemon.number}</p>
            <p className={classes.pokemonName}>{pokemon.name}</p>
            <div className={classes.typesContainer}>
              {pokemon.types.map((type) => (
                <span
                  key={`${pokemon.id}-${type}`}
                  className={classes.pokemonType}
                  style={{ backgroundColor: getPokemonTypeColor(type) }}
                >
                  {type}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
      {pokemonId && (
        <PokemonModal
          isOpen={!!pokemonId}
          pokemonId={pokemonId}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      textAlign: 'center',
      padding: '32px',
    },
    searchInput: {
      width: 'clamp(300px, 90%, 1200px)',
      padding: '12px 16px',
      marginBottom: '24px',
      borderRadius: '8px',
      fontSize: '16px',
      boxSizing: 'border-box',
      color: '#000000ff',
      '&:focus': {
        outline: 'none',
      },
    },
    list: {
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '8px',
      padding: '0 32px 0 32px',
    },
    listItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '16px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '8px',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      boxSizing: 'border-box',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        cursor: 'pointer',
        transform: 'scale(1.01)',
        transition: 'transform 0.3s ease',
      },
    },
    pokemonNumber: {
      fontWeight: 'bold',
      fontSize: '14px',
      color: '#aaa',
      margin: '4px 0 0 4px',
    },
    pokemonName: {
      fontWeight: 'bold',
      fontSize: '20px',
      margin: '12px 0 4px 4px',
    },
    typesContainer: {
      display: 'flex',
      gap: '4px',
      margin: '8px 0 4px 4px',
      flexWrap: 'wrap',
    },
    pokemonType: {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 'bold',
      color: 'white',
      textShadow: '1px 1px 1px rgba(0,0,0,0.5)',
      textTransform: 'capitalize',
      width: '50px',
      textAlign: 'center',
    },
  },
  { name: 'PokemonList' }
);
