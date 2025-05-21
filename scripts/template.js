// render Profile
profile = (p, s) => `

  <div class="profile ${s.color.name}">
    <div class="profile-title">
      <h2>${capitalize(p.name)}</h2>
      <h3>#${p.id}</h3>
    </div>
    <img class="portrait" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${p.id}.svg" alt=""/>
    <div class="details">
    <nav>
      <b id="about" onclick="getProfile(${p.id})" class="active">About</b>
      <b id="evo" onclick="getChain(${p.id})">Evolution-Chain</b>
      <b id="stats" onclick="getStats(${p.id})">Stats</b>
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
      ${p.stats.map(s => ` 
        <tr>
          <th>${s.stat.name}</th>
          <td><div class="progress" style="width: ${s.base_stat}px">${s.base_stat}</div></td>
        </tr>`).join(" ")
      }
      </table>


  </div>

      <div class="arrows">
        <img onclick="prevPokemon(${p.id})" src="./assets/icons/links.png" alt="links" />
        <img onclick="nextPokemon(${p.id})" src="./assets/icons/rechts.png" alt="rechts" />
      </div>
    </div>
  </div>
`;


// render chain in to Profile
renderChain = (name, img, showArrow) => `
  <div class="member">
    <img src="${img}" alt="${name}" />
    <span>${capitalize(name)}</span>
  </div>${showArrow ? "&#10132" : ""}`;


// render cards
template = (p, s) => `
  <div onclick="getOverlay(${p.id})" class="card ${s.color.name}">
    <h2>${capitalize(p.name)}</h2>
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${p.id}.svg" alt="">
    <div class="type-icon">
      ${p.types.map(t =>  `
      <div class="tooltip">
        <img src="./assets/icons/${t.type.name}.svg" alt="${t.type.name}"><div class="tooltiptext">${t.type.name}</div>
      </div> 
        `).join(" ")
      }
    </div>
  </div>
`;