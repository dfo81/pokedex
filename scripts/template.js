// render card´s
template = (p, s) => `
  <div onclick="displayProfile(${p.id})" class="card ${s.color.name}">
    <h2>${capitalize(p.name)}</h2>
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${p.id}.png" alt="">
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


// render Profile of Character
profile = (p, s) => `
<div class="profile-title">
    <h2>${capitalize(p.name)}</h2>
    <h3>#${p.id}</h3>
</div>
<img class="portrait" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${p.id}.png" alt="${capitalize(p.name)}"/>
<div class="details">
    <nav>
        <b id="about" onclick="getAbout()" class="active">About</b>
        <b id="evo" onclick="getEvoChain()">Evolution-Chain</b>
        <b id="stats" onclick="getStats()">Stats</b>
    </nav>
    <div id="about-content" class="details-content">
        ${about(p, s)}
    </div>
    <div id="chain-content" class="details-content d-none">
        ${loadEvolutionChain(p.id)}
    </div>
    <div id="stats-content" class="details-content d-none">
        ${stats(p)}
    </div>
    <div class="arrow">
        <img onclick="prevId()" src="./assets/icons/links.png" alt="previous">
        <img onclick="nextId()" src="./assets/icons/rechts.png" alt="next"> 
    </div>
</div>
`;


// render about in to profile
about = (p, s) => `
  <table>
    <tr>
      <th>Weight</th>
      <td>${p.weight / 10} kg</td>
    </tr>
    <tr>
      <th>Height</th>
      <td>${p.height / 10} m</td>
    </tr>
    <tr>
      <th>Habitat</th>
      <td>${s.habitat?.name || "uknown"}</td>
    </tr>
    <tr>
      <th>Abilities</th>
      <td>${p.abilities.map(a => a.ability.name).join(", ")}</td>
    </tr>
    <tr>
      <th>Egg-Group</th>
      <td>${s.egg_groups.map(e => e.name).join(", ")}</td>
    </tr>
    <tr>
      <th>Types</th>
      <td>${p.types.map(t => t.type.name).join(", ")}</td>
    </tr>
  </table>
`;


// render evolution-chain in to Profile
renderChain = (name, img, showArrow) => `
  <div class="member">
    <img src="${img}" alt="${name}" />
    <span>${capitalize(name)}</span>
  </div>${showArrow ? "&#10132" : ""}`;


// render stats in to Profile
  stats = p => `
    <table id="stats-content">
        ${p.stats.map(s => ` 
        <tr>
          <th>${capitalize(s.stat.name)}</th>
          <td><div class="progress" style="width: ${s.base_stat / 2}%">${s.base_stat}</div></td>
        </tr>`).join(" ")
      }
    </table>
`;
