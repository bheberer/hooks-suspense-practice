import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import PokemonList from './Components/PokemonList';
// import PokemonDetail from './Components/PokemonDetail';
import Spinner from './Components/Spinner';
import { getTypeColor } from './utils';

const PokemonDetail = React.lazy(() => import('./Components/PokemonDetail'));

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState();
  console.log(selectedPokemon);

  return (
    <div>
      {selectedPokemon ? (
        <React.Suspense fallback={<Spinner />}>
          <PokemonDetail
            pokemon={selectedPokemon}
            setSelectedPokemon={setSelectedPokemon}
          />
        </React.Suspense>
      ) : (
        <React.Suspense fallback={<Spinner />} maxDuration={500}>
          <PokemonList onPokemonClick={setSelectedPokemon} />
        </React.Suspense>
      )}
    </div>
  );
}

export default App;
