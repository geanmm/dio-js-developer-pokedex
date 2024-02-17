const pokemonList = document.querySelector("#pokemonList");
const loadMoreButton = document.querySelector("#loadMoreButton");
const limit = 16;
let offset = 0;

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  loadPokemonItems(offset, limit);
});

loadPokemonItems(offset, limit);

function loadPokemonItems(offset, limit) {
  pokeApi
    .getPokemons(offset, limit)
    .then((pokemons = []) => {
      const newHTML = pokemons
        .map(
          (pokemon) => `
        <li class="pokemon ${pokemon.type}" onclick="loadPokemonPage(${
            pokemon.number
          })">
        <span class="number">#${pokemon.number.pad()}</span>
        <span class="name">${pokemon.name}</span>
      
        <div class="detail">
          <ol class="types">
            ${pokemon.types
              .map((type) => `<li class='type ${type}'>${type}</li>`)
              .join("")}
          </ol>
      
          <img
            src="${pokemon.image}"
            alt="${pokemon.name}"
          />
        </div>
      </li>
        `
        )
        .join("");

      pokemonList.innerHTML += newHTML;
    })
    .catch((error) => console.log(error));
}

Number.prototype.pad = function () {
  let s = this.toString();
  while (s.length < 3) {
    s = "0" + s;
  }
  return s;
};
