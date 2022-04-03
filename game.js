var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var levelNumber = 0;

function playSound(name) {
  var clickSound = new Audio('sounds/' + name + '.mp3');
  clickSound.play();
}

function animatePress(button) {
  $("#" + button).addClass('pressed');
  setTimeout(function() {
    $("#" + button).removeClass('pressed')
  }, 100);
}

function nextSequence() {
  $("#level-title").text("Level " + levelNumber);
  levelNumber++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  animatePress(randomChosenColor);
  playSound(randomChosenColor);
  userClickedPattern = [];
}

$(".btn").click(function(event) {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length);
});

$(document).one("keypress", function() {
  nextSequence()
});

function startOver(){
  gamePattern = [];
  userClickedPattern = [];
  levelNumber = 0;
  nextSequence();
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel - 1] === gamePattern[currentLevel - 1]){
      if (currentLevel === gamePattern.length){
        setTimeout(function(){nextSequence()}, 1000);
      }
    } else {
        var wrongSound = new Audio('sounds/wrong.mp3');
        setTimeout(function(){wrongSound.play()}, 500);
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over")}, 200);
        $("#level-title").text("Game Over! Press Any Key to Restart");
        $(document).one("keypress", function() {
          startOver()
        });
    }
}
