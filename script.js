const BASE_URL = "https://pokeapi.co/api/v2/";
let content = document.getElementById('content');
let allPokemon = [];
let offset = 1;
let limit = 18;
function init() {
  loadAllPokemon();
}

async function loadAllPokemon() {
  for (let id = 1; id <= 1025; id++) {
    try {
      const res = await fetch(`${BASE_URL}pokemon/${id}`);
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

      allPokemon.push({
        id: data.id,
        name: capitalize(data.name),
        img: data.sprites.other["official-artwork"].front_default,
        types: data.types.map(t => t.type.name),
        color: species.color.name,
        stats: stats,
        weight: data.weight,
        height: data.height,
        evolutions: evolutions
      });
    } catch (e) {
      console.error(`Fehler bei Pokémon ID ${id}:`, e);
    }
  }
  offset += limit;
  document.getElementById('spinner').classList.add('d-none');
}

capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

function getEvoChain(chain, evolutions = []) {
  if (chain.species) evolutions.push(chain.species.name);
  if (chain.evolves_to && chain.evolves_to.length > 0) {
    chain.evolves_to.forEach(evo => getEvoChain(evo, evolutions));
  }
  return evolutions;
}

template = (p) =>
 `
  <div class="cards">
    <div class="titles">
      <h6>#${p.id}</h6>
        <h7>${p.name}</h7>
      </div>
      <div class="image ${p.color}">
        <img src="${p.img}" alt="" />
      </div>
    <div class="icons">
      ${p.types}
    </div>
  </div>`;