let content = document.getElementById('content');
let myPokemon = [];
let offset = 1;
let limit = 24;


function init() {
  loadPokemon();
}

async function loadPokemon() {
  for (let id = 1; id < offset + limit; id++) {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();

      const speciesRes = await fetch(data.species.url);
      const species = await speciesRes.json();

      const evoRes = await fetch(species.evolution_chain.url);
      const evoData = await evoRes.json();
      const evolutions = getEvoChain(evoData.chain);

      const stats = data.stats.map(s => ({
        name: s.stat.name,
        value: s.base_stat
      }));

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
    }
  document.getElementById('spinner').classList.add('d-none');
  offset += limit;
}

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

function getEvoChain(chain, evolutions = []) {
  if (chain.species) evolutions.push(chain.species.name);
  if (chain.evolves_to && chain.evolves_to.length > 0) {
    chain.evolves_to.forEach(evo => getEvoChain(evo, evolutions));
  }
  return evolutions;
}
