var gamePattern = [];
var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;

var started = false;

$(document).keydown(function () {
  if (!started) {

   gamePattern = [];
   userClickedPattern = [];
    level = 0;
    nextSequence();
    started = true; 
  }
});

$(".btn").click(function () {
   if (!started) return;
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);

  level++;
  $("h1").text("Level " + level);
}

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  var button = $("#" + currentColour);
  button.addClass("pressed");

  setTimeout(function () {
    button.removeClass("pressed");
  }, 100);
}

function checkAnswer(currentId) {
 
  if(userClickedPattern[currentId] === gamePattern[currentId]) {
    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      },1000);
    }
  }
  else {
    gameOver();
  }
}

function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
      $("body").removeClass("game-over");
  },200);
  $("h1").text("Game Over");

  setTimeout(function() {
      $("h1").text("Press A Key to Start");
  },2000);

   started = false;
}
