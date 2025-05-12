let content = document.getElementById('content');

function init() {
  loadEvolutionChain(56);
}

async function loadEvolutionChain(pokemonId) {
  const species = await fetchSpecies(pokemonId);
  const evoChainUrl = species.evolution_chain.url;
  const chainNames = await extractEvolutionNames(evoChainUrl);
  await renderEvolutionChain(chainNames);
}

async function fetchSpecies(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  return await res.json();
}

async function extractEvolutionNames(url) {
  const res = await fetch(url);
  const evoData = await res.json();
  const names = [];

  let current = evoData.chain;
  while (current) {
    names.push(current.species.name);
    current = current.evolves_to[0]; 
  }
  return names;
}

async function renderEvolutionChain(names) {
  for (const name of names) {
    const img = await fetchPokemonImage(name);
    content.innerHTML += createChain(name, img);
  }
}

async function fetchPokemonImage(name) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await res.json();
  return data.sprites.other.home.front_default;
}

function createChain(name, img) {
  return `
    <div class="">
      <img src="${img}" alt="${name}" />
      <span>${name}</span>
    </div>&#10132;`
};
