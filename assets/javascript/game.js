  var myArray = ['bourbon', 'whiskey', 'gin', 'vermouth', 'rum', 'tequila', 'vodka', 'brandy', 'cognac', 'cordial', 'absinthe', 'liqueur', 'mescal', 'scotch', 'sherry', 'margarita', 'martini', 'sour', 'daiquiri', 'manhattan', 'mojito', 'cosmopolitan', 'sangria', 'mimosa', 'paloma', 'bellini'];
  var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];   
  var gameImages = []; 
  var wins = 0;
  var losses = 0;  
  var userGuess = document.getElementById("guesses");
  var guessesLeft = document.getElementById("guessesLeft"); 

  userGuess.textContent = "No guesses yet!";

  var gameStarted = false;
  var nextWord = false;

  window.addEventListener("keyup", randomWord);
  

  function randomWord() {

    if (gameStarted === false || nextWord === true) {

      nextWord = false;

      // PULLING FROM THE ARRAY OF WORDS
      // --------------------------------------------   
  
      // generate a random number between 0 and length of the array
      var rand = Math.floor(Math.random() * myArray.length);
  
      // the random number will be used as the index in the array of words
      var selectedWord = myArray[rand];

    // DISPLAYING BLANK SPACES ON THE PAGE
    // --------------------------------------------   

    // store the length of the selected word
    var wordLength = selectedWord.length;

    // create an array of placeholders for the selected word's characters
    var spaces = [];

    // TESTING - this will display the selected string from the array on the page
    // document.getElementById("demo").innerHTML = (selectedWord);

    // Creating blank spaces for the selected word
    for(var i = 0; i < wordLength; i++) {

      spaces.push("_ ");
    }

    // join into a string separated by spaces
    var lettersRight = spaces.join(" ");

    // show the underscores on the page within the #lettersRight <p>
    document.getElementById("lettersRight").innerHTML = lettersRight; 

    gameStarted = true;

    // start with 10 guesses left
    var guessesCounter = 10;
  
    // create an array to store all of the user's guesses
    var allguesses = [];

    // show number of guesses left on the page
    guessesLeft.textContent = guessesCounter;

    // tell user to start guessing letters
    userGuess.textContent = "Start guessing!";

    } // close if statment


    if (gameStarted == true) {

      //   once game is started then key presses will count as guesses
      window.addEventListener("keyup", startGuessing);

      // we do not want to generate a new word yet
      nextWord = false;
    }

// WHEN THE USER GUESSES A LETTER
// --------------------------------------------   
// --------------------------------------------   

  function startGuessing() {
    
    // only store and check user guesses if the user has guesses remaining and has not already guessed all the letters
    if (guessesCounter > 0 && spaces.indexOf("_ ") > -1) {

      // take the character typed in by user, change to lowercase, and store in variable
      var guess = String.fromCharCode(event.keyCode).toLowerCase();

      // if the user has not already guessed the letter and if it is in the alphabet
      if (allguesses.indexOf(guess) === -1 && alphabet.indexOf(guess) >= 0) {

        // decrease number of guesses left by 1
        guessesCounter--;

        // show number of guesses left on the page
        guessesLeft.textContent = guessesCounter;

        // upload the guess to the array
        allguesses.push(guess);

        // joins the elements of an array into a string separated by spaces
        var showguesses = allguesses.join(" ");

        // show the guesses on the page within the #guesses <span>
        guesses.textContent = showguesses;
      }

      // check all characters of the selected word to see if the user guess matches
      for (var i = 0; i < selectedWord.length; i++) {

        if (guess === selectedWord[i]) {

          // array.splice(index, howmany, item1, ... itemX)
          // splice will replace the values in the array of spaces with letters guessed correctly
          spaces.splice(i, 1, guess);

          // joins the elements of an array into a string separated by spacees
          var lettersRight = spaces.join(" ");

          // update the word displayed with the right letters that user guessed
          document.getElementById("lettersRight").innerHTML = lettersRight;


        } // close the inner if statement
      } // close the for loop

    //  if they guess all of the letters right then they win
    if (spaces.indexOf("_ ") === -1) {

      wins++; 

      // show wins on the page
      document.getElementById("wins").innerHTML = (wins);

      // tell user they win
      userGuess.textContent = "You win! Press a key for a new word";

      // we now want to generate a new word
      nextWord = true;
    }

    // if they run out of guesses and word still does not match, they lose
    else if (guessesCounter <= 0 && spaces.indexOf("_ ") > -1) {
      
      losses--;

      // show number of losses on the page
      document.getElementById("losses").innerHTML = (losses);

      // tell user they lose
      userGuess.textContent = "You lose! Press a key for a new word";

      // we now want to generate a new word
      nextWord = true;
    }

    }  // close the outer if statement

    // if user keeps trying to guess then tell them they have no guesses remaining
    else if (guessesCounter < 0) {
      nextWord = true;
    }
    

  }; // close the startGuessing function
}; // closes randomWord function


