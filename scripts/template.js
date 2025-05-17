profile = (p, s) =>`

<div class="overlay">
  <div class="profile green">
    <div class="profile-title">
      <h2>${capitalize(p.name)}</h2>
      <h3>#${p.id}</h3>
    </div>
    <img class="portrait"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${p.id}.svg"
            alt=""
          />
    <div class="details">
    <nav>
      <b id="about" onclick="getAbout()" class="active">About</b>
      <b id="evo" onclick="getChain(8)">Evolution-Chain</b>
      <b>Stats</b>
    </nav>
  <div id="profile-content">
    <table>
      <tr>
        <th>Habitat</th>
          <td>${s.habitat.name}</td>
      </tr>
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
            <td>al</td>
        </tr>
        <tr>
          <th></th>
        </tr>
        <tr>
          <th>Ohoaihsdf</th>
        </tr>
      </table>
    </div>
      <div class="arrows">
        <img onclick="prevIndex()" src="./assets/icons/links.png" alt="links" />
        <img onclick="nextIndex()" src="./assets/icons/rechts.png" alt="rechts" />
      </div>
    </div>
  </div>
</div>`
;



renderChain = (name, img, showArrow) => `
  <div class="member">
    <img src="${img}" alt="${name}" />
    <span>${capitalize(name)}</span>
  </div>${showArrow ? '&#10132' : ''}`;