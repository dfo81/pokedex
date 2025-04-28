


const fetchPokemon = async (offset, limit) => {
    for (let id = offset; id < offset + limit; id++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
      const res = await fetch(url);
      const data = await res.json();
      myPokemon.push(data);
      createCard(data);
    }
  };