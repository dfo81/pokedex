const BASE_URL = "https://pokeapi.co/api/v2/";

let myPokemon = [];
let offset = 1;
let limit = 18;
function init() {
  fetchPokemon(offset, limit);
  document.getElementById('spinner').classList.add('spinner');
  document.getElementById('loader').classList.add('loader');
}

async function fetchPokemon(offset, limit) {
  
  for (let id = offset; id < offset + limit; id++) {
    try {
      const res = await fetch(BASE_URL + "pokemon/" + id);
      const pokemon = await res.json();
      const name = capitalize(pokemon.name);
      const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      const speciesResponse = await fetch(pokemon.species.url);
      const speciesData = await speciesResponse.json();
      const color = speciesData.color.name;
      const types = pokemon.types.map((t) => t.type.name);
      content.innerHTML += template(id, name, img, types, color);
      myPokemon.push(id, name, img, types, color);
    } catch {
      content.innerHTML = "Versuche es später noch einmal";
    }
  }
  document.getElementById('spinner').classList.remove('spinner');
  document.getElementById('loader').classList.remove('loader');
  offset += limit;
}



capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);