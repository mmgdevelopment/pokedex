function htmlCard(id, name, type) {
    return /*html*/ `
    <div onclick="renderSingleView(id)" id="${id}" class="card ${type}">
            <h2>${name}</h2>
            <img class="pokemon-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg" alt="">          
    </div>
    `;
}

function singleViewCard(pokemon) {
    const id = pokemon.id;
    return /*html*/ `
    <div class="fullscreencard ${pokemon.type}">
        <div id="close" onclick="closeFullscreen()">
            <img src="./src/close.svg">
        </div>
        <div id="previous" onclick="previousPokemon(${id})">
            <img src="./src/left.svg">
        </div>
        <div id="next" onclick="nextPokemon(${id})">
            <img src="./src/right.svg">
        </div>
        <h2>${pokemon.name}</h2>
        <img class="pokemon-image"src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg" alt="">
            <br>
        <span style="white-space: pre-line">${pokemon.description}</span> <br>
        <span>Gewicht: ${pokemon.weight * 0.1}kg</span>
        <span>Größe: ${pokemon.height * 10}cm</span>
        <span>Erfahrung: ${pokemon.experience}</span>
        <ul id="moves">Attacken:</ul>       
    </div>
    
    `
}