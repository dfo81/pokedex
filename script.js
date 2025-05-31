let content = document.getElementById('content');
let offset = 1;
let limit = 24;
let allLoadedPokemon = [];

// capitalize first letter
let capitalize = (str) => str[0].toUpperCase() + str.slice(1);


// initial function
async function init() {
  document.getElementById('spinner').classList.remove('d-none');
  document.body.style.overflow = "hidden";
  await loadAllPokemonNames();
  await getPokemonData();
  renderAllLoadedPokemon();
  document.getElementById('spinner').classList.add('d-none');
  document.body.style.overflow = "";
}


// fetch pokemon data and store in array
async function getPokemonData() {
  for (let id = offset; id < offset + limit; id++) {
    try {
      let pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(p => p.json());
      let species = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(s => s.json());
      allLoadedPokemon.push({ pokemon, species });
    } catch {
      console.error(`Pokémon mit ID ${id} konnte nicht geladen werden.`);
    }
  }
  offset += limit;
}


// serch section
let allPokemonList = []; 

async function loadAllPokemonNames() {
  let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
  let data = await response.json();
  allPokemonList = data.results; 
}


// render all loaded pokemons
function renderAllLoadedPokemon() {
  content.innerHTML = allLoadedPokemon.map(({ pokemon, species }) => template(pokemon, species)).join('');
}


// search loaded pokemons
async function searchPokemon() {
  let query = document.getElementById('search').value.toLowerCase();
  document.getElementById('morePokemonButton').disabled = query.length > 0;

  if (query.length < 3) {
    renderAllLoadedPokemon();
    return;
  }

  let filtered = allPokemonList
    .filter(p => p.name.toLowerCase().startsWith(query)) // <- Nur Anfangsbuchstaben
    .slice(0, 24);

  content.innerHTML = `<p>Suche ${filtered.length} Pokémon...</p>`;

  currentRenderedPokemon = [];
  for (let poke of filtered) {
    try {
      let pokemon = await fetch(poke.url).then(r => r.json());
      let species = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`).then(r => r.json());
      currentRenderedPokemon.push({ pokemon, species });
    } catch {
      console.error(`Fehler beim Laden von ${poke.name}`);
    }
  }

  content.innerHTML = currentRenderedPokemon
    .map(({ pokemon, species }) => template(pokemon, species))
    .join('');
}

async function loadMorePokemon() {
  document.getElementById('spinner').classList.remove('d-none');
  await getPokemonData();
  renderAllLoadedPokemon();
  document.getElementById('spinner').classList.add('d-none');
}

init();
