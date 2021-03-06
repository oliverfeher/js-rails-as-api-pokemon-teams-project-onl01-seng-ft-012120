const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


// RENDER TEAMS
const teamContainer = document.querySelector("main");



const renderTeams = () =>
{
    fetch(TRAINERS_URL)
        .then((response) =>
        {
            return response.json();
        })
        .then((data) =>
        {
            data.forEach(team => 
            {
             renderCard(team);   
            });
        })
}

document.onload = renderTeams();

const renderCard = (team) => 
{

    let card = document.createElement("div");
    card.setAttribute("class", "card")
    card.setAttribute("data-id", `${team.id}`);

    let name = document.createElement("p");
    name.innerText = `${team.name}`;

    let button = document.createElement("button");
    button.setAttribute("id", `${team.id}`);
    button.innerText = "Add Pokemon";
    button.addEventListener("click", addPokemon)

    let ul = document.createElement("ul");
    ul.setAttribute("id", `${team.name}`)

    team.pokemons.forEach(pokemon =>
        {
            let li = document.createElement("li");
            li.innerText = `${pokemon.nickname} (${pokemon.species})`;

            let button = document.createElement("button");
            button.setAttribute("class", "release");
            button.setAttribute("data-pokemon-id", `${pokemon.id}`);
            button.innerText = "Release"
            button.addEventListener("click", deletePokemon)
            li.append(button);
            ul.append(li);
        })


    card.append(name, button, ul);
    teamContainer.append(card);
}

const renderPokemon = (trainer) =>
{
            let ul = [...document.querySelectorAll("button")].find(e => e.id === `${trainer.trainer_id}`).nextSibling
            let li = document.createElement("li");

            let button = document.createElement("button");
            button.setAttribute("class", "release");
            button.setAttribute("data-pokemon-id", `${trainer.id}`);
            button.innerText = "Release"
            button.addEventListener("click", deletePokemon)
            li.innerText = `${trainer.nickname} (${trainer.species})`;
            li.appendChild(button);
            ul.append(li);
}


// add new poke

const addPokemon = (event) =>
{
    console.log(event)
    fetch(POKEMONS_URL, 
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ 
            trainer_id: event.target.id
        })
    })
    .then(response => { return response.json()})
    .then(data => renderPokemon(data))
}

// delete pokemon
const deletePokemon =  (event) => {
    console.log(event.target.parentNode);
    console.log(event.target.dataset.pokemonId);
    fetch(`http://localhost:3000/pokemons/${event.target.dataset.pokemonId}`,
        {
            method: "DELETE",
        })
        .then(response => response.json())
        .then(data=> { return data})
       console.log(data)
}