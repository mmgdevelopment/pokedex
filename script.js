const URL = 'https://pokeapi.co/api/v2/pokemon-species/';
let pokemons = [];
let rawPokemons = [];
let fetchingData;

fetchData();
window.addEventListener("scroll", checkScrollToBottom);

function checkScrollToBottom() {
    let clientHeight = document.documentElement.clientHeight;
    let scrollHeight = document.documentElement.scrollHeight;
    let scrollY = window.scrollY;
    if ((Math.floor(scrollY + 50)) >= (scrollHeight - clientHeight) && fetchingData == false) {
        fetchData();
        fetchingData;
    }
}

async function fetchData() {
    fetchingData = true;
    let index = pokemons.length + 1
    for (let i = 0; i < 10; i++) {
        let result = await fetch(URL + index);
        index++;
        resultAsJson = await result.json();
        rawPokemons.push(resultAsJson);
    }
    saveDatatLocal();
    rawPokemons = [];
    fetchingData = false;
};

function init() {
    renderCard();
}

function saveDatatLocal() {
    for (let i = 0; i < rawPokemons.length; i++) {
        const result = rawPokemons[i];
        const names = result.names;
        let pokemonName;
        names.forEach(name => {
            if (name.language.name == 'de') {
                pokemonName = name.name;
            }
        });

        const id = result.id;
        const type = result.color.name;
        const descriptions = result.flavor_text_entries;
        let description_text;
        for (let i = 0; i < descriptions.length; i++) {
            const description = descriptions[i];
            if (description.language.name == 'de') {
                description_text = description.flavor_text;
            }
        }
        pokemons.push({
            id: id,
            name: pokemonName,
            type: type,
            description: description_text
        })
    }
    renderCard();
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
    const pokemon = pokemons[id - 1];
    let fullscreen = document.getElementById('fullscreen');
    fullscreen.style.display = 'flex';
    const name = pokemon.name;
    const description = pokemon.description
    fullscreen.innerHTML = singleViewCard(id, name, description);
}

function closeFullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    fullscreen.style.display = 'none';
}