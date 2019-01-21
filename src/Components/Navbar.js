import React from 'react';
import { getTypeColor } from '../utils';

export default function NavBar({
  selectedPokemon,
  setSelectedPokemon,
  selectedPokemonType,
  style
}) {
  return (
    <div
      className='card-title'
      style={
        selectedPokemonType
          ? { ...style, backgroundColor: getTypeColor(selectedPokemonType) }
          : { ...style }
      }
    >
      {selectedPokemon ? (
        <div
          className='nav-bar__back-button'
          onClick={() => setSelectedPokemon(null)}
        >
          &#x279C;
        </div>
      ) : (
        undefined
      )}
      <div className='nav-bar__title'>National Pokedex</div>
    </div>
  );
}
