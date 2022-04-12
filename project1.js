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
let cardSelectedCounter = 0;
let cardState;
let credit = 100;
let canStart = "false"
let canDraw = "false"

// DESIGNS

//changes the color and text of button when cards are clicked
const btn = document.getElementById("button");
// btn.addEventListener("click", () => {
//   if (btn.value === "Deal") {
//     btn.value = "Draw";
//     btn.classList.add("red");
//   } else {
//     swapCard(array);
//     btn.value = "Deal";
//     btn.classList.remove("red");
//   }
// });

//play again display

//credit display


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

//making a full deck
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

// draw backside
function drawCard2(currentCard) {
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


// function to get cards on hand
function getHandArray(array, num) {
  for (let i = 0; i < num; i++) {
    handArray[i] = array.pop();
  }
  // console.log(handArray);
  return handArray;
}

// displaying cards on hand
function displayCards(array) {
  for (let i = 0; i < array.length; i++) {

    let container = document.getElementById(`cardContainer${i + 1}`)
    if (canStart == "false") {

      let backDesign = document.createElement("IMG");
      backDesign.setAttribute(
      "src",
      "http://chetart.com/blog/wp-content/uploads/2012/05/playing-card-back.jpg"
    );
      backDesign.setAttribute("width", "200px");
      backDesign.setAttribute("height", "250px");
      backDesign.setAttribute("margin", "30px");
      backDesign.setAttribute("padding", "30px");
      backDesign.setAttribute("alt", "Some really cool pic");
      document.getElementById(`cardContainer${i + 1}`).appendChild(backDesign);

    } if (canStart == "true") {
    
    container.innerHTML = ""
    let cardElement = drawCard(array[i]);
    let heldMessage = document.createElement("p");
    heldMessage.style.margin = "0px";
    heldMessage.style.marginBottom = "10px";

    document.getElementById(`cardContainer${i + 1}`).appendChild(cardElement);
    document.getElementById(`cardContainer${i + 1}`).appendChild(heldMessage);

    // when clicked, it will change the css setting as well as put a note on the array
    cardElement.addEventListener("click", () => {
      // change the css setting of the container
      console.log(`cardContainer${i + 1}`);

      // let container = document.getElementById(`cardContainer${i + 1}`);

      if (container.classList.contains("selected")) {
        cardState = "unselected";
        container.classList.remove("selected");
        heldMessage.innerHTML = "";
        cardSelectedCounter -= 1;

        // becomes idle status
        array[i].status = "idle";
        // console.log(array[i]);
      } else {
        cardState = "selected";
        container.classList.add("selected");
        heldMessage.innerHTML = "Held";

        // display "held" message when clicked
        cardSelectedCounter += 1;

        // becomes held status
        array[i].status = "held";
        // console.log(array[i]);
      }

      // changes the deal/draw button when more than 1 card is highlighted
      if (cardSelectedCounter >= 1) {
        btn.value = "Draw";
        btn.classList.add("red");
      } else {
        btn.value = "Deal";
        btn.classList.remove("red");
      }
    });
    }
  }
  console.log("counter: " + cardSelectedCounter);
  // console.log(array);
  // console.log(cardState)
}


// function to swap cards if clicked
function swapCard(array, deck) {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    // emptying existing content
    let container = document.getElementById(`cardContainer${i + 1}`);
    container.innerHTML = "";
    container.classList.remove("selected");

    // redisplaying the new cards if status is held
    if (array[i].status !== "held") {
      //replace card
      array[i] = deck.pop();
    }
    newArray = array;
  }
  console.log(newArray);
  displayCards(newArray);
  let newArrayInfo = getArrayInfo(newArray);
  checkWin(newArrayInfo);

  return newArray;
}


// function to get all the necessary details
function getArrayInfo(array) {
  // console.log(array);

  // finding the total cards with same suit
  let uniqueSuitCount = 0;
  let uniqueRankCount = 0;
  let totalRankCount = 0;
  let rankDiffSum = 0;
  let suitArray = [];
  let rankArray = [];
  let sortedRankArray = [];
  let suitArrayTally = {};
  let rankArrayTally = {};

  for (let i = 0; i < array.length; i++) {
    suitArray.push(array[i].suit);
    rankArray.push(array[i].rank);
  }

  // console.log(suitArray);
  // console.log(rankArray);

  // finding similar and unique suit counts
  for (let i = 0; i < array.length; i++) {
    if (suitArray[i] in suitArrayTally) {
      suitArrayTally[suitArray[i]] += 1;
    } else {
      suitArrayTally[suitArray[i]] = 1;
      uniqueSuitCount += 1;
    }
  }

  // finding the total rank sum of every cards
  // finding the total cards with same rank count and the unique count of card's rank
  for (let i = 0; i < array.length; i++) {
    totalRankCount += rankArray[i];
    if (rankArray[i] in rankArrayTally) {
      rankArrayTally[rankArray[i]] += 1;
    } else {
      rankArrayTally[rankArray[i]] = 1;
      uniqueRankCount += 1;
    }
  }

  // finding out the summation of difference between each card

  // sortedRankArray = rankArray.sort(function (a, b) {
  //   return a - b;
  // });

  // console.log(sortedRankArray);
  min = rankArray[0];
  max = rankArray[0];
  for (let i = 0; i < rankArray.length; i++) {
    if (min > rankArray[i]) {
      min = rankArray[i];
    }
    if (max < rankArray[i]) {
      max = rankArray[i];
    }
  }

  // console.log(min);
  // console.log(max);
  rankDiffSum = max - min;

  let arrayInfo = {
    suitTally: suitArrayTally,
    rankTally: rankArrayTally,
    uniqueRank: uniqueRankCount,
    uniqueSuit: uniqueSuitCount,
    totalRank: totalRankCount,
    rankDiffSum: rankDiffSum,
  };

  console.log(arrayInfo);
  return arrayInfo;
}

// checking winning conditions
function checkWin(array) {
  let uniqueSuitCount = array.uniqueSuit;
  let uniqueRankCount = array.uniqueRank;
  let rankTally = array.rankTally;
  let totalRank = array.totalRank;
  let rankDiffSum = array.rankDiffSum;

  let maxNum = getMax(rankTally);

  if (uniqueSuitCount == 1) {
    // royal flush, straight flush, and flush falls here
    if (rankTally.hasOwnProperty("1")) {
      // only for A (labeled as 1)

      if (totalRank == 47) {
        // royal flush
        console.log("royal flush");
      } else if (totalRank == 15) {
        // straight flush with ace
        console.log("straight flush with ace");
      }
    } else if (rankDiffSum == 4) {
      // straight flush without ace
      console.log("straight flush without ace");
    } else {
      console.log("flush");
    }
  } else if (uniqueSuitCount !== 1) {
    if (uniqueRankCount == 2) {
      // 4 of a kind, full house

      if (maxNum == 4) {
        // 4 of a kind,
        console.log("4 of a kind");
      } else if (maxNum == 3) {
        // full house
        console.log("full house");
      }
    } else if (uniqueRankCount == 3) {
      // 3 of a kind, 2 pairs

      if (maxNum == 3) {
        // 3 of a kind
        console.log("3 of a kind");
      } else if (maxNum == 2) {
        // 2 pairs
        console.log("2 pairs");
      }
    } else if (uniqueRankCount == 4) {
      // 1 pair only
      if (maxNum == 2) {
        console.log("1 pair only");
      }
    } else if (uniqueRankCount == 5) {
      // only straight

      if (rankTally.hasOwnProperty("1")) {
        // only for A (labeled as 1)

        if (totalRank == 47 || totalRank == 15) {
          // straight
          console.log("straight");
        }
      } else if (rankDiffSum == 4) {
        // straight without ace
        console.log("straight without ace");
      }
    }
  } else {
    console.log("none of the above");
  }
}

// get the highest number in an array
function getMax(array) {
  let tempArray = [];
  for (let i in array) {
    tempArray.push(array[i]);
  }
  let sortedArray = tempArray.sort((a, b) => b - a);
  let count = 1;
  return sortedArray[0];
}

// game initialization
const initGame = () => {

  let deck = shuffleCards(makeDeck());
  let array = getHandArray(deck, 5);

  if (canStart == "false") {
    displayCards (array)
    canStart = "true"
    console.log(canStart)

  } if (canStart == "true") { 
    btn.addEventListener("click", () => {
      console.log("passed")
      displayCards (array)
      btn.value = "Deal"
      canDraw = "true"

      if (canDraw == "true") {
        console.log("can draw now")
        let newArray = swapCard (array, deck)
        let newArrayInfo = getArrayInfo(newArray)
        checkWin(newArrayInfo)
      }  

    });
    } 
  }  

initGame();

// const deck = shuffleCards(makeDeck());
// let array = getHandArray(deck, 5);
// displayCards(array);
// calcHandScore(array);
// console.log(cardSelectedCounter);

// let tempArray = getArrayInfo(array);
// // console.log(tempArray);
// checkWin(tempArray);

// displayBackside(5);


// game logic

//1. all cards are flipped, showing backside only
//1.1 Button is deal, click and all cards will be displayed
//2.1 Select the cards you want to hold
//2.2 button will change to draw
//2.3 Click and it will become deal again
//2.4 cards will be redisplayed
//2.5 showing the message and
//2.6 credit either will be added or subtracted
//3. Click deal, and cards



// ARCHIVED CODES
// min = sortedRankArray[0];
// max = sortedRankArray[0];
// for (let i = 0; i < sortedRankArray.length; i++) {
//   if (min > sortedRankArray[i]) {
//     min = sortedRankArray[i];
//   }
//   if (max < sortedRankArray[i]) {
//     max = sortedRankArray[i];
//   }
// }
// console.log(min);
// console.log(max);
// rankDiffSum = max - min;



// // displaying the back side of card
// function displayBackside(num) {
//   for (let i = 0; i < num; i++) {
//     let backDesign = document.createElement("IMG");
//     backDesign.setAttribute(
//       "src",
//       "http://chetart.com/blog/wp-content/uploads/2012/05/playing-card-back.jpg"
//     );
//     backDesign.setAttribute("width", "200px");
//     backDesign.setAttribute("height", "250px");
//     backDesign.setAttribute("margin", "30px");
//     backDesign.setAttribute("padding", "30px");
//     backDesign.setAttribute("alt", "Some really cool pic");
//     document.getElementById(`cardContainer${i + 1}`).appendChild(backDesign);
//     // console.log("passed");
//   }
// }

// // function to assess the scores (calculatehand)
// function calcHandScore(array) {
//   let score = 0;
//   for (let i = 0; i < array.length; i++) {
//     score += array[i].rank;
//   }
//   console.log(`HandArray score: ${score}`);
//   return score;
// }