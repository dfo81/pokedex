// Load Profile 
async function loadEvolutionChain(id) {
  let names = await getEvolutionNames(id);
  await renderEvolutionChain(names);
}


// get Names in the chain of character
async function getEvolutionNames(id) {
  let species = await fetchJSON(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  let chain = await fetchJSON(species.evolution_chain.url);
  let names = [];
  for (let current = chain.chain; current; current = current.evolves_to[0]) {
    names.push(current.species.name);
  }
  return names;
}


// chain only render function 
async function renderEvolutionChain(names) {
  let profileContent = document.getElementById('profile-content');
  profileContent.innerHTML = "";  
  for (let i = 0; i < names.length; i++) {
    let name = names[i];
    let data = await fetchJSON(`https://pokeapi.co/api/v2/pokemon/${name}`);
    let isLast = i === names.length - 1;
    profileContent.innerHTML += renderChain(name, data.sprites.other.home.front_default, !isLast);
  }
}