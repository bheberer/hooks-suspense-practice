import React, { useState, useContext, Suspense } from 'react';
import { unstable_createResource as createResource } from 'react-cache';

const PokemonCollectionResource = createResource(() =>
  fetch('https://pokeapi.co/api/v2/pokemon/').then(res => res.json())
);

const PokemonPictureResource = createResource;

function PokemonListItem(props) {
  return (
    <div
      className='pokemon-list-item'
      onClick={() => props.onClick({ name: props.name, id: props.id })}
    >
      {props.children}
    </div>
  );
}

function PokemonList(props) {
  return (
    <div className='pokemon-list'>
      {PokemonCollectionResource.read().results.map((pokemon, index) => (
        <PokemonListItem
          key={pokemon.name}
          name={pokemon.name}
          id={index + 1}
          onClick={props.onPokemonClick}
        >
          <Suspense fallback={'loading...'}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index +
                1}.png`}
              alt={pokemon.name}
              width='96'
              height='96'
            />
          </Suspense>
          <div className='pokemon-list-item__number'>{`#${index + 1}`}</div>
          <div className='pokemon-list-item__name'>{`${pokemon.name}`}</div>
        </PokemonListItem>
      ))}
    </div>
  );
}

export default PokemonList;
