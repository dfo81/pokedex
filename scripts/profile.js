function getChain(id) {
  document.getElementById('about').classList.remove('active');
  document.getElementById('evo').classList.add('active');
  loadEvolutionChain(id);
}

function getAbout() {
    document.getElementById('about').classList.add('active');
    getPokemon(9);
}