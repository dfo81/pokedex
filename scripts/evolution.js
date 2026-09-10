// Load Profile 
async function loadEvolutionChain(id) {
  let box = document.getElementById('chain-content');
  if (!box) return;
  box.innerHTML = "";
  let names = await getEvolutionNames(id);
  let members = await Promise.all(names.map(fetchChainMember));
  if (currentProfileId !== id) return;
  box.innerHTML = renderEvolutionChain(names, members);
}


// get Names in the chain of character
async function getEvolutionNames(id) {
  let cached = pokemonCache.get(id);
  let species = cached ? cached.species
    : await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(s => s.json());
  let chain = await fetch(species.evolution_chain.url).then(c => c.json());
  let names = [];
  for (let current = chain.chain; current; current = current.evolves_to[0]) {
    names.push(current.species.name);
  }
  return names;
}


// load one member of the chain
function fetchChainMember(name) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(d => d.json())
    .catch(() => null);
}


// chain only render function 
function renderEvolutionChain(names, members) {
  return members
    .map((data, i) => data
      ? renderChain(names[i], data.sprites.other.home.front_default, i !== names.length - 1)
      : "")
    .join("");
}
