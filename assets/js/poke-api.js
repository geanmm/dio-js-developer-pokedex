const pokeApi = {};
function converPokeAPIDetailToPokemon(pokeDetailed, fullParams = false) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetailed.id;
  pokemon.name = pokeDetailed.name;

  const types = pokeDetailed.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.type = type;
  pokemon.types = types;

  pokemon.image = pokeDetailed.sprites.other["official-artwork"].front_default;

  if (fullParams) {
    pokemon.weight = pokeDetailed.weight;
    pokemon.height = pokeDetailed.height;
    pokemon.stats = pokeDetailed.stats.map((statSlot) => {
      return { name: statSlot.stat.name, value: statSlot.base_stat };
    });
  }

  return pokemon;
}

pokeApi.getPokemonDetail = async (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(converPokeAPIDetailToPokemon);
};

pokeApi.getPokemons = async (offset = 0, limit = 10) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then((res) => res.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemonList) => pokemonList.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonDetails) => pokemonDetails);
};

pokeApi.getPokemonFullParams = async (pokemonNumber) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;
  return fetch(url)
    .then((res) => res.json())
    .then((pokemon) => converPokeAPIDetailToPokemon(pokemon, true));
};
