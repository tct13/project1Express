$(document).ready(function () {

// Global variables to control the game flow, remember the players' allocated cards
// and an points array for computing points to determine win/lose/draw
var playerTurn = 1;
var numberOfCardsGiven = 0;
var cardsGivenPerPlayer = 0;
var totalNumberOfCardsPerGame = 7;

var player1Cards = [];
var player2Cards = [];

var cardStack = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                  13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
                  26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
                  39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51
                ];

var cardPoints = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,
                  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,
                  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,
                  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10
                ];


// Event listeners for the 3 buttons
$("#resetButton").on("click", reset);
$("#hitButton").on("click", cardToBoardAndPlayer);
$("#standButton").on("click", switchPlayerOrEnd);

// To mark the start of the game through the alert
alert("It is player 1's turn. Pls click on the hit button.");



// To check the winning function at the end of the game
function checkWin() {

  var player1Points = 0;
  var player2Points = 0;
  var player1GotAce = 0;
  var player2GotAce = 0;


  $(".boxA").show();


// Below for testing outlier cases only - backjack and double aces
  // player1Cards = [0, 48];
  // console.log("hhhhhhhh " + player1Cards);
  // player2Cards = [4, 18, 0, 39];
  // console.log("hhhhhhhh " + player2Cards);


  player1Points = calculateBasePoints(player1Cards);
  player2Points = calculateBasePoints(player2Cards);

  player1GotAce = gotAce(player1Cards);
  player2GotAce = gotAce(player2Cards);

  player1Points = calculateAcePoints(player1Points, player1GotAce, player1Cards);
  player2Points = calculateAcePoints(player2Points, player2GotAce, player2Cards);


  // Show winning messages
  if (player1Points > 21 && player2Points <= 21) {
    alert("Player 1 has exceeded 21 points. Player 2 won with " + player2Points + ".")
  }

  else if (player2Points > 21 && player1Points <= 21) {
    alert("Player 2 has exceeded 21 points. Player 1 won with " + player1Points + ".")
  }

  else if (player1Points > 21 && player2Points > 21) {
    alert("Both players have exceeded 21 points.")
  }

  else if (player1Points == player2Points) {
    alert("Draw. Both players have the same points of " + player1Points + ".")
  }

  else if (player1Points > player2Points) {
    alert("Player 1 won. Player 1 has " + player1Points + ", Player 2 has " + player2Points + ".")
  }

  else if (player1Points < player2Points) {
    alert("Player 2 won. Player 1 has " + player1Points + ", Player 2 has " + player2Points + ".")
  }

  alert("Pls reload game by clicking the reset button.");
  console.log("Player 1 final final card points: " + player1Points);
  console.log("Player 2 final final card points: " + player2Points);
  $("#hitButton").off();
}


// Calculate the base points for both players
function calculateBasePoints(playerCardsArray) {
  var onePoints = 0;
  var playerPoints = 0;

  for (var i=0; i<playerCardsArray.length; i++) {
    // console.log(playerCardsArray.length);
    console.log("Player X card :" + playerCardsArray[i]);
    onePoints = cardPoints[ playerCardsArray[i] ];
    console.log("Player X card points: " + onePoints);
    playerPoints = playerPoints + onePoints;
    console.log("Player X total card points: " + playerPoints);
  }
  return playerPoints;

// for (var i=0; i<player1Cards.length; i++) {
//   var onePoints = 0;
//   // console.log(player1Cards.length);
//   console.log("Player 1 card :" + player1Cards[i]);
//   onePoints = cardPoints[ player1Cards[i] ];
//   console.log("Player 1 card points: " + onePoints);
//   player1Points += onePoints;
//   console.log("Player 1 total card points: " + player1Points);
// }
//
// for (var j=0; j<player2Cards.length; j++) {
//   var twoPoints = 0;
//   // console.log(player2Cards.length);
//   console.log("Player 2 card :" + player2Cards[j]);
//   twoPoints = cardPoints[ player2Cards[j] ];
//   console.log("Player 2 card points: " + twoPoints);
//   player2Points += twoPoints;
//   console.log("Player 2 total card points: " + player2Points);
// }
}

// // Determine the number of ace(s) for each player
function gotAce(playerCardsArray) {
    var playerGotAce = 0;
    playerCardsArray.forEach(
      function(num) {
        if (num == 0 || num == 13 || num == 26 || num == 39) {
          playerGotAce++;
        }
      }
    );
    // console.log("Player " + playerTurn + " number of aces (playerGotAce): "+ playerGotAce);
    // console.log(typeof(playerGotAce));
    return playerGotAce;

//   player1GotAce = player1Cards.filter(
//     function(num) {
//       if (num == 0) { player1GotAce++ }
//       if (num == 13) { player1GotAce++ }
//       if (num == 26) { player1GotAce++ }
//       if (num == 39) { player1GotAce++ }
//       console.log("Player 1 number of aces: "+ player1GotAce)
//     }
//   )
//
//   player2GotAce = player2Cards.filter(
//     function(num) {
//       if (num == 0) { player2GotAce++ }
//       if (num == 13) { player2GotAce++ }
//       if (num == 26) { player2GotAce++ }
//       if (num == 39) { player2GotAce++ }
//       console.log("Player 2 Number of aces: "+ player2GotAce)
//     }
//   )
}


// Deal with points relating to aces that each player has
function calculateAcePoints (playerPoints, playerGotAce, playerCards) {

    var tempPlayerPoints = 0;

    // Deal with player having 4, 2 or 1  aces
    if (playerGotAce == 4 || playerGotAce <= 2) {
        tempPlayerPoints = playerPoints;
        if (playerPoints <= 21 ) {
            tempPlayerPoints = tempPlayerPoints + 9;
            console.log("Player temp points: " + tempPlayerPoints);
            if (tempPlayerPoints <= 21) {
              playerPoints = tempPlayerPoints;
            }
        }
        console.log("Player final points: " + playerPoints);
        tempPlayerPoints = 0;
    }

      // Deal with player having 3 aces
      if (playerGotAce == 3) {
          tempPlayerPoints = playerPoints;

          if (playerPoints >= 4 ) {
              tempPlayerPoints = tempPlayerPoints + 9;
              console.log("Player 1 temp points: " + tempPlayerPoints);
              if (tempPlayerPoints <= 21 ) {
                playerPoints = tempPlayerPoints;
              }
          }

          if (playerPoints <= 3 ) {
              tempPlayerPoints = tempPlayerPoints + 18;
              console.log("Player temp points: " + tempPlayerPoints);
              if (tempPlayerPoints <= 21 ) {
                playerPoints = tempPlayerPoints;
              }
          }

          tempPlayerPoints = 0;
      }

      // Deal with player 1 having 2 aces
      if (playerGotAce == 2) {
        if ( cardPoints[ playerCards[0] ] == 1 && cardPoints[ playerCards[1] ] == 1 ) {
           console.log("Outlier case. BlackJack! Double Aces.")
           alert("BlackJack! Double Aces.");
           playerPoints = playerPoints + 10;
         }
       }

       // Deal with player having an aces and 10/J/Q/K
       if (playerGotAce == 1) {
         if ( cardPoints[ playerCards[0] ] == 1 || cardPoints[ playerCards[1] ] == 1 ) {
            if ( cardPoints[ playerCards[0] ] == 10 || cardPoints[ playerCards[1] ] == 10 ) {
                console.log("Outlier case. BlackJack! One ace and 10/J/Q/K.")
                alert("BlackJack! One ace and 10/J/Q/K.");
                playerPoints = playerPoints + 1;
            }
          }
        }

       return playerPoints;
// var tempPlayer1Points = 0;
// var tempPlayer2Points = 0;
//
//   // Deal with player 1 having 4, 2 or 1  aces
//   if (player1GotAce == 4 || player1GotAce <= 2) {
//       tempPlayer1Points = player1Points;
//       if (player1Points <= 21 ) {
//           tempPlayer1Points = tempPlayer1Points + 9;
//           console.log("Player 1 temp points: " + tempPlayer1Points);
//           if (tempPlayer1Points <= 21) {
//             player1Points = tempPlayer1Points;
//           }
//       }
//       console.log("Player 1 final points: " + player1Points);
//       tempPlayer1Points = 0;
//   }
//
//   // Deal with player 2 having 4, 2 or 1 aces
//   if (player2GotAce == 4 || player2GotAce <= 2) {
//       tempPlayer2Points = player2Points;
//       if (player2Points <= 21 ) {
//           tempPlayer2Points = tempPlayer2Points + 9;
//           console.log("Player 2 temp points: " + tempPlayer2Points);
//           if (tempPlayer2Points <= 21) {
//             player2Points = tempPlayer2Points;
//           }
//       }
//       console.log("Player 2 final points: " + player2Points);
//       tempPlayer2Points = 0;
//   }
//
//   // Deal with player 1 having 3 aces
//   if (player1GotAce == 3) {
//       tempPlayer1Points = player1Points;
//
//       if (player1Points >= 4 ) {
//           tempPlayer1Points = tempPlayer1Points + 9;
//           console.log("Player 1 temp points: " + tempPlayer1Points);
//           if (tempPlayer1Points <= 21 ) {
//             player1Points = tempPlayer1Points;
//           }
//       }
//
//       if (player1Points <= 3 ) {
//           tempPlayer1Points = tempPlayer1Points + 18;
//           console.log("Player 1 temp points: " + tempPlayer1Points);
//           if (tempPlayer1Points <= 21 ) {
//             player1Points = tempPlayer1Points;
//           }
//       }
//
//       tempPlayer1Points = 0;
//   }
//
//   // Deal with player 2 having 3 aces
//   if (player2GotAce == 3) {
//       tempPlayer2Points = player2Points;
//
//       if (player2Points >= 4 ) {
//           tempPlayer2Points = tempPlayer2Points + 9;
//           console.log("Player 2 temp points: " + tempPlayer2Points);
//           if (tempPlayer2Points <= 21 ) {
//             player2Points = tempPlayer2Points;
//           }
//       }
//
//       if (player2Points <= 3 ) {
//           tempPlayer2Points = tempPlayer2Points + 18;
//           console.log("Player 2 temp points: " + tempPlayer2Points);
//           if (tempPlayer2Points <= 21 ) {
//             player2Points = tempPlayer2Points;
//           }
//       }
//
//       tempPlayer2Points = 0;
//   }
//
//   // Deal with player 1 having 2 aces
//   if (player1GotAce == 2) {
//       console.log("Outlier special cases. BlackJack! Double Aces.")
//       alert("BlackJack! Double Aces.");
//       player1Points = player1Points + 10;
//   }

}


// To restart by reloading the webpage
function reset() {
  location.reload();
}



// To switch from player 1 to 2 or mark the end of the game when all players stand
function switchPlayerOrEnd() {
  alert("You have reached the end of 7 cards or you have chosen to stand.");

  if (cardsGivenPerPlayer >= 2) {

    if (playerTurn == 1) {
      playerTurn = 2;
      $(".boxA").hide();
    }
    else {
      playerTurn = 0;
    }

    console.log("Current player is: " + playerTurn);

    if (playerTurn == 2) {
      alert("It is player 2's turn. Pls pass the terminal.");
      numberOfCardsGiven = totalNumberOfCardsPerGame;
      cardsGivenPerPlayer = 0;
      setTimeout( cardToBoardAndPlayer, 2000 );
    }
    else if (playerTurn == 0) {
      alert("Game has ended. Checking Winner.");
      checkWin();
    }
  }
  else{
      alert("Player " + playerTurn + " has not chosen 2 or more cards");
  }

}


// To display the generated card to the board and remember the cards generated for each player
function cardToBoardAndPlayer() {

  var continueOrStop = checkAllBoxesFilled(cardsGivenPerPlayer);
  if (continueOrStop == false) {

    console.log("Continue");

    var printCard = checkDuplicateCard();
    console.log('this is printCard: ' + printCard)

    if (playerTurn == 1) {
      player1Cards.push(printCard);
    }

    else if (playerTurn == 2) {
      player2Cards.push(printCard);
    }

    console.log("Player 1 cards are: " + player1Cards);
    console.log("Player 2 cards are: " + player2Cards);

    var cardLink = "css/" + [printCard] + ".jpg"
    console.log(cardLink);
    $("#box" + [numberOfCardsGiven] ).css( "background-image", "url( \" " + cardLink + " \" )" );

    // var boxLinkToBeAdded = document.querySelector("#box" + numberOfCardsGiven);
    // console.log(boxLinkToBeAdded);
    // boxLinkToBeAdded.style.backgroundImage = "url( \" cardLink \" )";  THIS IS NOT CORRECT


    // var currentBox = "#box" + [numberOfCardsGiven];
    // console.log(currentBox);
    numberOfCardsGiven ++;

    cardsGivenPerPlayer ++;
    console.log("Number of cards given for Player " + playerTurn + ": " + cardsGivenPerPlayer);

  }
  else {
    switchPlayerOrEnd();
  }
}



// To check if all 7 boxes has been filled and if yes, mark the end of game
function checkAllBoxesFilled(num) {
  var filledOrNot = (num == 7) ? true : false;
    return filledOrNot;
  }



// To check if card has been allocated or duplicated
function checkDuplicateCard() {
  var cardNumber = generateCard();
  console.log('this is currCardNumber: ' + cardNumber);


// Test duplicate card already allocated as the game progress and call checkDuplicateCard() again to re
  if (cardNumber !== cardStack[cardNumber] ) {
    console.log( "Card test loop if (ie. duplicate) " + cardStack[cardNumber] );

    // use return to solve the reversion/multi-threading issue (where this function will run to the end and return the duplicate card number)
    return checkDuplicateCard();
  }
  else {
    // console.log( "Card test loop else " + cardStack[cardNumber] );
    cardStack[cardNumber] = "X" ;
    // console.log( "Card test loop else " + cardStack[cardNumber] );
    console.log(cardStack);
  }
  console.log("CardNumber before final return: " + cardNumber);

  // technically can solve the reversion/multi-threading issue by putting the return within else above
  return cardNumber;
}



// To generate random cards
function generateCard() {
  var card = Math.round( Math.random() * (51 - 0) + 0 );
  console.log(card);
  return card;
}


});
