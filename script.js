let content = document.getElementById('content');
let offset = 1;
let limit = 24;
let maxPokemon = 1025;
let allLoadedPokemon = [];
let allPokemonList = [];
let pokemonCache = new Map();
let namesPromise = null;
let searchTimeout = null;
let searchToken = 0;

// capitalize first letter
let capitalize = (str) => str[0].toUpperCase() + str.slice(1);


// initial function
async function init() {
  showSpinner();
  document.body.style.overflow = "hidden";
  loadAllPokemonNames();
  await loadBatch();
  document.body.style.overflow = "";
  hideSpinner();
}


// fetch pokemon and species in parallel, cached by id
async function fetchPokemon(id) {
  if (pokemonCache.has(id)) return pokemonCache.get(id);
  let [pokemon, species] = await Promise.all([
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(p => p.json()),
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(s => s.json())
  ]);
  let entry = { pokemon, species };
  pokemonCache.set(id, entry);
  pokemonCache.set(pokemon.id, entry);
  return entry;
}


// start all requests of a batch at once, append each card as soon as it arrives
// the cards sort themselves by id via the flex "order" in template(), so a single
// slow request no longer holds up the ones behind it
async function loadBatch() {
  let ids = nextBatchIds();
  await Promise.all(ids.map(id => loadCard(id)));
  toggleMoreButton();
}


async function loadCard(id) {
  let entry = await fetchPokemon(id).catch(() => logFailed(id));
  if (!entry) return;
  allLoadedPokemon.push(entry);
  content.insertAdjacentHTML('beforeend', template(entry.pokemon, entry.species));
}


// ids of the next batch, capped at the last pokemon
function nextBatchIds() {
  let ids = [];
  for (let id = offset; id < offset + limit && id <= maxPokemon; id++) ids.push(id);
  offset += ids.length;
  return ids;
}


function logFailed(id) {
  console.error(`Pokémon mit ID ${id} konnte nicht geladen werden.`);
  return null;
}


// serch section
function loadAllPokemonNames() {
  if (!namesPromise) {
    namesPromise = fetch(`https://pokeapi.co/api/v2/pokemon?limit=${maxPokemon}`)
      .then(response => response.json())
      .then(data => { allPokemonList = data.results; });
  }
  return namesPromise;
}


// render all loaded pokemons
function renderAllLoadedPokemon() {
  content.innerHTML = allLoadedPokemon.map(({ pokemon, species }) => template(pokemon, species)).join('');
}


// debounce keystrokes so only the last input triggers a search
function searchPokemon() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(runSearch, 300);
}


// search loaded pokemons
async function runSearch() {
  let query = document.getElementById('search').value.toLowerCase().trim();
  document.getElementById('morePokemonButton').disabled = query.length > 0;
  if (query.length < 3) return renderAllLoadedPokemon();

  let token = ++searchToken;
  await loadAllPokemonNames();
  let matches = allPokemonList.filter(p => p.name.startsWith(query)).slice(0, limit);
  if (token !== searchToken) return;
  renderSearchResults(await fetchMatches(matches), token);
}


// load all matches in parallel
function fetchMatches(matches) {
  content.innerHTML = `<p>Suche nach Pokémon...</p>`;
  return Promise.all(matches.map(m => fetchPokemon(idFromUrl(m.url)).catch(() => null)));
}


// drop the result if a newer search has started in the meantime
function renderSearchResults(results, token) {
  if (token !== searchToken) return;
  let found = results.filter(Boolean);
  content.innerHTML = found.length
    ? found.map(({ pokemon, species }) => template(pokemon, species)).join('')
    : `<p>Kein Pokémon gefunden.</p>`;
}


let idFromUrl = (url) => Number(url.split('/').filter(Boolean).pop());


async function loadMorePokemon() {
  let button = document.getElementById('morePokemonButton');
  button.disabled = true;
  showSpinner();
  await loadBatch();
  hideSpinner();
  button.disabled = false;
  toggleMoreButton();
}


// hide the button once every pokemon is loaded
function toggleMoreButton() {
  document.getElementById('morePokemonButton').classList.toggle('d-none', offset > maxPokemon);
}


// the scroll lock stays with init() - locking it on "more pokemon" would drop the
// scrollbar and shift the grid sideways while the spinner is up
function showSpinner() {
  document.getElementById('spinner').classList.remove('d-none');
}


function hideSpinner() {
  document.getElementById('spinner').classList.add('d-none');
}


init();
