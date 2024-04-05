const searchInput = document.querySelector("#poke-input");
const searchBtn = document.querySelector(".btn-search");
const pokeContainer = document.querySelector(".poke-container");
const pokeCount = 151;
const colors = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    water: "#DEF3FD",
    electric: " #FCF7DE",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#FFBFB9",
    bug: "#f8d62b",
    dragon: "#c3a4eb",
    psychic: "#eaeda1",
    flying: "#AED5FE",
    normal: "#C7DAF8",
    fighting: "#E5CB69",
    ice: "#aec6cf",
};

const initPokemon = async () => {
  for (let i = 1; i <= pokeCount; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  let res = await fetch(url);
  let data = await res.json();
 /*  console.log(data); */
 createPokemonBox(data);
};

const createPokemonBox=(pokemon) =>{
  /*  console.log(pokemon.name);  */
  const name = pokemon.name[0].toUpperCase()+pokemon.name.slice(1);
 /*  console.log(name); */
  const id = pokemon.id.toString().padStart(3, "0"); 
/*  console.log(id); */
const weight = pokemon.weight;
const type = pokemon.types[0].type.name;
/* console.log(type); */
const color = colors[type];
/* console.log(color);
 */

const pokemonEl = document.createElement("div");
pokemonEl.classList.add("poke-box");
pokemonEl.style.backgroundColor=`${color}`;
pokemonEl.innerHTML = `
<img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" alt="${name} image">
<div class="title">
<h4 class="poke-name">${name}</h4>
<p class="poke-id">Id:${id}</p>
<p class="poke-weight">${weight} kg</p>
<p class="poke-type">Type: ${type} </p>
</div>
`;

pokeContainer.appendChild(pokemonEl);

};
initPokemon();


searchInput.addEventListener("input", function (e) {
    const pokeBoxes = document.querySelectorAll(".poke-box");

    const search = searchInput.value.toLowerCase();
    /* console.log(search); */
    pokeBoxes.forEach((pokeBox) => {
        const pokeName = pokeBox.querySelector(".poke-name").textContent.toLowerCase();
        if (!pokeName.includes(search)) {
            pokeBox.style.display = "none";
        } else {
            pokeBox.style.display = "block";
        }
    });

    console.log(search);
});