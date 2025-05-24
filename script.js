
let content = document.getElementById('content');
let offset = 1;
let limit = 24;
let allLoadedPokemon = [];


// capitalize first letter
let capitalize = (str) => str[0].toUpperCase() + str.slice(1);


// initian function
async function init() {
  document.getElementById('spinner').classList.remove('d-none');
  document.body.style.overflow += "hidden";
  await getPokemon();
  document.getElementById('spinner').classList.add('d-none');
  document.body.style.overflow = "";
}


// fetch pokemon data
async function getPokemon() {
  for (let id = offset; id < offset + limit; id++) {
    try {
      let pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(p => p.json());
      let species = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(s => s.json());
      allLoadedPokemon.push({ pokemon, species });
      content.innerHTML += template(pokemon, species);
    } catch {
      content.innerHTML = "Karte konnte nicht geladen werden.";
    }
  }
  offset += limit;
}


// search loaded pokemons
function searchPokemon() {
  let query = document.getElementById('search').value.toLowerCase();
  if (query.length < 3) {
    renderAllLoadedPokemon();
    return;
  }
  let filtered = allLoadedPokemon.filter(({ pokemon }) =>
    pokemon.name.toLowerCase().includes(query)
  );
  content.innerHTML = filtered.map(({ pokemon, species }) => template(pokemon, species)).join('');
}


// render search function
function renderAllLoadedPokemon() {
  content.innerHTML = allLoadedPokemon.map(({ pokemon, species }) => template(pokemon, species)).join('');
}