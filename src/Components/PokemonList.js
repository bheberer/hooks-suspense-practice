import React, { useState, useContext, Suspense } from 'react';
import { unstable_createResource as createResource } from 'react-cache';
import Navbar from './Navbar';
import Spinner from './Spinner';

const PokemonCollectionResource = createResource(() =>
  fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151').then(res =>
    res.json()
  )
);

const PokemonPictureResource = createResource;

function PokemonListItem({ id, name, onClick }) {
  return (
    <div
      className='pokemon-list-item'
      onClick={() => onClick({ name: name, id: id })}
    >
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt={name}
        width='110'
        height='110'
        style={{ imageRendering: 'pixelated' }}
      />
      <div className='pokemon-list-item__number'>{`#${id}`}</div>
      <div className='pokemon-list-item__name'>{`${name}`}</div>
    </div>
  );
}

function PokemonList(props) {
  const pokemonArray = PokemonCollectionResource.read().results.slice(0, 151);
  return (
    <div className='page-container--list'>
      <div className='card'>
        <div className='card-title'>Kanto Pokdex</div>
        <div className='pokemon-list'>
          {pokemonArray.map((pokemon, index) => (
            <PokemonListItem
              key={pokemon.name}
              name={pokemon.name}
              id={index + 1}
              onClick={props.onPokemonClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonList;
