let content = document.getElementById('content');
let myPokemon = [];
let offset = 1;
let limit = 24;


// initial function, load
function init() {
  loadPokemon();
  document.getElementById('overlay-loader').classList.remove('d-none');
  document.getElementById('loader').classList.remove('d-none');
  document.getElementById('body').classList.add('overflow');
}


// load 24 pokemons to list and render 
async function loadPokemon() {
  for (let id = offset; id < offset + limit; id++) {
    try {
      // load Pokemons
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      // load species to load evolution chain
      const speciesRes = await fetch(data.species.url);
      const species = await speciesRes.json();
      // load evolution chain from cpecies url
      const evoRes = await fetch(species.evolution_chain.url);
      const evoData = await evoRes.json();
      const evolutions = getEvoChain(evoData.chain);
      // map stats 
      const stats = data.stats.map(s => ({
        name: s.stat.name,
        value: s.base_stat
      }));
      // push all data to list
      myPokemon.push({
        id: data.id,
        name: capitalize(data.name),
        img: data.sprites.other["official-artwork"].front_default,
        types: data.types.map(t => t.type.name),
        color: species.color.name,
        stats: stats,
        weight: data.weight,
        height: data.height,
        evolutions: evolutions
      }
    );
    } catch (e) {
      console.error(`Fehler bei Pokémon ID ${id}:`, e);
    }
    content.innerHTML += template(myPokemon[myPokemon.length - 1]);
    console.log();
  }
  document.getElementById('overlay-loader').classList.add('d-none');
  document.getElementById('loader').classList.add('d-none');
  document.getElementById('body').classList.remove('overflow');
  offset += limit;
}


// capitalaize first letter 
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);


// return evolution chain
function getEvoChain(chain, evolutions = []) {
  if (chain.species) evolutions.push(chain.species.name);
  if (chain.evolves_to && chain.evolves_to.length > 0) {
    chain.evolves_to.forEach(evo => getEvoChain(evo, evolutions));
  }
  return evolutions;
}

//close overlay
function closeOverlay() {
  document.getElementById('body').classList.remove('overflow');
  document.getElementById('overlay-loader').classList.add('d-none');
}