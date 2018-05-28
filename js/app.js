// Array that holds the cards.
const listOfCards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf",
    "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];
// Holds the size of the cards array.
const deckSize = listOfCards.length;
// New open cards list.
const openCardsList = [];
// Initialize the moveCounter and matchCounter and set them to 0.
let moveCounter = 0;
let matchCounter = 0;
// Doms to get elements of multiple classes.
const deck = document.querySelectorAll('.card');
let restartButton = document.querySelector('.restart');
let playAgainButton = document.querySelector('.restart-button');
const starsList = document.getElementsByClassName('fa fa-star');
let popup = document.querySelector('.win-modal');
let timer = document.querySelector('.timer');
let moves = document.querySelector('.moves');
// Initialize timer variables.
let timerStart = false;
let minutes = 0;
let seconds = 0;
let hours = 0;

// Function that loops through each card and each deck element's first child's class name to the name of the suffled cards element.
function setupCards() {
  let shuffledCards = shuffle(listOfCards);
  for(let i = 0; i < deckSize; i++) {
    deck[i].firstElementChild.className = shuffledCards[i];
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Function that determines the star rating depending on the number of moves. It also sets the color of the moves number depneding on the number of moves.
function starRating() {
  if(moveCounter <= 25) {
    starsList[0].style.display = 'inline-block';
    starsList[1].style.display = 'inline-block';
    starsList[2].style.display = 'inline-block';
    moves.style.color = "green";
  }
  else if(moveCounter > 25 && moveCounter <=65) {
    starsList[0].style.display = 'inline-block';
    starsList[1].style.display = 'inline-block';
    starsList[2].style.display = 'none';
    moves.style.color = "orange";
  }
  else if(moveCounter > 65) {
    starsList[0].style.display = 'inline-block';
    starsList[1].style.display = 'none';
    starsList[2].style.display = 'none';
    moves.style.color = "red";
  }
}

// Function that changes the card to show and disables it so that you cannot click it.
function displayCard(card) {
  card.className = "card open show disable";
}

// Function that adds the card that was selected to the open card list.
function addCardToList(card) {
  openCardsList.push(card);
}

// Function that performans actions if two cards match. If the two cards match, remove them from the open cards list followed by renaming the class name of the first element child to
// "card match disable". Also increase the matchCounter and return it.
function match(openCardsList) {
  let cardTwo = openCardsList.pop();
  let cardOne = openCardsList.pop();

  for(let i = 0; i < deckSize; i++) {
    if(deck[i].firstElementChild.className === cardOne) {
      deck[i].className = "card match disable";
    }
    else if (deck[i].firstElementChild.className === cardTwo) {
      deck[i].className = "card match disable";
    }
  }

  return matchCounter++;
}

// Function that performs actions if the two cards don't match. If the two cards do not match, remove them from the open cards list
// followed by looping through the deck array and flipping the card back. It also enables the card so that it can be clicked. The contents inside the function
// is also wrapped around a setTimeout method so that the cards don't instantly flip back over.
function noMatch(openCardsList) {
  setTimeout(function() {
    let cardTwo = openCardsList.pop();
    let cardOne = openCardsList.pop();


    for(let i = 0; i < deckSize; i++) {
      if(cardOne == deck[i].firstElementChild.className) {
        if(deck[i].className == "card open show disable") {
          deck[i].className = "card enable";
        }
      }
      else if(cardTwo == deck[i].firstElementChild.className) {
        if(deck[i].className == "card open show disable") {
          deck[i].className = "card enable";
        }
      }
    }
  },200);
}

// Function that updates the moves text content to the value of the moveCounter.
function updateMoveCounter(moveNumber) {
  moves.textContent = moveCounter;
}

// Function that starts the game when the page is loaded. By shuffling the deck, setting up the deck, and starting the match.
function initializeGame() {
  setupCards();
  playMatchingGame();
}

// Function that performs actions for playing the game. It performs match checking logic when a card is clicked and determines the win condition.
function playMatchingGame() {
  for(let i = 0; i < deckSize; i++) {
      deck[i].addEventListener('click',function () {
        if(timerStart == false) {
          timerStart = true;
          startTimer();
        }

        displayCard(deck[i]);
        addCardToList(deck[i].firstElementChild.className);

        if(openCardsList.length == 2) {
          if(openCardsList[0] === openCardsList[1]) {
            match(openCardsList);
          }
          else if(openCardsList[0] !== openCardsList[1]) {
            noMatch(openCardsList);
          }
          moveCounter++;
          updateMoveCounter(moveCounter);
          starRating();

          if(matchCounter == 8) {
            timerStart = false;
            displayWin();
          }
        }
      });
  }

  playAgainButton.addEventListener('click',function() {
    resetGame();
    popup.style.display = "none";
  });

  restartButton.addEventListener('click',function() {
    resetGame();
  });
}

// Function that displays the win popup modal. It displays the timer duration and star rating as well as a play again button.
function displayWin() {
  let close = document.querySelector('.close');
  let timerDuration = document.querySelector('.timer-duration');
  let starRate = document.querySelector('.star-rating');

  popup.style.display = "inline";
  timerDuration.textContent = "The time it took is: " + timer.textContent;
  if(moveCounter <= 25) {
    starRate.textContent = "Your star rating is: 3";
  }
  else if(moveCounter > 25 && moveCounter <= 65) {
    starRate.textContent = "Your star rating is: 2";
  }
  else if(moveCounter > 65) {
    starRate.textContent = "Your star rating is: 1";
  }

  close.addEventListener('click',function() {
    popup.style.display = "none";
  });
}

// Function that resets the game. Sets the counters and timer to 0 as well as sets the stars to visible.
// Also flips the cards over and shuffles the deck. Resets the colro of the timer and moves to green.
function resetGame() {
  moveCounter = 0;
  matchCounter = 0;

  moves.style.color = "green";

  timerStart = false;
  minutes = 0;
  seconds = 0;
  hours = 0;

  timer.textContent = hours + ":" + minutes + ":" + seconds;
  timer.style.color = "green";

  starsList[0].style.display = 'inline-block';
  starsList[1].style.display = 'inline-block';
  starsList[2].style.display = 'inline-block';

  updateMoveCounter(moveCounter);

  for(let i = 0; i < deckSize; i++) {
    deck[i].className = "card enable";
  }

  setupCards();
}

// Function that starts the timer and counts up every second with using the setTimeout method.
// Also the timer changes color depending on how long the minutes have passed.
function startTimer() {
  if(timerStart == true) {
    seconds++;

    if(seconds == 60) {
      minutes++;
      seconds = 0;
    }
    if(minutes == 60) {
      hours++;
      minutes = 0;
    }

    if(minutes >= 1 && minutes < 2) {
      timer.style.color = "orange";
    }
    else if(minutes >= 2) {
      timer.style.color = "red";
    }
    else {
      timer.style.color = "green";
    }

    timer.textContent = hours + ":" + minutes + ":" + seconds;

    setTimeout(startTimer,1000);
  }
}

initializeGame();
