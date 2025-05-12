
function profile() {
  document.getElementById('content').innerHTML = 
`
<div class="overlay">
        <div class="profile green">
          <div class="profile-title">
            <h2>Bulamachenizator</h2>
            <h3>#89</h3>
          </div>
          <img class="portrait"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/89.svg"
            alt=""
          />
          <div class="details">
            <nav>
              <b class="active">About</b>
              <b>Evolution-Chain</b>
              <b>Base Stats</b>
            </nav>
            <table>
              <tr>
                <th>Species</th>
                <td>Seed</td>
              </tr>
              <tr>
                <th>Height</th>
                <td>70cm</td>
              </tr>
              <tr>
                <th>Weight</th>
                <td>6,9kg</td>
              </tr>
              <tr>
                <th>Abilities</th>
                <td>blablablablar, blablablub</td>
              </tr>
              <tr>
                <th></th>
              </tr>
              <tr>
                <th>Ohoaihsdf</th>
              </tr>
            </table>
            <div class="arrows">
              <img onclick="prevIndex()" src="./assets/icons/links.png" alt="links" />
              <img onclick="nextIndex()" src="./assets/icons/rechts.png" alt="rechts" />
            </div>
          </div>
        </div>
      </div>`};