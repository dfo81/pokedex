
function getAbout() {
  getPokemon(9);
}


function getChain(id) {
  document.getElementById('about').classList.remove('active');
  document.getElementById('stats').classList.remove('active');
  document.getElementById('evo').classList.add('active');
  loadEvolutionChain(id);
}


async function getStats() {
    await getPokemon(15);
    document.getElementById('stats').classList.add('active');
    document.getElementById('evo').classList.remove('active');
    document.getElementById('about').classList.remove('active');
    document.getElementById('about-content').classList.add('d-none');
    document.getElementById('stats-content').classList.remove('d-none');
}


function nextPokemon() {
  
}