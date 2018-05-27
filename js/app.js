/*
 * Create a list that holds all of your cards
 */
const listOfCards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-anchor", "fa fa-leaf",
    "fa fa-bicycle", "fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb", "fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];
const deckSize = listOfCards.length;
const openCardsList = [];
let moveCounter = 0, matchCounter = 0;
const deck = document.querySelectorAll('.card');
let restartButton = document.querySelector('.restart');
let playAgainButton = document.querySelector('.restart_button');
const starsList = document.getElementsByClassName('fa fa-star');
let popup = document.querySelector('.win_modal');
let timer = document.querySelector('.timer');
let moves = document.querySelector('.moves');
let timerStart = false;
let minutes = 0;
let seconds = 0;
let hours = 0;


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// loops through each card and each deck element's first child's class name to the name of the suffled cards element.
function setupCards() {
  let shuffledCards = shuffle(listOfCards);
  for(let i = 0; i < deckSize; i++)
  {
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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function starRating() {
  if(moveCounter <= 25)
  {
    starsList[0].style.display = 'inline-block';
    starsList[1].style.display = 'inline-block';;
    starsList[2].style.display = 'inline-block';
    moves.style.color = "green";
  }
  else if(moveCounter > 25 && moveCounter <=65)
  {
    starsList[0].style.display = 'inline-block';
    starsList[1].style.display = 'inline-block';
    starsList[2].style.display = 'none';
    moves.style.color = "orange";
  }
  else if(moveCounter > 65)
  {
    starsList[0].style.display = 'inline-block';
    starsList[1].style.display = 'none';
    starsList[2].style.display = 'none';
    moves.style.color = "red";
  }
}

// changes the card to show and disables it.
function displayCard(card) {
    card.className = "card open show disable";
}

// adds the card that was selected to the open card list.
function addCardToList(card) {
  openCardsList.push(card);
  console.log(openCardsList);
}

// If the two cards match, remove them from the open cards list followed by renaming the class name of the first element child to
// "card match disable". Also increase the matchCounter.
function match(openCardsList) {
  let cardTwo = openCardsList.pop();
  let cardOne = openCardsList.pop();

  for(let i = 0; i < deckSize; i++)
  {
    if(deck[i].firstElementChild.className === cardOne)
    {
      deck[i].className = "card match disable";
    }
    else if (deck[i].firstElementChild.className === cardTwo)
    {
      deck[i].className = "card match disable";
    }
  }

  return matchCounter++;
}

function noMatch(openCardsList) {
  setTimeout(function() {
    let cardTwo = openCardsList.pop();
    let cardOne = openCardsList.pop();


    for(let i = 0; i < deckSize; i++)
    {
      if(cardOne == deck[i].firstElementChild.className)
      {
        console.log("CardL");
        console.log(cardOne);
        console.log(deck[i].firstElementChild.className);
        if(deck[i].className == "card open show disable")
        {
          deck[i].className = "card enable";
        }
      }
      else if(cardTwo == deck[i].firstElementChild.className)
      {
        console.log("CardTi");
        console.log(cardTwo);
        console.log(deck[i].firstElementChild.className);
        if(deck[i].className == "card open show disable")
        {
          deck[i].className = "card enable";
        }
      }
    }
  },200);
}

function updateMoveCounter(moveNumber) {
  moves.textContent = moveCounter;
}

function initializeGame() {
  setupCards();
  playMatchingGame();
}

function playMatchingGame() {
  for(let i = 0; i < deckSize; i++)
  {
      deck[i].addEventListener('click',function () {
        if(timerStart == false)
        {
          timerStart = true;
          startTimer();
        }

        displayCard(deck[i]);
        addCardToList(deck[i].firstElementChild.className);

        if(openCardsList.length == 2)
        {
          console.log("Test");

          if(openCardsList[0] === openCardsList[1])
          {
            console.log("Test111");
            match(openCardsList);
          }
          else if(openCardsList[0] !== openCardsList[1])
          {
            console.log("im");
            noMatch(openCardsList);
          }
          moveCounter++;
          console.log(moveCounter);
          updateMoveCounter(moveCounter);
          starRating();

          if(matchCounter == 8)
          {
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

function displayWin() {
  let close = document.querySelector('.close');
  let timerDuration = document.querySelector('.timer_duration');
  let starRate = document.querySelector('.star_rating');

  popup.style.display = "inline";
  timerDuration.textContent = "The time it took is: " + timer.textContent;
  if(moveCounter <= 25)
  {
    starRate.textContent = "Your star rating is: 3";
  }
  else if(moveCounter > 25 && moveCounter <=65)
  {
    starRate.textContent = "Your star rating is: 2";
  }
  else if(moveCounter > 65)
  {
    starRate.textContent = "Your star rating is: 1";
  }

  close.addEventListener('click',function() {
    popup.style.display = "none";
  });

}

// Resets the game. Sets the counters and timer to 0 as well as sets the stars to visible. Also flips the cards over and shuffles the deck.
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

  for(let i = 0; i < deckSize; i++)
  {
    deck[i].className = "card enable";
  }

  setupCards();
}

// Starts the timer and counts upn every second with using the setTimeout. Also the timer changes color depending on how long the minutes have passed.
function startTimer() {
  if(timerStart == true)
  {
    seconds++;

    if(seconds == 60)
    {
      minutes++;
      seconds = 0;
    }
    if(minutes == 60)
    {
      hours++;
      minutes = 0;
    }

    if(minutes >= 1 && minutes < 2)
    {
      timer.style.color = "orange";
    }
    else if(minutes >= 2)
    {
      timer.style.color = "red";
    }
    else
    {
      timer.style.color = "green";
    }

    timer.textContent = hours + ":" + minutes + ":" + seconds;

    setTimeout(startTimer,1000);
  }
}

initializeGame();
