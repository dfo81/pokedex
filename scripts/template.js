// render Profile
profile = (p, s) => `

<div class="overlay">
  <div class="profile ${s.color.name}">
    <div class="profile-title">
      <h2>${capitalize(p.name)}</h2>
      <h3>#${p.id}</h3>
    </div>
    <img class="portrait" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${p.id}.svg" alt=""/>
    <div class="details">
    <nav>
      <b id="about" onclick="getAbout()" class="active">About</b>
      <b id="evo" onclick="getChain(8)">Evolution-Chain</b>
      <b id="stats" onclick="getStats()">Stats</b>
    </nav>
  <div id="profile-content">


    <table id="about-content">
      <tr>
        <th>Height</th>
        <td>${p.height / 10} m</td>
      </tr>
      <tr>
        <th>Weight</th>
        <td>${p.weight / 10} kg</td>
      </tr>
        <tr>
          <th>Abilities</th>
          <td>${p.abilities.map(a => a.ability.name).join(", ")}</td>
        </tr>
        <tr>
          <th>Habitat</th>
          <td>${s.habitat.name}</td>
        </tr>
        <tr>
          <th>Types</th>
          <td>${p.types.map(t => t.type.name).join(", ")}</td>
        </tr>
      </table>

      
      <table id="stats-content" class="d-none">
        <tr>
          <th>${p.stats[0].stat.name}</th>
          <td><div class="progress" style="width: ${p.stats[0].base_stat}px">${p.stats[0].base_stat}</div></td>
        </tr>
        <tr>
          <th>${p.stats[1].stat.name}</th>
          <td><div class="progress" style="width: ${p.stats[1].base_stat}px">${p.stats[1].base_stat}</div></td>
        </tr>
        <tr>
          <th>${p.stats[2].stat.name}</th>
          <td><div class="progress" style="width: ${p.stats[2].base_stat}px">${p.stats[2].base_stat}</div></td>
        </tr>
        <tr>
          <th>${p.stats[3].stat.name}</th>
          <td><div class="progress" style="width: ${p.stats[3].base_stat}px">${p.stats[3].base_stat}</div></td>
        </tr>
        <tr>
          <th>${p.stats[4].stat.name}</th>
          <td><div class="progress" style="width: ${p.stats[4].base_stat}px">${p.stats[4].base_stat}</div></td>
        </tr>
        <tr>
          <th>${p.stats[5].stat.name}</th>
          <td><div class="progress" style="width: ${p.stats[5].base_stat}px">${p.stats[5].base_stat}</div></td>
        </tr>
      </table>


    </div>
      <div class="arrows">
        <img onclick="prevPokemon()" src="./assets/icons/links.png" alt="links" />
        <img onclick="nextPokemon()" src="./assets/icons/rechts.png" alt="rechts" />
      </div>
    </div>
  </div>
</div>`;


// render chain in to Profile
renderChain = (name, img, showArrow) => `
  <div class="member">
    <img src="${img}" alt="${name}" />
    <span>${capitalize(name)}</span>
  </div>${showArrow ? "&#10132" : ""}`;
