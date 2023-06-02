
var answerKey = [];
var userKey = [];
var level = 1;
var started = false;
var hard = true;

if ($("h3").text() === "Easy"){
    hard = false; // checks which mode was selected
}

// USE A FALSE AND TRUE VARIABLE TO TELL THE CODE WHEN IT CAN RUN
$(document).on("keypress", function () {
    if (!started) {
        gameBegin();
        started = true;
    }
});

//initiates the game by calling addToPattern()
function gameBegin() {
    userKey = [];
    $("h1").text("Level " + level);
    addToPattern(answerKey);
    console.log(answerKey);
}

// Adds a new button to the pattern and calls displayPattern()
function addToPattern(answerKey) {
    var ranum = Math.random() * 4;
    var ranNum = Math.floor(ranum) + 1;
    answerKey.push(ranNum);
    if (hard){
    displayPattern(answerKey);
    }
    else{
        displayPatternEasy(answerKey);
    }
    level++;
}

// Displays the animation for the pattern added.
async function displayPattern(answerKey) {
    var i = answerKey.length - 1;
    buttonPress(answerKey[i].toString());
}

// Executes the animation called
function buttonPress(ranNum) {
    $("." + ranNum).addClass("pressed");
    playSound("" + ranNum + "");
    setTimeout(function () {
        $("." + ranNum).removeClass("pressed");
    }, 100);
}

// Detects user button clicks
$(".btn").click(function (event) {
    var click = event.currentTarget.classList[2];
    userKey.push(click); // adds click to the array of user inputs
    buttonPress(click);
    console.log(userKey);
    checkKey(userKey.length - 1);   // calls checkKey passing the user input array index as parameter
});

const timer = ms => new Promise(res => setTimeout(res, ms))

async function checkKey(levelCurrent) {
    if (userKey[levelCurrent].toString() === answerKey[levelCurrent].toString()) { //checks to see if the most recent input matches the same in the answer key 
        console.log("correct " + levelCurrent);
        if (userKey.length === answerKey.length) { // if length matches then all inputs have been done, so await next level
            await timer(1000);
            gameBegin();
        }
    }
    else {
        console.log("no");
        playSound("5");
        displayGameOver();
        //  Display You Lost
    }
}

async function displayGameOver() { // Display game over and reset variables
    $("body").css("background-color", "red");
    await timer(200);
    $("body").css("background-color", "#011F3F");
    $("h1").text("Game Over! Press any Key to Restart D: ");
    started = false;
    level = 1;
    answerKey = [];
    userKey = [];
}

// Plays the Sound *admittedly there was a more efficient way to do this*
function playSound(number) {
    switch (number) {
        case "1":
            var green = new Audio("./sounds/green.mp3");
            green.play();
            break;
        case "2":
            var red = new Audio("./sounds/red.mp3");
            red.play();
            break;
        case "3":
            var yellow = new Audio("./sounds/yellow.mp3");
            yellow.play();
            break;
        case "4":
            var blue = new Audio("./sounds/blue.mp3");
            blue.play();
            break;
        case "5":
            var wrong = new Audio("./sounds/wrong.mp3");
            wrong.play();
        default:
            console.log(number);
    }
}


// CODE THAT DISPLAYS THE LOOP OF THE ARRAY THAT YOU DID BECAUSE YOU ARE SO COOL

async function displayPatternEasy(answerKey){
    console.log(answerKey);
    for (var i = 0; i < answerKey.length; i++){
        buttonPress(answerKey[i].toString());
        await timer(200);
    }
}