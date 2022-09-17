function htmlCard(id, name, type) {
    return /*html*/ `
    <div onclick="singleView(id)" id="${id}" class="card ${type}">
            <h2>${name}</h2>
            <img class="pokemon-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg" alt="">          
    </div>
    `;
}

function singleViewCard(id, name, description) {
    return /*html*/ `
    <div class="fullscreencard">
        <div id="close" onclick="closeFullscreen()">X</div>
        <h2>${name}</h2>
        <img class="pokemon-image"src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg" alt="">
        <span style="white-space: pre-line">${description}</span>
    </div>
    
    `
}