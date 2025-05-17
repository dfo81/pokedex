let content = document.getElementById("content");

function init() {
  getPokemon(5);
}

async function getPokemon(id) {
  try {
    let resPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let pokemon = await resPokemon.json();
    let resSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    let species= await resSpecies.json();
    content.innerHTML = profile(pokemon, species);
  } catch {
    
  }
}

let capitalize = (str) => str[0].toUpperCase() + str.slice(1);