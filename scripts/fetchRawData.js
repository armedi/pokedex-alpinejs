const child_process = require('child_process');
const fs = require('fs');

function sleep(milliseconds = 1000) {
  return new Promise((res) => setTimeout(res, milliseconds));
}

if (!fs.existsSync('_dataRaw/pokemons/')) {
  fs.mkdirSync('_dataRaw/pokemons/', { recursive: true });
}

child_process.execSync(
  `curl -L -s https://pokeapi.co/api/v2/pokemon/?limit=1048 | json_pp > _dataRaw/pokemons.json`,
);

(async function () {
  const pokemons = require('../_dataRaw/pokemons.json');
  for (const pokemon of pokemons.results) {
    console.log('fetching', pokemon.name);
    await child_process.exec(
      `curl -L -s ${pokemon.url} | json_pp > _dataRaw/pokemons/${pokemon.name}.json`,
    );
    await sleep();
  }
})();
