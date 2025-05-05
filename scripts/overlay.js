function overlay(p) {
  document.getElementById('body').classList.add('overflow');
  document.getElementById('overlay').classList.remove('d-none');
return `
  <div class="overlay-nav">
    <button class="nav-arrow left">&#8592;</button>
    <div class="overlay-content">
      <h2>${p.name} (#${p.id})</h2>
      <img src="${p.img}" alt="${p.name}" />

      <div class="tabs">
        <button class="tab active" data-tab="evo">Evolution Chain</button>
        <button class="tab" data-tab="ability">Ability</button>
        <button class="tab" data-tab="details">Details</button>
      </div>

      <div class="tab-content active" id="tab-evo">
        <p><strong>Entwicklung:</strong></p>
        <div class="evo-images"></div>
      </div>
`};
/*      
<div class="tab-content" id="tab-ability">
  <p><strong>Artenspezifische Stärken:</strong></p>
  <div class="stat-bars">
    ${pokemon.stats
      .map((s) => {
        const statName = s.stat.name;
        const color = statColors[statName] || "#4caf50";
        return `
        <div class="stat-row">
          <span class="stat-name">${capitalize(statName)}</span>
          <div class="stat-bar-container">
            <div class="stat-bar" style="width: ${s.base_stat / 2}%; background-color: ${color};"></div>
          </div>
          <span class="stat-value">${s.base_stat}</span>
        </div>`;
      })
      .join("")}
  </div>
</div>
<div class="tab-content" id="tab-details">
  <p><strong>Größe:</strong> ${pokemon.height / 10} m</p>
  <p><strong>Gewicht:</strong> ${pokemon.weight / 10} kg</p>
  <p><strong>Kategorie:</strong> ${speciesData.genera.find(g => g.language.name === "de")?.genus || "Unbekannt"}</p>
  <p><strong>Typen:</strong> ${pokemon.types.map(t => capitalize(t.type.name)).join(", ")}</p>
</div>



    </div>
    <button class="nav-arrow right">&#8594;</button>
  </div>
`};
*/