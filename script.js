const pokemon_URL = 'https://pokeapi.co/api/v2/pokemon/';
let pokemons = [];
let isFetchingData;

loadPokemon();
window.addEventListener("scroll", checkScrollToBottom);

function checkScrollToBottom() {
    let clientHeight = document.documentElement.clientHeight;
    let scrollHeight = document.documentElement.scrollHeight;
    let scrollY = window.scrollY;
    if ((Math.floor(scrollY + 50)) >= (scrollHeight - clientHeight) && isFetchingData == false) {
        loadPokemon();
        isFetchingData;
    }
}

async function loadPokemon() {
    isFetchingData = true;
    let index = pokemons.length + 1;
    let counter = 10;

    await fetchingData(counter, index);
    // await fetchPokemon(counter, index);
    // await fetchSpecies(counter);
    // saveDatatLocal();

    isFetchingData = false;
};

async function fetchingData(counter, index) {


    for (let i = 0; i < counter; i++) {
        const result1 = await fetch(pokemon_URL + index);
        index++;
        const resultAsJson1 = await result1.json();
        const rawPokemon = resultAsJson1;

        const url = rawPokemon.species.url;
        const result2 = await fetch(url);
        const resultAsJson2 = await result2.json();
        const rawPokemonSpecies = resultAsJson2;

        saveDatatLocal(rawPokemon, rawPokemonSpecies);

    };
};

// async function fetchSpecies(counter) {
//     for (let i = 0; i < counter; i++) {
//         const url = rawPokemons[i].species.url;
//         let result = await fetch(url);
//         let resultAsJson = await result.json();
//         rawPokemonSpecies.push(resultAsJson);
//     };
// };

function init() {
    renderCard();
}

async function saveDatatLocal(rawPokemon, rawSpecies) {

    const names = rawSpecies.names;
    let pokemonName;
    names.forEach(name => {
        if (name.language.name == 'de') {
            pokemonName = name.name;
        }
    });

    const id = rawSpecies.id;

    const type = rawSpecies.color.name;
    const descriptions = rawSpecies.flavor_text_entries;
    let description_text;
    for (let i = 0; i < descriptions.length; i++) {
        const description = descriptions[i];
        if (description.language.name == 'de') {
            description_text = description.flavor_text;
        }
    }
    const height = rawPokemon.height;
    const weight = rawPokemon.weight;
    const experience = rawPokemon.base_experience;


    let moves = rawPokemon.moves;
    moves.splice(5);



    pokemons.push({
        id: id,
        name: pokemonName,
        type: type,
        description: description_text,
        weight: weight,
        height: height,
        experience: experience,
        moves: moves
    })
    renderCard();
}





async function fetchMoves(url) {
    let result = await fetch(url);
    let resultAsJson = await result.json();
    return resultAsJson;
}

function renderCard() {
    let canvas = document.getElementById('canvas');
    canvas.innerHTML = '';
    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        let id = pokemon.id;
        let name = pokemon.name;
        let type = pokemon.type;
        canvas.innerHTML += htmlCard(id, name, type);
    }
}

function singleView(id) {
    document.body.style.overflow = 'hidden';
    const pokemon = pokemons[id - 1];
    let fullscreen = document.getElementById('fullscreen');
    fullscreen.style.display = 'flex';
    const name = pokemon.name;
    const description = pokemon.description
    const weight = pokemon.weight;
    const height = pokemon.height;
    const experience = pokemon.experience;
    const type = pokemon.type;
    fullscreen.innerHTML = singleViewCard(id, name, description, weight, height, experience, type);
    let movesContainer = document.getElementById('moves');
    for (let i = 0; i < pokemon.moves.length; i++) {
        const move = pokemon.moves[i].move;
        let text = move.name;
        movesContainer.innerHTML += `
            <li>${text}</li>
        `

    }
}

function closeFullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    fullscreen.style.display = 'none';
    document.body.style.overflow = 'auto';

}