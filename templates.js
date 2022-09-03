function htmlCard(id, name, type){
return /*html*/`
    <div onclick="singleView(id)" id="${id}" class="card ${type}">
            <h2>${name}</h2>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="">          
    </div>
    `;
}