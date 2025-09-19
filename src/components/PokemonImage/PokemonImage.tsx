import { useState } from 'react';
import { Pokemon } from '../../hooks/useGetPokemons';
import { createUseStyles } from 'react-jss';

// This component displays the image of a Pokemon.
// It shows a loading indicator (Pokeball) until the image is fully loaded.
// The image loading is handled using the onLoad event, and the component uses useState to track the loading state.
// The image can be loaded eagerly or lazily based on the eager prop.

type PokemonImageProps = {
  pokemon: Pokemon;
  eager?: boolean;
};
export const PokemonImage = ({ pokemon, eager }: PokemonImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const classes = useStyles();

  return (
    <div className={classes.pokemonImageContainer}>
      {!imageLoaded && (
        <div className={classes.imgLoader}>
          <img
            src="/pokeball-white.png"
            className={classes.img}
            alt="Pokeball"
          />
        </div>
      )}
      <img
        src={pokemon.image}
        alt={pokemon.name}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setImageLoaded(true)}
        className={classes.pokemonImage}
      />
    </div>
  );
};

const useStyles = createUseStyles({
  pokemonImageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '205px',
    height: '205px',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
  },
  imgLoader: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#ffffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: '48px',
    paddingTop: '12px',
    paddingBottom: '12px',
    filter: 'brightness(50%)',
  },
  pokemonImage: {
    width: '100%',
    height: '100%',
    borderRadius: '4px',
    objectFit: 'contain',
  },
});

export default PokemonImage;
