
function getOverlay(id) {
  document.body.style.overflow = "hidden";
  document.getElementById('overlay').classList.remove('d-none');
  getProfile(id);
  event.stopPropagation();
}

// get pokemon response
async function getProfile(id) {
  try {
    let pokemon = await fetchJSON(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let species = await fetchJSON(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );
    document.getElementById('overlay').innerHTML = profile(pokemon, species);
  } catch {
    content.innerHTML =
      "Es ist ein Fehler aufgetreten, bitte versuchen Sie es später.";
  }
  event.stopPropagation();
}

// fill evolution chain tab
function getChain(id) {
  document.getElementById("about").classList.remove("active");
  document.getElementById("stats").classList.remove("active");
  document.getElementById("evo").classList.add("active");
  loadEvolutionChain(id);
  event.stopPropagation();
}

// fill stats tab
async function getStats(id) {
  await getProfile(id);
  document.getElementById("stats").classList.add("active");
  document.getElementById("evo").classList.remove("active");
  document.getElementById("about").classList.remove("active");
  document.getElementById("about-content").classList.add("d-none");
  document.getElementById("stats-content").classList.remove("d-none");
  event.stopPropagation();
}

// next index button
function nextPokemon(id) {
  id++;
  getProfile(id);
  event.stopPropagation();
}

// prev index button
function prevPokemon(id) {
  id--;
  getProfile(id);
  event.stopPropagation();
}

function closeOverlay() {
  document.getElementById('overlay').innerHTML = "";
  document.body.style.overflow = "";
  document.getElementById('overlay').classList.add('d-none');
  event.stopPropagation();
}