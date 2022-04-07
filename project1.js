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

      // setting holding status
      let holdingStatus;

      if (currentSuit === "diamonds") {
        displaySymbol = "&#9830";
        cardColor = "red";
      } else if (currentSuit === "hearts") {
        displaySymbol = "&#9829";
        cardColor = "red";
      } else if (currentSuit === "clubs") {
        displaySymbol = "&#9827";
        cardColor = "black";
      } else if (currentSuit === "spades") {
        displaySymbol = "&#9824";
        cardColor = "black";
      }

      holdingStatus = "idle";

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        symbol: displaySymbol,
        color: cardColor,
        suit: currentSuit,
        rank: rankCounter,
        status: holdingStatus,
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

    // when clicked, it will change the css setting as well as put a note on the array
    cardElement.addEventListener("click", () => {
      // change the css setting of the container
      console.log(`cardContainer${i + 1}`);
      let container = document.getElementById(`cardContainer${i + 1}`);

      if (container.classList.contains("selected")) {
        cardState = "unselected";
        container.classList.remove("selected");

        // becomes idle status
        array[i].status = "idle";
        console.log(array[i]);
      } else {
        cardState = "selected";
        container.classList.add("selected");

        // becomes held status
        array[i].status = "held";
        console.log(array[i]);
      }
    });
  }
  console.log(array);
}

// function to swap cards
function swapCard(array) {
  for (let i = 0; i < array.length; i++) {
    // emptying existing content
    let container = document.getElementById(`cardContainer${i + 1}`);
    container.innerHTML = "";
    container.classList.remove("selected");

    // redisplaying the new cards if status is held
    if (array[i].status === "held") {
      //replace card
      array[i] = deck.pop();
    }
    console.log(array);
  }
  displayCards(array);
}

// function to assess the scores (calculatehand)
function calcHandScore(array) {
  let score = 0;
  for (let i = 0; i < array.length; i++) {
    score += array[i].rank;
  }
  console.log(`HandArray score: ${score}`);
  return score;
}

// function to get all the necessary details

function getArrayInfo(array) {
  console.log(array);
  // finding the total cards with same suit
  let sameSuitCount = 0;
  let suitArray = [];

  for (let i = 0; i < array.length; i++) {
    suitArray.push(array[i].suit);
  }

  console.log(suitArray);

  for (let i = 0; i < suitArray.length; i++) {
    if (suitArray[i] == suitArray[i + 1]) {
      sameSuitCount += 1;
    }
    console.log(sameSuitCount);
  }

  // finding the total cards with same rank count and the unique count of card's rank
  let sameRankCount = 0;
  let uniqueRankCount = 0;

  for (let i = 0; i < array.length; i++) {
    let rankArray = [];
    rankArray.push(array[i].rank);

    if (rankArray[i] == rankArray[i + 1]) {
      sameRankCount += 1;
    } else {
      uniqueRankCount += 1;
    }
  }

  // finding the total rank sum of every cards
  let totalRankCount = 0;
  for (let i = 0; i < array.length; i++) {
    let totalRank = [];
    totalRank.push(array[i].rank);
    totalRankCount += totalRank[i];
  }

  // finding out the summation of difference between each card
  let rankDiffSum = 0;
  let rankArray = [];
  let sortedRankArray = [];

  for (let i = 0; i < array.length; i++) {
    rankArray.push(array[i].rank);
  }

  sortedRankArray = rankArray.sort(function (a, b) {
    return a - b;
  });

  for (let i = 0; i < sortedRankArray.length; i++) {
    rankDiffSum += sortedRankArray[i + 1] - sortedRankArray[i];
  }

  let arrayInfo = {
    sameSuit: sameSuitCount,
    sameRank: sameRankCount,
    uniqueRank: uniqueRankCount,
    totalRank: totalRankCount,
    rankDiffSum: rankDiffSum,
  };

  console.log(arrayInfo);
  return arrayInfo;
}

//changes the color and text of button when cards are clicked
const btn = document.getElementById("button");

btn.addEventListener("click", () => {
  swapCard(handArray);
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

let array = getHandArray(deck, 5);
displayCards(array);
calcHandScore(array);

getArrayInfo(array);
