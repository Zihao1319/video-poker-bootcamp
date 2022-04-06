// game design put here

// 1) At the beginning, all the cards are flipped backwards. Deal/draw button on bottom right
// 2) Once the player click on the deal button, the cards will be shown. The deal button will also change to draw button
// 3) The user can choose to hold the card by clicking the card, once clicked, it will become bigger and a held sign will be shown above, if the click again, it will revert to original and the held sign will be gone
// 4) When the user click the draw button, it will draw the remaining the cards that is not held, and display either winning or losing
// 5) at the same time, the points will either increase or decrease
// 5) at the same time, draw button changes to deal button again
// 6) User click the deal button and the game will restart again

//variables
let handArray = [];
let cardState = "unselected";

// Designs

// HELPER FUNCTIONS //

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === "1") {
        cardName = "A";
      } else if (cardName === "11") {
        cardName = "J";
      } else if (cardName === "12") {
        cardName = "Q";
      } else if (cardName === "13") {
        cardName = "K";
      }

      // Setting display symbol and color as metadata
      let displaySymbol;
      let cardColor;

      if (currentSuit === "diamonds") {
        displaySymbol = "&#9830";
        cardColor = "red";
      } else if (currentSuit === "hearts") {
        displaySymbol = "&#9830";
        cardColor = "red";
      } else if (currentSuit === "clubs") {
        displaySymbol = "&#9827";
        cardColor = "black";
      } else if (currentSuit === "spades") {
        displaySymbol = "&#9824";
        cardColor = "black";
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        symbol: displaySymbol,
        color: cardColor,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

//drawing cards
function drawCard(currentCard) {
  const suit = document.createElement("div");
  suit.classList.add("suit", currentCard.color);
  suit.innerHTML = currentCard.symbol;

  const name = document.createElement("div");
  name.classList.add("name", currentCard.color);
  name.innerHTML = currentCard.name;

  const card = document.createElement("div");
  card.classList.add("card");

  card.appendChild(name);
  card.appendChild(suit);

  return card;
}

const deck = shuffleCards(makeDeck());

// function to get cards on hand
function getHandArray(array, num) {
  for (let i = 0; i < num; i++) {
    handArray[i] = deck.pop();
  }
  console.log(handArray);
  return handArray;
}

// displaying cards on hand
function displayCards(array) {
  for (let i = 0; i < array.length; i++) {
    let cardElement = drawCard(array[i]);
    // console.log(cardElement);
    document.getElementById(`cardContainer${i + 1}`).appendChild(cardElement);
    cardElement.addEventListener ("click", () => {
      
      // change the css setting of the container
      console.log(cardState)
      console.log(`cardContainer${i + 1}`)

      let container = document.getElementById(`cardContainer${i + 1}`)
      if (cardState == "selected") {
        container.classList.add("selected")
        cardState = "unselected"

      } else if (cardState == "unselected") {
        container.classList.remove("selected")
        
      }

    })
  }
  console.log(array);
}

// function to assess the scores (calculatehand)
function calcHandScore(array) {
  let score = 0;
  for (let i = 0; i < array.length; i++) {
    score += array[i].rank;
  }
  console.log(score);
  return score;
}

//changes the color and text of button when cards are clicked
const btn = document.getElementById("button");

btn.addEventListener("click", () => {
  if (btn.value === "Deal") {
    btn.value = "Draw";
    btn.classList.add("red");
  } else {
    btn.value = "Deal";
    btn.classList.remove("red");
  }
});

// changes the size of card when clicked
const cardClick = document.getElementById("container");

// game logic

let array = getHandArray (deck, 5)
displayCards(array)
calcHandScore(array);
