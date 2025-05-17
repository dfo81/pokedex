function getChain(id) {
  document.getElementById('about').classList.remove('active');
  document.getElementById('evo').classList.add('active');
  loadEvolutionChain(id);
}


async function loadEvolutionChain(id) {
  const species = await fetchJSON(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const chain = await fetchJSON(species.evolution_chain.url);
  const names = [];
  for (let current = chain.chain; current; current = current.evolves_to[0]) {
    names.push(current.species.name);
  }
  const content = document.getElementById('profile-content');
  content.innerHTML = "";
  for (const name of names) {
    const data = await fetchJSON(`https://pokeapi.co/api/v2/pokemon/${name}`);
    content.innerHTML += renderChain(name, data.sprites.other.home.front_default);
  }
}


async function fetchJSON(url) {
  const res = await fetch(url);
  return res.json();
}
