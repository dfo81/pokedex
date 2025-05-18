// get pokemon response
async function getProfile(id) {
  try {
    let pokemon = await fetchJSON(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let species = await fetchJSON(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    content.innerHTML = profile(pokemon, species);
  } catch {
    content.innerHTML = "Es ist ein Fehler aufgetreten, bitte versuchen Sie es später."
  }
}


// fill evolution chain tab
function getChain() {
  document.getElementById("about").classList.remove("active");
  document.getElementById("stats").classList.remove("active");
  document.getElementById("evo").classList.add("active");
  loadEvolutionChain(id);
}

// fill stats tab
async function getStats() {
  await getPokemon(id);
  document.getElementById("stats").classList.add("active");
  document.getElementById("evo").classList.remove("active");
  document.getElementById("about").classList.remove("active");
  document.getElementById("about-content").classList.add("d-none");
  document.getElementById("stats-content").classList.remove("d-none");
}

// next index button
function nextPokemon() {
  id++;
  getProfile(id);
}

// prev index button
function prevPokemon() {
  id--;
  getProfile(id);
}