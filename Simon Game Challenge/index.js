var gameStarted = false;
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["green", "red", "yellow", "blue"];
var level = 0;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  userClickedPattern = [];
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(this);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $(currentColour).addClass("pressed");
  setTimeout(function() {
    $(currentColour).removeClass("pressed");
  }, 100);
}

$(document).keydown(function() {
  if (!gameStarted) {
    $("h1").text("Level 0");
    nextSequence();
    gameStarted = true;
  }
});

function gameOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}
  else {
    var gameOverSound = new Audio("sounds/wrong.mp3");
    gameOverSound.play();
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    gameOver();
  }
}
