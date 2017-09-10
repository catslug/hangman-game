var wins = 0
var possGuesses = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
	"q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var hangmanGuess = [];
var gems = ["rosequartz", "pearl", "amethyst", "ruby", "sapphire", "peridot", "bismuth", "aquamarine", 
	"jasper", "lapis", "garnet", "opal", "sugilite", "alexandrite", "sardonyx", "smokyquartz", 
	"malachite", "fluorite", "rhodonite", "carnelian"]
var currentGem 
var guessesLeft = 5;
var guessTried = []; 

document.onkeyup = function(event) {

	if (guessesLeft === 0) {
		alert("Please press 'next' to get a new word!");
		guessesLeft++;
		wins--;
	}

    var yourChoice = event.key;
    yourChoice = yourChoice.toLowerCase()
    console.log(yourChoice);

	if (possGuesses.includes(yourChoice) === false) {
    	alert("That's not a letter, silly!");
    }

    guessArray(yourChoice);

    compare(yourChoice);

    win();

    render();
}

window.onload = function() {
 	document.getElementById("start-reset").onclick = function(event) {
		console.log("I get here");
		getNewGem();
		wins = 0;
		render();
		document.getElementById("gempic").setAttribute("class", "crystalgem");
		document.getElementById("start-reset").innerHTML = ("RESET");
	}

	document.getElementById("next").onclick = function(event) {
		document.getElementById("gempic").classList.remove("crystalseen");
		document.getElementById("gempic").setAttribute("class", "crystalgem");
		getNewGem();
		render();
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

function guessArray(val1) {
	if (guessTried.includes(val1) === true) {
		alert("You've already guessed that one!");
		guessesLeft++;
	}

	else if (possGuesses.includes(val1) === true) {
		guessTried.push(val1);
	}
}

// function to compare guess with what's in the array, need to think this more
function compare(val1) {	
	for (i = 0; i < currentGem.length; i++) {

		if (currentGem.charAt(i) === val1) {
				console.log(currentGem.indexOf(val1));
				console.log("guessed right!");
				hangmanGuess.splice(i, 1, val1);  
				console.log(hangmanGuess);
		}

		else {
			console.log("not this letter");
		}
	}

	if (currentGem.includes(val1, 0) === false) {
			guessesLeft--;
		}
}

// win condition works, loss condition does not.
function win() {
	if (hangmanGuess.includes("_") === false) {
		console.log("You win!");
		wins++;
		document.getElementById("gempic").setAttribute("class", "crystalseen");
	}

	else if (guessesLeft === 0) {		
		console.log("You lose!");
		hangmanGuess = [];
		hangmanGuess.push(currentGem);
		document.getElementById("gempic").setAttribute("class", "crystalseen");
	}

	else {
		console.log(currentGem);
		console.log(hangmanGuess);
	}
}

function getNewGem() {
	guessesLeft = 5
	hangmanGuess = [];
	guessTried = [];
	currentGem = gems[Math.floor(Math.random() * gems.length)];
	console.log(currentGem.length);
	document.getElementById("gempic").src = "assets/images/" + currentGem + ".png";
	for (i = 0; i < currentGem.length; i++) {
		hangmanGuess.push("_");
	}

	console.log(hangmanGuess.length);
	console.log(currentGem);
}