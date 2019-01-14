import React from 'react';
import { unstable_createResource as createResource } from 'react-cache';

const PokemonDetailResource = createResource(id =>
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(res => res.json())
);

const PokemonSpeciesResource = createResource(id =>
  fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`).then(res =>
    res.json()
  )
);

function Title({ id, name }) {
  return (
    <div
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        display: 'flex'
      }}
    >
      <div className='pokemon-detail-page__title-number'>{`#${id}`}</div>
      <div className='pokemon-detail-page__title-name'>{`${name}`}</div>
    </div>
  );
}

function TypeBlock({ type }) {
  let color;
  switch (type) {
    case 'fire':
      color = '#ed6d12';
      break;
    case 'normal':
      color = '#a8a878';
      break;
    case 'fighting':
      color = '#c03028';
      break;
    case 'water':
      color = '#6890f0';
      break;
    case 'flying':
      color = '#a890f0';
      break;
    case 'grass':
      color = '#78c850';
      break;
    case 'poison':
      color = '#a040a0';
      break;
    case 'electric':
      color = '#f8d030';
      break;
    case 'ground':
      color = '#e0c068';
      break;
    case 'psychic':
      color = '#f85888';
      break;
    case 'rock':
      color = '#b8a038';
      break;
    case 'ice':
      color = '#98d8d8';
      break;
    case 'bug':
      color = '#a8b820';
      break;
    case 'dragon':
      color = '#7038f8';
      break;
    case 'ghost':
      color = '#705898';
      break;
    case 'dark':
      color = '#705848';
      break;
    case 'steel':
      color = '#b8b8d0';
      break;
    default:
      color = '#ee99ac';
      break;
  }

  return (
    <div
      className='pokemon-detail-page__type-block'
      style={{ backgroundColor: color }}
    >
      {type}
    </div>
  );
}

function StatGraph({ stats }) {
  function getStatAbbreviation(stat) {
    switch (stat) {
      case 'speed':
        return 'spd';
      case 'special-defense':
        return 'sdef';
      case 'special-attack':
        return 'satk';
      case 'defense':
        return 'def';
      case 'attack':
        return 'atk';
      default:
        return 'hp';
    }
  }

  return (
    <div className='pokemon-detail-page__stat-graph'>
      {stats.map(stat => (
        <div className='flex-row'>
          <div
            className='pokemon-detail-page__stat-graph__bar'
            style={{
              width:
                window.innerWidth <= 450
                  ? stat.base_stat * 1.25
                  : stat.base_stat * 2.5
            }}
          />
          <div className='pokemon-detail-page__stat-graph__text'>
            {stat.base_stat}
          </div>
          <div className='pokemon-detail-page__stat-graph__text'>
            {getStatAbbreviation(stat.stat.name)}
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionTitle({ children }) {
  return <div className='pokemon-detail-page__section-title'>{children}</div>;
}

function Description({ textEntries }) {
  return (
    <div className='pokemon-detail-page__description'>
      {textEntries.find(entry => entry.language.name === 'en').flavor_text}
    </div>
  );
}

function PokemonDetail(props) {
  const data = PokemonDetailResource.read(props.pokemon.name);
  const text = PokemonSpeciesResource.read(props.pokemon.id);
  console.log(text);
  return (
    <div className='pokemon-detail-page'>
      <img
        src={data.sprites.front_default}
        alt={props.pokemon}
        height='256'
        width='256'
        style={{ imageRendering: 'pixelated' }}
      />
      <Title id={props.pokemon.id} name={props.pokemon.name} />
      <div className='flex-row'>
        {data.types.map(type => (
          <TypeBlock type={type.type.name} />
        ))}
      </div>
      <SectionTitle>Description</SectionTitle>
      <Description textEntries={text.flavor_text_entries} />
      <SectionTitle>Base Stats</SectionTitle>
      <StatGraph stats={data.stats} />
    </div>
  );
}

export default PokemonDetail;
