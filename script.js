const URL = 'https://pokeapi.co/api/v2/pokemon-species/';
let pokemons = [];
let rawPokemons = [];

fetchData();

async function fetchData(){
    
    let index = pokemons.length +1

    for (let i = 0; i < 15; i++) {
        let result = await fetch(URL + index);
        index ++;
        resultAsJson = await result.json();
        rawPokemons.push(resultAsJson);
    }
    saveDatatLocal();
    rawPokemons = [];
};

function init(){
    renderCard();
}

function saveDatatLocal(){
    for (let i = 0; i < rawPokemons.length; i++) {
        const result = rawPokemons[i];
        const name = result.names[5].name;
        const id = result.id;
        const type = result.color.name;

        pokemons.push(
            {
                id: id,
                name: name,
                type: type
            }
        )
    }
    renderCard();
}
function renderCard(){
    let canvas = document.getElementById('canvas');
    canvas.innerHTML = '';
    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
        let id = pokemon.id;
        let name = pokemon.name;
        let type = pokemon.type;
        canvas.innerHTML += htmlCard(id,name,type);        
    }
}