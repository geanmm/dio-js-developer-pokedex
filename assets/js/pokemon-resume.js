const pokemonModal = document.querySelector(".detailed__pokemon");
function loadPokemonPage(id) {
  pokeApi
    .getPokemonFullParams(id)
    .then((pokemon) => {
      handleModalVisibility();
      pokemonModal.innerHTML = `
    <div class="detailed__content ${pokemon.type}">
      <div class="main__content">
              <button id="closeInfo" type"button" title="Close" onclick="   handleModalVisibility()
              ">
                <img src="./assets/images/x-symbol.svg" alt="Close">
              </button>
              <div class="detailed__title">
                <h1>${pokemon.name}</h1>
                <span>#${pokemon.number.pad()}</span>
              </div>
              <ul class="detailed__types">
              ${pokemon.types
                .map((type) => `<li class='type ${type}'>${type}</li>`)
                .join("")}
              </ul>
              <div class="image__container">
                <img
                  src="${pokemon.image}"
                  alt="${pokemon.name}"
                />
              </div>
            </div>
            <div class="pokemon__data">
              <ul class="pokemon__metrics">
                <li>
                  <h4>Height</h4>
                  <span>${convertToFeet(pokemon.height)} (${(
        pokemon.height / 10
      ).toFixed(1)} m)</span>
                </li>
                <li>
                  <h4>Weight</h4>
                  <span>${convertToPound(pokemon.weight)} (${(
        pokemon.weight / 10
      ).toFixed(1)} kg)</span>
                </li>
              </ul>
              <ul class="pokemon__stats">
              ${pokemon.stats
                .map((stat) => {
                  return `
                <li>
                  <h4>${stat.name}</h4>
                  <p>${stat.value}</p>
                  <div class="stat__bar">
                    <div class="fill__bar ${
                      (stat.value >= 122 && "good__stat") ||
                      (stat.value < 122 && stat.value >= 62 && "mid__stat") ||
                      (stat.value < 62 && "bad__stat")
                    }" style="width: ${Math.floor(
                    (stat.value * 100) / 255
                  )}%"></div>
                  </div>
                </li>
                `;
                })
                .join("")}
              </ul>
            </div>
          </div>
    `;
    })
    .catch((error) => console.log(error));
}

function convertToFeet(meter) {
  const baseConversor = meter / 10 / 0.0254;
  const pes = Math.floor(baseConversor / 12);
  const pol = (baseConversor - pes * 12).toFixed(1);

  return (medida = `${pes}'${pol}"`);
}

function convertToPound(kg) {
  const pounds = ((kg / 10) * 2.205).toFixed(1);
  return `${pounds} lbs`;
}

function handleModalVisibility() {
  pokemonModal.classList.toggle("modal__display");
}

function evaluateStat(stat) {
  if (stat >= 122) return "good__stat";
  if (stat >= 62) return "mid__stat";
  else return "bad__stat";
}
