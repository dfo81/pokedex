let content = document.getElementById("content");
let statsContent = document.getElementById("stats-content");
let offset = 1;
let limit = 24;

async function init() {
  getPokemon(limit);
}

// get pokemon response
async function getPokemon(id) {
  for (let id = offset; id < offset + limit; id++) {
    try {
      let pokemon = await fetchJSON(`https://pokeapi.co/api/v2/pokemon/${id}`);
      let species = await fetchJSON(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
      content.innerHTML += template(pokemon, species);
    } catch {
      content.innerHTML =
        "Karte konnte nicht geladen werden.";
    }
  }
  offset += limit;
}

// Helper response function
async function fetchJSON(url) {
  let response = await fetch(url);
  return response.json();
}

// capitalize first letter
let capitalize = (str) => str[0].toUpperCase() + str.slice(1);