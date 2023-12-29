const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const btn = document.querySelector(".modalBtn");
const modal = document.getElementById("pokemonModal");

const maxRecords = 151;
const limit = 10;
let offset = 0;

// Converte cada pokemon da req em um html do proprio
function convertPokemonToLi(pokemon) {
  const pokemonJson = JSON.stringify(pokemon);

  return `
        <li class="pokemon ${pokemon.type}" data-pokemon='${JSON.stringify(
    pokemon
  )}' onclick="abrirModal(${JSON.stringify(pokemon)})">

            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

function abrirModal(pokemon) {
  modalContent.innerHTML = `
  <div class="${pokemon.type}">

  <div class="card">
    <div class="backgroundPoke">

    <img src="${pokemon.photo}" alt="${pokemon.name}">
    </div>
    <ul class='text-section list-group list-group-flush'>


    <li class="habilities list-group-item"> SKILL:
      ${pokemon.habilities.map((habilidade) => `${habilidade} ; `).join("")}
      </li>

    <li class="list-group-item list-group-flush">EXP: ${pokemon.exp}</li>
    <li class="list-group-item list-group-flush">Peso:  ${pokemon.peso}</li>
    <li class="list-group-item list-group-flush">Altura: ${pokemon.altura}</li>
  </ul>

    </div>
    </div>

        <span class="close" onclick="fecharModal()">&times;</span>
    `;
  modal.style.display = "block";
  const closeButton = document.querySelector(".close");
  closeButton.addEventListener("click", fecharModal);
  window.addEventListener("click", fecharModalOutside);
}

function fecharModal() {
  const closeButton = document.querySelector(".close");
  closeButton.removeEventListener("click", fecharModal);
  window.removeEventListener("click", fecharModalOutside);

  modal.style.display = "none";
}

pokemonList.addEventListener("click", (event) => {
  const targetPokemon = event.target.closest(".pokemon");
  if (targetPokemon) {
    const pokemonData = JSON.parse(targetPokemon.getAttribute("data-pokemon"));
    abrirModal(pokemonData);
  }
});

function fecharModalOutside(event) {
  // Fecha o modal se o clique for fora do conteúdo do modal
  if (event.target === modal) {
    fecharModal();
  }
}
