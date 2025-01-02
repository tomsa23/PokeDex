const pokeList = document.getElementById('poke-list');
const url = "https://pokeapi.co/api/v2/pokemon/";



fetch(url)
    .then(response => response.json())
    .then (data => {
        data.results.forEach(pokemon => {
            fetch(pokemon.url)
                .then(response => response.json())
                .then(pokeDetails => {
                    pokeData(pokeDetails);
                })
                .catch(e => console.log("Error", e));
        })
    })
    .catch(e => console.log('Error', e));

function pokeData(pokeDetails) {
    if(pokeDetails.types) {
        let types = pokeDetails.types.map(typeInfo => typeInfo.type.name).join(', ');
        // let pokeStats = pokeDetails.stats(statsInfo => statsInfo.stats.name).join(', ');
        let pokeStats = pokeDetails.stats.map(statInfo => `${statInfo.stat.name}: ${statInfo.base_stat}`).join(', ');
        // let pruebaPokeIndice = pokeDetails.game_indices.map(indexPoke => `${indexInfo.game_indices.name}: ${indexInfo.game_indices.value}`).join(', ')
        let pruebaPokeIndice = pokeDetails.game_indices.map(indexPoke => `${indexPoke.version.name}: ${indexPoke.game_index}`).join(', ');
        let image = pokeDetails.sprites.front_default;


        // creacion de elementos html.
        const listPoke = document.createElement('li');
        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.alt = `${pokeDetails.name}`;



        listPoke.textContent = `Nombre: ${pokeDetails.name}, Numero: ${pokeDetails.id} , Tipo: ${types}, Estadisticas: ${pokeStats}, Version: ${pruebaPokeIndice}, Imagen: ${image}`;
        pokeList.appendChild(listPoke);
        pokeList.appendChild(imgElement);
    }else {
        console.log('Error', pokeDetails.name);
    }
}
 