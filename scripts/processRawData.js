const fs = require('fs');

const pokemons = require('../_dataRaw/pokemons.json');
let data = [];

for (const pokemon of pokemons.results) {
  const $ = require(`../_dataRaw/pokemons/${pokemon.name}`);
  data.push({
    id: $.id,
    name: pokemon.name,
    types: $.types.map(($$) => $$.type.name),
    // sprite: $.sprites.other['official-artwork'].front_default,
  });
}

fs.writeFileSync('public/pokemons.json', JSON.stringify(data), 'utf8');
