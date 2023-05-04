/* Pokemon */
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

/* Barra de pesquisa*/
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

/* Botões de pesquisa*/
const prev = document.querySelector('.btn-prev');
const next = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse =  await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); 

    if(APIResponse.status == 200) {

        const data = await APIResponse.json();
        return data;
    }
}


const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Encontrando..';
    pokemonNumber.innerHTML = '';
    input.value = '';


    const data = await fetchPokemon(pokemon);
    
    if (data) {

        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data.sprites['versions']['generation-v']['black-white']['animated']['front_default'];  
        input.value = '';
        searchPokemon = data.id;
      }
      else {
        pokemonName.innerHTML = 'not found :<';
        pokemonNumber.innerHTML = '';
      }    
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase()); /* ToLowerCase --> Transforma todas as caracteres em letras minusculas */
    input.value = '';
});

prev.addEventListener('click', () => {
    searchPokemon -=1;
    renderPokemon(searchPokemon);
});

next.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});


renderPokemon(searchPokemon); 