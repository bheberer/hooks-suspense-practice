import React from 'react';
import { unstable_createResource as createResource } from 'react-cache';
import { getTypeColor, getStatAbbreviation } from '../utils';
import Navbar from './Navbar';
import Spinner from './Spinner';
import Wave from './Wave';
// import getStatAbbreviation from '../utils';

const PokemonDetailResource = createResource(id =>
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(res => res.json())
);

const PokemonSpeciesResource = createResource(id =>
  fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`).then(res =>
    res.json()
  )
);

const PokemonEvolutionResource = createResource(url =>
  fetch(url).then(res => res.json())
);

function Title(props) {
  return (
    <div
      className='card-title'
      style={{
        backgroundColor: getTypeColor(props.type)
      }}
    >
      <div
        className='card-title__back-arrow'
        onClick={() => props.setSelectedPokemon(null)}
      >
        &#x279C;
      </div>
      {`#${props.id} ${props.name}`}
    </div>
  );
}

function EvolutionChain(props) {
  let data = PokemonEvolutionResource.read(props.url).chain;
  const chain = [];
  const urlRegex = /https:\/\/pokeapi.co\/api\/v2\/pokemon-species\/(\d+)\//;
  while (data !== undefined) {
    let speciesId = data.species.url.match(urlRegex)[1];
    let speciesName = data.species.name;
    chain.push(
      <div
        className='evolution-chain__item'
        onClick={() =>
          props.setSelectedPokemon({ name: speciesName, id: speciesId })
        }
      >
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${speciesId}.png`}
          alt={speciesId}
          width={200}
          height={200}
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
    );
    data = data.evolves_to[0];
  }
  return <div className='evolution-chain'>{chain}</div>;
}

function TypeBlock({ type }) {
  return (
    <div
      className='pokemon-detail-page__type-block'
      style={{ backgroundColor: getTypeColor(type) }}
    >
      {type}
    </div>
  );
}

function StatGraphBar(props) {
  return (
    <div>
      <div
        className='pokemon-detail-page__stat-graph__bar--background'
        style={{width: window.innerWidth <= 700 ? 200 : 400}}
      />
      <div
        className='pokemon-detail-page__stat-graph__bar--filled'
        style={{
          width:
            window.innerWidth <= 700
              ? props.stat.base_stat * 1.25
              : props.stat.base_stat * 2.5,
          backgroundColor: getTypeColor(props.type)
        }}
      />
    </div>
  );
}

function StatGraph({ stats, type }) {
  return (
    <div className='pokemon-detail-page__stat-graph'>
      {stats.map(stat => (
        <div className='pokemon-detail-page__stat-graph__row'>
          <StatGraphBar stat={stat} type={type} />
          <div className='pokemon-detail-page__stat-graph__number'>
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

function SectionTitle({ children, type }) {
  return (
    <>
      <div className='pokemon-detail-page__section-title'>{children}</div>
      <div
        className='pokemon-detail-page__section-title-accent'
        style={{
          backgroundColor: getTypeColor(type)
        }}
      />
    </>
  );
}

function Description({ textEntries }) {
  return (
    <div className='pokemon-detail-page__description'>
      {textEntries.find(entry => entry.language.name === 'en').flavor_text}
    </div>
  );
}

function Details(props) {
  let abilitiesList = '';
  props.abilities.forEach((elem, index) => {
    abilitiesList += `${elem.ability.name} ${
      index === props.abilities.length - 1 ? '' : '| '
    }`;
  });
  return (
    <div className='pokemon-details-page__details'>
      <SectionTitle type={props.types.find(elem => elem.slot === 1).type.name}>
        Types
      </SectionTitle>
      <div className='pokemon-details-page__type-row'>
        {props.types.map(type => (
          <TypeBlock type={type.type.name} />
        ))}
      </div>
      <SectionTitle type={props.types.find(elem => elem.slot === 1).type.name}>
        Description
      </SectionTitle>
      <div className='pokemon-detail-page__description'>
        {
          props.textEntries.find(entry => entry.language.name === 'en')
            .flavor_text
        }
      </div>
      <SectionTitle type={props.types.find(elem => elem.slot === 1).type.name}>
        Abilities
      </SectionTitle>
      <div className='details__ability-list'>{abilitiesList}</div>
    </div>
  );
}

function PokemonDetail(props) {
  const data = PokemonDetailResource.read(props.pokemon.name);
  const text = PokemonSpeciesResource.read(props.pokemon.id);
  return (
    <div
      className='page-container--details'
      style={{
        backgroundImage: `linear-gradient(transparent 60%, ${getTypeColor(
          data.types.find(elem => elem.slot === 1).type.name
        )} 40%)`
      }}
    >
      <div className='card'>
        <Title
          name={props.pokemon.name}
          id={props.pokemon.id}
          type={data.types.find(elem => elem.slot === 1).type.name}
          setSelectedPokemon={props.setSelectedPokemon}
        />
        <div className='pokemon-detail-page'>
          <div className='pokemon-detail-page__group'>
            <div className='pokemon-detail-page__item--image'>
              <img
                src={data.sprites.front_default}
                alt={props.pokemon}
                className='detail-image'
              />
            </div>
            <Details
              abilities={data.abilities}
              textEntries={text.flavor_text_entries}
              types={data.types}
            />
          </div>
          <div className='pokemon-detail-page__group'>
            <div className='pokemon-detail-page__item'>
              <SectionTitle
                type={data.types.find(elem => elem.slot === 1).type.name}
              >
                Base Stats
              </SectionTitle>
              <StatGraph
                stats={data.stats}
                type={data.types.find(elem => elem.slot === 1).type.name}
              />
            </div>
            <div className='pokemon-detail-page__item'>
              <SectionTitle
                type={data.types.find(elem => elem.slot === 1).type.name}
              >
                Evolutions
              </SectionTitle>
              <EvolutionChain
                url={text.evolution_chain.url}
                setSelectedPokemon={props.setSelectedPokemon}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
