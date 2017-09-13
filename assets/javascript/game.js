var wins = 0
var possGuesses = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
	"q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var hangmanGuess = [];
var gems = ["rosequartz", "pearl", "amethyst", "ruby", "sapphire", "peridot", "bismuth", "aquamarine", 
	"jasper", "lapis", "garnet", "opal", "sugilite", "alexandrite", "sardonyx", "smokyquartz", 
	"malachite", "fluorite", "rhodonite", "carnelian", "bluediamond", "yellowdiamond", "padparadscha",
	"topaz", "rainbowquartz", "zircon", "rutile", "squaridot", "bluepearl", "yellowpearl"]
var currentGem 
var guessesLeft = 7;
var guessTried = []; 
var audio = document.createElement("AUDIO");

document.onkeyup = function(event) {

	if (guessesLeft === 0) {
		alert("Please press 'next' to get a new word!");
		guessesLeft++;
		wins--;
	}

    var yourChoice = event.key;
    yourChoice = yourChoice.toLowerCase()

	if (possGuesses.includes(yourChoice) === false) {
    	alert("That's not a letter, silly!");
    }

    guessArray(yourChoice);
    compare(yourChoice);
    win();
    render();
}

// start/reset and next buttons to get gems and begin the game, reset wins.
window.onload = function() {
 	document.getElementById("start-reset").onclick = function(event) {
		getNewGem();
		wins = 0;
		render();
		document.getElementById("gempic").setAttribute("class", "crystalgem");
		document.getElementById("start-reset").innerHTML = ("RESET");
	}

	document.getElementById("next").onclick = function(event) {
		getNewGem();
		render();
		document.getElementById("gempic").classList.remove("crystalseen");
		document.getElementById("gempic").setAttribute("class", "crystalgem");
	}
};

function render() {
	if (guesses !== 0) {
		document.getElementById("wins").innerHTML = wins;
		document.getElementById("guesses").innerHTML = hangmanGuess.join(' ');
		document.getElementById("guessLeft").innerHTML = guessesLeft;
		document.getElementById("humanGuess").innerHTML = guessTried.join(' ');
	}
}

// pushes the user's guess to a visible array on the page
function guessArray(val1) {
	if (guessTried.includes(val1) === true) {
		alert("You've already guessed that one!");
	}

	else if (possGuesses.includes(val1) === true) {
		guessTried.push(val1);
	}
}

// function to compare guess with what's in the array
function compare(val1) {	
	for (i = 0; i < currentGem.length; i++) {

		if (currentGem.charAt(i) === val1) {
				hangmanGuess.splice(i, 1, val1);  
		}

		else {
			console.log("not this letter");
		}
	}

	if (currentGem.includes(val1, 0) === false && possGuesses.includes(val1, 0) === true) {
			guessesLeft--;
		}
}

// determins win or loss
function win() {
	if (hangmanGuess.includes("_") === false) {
		console.log("You win!");
		wins++;
		document.getElementById("gempic").setAttribute("class", "crystalseen");
		playAudio();
	}

	else if (guessesLeft === 0) {		
		console.log("You lose!");
		hangmanGuess = [];
		hangmanGuess.push(currentGem);
		document.getElementById("gempic").setAttribute("class", "crystalseen");
	}
}

function getNewGem() {
	if (gems.length < 1) {
		alert("The end! Thanks for playing! Refresh the page to play again.")
	}

	else {
		guessesLeft = 7
		hangmanGuess = [];
		guessTried = [];
		currentGem = gems[Math.floor(Math.random() * gems.length)];
		gems.splice(gems.indexOf(currentGem), 1);
		document.getElementById("gempic").src = "assets/images/" + currentGem + ".png";
		for (i = 0; i < currentGem.length; i++) {
			hangmanGuess.push("_");
		}
	}
	console.log(currentGem);
}

function playAudio() {
	if (audio.canPlayType("audio/mpeg")) {
		audio.setAttribute("src", "assets/audio/" + currentGem + ".mp3");
		audio.play();
	}

	else {
		alert("Your browser won't let you hear the awesome music playing now!");
	}
}