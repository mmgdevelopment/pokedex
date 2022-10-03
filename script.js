const pokemon_URL = 'https://pokeapi.co/api/v2/pokemon/';
let pokemons = [];
let filteredPokemons = [];
let isFetchingData = true;
let activeFullscreen = null;
const quantity = 10;


function init() {
    loadPokemon();
    window.addEventListener("scroll", loadPokemonByScrollingDown);
    window.addEventListener('dragstart', (e) => { e.preventDefault(); });
    window.addEventListener('keydown', (e) => { navigateInSingleView(e); });
}

function navigateInSingleView(e) {
    if (e.key == 'ArrowRight' && activeFullscreen) {
        nextPokemon(activeFullscreen);
    }
    if (e.key == 'ArrowLeft' && activeFullscreen) {
        previousPokemon(activeFullscreen);
    }
    if (e.key == 'Escape' && activeFullscreen) {
        closeFullscreen();
    }
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
    renderCards(pokemons);
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

function renderCards(content) {
    let canvas = document.getElementById('canvas');
    canvas.innerHTML = '';
    for (let i = 0; i < content.length; i++) {
        const pokemon = content[i];
        const id = pokemon.id;
        const name = pokemon.name;
        const type = pokemon.type;
        canvas.innerHTML += htmlCard(id, name, type);
    }
}

function renderSingleView(id) {
    let fullscreencard = document.getElementById('fullscreencard');
    const pokemon = pokemons[id - 1];
    openFullscreen(pokemon);
    fullscreencard.innerHTML = singleViewCard(pokemon);
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

function openFullscreen(pokemon) {
    let fullscreen = document.getElementById('fullscreen');
    fullscreen.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    const fullscreencard = document.getElementById('fullscreencard');
    fullscreencard.style.display = "flex";
    activeFullscreen = pokemon.id;
}

function closeFullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    fullscreen.style.display = 'none';
    document.body.style.overflow = 'auto';
    const fullscreencard = document.getElementById('fullscreencard');
    fullscreencard.style.display = "none";
    activeFullscreen = null;
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

function findPokemon() {
    let searchFieldValue = document.getElementById('search').value;
    filteredPokemons = pokemons.filter(pokemon =>
        pokemon.name.includes(searchFieldValue))
    renderCards(filteredPokemons);
}