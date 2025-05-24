// Load Profile 
async function loadEvolutionChain(id) {
  let names = await getEvolutionNames(id);
  await renderEvolutionChain(names);
}


// get Names in the chain of character
async function getEvolutionNames(id) {
  let species = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(s => s.json());
  let chain = await fetch(species.evolution_chain.url).then(c => c.json());
  let names = [];
  for (let current = chain.chain; current; current = current.evolves_to[0]) {
    names.push(current.species.name);
  }
  return names;
}


// chain only render function 
async function renderEvolutionChain(names) {
  let profileContent = document.getElementById('chain-content');
  profileContent.innerHTML = "";  
  for (let i = 0; i < names.length; i++) {
    let name = names[i];
    let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(d => d.json());
    let isLast = i === names.length - 1;
    profileContent.innerHTML += renderChain(name, data.sprites.other.home.front_default, !isLast);
  }
}
