// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')
const zlib = require("zlib");
let totalAttempts = 8;
let userGuesses = [];
console.log("H A N G M A N\n");
console.log("Type \"play\" to play the game, \"results\" to show the scoreboard, and \"exit\" to quit:");
let win = 0;
let lose = 0;
let userChoice = input();
while (userChoice !== "exit") {
    switch (userChoice) {
        case "play":
            const wordlist = ["python", "java", "swift", "javascript"];
            const random = Math.floor(Math.random() * wordlist.length);
            const word = wordlist[random];
            const dash = "-";
            let display_string = dash.repeat(word.length);
            console.log(display_string);
            let userLetter;

            while (totalAttempts > 0) {
                console.log("Input a letter: ");
                userLetter = input();
                if (userLetter.length === 1 && (userLetter.match(/[a-z]/g))) {
                    if (!userGuesses.includes(userLetter)) {
                        if (word.includes(userLetter)) {
                            userGuesses.push(userLetter);
                            //if (display_string.includes(userLetter)) {
                            //totalAttempts--;
                            //   console.log("You've already guessed this letter.\n");
                            //  console.log(display_string);
                            //}
                            //userGuesses.push(userLetter);
                            let indexOfLetter = word.indexOf(userLetter);
                            while (indexOfLetter !== -1) {
                                display_string = display_string.substring(0, indexOfLetter) + userLetter + display_string.substring(indexOfLetter + 1);
                                indexOfLetter = word.indexOf(userLetter, indexOfLetter + 1);
                            }
                            if (display_string.includes("-")) {
                                console.log("\n" + display_string);
                            }
                        } else {
                            totalAttempts--;
                            console.log("That letter doesn't appear in the word.\n");
                            console.log(display_string);
                            userGuesses.push(userLetter);
                        }
                    } else {
                        console.log("You've already guessed this letter.\n");
                        console.log(display_string);
                    }
                    if (display_string.includes("-") === false) {
                        break;
                    }
                } else {
                    if ((userLetter.match(/[A-Z 0-9,*+-]/g))) {
                        console.log("Please, enter a lowercase letter from the English alphabet\n");
                    } else {
                        console.log("Please, input a single letter.\n");
                    }
                    console.log(display_string);
                }
                //console.log("You have " + totalAttempts + " attempts left.");
            }
            if (totalAttempts === 0) {
                console.log("You lost!\n");
                lose++;
            } else {
                console.log(`\nYou guessed the word ${word}!\nYou survived!`);
                win++;
                totalAttempts = 8;
            }
            userGuesses = [];
            console.log("Type \"play\" to play the game, \"results\" to show the scoreboard, and \"exit\" to quit:");
            userChoice = input();
            break;
        case "results":
            console.log(`You won: ${win} times.\nYou lost: ${lose} times.\n`);
            console.log("Type \"play\" to play the game, \"results\" to show the scoreboard, and \"exit\" to quit:");
            userChoice = input();
            break;
        default:
            console.log("Type \"play\" to play the game, \"results\" to show the scoreboard, and \"exit\" to quit:");
            userChoice = input();
            break

    }

}

