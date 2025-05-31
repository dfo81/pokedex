
// display profile overlay
function displayProfile(id) {
    document.getElementById('overlay').classList.remove('d-none');
    document.body.style.overflow = "hidden";
    getProfile(id);
}


// close profile overlay
function closeProfile() {
    document.getElementById('overlay').classList.add('d-none');
    document.body.style.overflowY = "";    
}


// fetch name, id, color and picture for profile
async function getProfile(id) {
    currentProfileId = id;
    let pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(r => r.json());
    let species = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(s => s.json());
    document.getElementById('profile').innerHTML = profile(pokemon, species);
    document.getElementById('profile').className = "";
    document.getElementById('profile').classList.add(species.color.name);
}


// previous loaded pokemon
function prevId() {
    let id = currentProfileId > 1 ? currentProfileId - 1 : allLoadedPokemon.length;
    getProfile(id);
}


// next loaded ppkemon
function nextId() {
    let id = currentProfileId < 1025 ? currentProfileId + 1 : 1;
    getProfile(id);
}


// switch tabs
// about tab
function getAbout(){
    document.getElementById('about').classList.add('active');
    document.getElementById('evo').classList.remove('active');
    document.getElementById('stats').classList.remove('active');

    document.getElementById('about-content').classList.remove('d-none');
    document.getElementById('chain-content').classList.add('d-none');
    document.getElementById('stats-content').classList.add('d-none');
}


// evo chain tab
function getEvoChain() {
    document.getElementById('about').classList.remove('active');
    document.getElementById('evo').classList.add('active');
    document.getElementById('stats').classList.remove('active');

    document.getElementById('about-content').classList.add('d-none');
    document.getElementById('chain-content').classList.remove('d-none');
    document.getElementById('stats-content').classList.add('d-none');
}


// stats tab
function getStats() {
    document.getElementById('about').classList.remove('active');
    document.getElementById('evo').classList.remove('active');
    document.getElementById('stats').classList.add('active');

    document.getElementById('about-content').classList.add('d-none');
    document.getElementById('chain-content').classList.add('d-none');
    document.getElementById('stats-content').classList.remove('d-none');
}
