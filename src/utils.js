export function getTypeColor(type) {
  switch (type) {
    case 'fire':
      return '#ed6d12';
    case 'normal':
      return '#a8a878';
    case 'fighting':
      return '#c03028';
    case 'water':
      return '#6890f0';
    case 'flying':
      return '#a890f0';
    case 'grass':
      return '#78c850';
    case 'poison':
      return '#a040a0';
    case 'electric':
      return '#f8d030';
    case 'ground':
      return '#e0c068';
    case 'psychic':
      return '#f85888';
    case 'rock':
      return '#b8a038';
    case 'ice':
      return '#98d8d8';
    case 'bug':
      return '#a8b820';
    case 'dragon':
      return '#7038f8';
    case 'ghost':
      return '#705898';
    case 'dark':
      return '#705848';
    case 'steel':
      return '#b8b8d0';
    default:
      return '#ee99ac';
  }
}

export function getStatAbbreviation(stat) {
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
