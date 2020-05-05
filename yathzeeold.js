let numbers = [];
let selected = [];
let pickedColor = 0;
let player = 0;
let dices = document.querySelectorAll(".dice");
let player1 = document.querySelectorAll(".player1");
let player2 = document.querySelectorAll(".player2");
let marked1 = 0;
let marked2 = 0;
let rolls_left = 3;
let bMarked = false;
let nTotal = 0;
let nTotalLow = 0;
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
let $btnRoll = document.getElementById("btnRoll");
let $btnPlay = document.getElementById("btnPlay");

btnRoll.classList.toggle("player1");

// Add click event to dices
dices.forEach((dice) => {
  dice.addEventListener("click", function () {
    if (rolls_left < 3) {
      dice.classList.toggle("red");
    }
  });
});

// Add click event to player1 scoresheet and unmark  (using a for loop to keep track of id for marked)
for (var i = 0; i < player1.length; i++) {
  player1[i].classList.toggle("open");
  if (
    !player1[i].classList.contains("TL") &&
    !player1[i].classList.contains("BS")
  ) {
    player1[i].addEventListener("click", function () {
      if (marked1 > 0) {
        player1[marked1].classList.toggle("marked");
      }
      if (rolls_left < 3 && player == 0) {
        this.classList.toggle("marked");
        marked1 = this.id;
        bMarked = true;
      }
    });
  }
  player1[i].id = i;
}

// Add click event to player2 scoresheet and unmark  (using a for loop to keep track of id for marked)
for (var i = 0; i < player2.length; i++) {
  player2[i].classList.toggle("open");
  if (
    !player2[i].classList.contains("TL") &&
    !player2[i].classList.contains("BS")
  ) {
    player2[i].addEventListener("click", function () {
      if (marked2 > 0) {
        player2[marked2].classList.toggle("marked");
      }
      if (rolls_left < 3 && player == 1) {
        this.classList.toggle("marked");
        marked2 = this.id;
        bMarked = true;
      }
    });
  }
  player2[i].id = i;
}

resetDices();

// Actions to take when the Roll button is clicked
// Roll the dices
// Calculate the scores
// Keep track of rolls left
$("#btnRoll").on("click", function () {
  rolls_left--;
  rollDices();
  calculatescore();
  $("#rollsLeft").text(rolls_left);
  if (rolls_left == 0) {
    $btnRoll.disabled = true;
  } else {
    $btnRoll.disabled = false;
  }
  $btnPlay.disabled = false;
});

// Actions to take when the Play button is clicked
// Check to see if the player selected an score option
// Marked Score --> saved Score
// Change over to other player
$("#btnPlay").on("click", function () {
  if (!bMarked) {
    alert("Please select something");
  } else {
    // save players score
    if (player == 0) {
      player1[marked1].classList.toggle("saved");
      updateTotals(player1);
      $("#sum1").text(nTotal);
    } else {
      player2[marked2].classList.toggle("saved");
      updateTotals(player2);
      $("#sum2").text(nTotal);
    }
    $TL[player].innerHTML = nTotalLow;
    if (nTotalLow >= 63) {
      $BS[player].innerHTML = 35;
    }
    rolls_left = 3;

    //change player
    player = 1 - player;
    $("#playernr").text(player + 1);
    $("#rollsLeft").text(rolls_left);
    $("#btnRoll").disabled = false;
    if (btnRoll.className.includes("player1")) {
      btnRoll.classList.toggle("player2");
    } else {
      btnRoll.classList.toggle("player1");
    }
    resetDices();
  }
});

// for (var i = 0; i<dices.length; i++) {
//        dices[i].id = i;
// }

//Update Totals and Zero other scores
function updateTotals(scores) {
  nTotalLow = 0;
  nTotal = 0;
  nBonus = 0;
  scores.forEach((score) => {
    if (!score.className.includes("saved")) {
      score.innerHTML = "";
    } else {
      if (score.id < 6) {
        nTotalLow += Number(score.innerHTML);
      }
      nTotal += Number(score.innerHTML);
    }
  });
  if (nTotalLow >= 63) {
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

// resetDices
function rollDices() {
  for (var i = 0; i < dices.length; i++) {
    if (!dices[i].classList.contains("red")) {
      numbers[i] = Math.floor(Math.random() * 6) + 1;
      dices[i].innerHTML = numbers[i];
    }
  }
  //  return numbers;
}

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
    return number * 10;
  } else {
    return 0;
  }
}

// Calculate Fullhouse
function fullhouse() {
  const distinct = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  const distinctarray = numbers.filter(distinct);
  const repeat = numbers.filter((number) => number == numbers[0]).length;
  if (distinctarray.length == 2 && (repeat == 2 || repeat == 3)) {
    return 25;
  }
  return 0;
}

// Calculate the possible scores
function calculatescore() {
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
    let selector = scoreboard[i].selector[player];
    if (selector.className.includes("marked")) {
      selector.classList.toggle("marked");
    }
    if (!selector.className.includes("saved")) {
      selector.innerHTML = scoreboard[i].total;
    }
  }
}
