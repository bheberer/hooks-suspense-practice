import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import PokemonList from './Components/PokemonList';
import PokemonDetail from './Components/PokemonDetail';
import Spinner from './Components/Spinner';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState();

  return (
    <div className='App'>
      <div className='navbar' onClick={() => setSelectedPokemon(null)}>
        {selectedPokemon ? (
          <div className='nav-bar__back-button'>&#x279C;</div>
        ) : (
          undefined
        )}
        <div className='nav-bar__title'>National Pokedex</div>
      </div>
      <React.Suspense fallback={<Spinner />} maxDuration={500}>
        {selectedPokemon ? (
          <PokemonDetail pokemon={selectedPokemon} />
        ) : (
          <PokemonList onPokemonClick={setSelectedPokemon} />
        )}
      </React.Suspense>
    </div>
  );
}

export default App;
