const URL = 'https://pokeapi.co/api/v2/pokemon-species/';
let pokemons = [];
let rawPokemons = [];

fetchData();

async function fetchData(){

    for (let i = 1; i < 15; i++) {
        let result = await fetch(URL + i);
        resultAsJson = await result.json();
        rawPokemons.push(resultAsJson);
    }

};

function init(){
    renderCard();
}

function saveDatatLocal(){
    for (let i = 0; i < resultAsJson.results.length; i++) {
        const result = resultAsJson.results[i];
        const name = result.name;
        const id = result.url.split('pokemon/').pop().replace('/','');

        pokemons.push(
            {
                id: id,
                name: name,
                type: 'red'
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