
function getAbout() {
  getPokemon(9);
}


function getChain(id) {
  document.getElementById('about').classList.remove('active');
  document.getElementById('stats').classList.remove('active');
  document.getElementById('evo').classList.add('active');
  loadEvolutionChain(id);
}


function getStats() {
    document.getElementById('stats').classList.add('active');
    document.getElementById('evo').classList.remove('active');
    document.getElementById('about').classList.remove('active');
}