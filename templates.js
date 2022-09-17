function htmlCard(id, name, type) {
    return /*html*/ `
    <div onclick="singleView(id)" id="${id}" class="card ${type}">
            <h2>${name}</h2>
            <img class="pokemon-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg" alt="">          
    </div>
    `;
}

function singleViewCard(id, name, description, weight, height, experience, type) {
    return /*html*/ `
    <div class="fullscreencard ${type}">
        <div id="close" onclick="closeFullscreen()">
            <img src="./src/close.svg">
        </div>
        <h2>${name}</h2>
        <img class="pokemon-image"src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg" alt="">
        <span style="white-space: pre-line">${description}</span>
        <span>Gewicht: ${weight*0.1}kg</span>
        <span>Größe: ${height*10}cm</span>
        <span>Erfahrung: ${experience}</span>
        <ul id="moves">Attacken:</ul>       
    </div>
    
    `
}