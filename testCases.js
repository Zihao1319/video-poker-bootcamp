let royalFlush = [
  {
    name: "10",
    color: "red",
    suit: "hearts",
    rank: 3,
    status: "idle",
  },
  {
    name: "J",
    color: "red",
    suit: "diamonds",
    rank: 3,
    status: "idle",
  },
  {
    name: "Q",
    color: "red",
    suit: "hearts",
    rank: 3,
    status: "idle",
  },

  {
    name: "K",
    color: "red",
    suit: "hearts",
    rank: 1,
    status: "idle",
  },
  {
    name: "A",
    color: "red",
    suit: "hearts",
    rank: 2,
    status: "idle",
  },
];

// function to get all the necessary details
function getArrayInfo(array) {
  console.log(array);

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

  console.log(suitArray);
  console.log(rankArray);

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

  console.log(min);
  console.log(max);
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

let tempArray = getArrayInfo(royalFlush);
console.log(tempArray);
checkWin(tempArray);
