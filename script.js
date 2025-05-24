
// capitalize first letter
let capitalize = (str) => str[0].toUpperCase() + str.slice(1);
let content = document.getElementById('content');
let offset = 1;
let limit = 24;

function init() {
    getPokemon();
}

async function getPokemon() {
  document.getElementById('spinner').classList.remove('d-none');
  for (let id = offset; id < offset + limit; id++) {
    try {
      let pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(p => p.json());
      let species = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(s => s.json());
      content.innerHTML += template(pokemon, species);
    } catch {
      content.innerHTML = "Karte konnte nicht geladen werden.";
    }
  }
  offset += limit;
  document.getElementById('spinner').classList.add('d-none');
}