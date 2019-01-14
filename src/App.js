import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import PokemonList from './Components/PokemonList';
// import PokemonDetail from './Components/PokemonDetail';
import Spinner from './Components/Spinner';

const PokemonDetail = React.lazy(() => import('./Components/PokemonDetail'));

function NavBar({ selectedPokemon, setSelectedPokemon }) {
  return (
    <div className='navbar'>
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

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState();

  return (
    <div className='App'>
      <NavBar
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}
      />
      <React.Suspense fallback={<Spinner />}>
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
