/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data

    for (const game of games){
        var new_element = document.createElement("div");
        new_element.classList.add("game-card")
        new_element.innerHTML = `
            <h3> ${game["name"]}</h3>
            <p> ${game["description"]} </p>
            <img src=${game["img"]} class="game-card">`
        gamesContainer.append(new_element);

    }

        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

const total_contributors = GAMES_JSON.reduce((acc, game) => {
    return acc + game["backers"];
}, 0);



// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = total_contributors.toLocaleString();


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const total_raised = GAMES_JSON.reduce((acc, game) => {
    return acc + game["pledged"];
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${total_raised.toLocaleString()}`;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const total_num_games = GAMES_JSON.reduce((acc, game) => {
    return acc + 1;
}, 0);

gamesCard.innerHTML = total_num_games.toLocaleString();


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    let shitty_games = GAMES_JSON.filter((game) => {
        return game["pledged"] < game["goal"];
    });



    // use filter() to get a list of games that have not yet met their goal


    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(shitty_games);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    let good_games = GAMES_JSON.filter((game) => {
        return game["goal"] < game["pledged"];
    });

    // use filter() to get a list of games that have met or exceeded their goal

    addGamesToPage(good_games);
    // use the function we previously created to add unfunded games to the DOM

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}


function showSomeGames(value) {
    deleteChildElements(gamesContainer)

    let applicable_games = GAMES_JSON.filter((game) => {
        let title = game["name"].toLowerCase()
        return title.includes(value.toLowerCase())
    })

    addGamesToPage(applicable_games);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let num_unfunded_games = GAMES_JSON.filter((game) => {
    return game["pledged"] < game["goal"]
}).length;



// create a string that explains the number of unfunded games using the ternary operator
const display_string = `A total of ${total_raised.toLocaleString()} has been raised for ${total_num_games} games. Currently, ${num_unfunded_games} game${num_unfunded_games > 2 ? "s remain unfunded" : " remains unfunded"}. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container

var new_ele = document.createElement("p");
new_ele.innerHTML = display_string;

descriptionContainer.append(new_ele);




/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

var firstGame;
var secondGame;
var others;

[firstGame, secondGame, ...others] = sortedGames;




// create a new element to hold the name of the top pledge game, then append it to the correct element
var firstElement = document.createElement("p");
firstElement.innerHTML = firstGame["name"];
firstGameContainer.append(firstElement);

// do the same for the runner up item

var secondElement = document.createElement("p");
secondElement.innerHTML = secondGame["name"];
secondGameContainer.append(secondElement);

// add a search bar 

const searchInput = document.querySelector("input")

searchInput.addEventListener("input", (e) =>{
    const value = e.target.value
    if (value === ""){
        showAllGames()
    }

    else{
        showSomeGames(value)
    }
})