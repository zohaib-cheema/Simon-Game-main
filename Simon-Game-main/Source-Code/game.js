var buttonColors = ["red","blue","green","yellow"];
var gamePattern = []; //added through nextSequence
var userClickedPattern = []; //added through click


var started = false;
var level = 0;

$(document).keydown(function(){
    if(started==false){ 
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    }
});

function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.round(Math.random()*3);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound("sounds/" + randomChosenColor + ".mp3");

}

$(".btn").click(function(){
    var userChosenColour = this.id;  
    userClickedPattern.push(userChosenColour);
    playSound("sounds/" + userChosenColour + ".mp3");
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio(name);
    audio.play();
}

function animatePress(currentColor){
    $("." + currentColor).addClass("pressed"); 
    setTimeout(function(){
        $("." + currentColor).removeClass("pressed");
    },100);
}

function gameOver(){
$("body").addClass("game-over");
setTimeout(function(){$("body").removeClass("game-over")},200);
}


function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length == gamePattern.length){
        setTimeout(nextSequence,1000);
        userClickedPattern = []; 
    }
} 
else{  
 gameOver();
 $("#level-title").text("Game Over, Press Any Key to Restart");
 startOver();
}
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}