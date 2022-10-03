const pokemon_URL = 'https://pokeapi.co/api/v2/pokemon/';
let pokemons = [];
let isFetchingData = true;
const quantity = 10;

function init() {
    loadPokemon();
    window.addEventListener("scroll", loadPokemonByScrollingDown);
}

function loadPokemonByScrollingDown() {
    let clientHeight = document.documentElement.clientHeight;
    let scrollHeight = document.documentElement.scrollHeight;
    let scrollY = window.scrollY;
    if ((Math.floor(scrollY + 50)) >= (scrollHeight - clientHeight) && isFetchingData == false) {
        loadPokemon();
    }
}

async function loadPokemon() {
    isFetchingData = true;
    let index = pokemons.length + 1;
    await fetchingData(quantity, index);
    isFetchingData = false;
};

async function fetchingData(quantity, index) {
    for (let i = 0; i < quantity; i++) {
        const rawPokemon = await fetchPokemon(index);
        const rawPokemonSpecies = await fetchPokemonSpecies(rawPokemon);
        saveDatatLocal(rawPokemon, rawPokemonSpecies);
        index++;
    };
};

async function fetchPokemon(index) {
    const result = await fetch(pokemon_URL + index);
    const resultAsJson = await result.json();
    const rawPokemon = resultAsJson;
    return rawPokemon;
}

async function fetchPokemonSpecies(rawPokemon) {
    const url = rawPokemon.species.url;
    const result = await fetch(url);
    const resultAsJson = await result.json();
    const rawPokemonSpecies = resultAsJson;
    return rawPokemonSpecies;
}

function saveDatatLocal(rawPokemon, rawSpecies) {
    const names = rawSpecies.names;
    const name = getName(names);
    const id = rawSpecies.id;
    const type = rawSpecies.color.name;
    const descriptions = rawSpecies.flavor_text_entries;
    const description = getDescription(descriptions);
    const height = rawPokemon.height;
    const weight = rawPokemon.weight;
    const experience = rawPokemon.base_experience;
    let moves = rawPokemon.moves;
    moves.splice(5);
    pokemons.push({
        id: id,
        name: name,
        type: type,
        description: description,
        weight: weight,
        height: height,
        experience: experience,
        moves: moves
    })
    renderCards();
}


function getName(names) {
    let pokemonName;
    names.forEach(name => {
        if (name.language.name == 'de') {
            pokemonName = name.name;
        }
    });
    return pokemonName
}

function getDescription(descriptions) {
    let descriptionText;
    for (let i = 0; i < descriptions.length; i++) {
        const description = descriptions[i];
        if (description.language.name == 'de') {
            descriptionText = description.flavor_text;
        }
    }
    return descriptionText;
}

async function fetchMoves(url) {
    let result = await fetch(url);
    let resultAsJson = await result.json();
    return resultAsJson;
}

function renderCards() {
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

function renderSingleView(id) {
    let fullscreen = document.getElementById('fullscreen');
    openFullscreen();
    const pokemon = pokemons[id - 1];
    fullscreen.innerHTML = singleViewCard(pokemon);
    renderMoves(pokemon);
}



function renderMoves(pokemon) {
    let movesContainer = document.getElementById('moves');
    for (let i = 0; i < pokemon.moves.length; i++) {
        const move = pokemon.moves[i].move;
        let text = move.name;
        movesContainer.innerHTML += `
            <li>${text}</li>
        `;
    }
}

function openFullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    fullscreen.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeFullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    fullscreen.style.display = 'none';
    document.body.style.overflow = 'auto';

}

function previousPokemon(id) {
    if (id == 1) {
        id = pokemons.length;
    } else {
        id--;
    }
    renderSingleView(id);
}

function nextPokemon(id) {
    if (id == pokemons.length) {
        id = 1;
    } else {
        id++;
    }
    renderSingleView(id);
}