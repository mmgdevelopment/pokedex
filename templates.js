function htmlCard(id, name, type) {
    return /*html*/ `
    <div onclick="renderSingleView(id)" id="${id}" class="card ${type}">
            <h2>${name}</h2>
            <img class="pokemon-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg" alt="">          
    </div>
    `;
}

function singleViewCard(pokemon) {
    document.getElementById('fullscreencard').className = "card";
    document.getElementById('fullscreencard').classList.add(pokemon.type);
    return /*html*/ `
    <div id="container">
        <div class="icon" id="close" onclick="closeFullscreen()">
            <img src="./src/close.svg">
        </div>
        <div class="icon" id="previous" onclick="previousPokemon(${pokemon.id})">
            <img src="./src/left.svg">
        </div>
        <div class="icon" id="next" onclick="nextPokemon(${pokemon.id})">
            <img src="./src/right.svg">
        </div>
        <h2>${pokemon.name}</h2>
        <img class="pokemon-image"src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg" alt="">
            <br>
        <span id="description">${pokemon.description}</span> <br>
        <span>Gewicht: ${pokemon.weight * 0.1}kg</span>
        <span>Größe: ${pokemon.height * 10}cm</span>
        <span>Erfahrung: ${pokemon.experience}</span>
        <ul id="moves">Attacken:</ul>   
    </div>    
    `
}