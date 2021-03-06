let numbers = [];
let currentPlayer = 0;
let sPlayer = "player1";
let itemMarked;
let rolls_left = 3;
let bMarked = false;
let nTotal = 0;
let nTotalLow = 0;
let nSaved = 0;
let bGameOver = false;
let dices = document.querySelectorAll(".dice");
let player1 = document.querySelectorAll(".player1");
let player2 = document.querySelectorAll(".player2");
let $ones = document.querySelectorAll(".S1");
let $twos = document.querySelectorAll(".S2");
let $threes = document.querySelectorAll(".S3");
let $fours = document.querySelectorAll(".S4");
let $fives = document.querySelectorAll(".S5");
let $sixes = document.querySelectorAll(".S6");
let $3ofakind = document.querySelectorAll(".X3");
let $4ofakind = document.querySelectorAll(".X4");
let $yathzee = document.querySelectorAll(".YZ");
let $straight4 = document.querySelectorAll(".ST4");
let $straight5 = document.querySelectorAll(".ST5");
let $chance = document.querySelectorAll(".CH");
let $fullhouse = document.querySelectorAll(".FH");
let $TL = document.querySelectorAll(".TL");
let $BS = document.querySelectorAll(".BS");
let $btnStart = document.getElementById("btnStart");
let $btnRoll = document.getElementById("btnRoll");
let $btnPlay = document.getElementById("btnPlay");
let $Sum = document.querySelectorAll(".sum");
let $Message = document.getElementById("message");

initPlayer(player1);
initPlayer(player2);
startGame();

// Set EventListeners (Actions)
// Actions to take when the a dice is clicked
dices.forEach((dice) => {
  dice.addEventListener("click", function () {
    if (rolls_left < 3) {
      dice.classList.toggle("red");
    }
  });
})

// Action to take when Start button is clicked
$btnStart.addEventListener("click", startGame);

// Actions to take when the Roll button is clicked
$btnRoll.addEventListener("click", function () {
  rolls_left--;
  rollDices();
  calculatescores();
  $Message.innerHTML =
    "Player " + (currentPlayer + 1) + " : " + rolls_left + " rolls left";
  if (rolls_left == 0) {
    $btnRoll.disabled = true;
  } else {
    $btnRoll.disabled = false;
  }
  $btnPlay.disabled = false;
});

// Actions to take when the Play button is clicked
$btnPlay.addEventListener("click", function () {
  if (!bMarked) {
    alert("Please select something");
  } else {
    // save players score
    itemMarked.classList.toggle("saved");
    if (sPlayer == "player1") {
      updateTotals(player1);
    } else {
      updateTotals(player2);
      if (nSaved == 13) {
        bGameOver = true;
      }
    }
    // $TL[currentPlayer].innerHTML = nTotalLow;
    // if (nTotalLow >= 63) {
    //   $BS[currentPlayer].innerHTML = 35;
    // }
    if (bGameOver) {
      $btnPlay.disabled = true;
      $btnRoll.disabled = true;
      if (Number($Sum[0].innerHTML) > Number($Sum[1].innerHTML)) {
        $Message.className = "player1"
        $Message.innerHTML = "Player 1 won the game ";
      } else {
        $Message.className = "player2";
        $Message.innerHTML = "Player 2 won the game ";
      }
      $Message.classList.toggle("blinking")
    } else {
      rolls_left = 3;
      currentPlayer = 1 - currentPlayer;
      sPlayer = "player" + (currentPlayer + 1);
      $("#btnRoll").disabled = false;
      btnRoll.className = "action " + sPlayer
      $Message.className = sPlayer
      $Message.innerHTML = "Player " + (currentPlayer + 1) + " : " + rolls_left + " rolls left";
      resetDices();
    }
  }
});


function startGame() {
  numbers = [];
  currentPlayer = 0;
  sPlayer = "player1";
  itemMarked;
  rolls_left = 3;
  bMarked = false;
  nTotal = 0;
  nTotalLow = 0;
  nSaved = 0;
  bGameOver = false;
  $Sum[0].innerHTML = "";
  $Sum[1].innerHTML = "";
  $btnPlay.disabled = false;
  $btnRoll.disabled = true;
  btnRoll.className = 'action player1'
  $Message.className = "player1";
  $Message.innerHTML = "Player 1  : 3 rolls left"
  if ($Message.classList.contains("blinking")) {
    $Message.classList.toggle("blinking")
  }
  resetScoreSheet(player1);
  resetScoreSheet(player2);
  resetDices();
};


// Add click event to player1 scoresheet and unmark  (using a for loop to keep track of id for marked)
function initPlayer(player) {
  for (var i = 0; i < player.length; i++) {
    //   player[i].classList.toggle("open");
    if (
      !player[i].classList.contains("TL") &&
      !player[i].classList.contains("BS")
    ) {
      player[i].addEventListener("click", selectHand);
    }
    player[i].id = i;
  }
}

function resetScoreSheet(player) {
  for (var i = 0; i < player.length; i++) {
    player[i].innerHTML = "";
    if (player[i].classList.contains("saved")) {
      player[i].classList.toggle("saved");
    }
    if (player[i].classList.contains("marked")) {
      player[i].classList.toggle("marked");
    }
    player[i].id = i;
  }
}

function selectHand() {
  if (rolls_left < 3 && this.classList.contains(sPlayer)) {
    if (typeof itemMarked != "undefined") {
      itemMarked.classList.toggle("marked");
    }
    this.classList.toggle("marked");
    itemMarked = this;
    bMarked = true;
  }
}
//Update Totals and Zero other scores
function updateTotals(scores) {
  nTotalLow = 0;
  nTotal = 0;
  nSaved = 0;
  scores.forEach((score) => {
    if (!score.className.includes("saved")) {
      score.innerHTML = "";
    } else {
      nSaved++;
      if (score.id < 6) {
        nTotalLow += Number(score.innerHTML);
      }
      nTotal += Number(score.innerHTML);
    }
  });
  $TL[currentPlayer].innerHTML = nTotalLow;
  $Sum[currentPlayer].innerHTML = nTotal;
  if (nTotalLow >= 63) {
    $BS[currentPlayer].innerHTML = 35;
    nTotal += 35;
  }
  return nTotal;
}

// deselect all dices 
function resetDices() {
  start = "ROLL>";
  bMarked = false;
  for (var i = 0; i < dices.length; i++) {
    dices[i].innerHTML = start.substr(i, 1);
    if (dices[i].classList.contains("red")) {
      dices[i].classList.toggle("red");
    }
  }
  $btnPlay.disabled = true;
  $btnRoll.disabled = false;
}

// rollDices 
function rollDices() {
  for (var i = 0; i < dices.length; i++) {
    if (!dices[i].classList.contains("red")) {
      numbers[i] = Math.floor(Math.random() * 6) + 1;
      dices[i].innerHTML = numbers[i];
    }
  }
}

// Calculate the possible scores
function calculatescores() {
  let scoreboard = [
    {
      selector: $ones,
      total: onetosix(1),
    },
    {
      selector: $twos,
      total: onetosix(2),
    },
    {
      selector: $threes,
      total: onetosix(3),
    },
    {
      selector: $fours,
      total: onetosix(4),
    },
    {
      selector: $fives,
      total: onetosix(5),
    },
    {
      selector: $sixes,
      total: onetosix(6),
    },
    {
      selector: $3ofakind,
      total: nofakind(3),
    },
    {
      selector: $4ofakind,
      total: nofakind(4),
    },
    {
      selector: $yathzee,
      total: nofakind(5),
    },
    {
      selector: $straight4,
      total: straight(4),
    },
    {
      selector: $straight5,
      total: straight(5),
    },
    {
      selector: $fullhouse,
      total: fullhouse(),
    },
    {
      selector: $chance,
      total: numbers.reduce((a, b) => {
        return a + b;
      }, 0),
    },
  ];

  // append scores to scoreboard and unmark any marked items
  for (let i = 0, l = scoreboard.length; i < l; i++) {
    let selector = scoreboard[i].selector[currentPlayer];
    if (selector.className.includes("marked")) {
      selector.classList.toggle("marked");
    }
    if (!selector.className.includes("saved")) {
      selector.innerHTML = scoreboard[i].total;
    }
  }
}

// SCORE CALCULATION FUNCTIONS
// Calculate number 1 to 6
function onetosix(number) {
  const onetosix = numbers.filter((x) => x == number);
  return number * onetosix.length;
}

// Calculate 3 of a kind and 4 of a kind
function nofakind(number) {
  let nofakind = numbers;
  let total = 0;
  for (var i = 0; i <= 5 - number; i++) {
    nofakind = $.grep(numbers, function (n) {
      return n === numbers[i];
    });
    if (nofakind.length == 5 && number == 5) {
      return 50;
    } else if (nofakind.length >= number) {
      return numbers.reduce((accum, currentvalue) => {
        return accum + currentvalue;
      }, 0);
    } else if (i == 5 - number) {
      return 0;
    }
  }
}

// Calculate straights
function straight(number) {
  var length = 0;
  var sorted = numbers.slice().sort(function (a, b) {
    return a - b;
  });

  for (var i = 0; i < sorted.length - 1; i++) {
    if (sorted[i + 1] - sorted[i] === 1) {
      length += 1;
    }
  }
  if (length + 1 >= number) {
    return (number - 1) * 10;
  } else {
    return 0;
  }
}

// Calculate Fullhouse
const fullhouse = () => {
  const distinct = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  const distinctarray = numbers.filter(distinct);
  const repeat = numbers.filter((number) => number == numbers[0]).length;
  if (distinctarray.length == 2 && (repeat == 2 || repeat == 3)) {
    return 25;
  } else {
    return 0;
  }
};
