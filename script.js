let id = 1;

function init() {
  getPokemon(id);
  template(id);
  document.getElementById('spinner').classList.add('d-none');
};

let content = document.getElementById('content');

async function getPokemon(id) {
  try {
  let resPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  let dataPokemon = await resPokemon.json();
  let name = dataPokemon.name.toUpperCase();
  let image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  content.innerHTML += template(id, name, image);
  } catch {
    content.innerHTML = "bitte versuche es später noch einmal";
  }
};

async function getEvolutionChain(id) {
  try {
  let resSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  let dataSpecies = await resSpecies.json();
  let resEvoChain = await fetch(dataSpecies.evolution_chain.url);
  let dataEvoChain = await resEvoChain.json();
  getEvolutionNames(dataEvoChain.chain);
  } catch {
    content.innerHTML = "konnte nicht geladen werden";
  }
  
 };

 function getEvolutionNames(chain) {
  tabOverlay.innerHTML += `<span>${chain.species.name} &#10132</span>`;
  chain.evolves_to.map(evo => getEvolutionNames(evo));
};

template = (id, name, image, color) =>
  `
  <div class="cards">
    <div class="titles">
      <h6>#${id}</h6>
        <h7>${name}</h7>
      </div>
      <div class="image ${color}">
        <img src="${image}" alt="" />
      </div>
    <div class="icons">
      
    </div>
  </div>`;




















/*const BASE_URL = "https://pokeapi.co/api/v2/";

let myPokemon = [];
let offset = 1;
let limit = 18;
function init() {
  fetchPokemon(offset, limit);
  document.getElementById('spinner').classList.remove('d-none');
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
  document.getElementById('spinner').classList.add('d-none');
  offset += limit;
}

capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

function template(id, name, img, types, color){ 
  let typeImg = types.map(type => 
    `<img src="./assets/icons/${type}.svg" alt="${type}">`).join(" ");
  
  return `
  <div class="cards">
    <div class="titles">
      <h6>#${id}</h6>
        <h7>${name}</h7>
      </div>
      <div class="image ${color}">
        <img src="${img}" alt="" />
      </div>
    <div class="icons">
      ${typeImg}
    </div>
  </div>`};
  */