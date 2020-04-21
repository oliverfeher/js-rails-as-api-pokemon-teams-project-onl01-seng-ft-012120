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
            console.log(data)
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
    button.setAttribute("data-trainer-id", `${team.id}`);
    button.innerText = "Add Pokemon";

    let ul = document.createElement("ul");

    team.pokemons.forEach(pokemon =>
        {
            let li = document.createElement("li");
            li.innerText = `${pokemon.nickname} (${pokemon.species})`;

            let button = document.createElement("button");
            button.setAttribute("class", "release");
            button.setAttribute("data-pokemon-id", `${pokemon.id}`);
            button.innerText = "Release"
            ul.append(li, button);
        })


    card.append(name, button, ul);
    teamContainer.append(card);
}

// const renderPokemons = (pokemon) =>
// {
//             let li = document.createElement("li");
//             li.innerText = `${pokemon.nickname} (${pokemon.species})`;
//             ul.append(li);
// }