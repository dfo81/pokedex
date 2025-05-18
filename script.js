let content = document.getElementById("content");
let statsContent = document.getElementById('stats-content');


function init() {
  getPokemon(5);
}


// Helper response function
async function fetchJSON(url) {
  let response = await fetch(url);
  return response.json();
}


// get pokemon response
async function getPokemon(id) {
  try {
    let pokemon = await fetchJSON(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let species = await fetchJSON(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    content.innerHTML = profile(pokemon, species);
  } catch {
    content.innerHTML = "Es ist ein Fehler aufgetreten, bitte versuchen Sie es später."
  }
}


// capitalize first letter 
let capitalize = (str) => str[0].toUpperCase() + str.slice(1);