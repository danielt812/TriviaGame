$(document).ready(function() {
//FUNCTION GLOSSARY
//================================================================
//--main()-->
//--clearDivs()-->
//--genQuestion()-->
//--timer-->
//--countdown-->
//--showCorrectAnswer-->
//--score-->
//================================================================
//GLOBAL VARIABLES
//================================================================
//Keeps track of question
var currentQuestion;
//These variables will be used for score at end
var correctAnswer;
var incorrectAnswer;
//Variables for timer
var seconds;
var time;
//Lets us know if question was answered or not
var answered;
//Stores what answer user choose
var userAnswer;
//====================================================================
//OBJECTS
//====================================================================
var messages = {
    correct: "Your answer is correct!",
    incorrect: "Your answer is incorrect!",
    endTime: "You are out of time!",
    finished: "Valar Morghulis!"
}
var trivia = 
[
    {
        //0
        question: "What is the name ofArya's sword?",
        answerList: ["Needle.", "Oathkeeper.", "Light Bringer.", "Ice."],
        answer: 0,
        image: "aryaNeedle.gif",
    },
    {
        //1
        question: "When Jaime is captured, he loses one of his most prized possesions. What is it?",
        answerList: ["His ring.", "His sword.", "His hand.", "His Eyes."],
        answer: 2,
        image: "jaimeHand.gif",
    },
    {
        //2
        question: "Oberyn volunteers to a trial by combat forTyrion.Who is his combatant?",
        answerList: ["Sandor Clegane.", "Gregor Clegane.", "Ilyn Payne.", "Tywin Lannister."],
        answer: 1,
        image: "oberynTheMountain.gif",
    },
    {
        //3
        question: "Bran has the special ability to enter the minds of animals.What is this ability called?",
        answerList: ["Warging.", "Green Sight.", "Shift Shaping.", "Far Sight."],
        answer: 0,
        image: "branWarg.gif",
    },
    {
        //4
        question: "What doesKhalDrogo give to Vicerys after threateningDaenerys?",
        answerList: ["The Dothraki Horde.", "Westeros.", "A golden crown.", "The Iron Throne."],
        answer: 2,
        image: "viscerysDeath.gif",
    },
    {
        //5
        question: "How wasNedStark executed after discoveringJoffrey's ancestry?",
        answerList: ["Hanging.", "Flaying", "Poisoned.", "Beheading."],
        answer: 3,
        image: "nedDeath.gif",
    },
    {
        //6
        question: "What diety do the natives of theIronIslands worship?",
        answerList: ["Drowned God.", "R'hllor.", "Old Gods.", "Light of the Seven."],
        answer: 0,
        image: "theonDrownedGod.gif",
    },
    {
        //7
        question: "AtJoffrey's andMargery's wedding,Joffrey was killed with what?",
        answerList: ["A dagger.", "An arrow.", "Poison.", "Fire."],
        answer: 2,
        image: "joffreyDeath.gif",
    },
    {
        //8
        question: "At the battle ofBlackwaterBay, how did theLannisters defeatStannis' larger army?",
        answerList: ["Wildfire.", "Tywin's reinforcements.", "Fortified walls.", "All of the above."],
        answer: 3,
        image: "blackwaterWildfire.gif",
    },
    {
        //9
        question: "What happened afterDaenerys enteredKhalDrogo's pyre?",
        answerList: ["Her skin burnt.", "Dragons hatched.", "She died.", "Khal Drogo was resurrected."],
        answer: 1,
        image: "daenerysDragon.gif",
    },
    {
        //10
        question: "JonSnow kills a white walker with what kind of weapon?",
        answerList: ["Dragon glass dagger.", "Valyrian steel sword.", "A catapult.", "Dragon glass arrow."],
        answer: 1,
        image: "jonSnow.gif",
    },
    {
        //11
        question: "DuringCercei's walk of atonement. What does theSepta repeatedly chant?",
        answerList: ["Shame.", "Sinner.", "Guilty.", "Dishonor."],
        answer: 0,
        image: "cerseiWalk.gif",
    },
    {
        //12
        question: "What is the name of the disease thatJorahMormon contracts?",
        answerList: ["Stone Skin.", "Stone Curse.", "Grey Scale.", "Grey Sickness."],
        answer: 2,
        image: "jorahGreyScale.gif",
    },
    {
        //13
        question: "The night is dark and full of...",
        answerList: ["Horrors.", "Nightmares.", "Curses.", "Terrors."],
        answer: 3,
        image: "melisandreNight.gif",
    },
    {
        //14
        question: "Who doesTyrion kill before fleeing to essos?",
        answerList: ["Tywin.", "Pycelle.", "Ilyn Payne.", "Cersei."],
        answer: 0,
        image: "tyrionTywin.gif",
    }
]
//================================================================
//FUNCTIONS
//================================================================
function main()
{
    //Create start button
    var startButton = $("<div>");
    startButton.addClass("startButton");
    startButton.text("START");
    $("#question").append(startButton);
    $(startButton).on("click", function(){
        $(".startButton").remove();
        clearDivs();
    })
}

function clearDivs()
{
    $("#currentQuestion").empty();
    $("#question").empty();
    $("#answers").empty();
    $("#correctAnswer").empty();
    //Reset Score counters
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    genQuestion();
}

function genQuestion()
{
    //Empty divs
    $("#message").empty();
    $("#correctAnswer").empty();
    $("#picture").empty();
    answered = true;
    //
    timer();
    $("#currentQuestion").text("Question #" + (currentQuestion+1));
    $("#question").text(trivia[currentQuestion].question);
    for(var i = 0; i < trivia[currentQuestion].answerList.length; i++)
    {
        var answerChoices = $('<div>');
        answerChoices.text(trivia[currentQuestion].answerList[i]);
        answerChoices.attr({'data-index': i});
        answerChoices.addClass("choices");
        $("#answers").append(answerChoices);
    }
    //Store value for user selection
    $(".choices").on("click", function()
    {
        userAnswer = $(this).data("index");
        clearInterval(time);
        showCorrectAnswer();
    })



}

function timer()
{
    seconds = 20;
    $("#timer").text("Time Remaining: " + seconds);
    answered = true;
    time = setInterval(countdown, 1000);
}

function countdown()
{
    seconds--;
    $("#timer").text("Time Remaining: " + seconds);
    if(seconds < 1)
    {
        clearInterval(time);
        //Set answered to false so game knows question not answered.
        answered = false;
        showCorrectAnswer();
    }
}

function showCorrectAnswer()
{
    $("#currentQuestion").empty();
    $(".choices").empty();
    $("#question").empty();
    var correctAnswerText = trivia[currentQuestion].answerList[trivia[currentQuestion].answer]
    var correctAnswerIndex = trivia[currentQuestion].answer;
    var correctAnswerGif = trivia[currentQuestion].image;
    if((userAnswer == correctAnswerIndex) && (answered == true))
    {
        $("#message").text(messages.correct);
        correctAnswer++;
        $("#picture").append('<img id="gif" src="assets/images/' + correctAnswerGif + '"/>');

    }
    else if((userAnswer != correctAnswerIndex) && (answered == true))
    {
        $("#message").text(messages.incorrect);
        $("#correctAnswer").text("Correct Answer: " + correctAnswerText)
        incorrectAnswer++;
        $("#picture").append('<img id="gif" src="assets/images/' + correctAnswerGif + '"/>');
    }
    else
    {
        $("#message").text(messages.endTime);
        $("#correctAnswer").text("The correct answer was: " + correctAnswerText)
        incorrectAnswer++
        $("#picture").append('<img id="gif" src="assets/images/' + correctAnswerGif + '"/>');
    }

    if(currentQuestion == (trivia.length-1))
    {
        setTimeout(score, 5000)
    }
    else
    {
        currentQuestion++;
        setTimeout(genQuestion,5000)
    }    
}

function score()
{
    $("#timer").empty();
    $("#message").empty();
    $("#correctAnswer").empty();
    $("#picture").empty();
    $("#endMessage").text(messages.finished)
    $("#correctAnswers").text("You answered: " + correctAnswer + " questions correctly.");
    $("#incorrectAnswers").text("You answered: " + incorrectAnswer + " questions incorrectly.");
    var resetButton = $("<div>");
    resetButton.addClass("resetButton");
    resetButton.text("Try Again?");
    $("#tryAgain").append(resetButton);
    $(resetButton).on("click", function(){
        window.location.reload();
    })
}
//=======================================================
//Initiate Game
//=======================================================
main();
});