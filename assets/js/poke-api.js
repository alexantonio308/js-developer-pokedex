
const pokeApi = {}

//converter pokemon da api em pokemon  objeto local
function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    const habilidades = pokeDetail.abilities.map((typeSlot) => typeSlot.ability.name)
    const [habilidade] = habilidades 
    pokemon.habilities = habilidades
    pokemon.habilidade = habilidade   
    pokemon.exp = pokeDetail.base_experience
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.peso = pokeDetail.weight;
    pokemon.altura = pokeDetail.height;

    return pokemon
}


pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
    // transforma o response em json
        .then((response) => response.json())
        // pega apenas o objeto results do json
        .then((jsonBody) => jsonBody.results)
        // pega cada detalhe de cada pokemon
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        // esperar todas as requisicoes terminarem
        .then((detailRequests) => Promise.all(detailRequests))

        .then((pokemonsDetails) => pokemonsDetails)
}
