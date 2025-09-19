import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import { useGetPokemon } from '../../hooks/useGetPokemon';
import { PokemonImage } from '../PokemonImage/PokemonImage';
import { createUseStyles } from 'react-jss';
import { usePokemonTypeColors } from 'src/hooks/usePokemonTypeColors';

// This component displays a modal with detailed information about a specific Pokemon.
// It uses the useGetPokemon hook to fetch the Pokemon data based on the provided pokemonId.
// The modal shows a loading indicator while fetching data and handles errors gracefully.
// The loading state is indicated with a CircularProgress component from MUI.
// If the data is successfully fetched, it displays the Pokemon's image, name, classification, battle stats, size, types, weaknesses, and resistances.
// If there's an error fetching the data, an error message is displayed.
// The Pokemon's types, weaknesses, and resistances are displayed with colors using the usePokemonTypeColors hook.

type PokemonModalProps = {
  isOpen: boolean;
  pokemonId: string;
  onClose: () => void;
};

export const PokemonModal = ({
  isOpen,
  pokemonId,
  onClose,
}: PokemonModalProps) => {
  const { pokemon, loading, error } = useGetPokemon(pokemonId);
  const { getPokemonTypeColor } = usePokemonTypeColors();
  const classes = useStyles();

  if (loading) {
    return (
      <Dialog
        open={isOpen}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        className={classes.dialog}
      >
        <DialogContent>
          <div className={classes.content}>
            <CircularProgress />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (error || !pokemon) {
    return (
      <Dialog
        open={isOpen}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        className={classes.dialog}
      >
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <p>Failed to load Pokemon details</p>
        </DialogContent>
        <DialogActions>
          <button
            onClick={onClose}
            className={classes.closeButton}
            aria-label="Close Pokemon details modal"
          >
            Close
          </button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      className={classes.dialog}
      fullWidth
    >
      <div className={classes.dialogTitle}>
        <h2>{pokemon.name}</h2>
      </div>
      <DialogContent>
        <div className={classes.content}>
          <div className={classes.leftContainer}>
            <PokemonImage pokemon={pokemon} eager={true} />
            <div className={classes.typesContainer}>
              {pokemon.types.map((type, index) => (
                <span
                  key={`${pokemon.id}-${type}-${index}`}
                  className={classes.pokemonType}
                  style={{ backgroundColor: getPokemonTypeColor(type) }}
                >
                  {type}
                </span>
              ))}
            </div>
            <strong>Weaknesses:</strong>
            <div className={classes.weaknessesTypesContainer}>
              {pokemon.weaknesses.map((type, index) => (
                <p
                  key={`${pokemon.id}-${pokemon.weaknesses}-${index}`}
                  className={classes.pokemonResType}
                  style={{ backgroundColor: getPokemonTypeColor(type) }}
                >
                  {type}
                </p>
              ))}
            </div>
            <strong>Resistant To:</strong>
            <div className={classes.weaknessesTypesContainer}>
              {pokemon.resistant.map((type, index) => (
                <p
                  key={`${pokemon.id}-${pokemon.resistant}-${index}`}
                  className={classes.pokemonResType}
                  style={{ backgroundColor: getPokemonTypeColor(type) }}
                >
                  {type}
                </p>
              ))}
            </div>
          </div>

          <div className={classes.rightContainer}>
            <strong>Class: {pokemon.classification}</strong>
            <div className={classes.pokemonStatsContainer}>
              <strong>Battle Stats :</strong>
              <p>Flee Rate : {(pokemon.fleeRate * 100).toFixed(2)}%</p>
              <p>Max CP : {pokemon.maxCP}</p>
              <p>Max HP : {pokemon.maxHP}</p>
            </div>
            <div className={classes.pokemonStatsContainer}>
              <strong>Size :</strong>
              <p>
                Weight: ~
                {(
                  (parseFloat(pokemon.weight?.minimum) +
                    parseFloat(pokemon.weight?.maximum)) /
                  2
                ).toFixed(2)}{' '}
                kg
              </p>
              <p>
                Height: ~
                {(
                  (parseFloat(pokemon.height?.minimum) +
                    parseFloat(pokemon.height?.maximum)) /
                  2
                ).toFixed(2)}{' '}
                m
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <button
          onClick={onClose}
          className={classes.closeButton}
          aria-label="Close Pokemon details modal"
        >
          Close
        </button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = createUseStyles({
  dialog: {
    '& .MuiPaper-root': {
      backgroundColor: '#1e2533',
    },
    overflow: 'hidden',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    minWidth: '300px',
    height: '100%',
    minHeight: '300px',
  },
  dialogTitle: {
    padding: '0px 0 0 24px',
  },
  leftContainer: {
    maxWidth: '250px',
  },
  typesContainer: {
    display: 'flex',
    gap: '4px',
    margin: '8px 0px 24px 4px',
    flexWrap: 'wrap',
  },
  weaknessesTypesContainer: {
    display: 'flex',
    gap: '4px',
    margin: '0px 0px 8px 4px',
    flexWrap: 'wrap',
    paddingBottom: '8px',
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
    marginBottom: '4px',
  },
  pokemonResType: {
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: 'white',
    textShadow: '1px 1px 1px rgba(0,0,0,0.5)',
    textTransform: 'capitalize',
    width: '50px',
    textAlign: 'center',
    margin: '4px 0px 4px 0px',
  },
  rightContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: '28px',
  },
  pokemonStatsContainer: {
    '& p': {
      margin: '8px 0px 8px 12px',
    },
    padding: '8px 0px 8px 8px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    width: '225px',
  },
  closeButton: {
    backgroundColor: '#3f51b5',
    color: 'white',
    borderRadius: '4px',
    margin: '0px 32px 16px 0px',
    '&:hover': {
      backgroundColor: '#303f9f',
      cursor: 'pointer',
    },
  },
});
export default PokemonModal;
