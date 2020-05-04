let yahtzees = [];
let roll = rollDice();
let roll_count = 3;
let $roll_left = $(".rolls-left span");
let $dice = $('.dice');
let $ones = $(".one span");
let $twos = $(".two span");
let $threes = $(".three span");
let $fours = $(".four span");
let $fives = $(".five span");
let $sixes = $(".six span");
let $chance = $(".chance span");
let $three_kind = $(".three-kind span");
let $four_kind = $(".four-kind span");
let $fullhouse = $(".full-house span");
let $sml_straight = $(".sml-straight span");
let $lg_straight = $(".lg-straight span");
let $full_house = $(".full-house span");
let $yahtzee = $(".yahtzee span");
let $upper_total = $(".upper-total span");
let $bonus = $(".bonus span");
let $final = $(".final-score span");
let $scores = $(".score span");
let $button = $(".button");
let $roll_dice = $("#roll-dice");
let $restart = $(".restart");
let $only_scores = $scores.not($upper_total).not($bonus).not($final);
let $saved = $(".saved");
let ran_once = false;

// Get a random roll of 5 dice
function rollDice() {
  let dice = [];

  for (var i = 0; i < 5; ++i) {
    dice[i] = Math.floor(Math.random() * 6) + 1;
  }
  return dice;
}

//generate the HTML to display the dice
function diceHTML() {
  let html = "";
  for (var i = 0; i < 5; ++i) {
    html +=
      '<div class="dice die-' +
      i +
      " die-value-" +
      roll[i] +
      '">' +
      roll[i] +
      "</div>";
  }
  return html;
}

function onboarding_button() {
  let message = 'Toggle click the dice to hold them or release them for another roll.';
  $('.onboarding .tooltip').removeClass('tooltip-1').addClass('tooltip-2').text(message);
  
  $roll_dice.one("click", function() { 
    let message = 'Restart the game and let\'s play!';
    $('.onboarding .tooltip').removeClass('tooltip-1').addClass('tooltip-4').text(message);
  });
}

function onboarding_dice() {
  let message = 'Click on a score title to read scoring instructions.';
  $('.onboarding .tooltip').removeClass('tooltip-4').css("visibility","hidden");
  $('.score .tooltip').addClass('tooltip-5').text(message).css('visibility', 'visible');
}

function onboarding_instructions() {
  let message = 'Click anywhere on the screen.';
  $('.onboarding .tooltip').removeClass('tooltip-2').css("visibility","hidden");
  $('.score .tooltip').removeClass('tooltip-5');
  $('.score .tooltip').addClass('tooltip-6').text(message).css('visibility', 'visible');
  $(document).one('click', function(){
     $('.score .tooltip').removeClass('tooltip-6');
     close_modal();
     let message = 'Click on any score to choose your points for this round.';
     $('.score .tooltip').addClass('tooltip-3').text(message);
  });
}

function onboarding_score() {
  let message = 'Roll the dice again to save your score and move to the next round.';
  $('.score .tooltip').removeClass('tooltip-3').css("visibility","hidden");
  $('.onboarding .tooltip').addClass('tooltip-1').text(message).css('visibility', 'visible');
}

function onboarding_restart() {
  $('.tooltip').removeClass('tooltip-5').css('visibility', 'hidden');
  restart_game();
  roll_count = 3;
}

function tooltip() {
  let message = 'Let\'s do one quick practice round. Roll the Dice.';
  
  $('.onboarding .tooltip').delay(300).queue(function (next) { 
      $(this).addClass('tooltip-1').text(message).css('visibility', 'visible'); 
      next(); 
   });
  $roll_dice.one( 'click', onboarding_button );
  $(document).one( 'click', '.dice', onboarding_dice );
  $(document).one( 'click', '.scoring-info', onboarding_instructions );
  $(document).one( 'click', '.score span', onboarding_score );
  $(document).one( 'click', '.restart', onboarding_restart );
}

//Calculate the score for chance
function chance() {
  let score = 0;
  for (var i = 0; i < roll.length; i++) {
    score += roll[i];
  }
  return score;
}

//Start of attempt to make all singles score calculations into one function.
function single_scores() {
  let dieroll = roll;
  let scores = [];
  let single_score = 0;
  for( var n=1, l=6; n<=l; n++ ) {
    if (dieroll.indexOf(n) != -1) {
      let roll = $.grep(dieroll, function(v) {
        return v === n;
      });
      for (var i = 0; i < roll.length; i++) {
        single_score += roll[i];
      }
    }
    scores[n] = single_score;
  }
  return scores;
}

//Calculate the score for ones
function ones() {
  let ones = roll;
  let score = 0;
  if (ones.indexOf(1) != -1) {
    ones = $.grep(ones, function(n) {
      return n === 1;
    });
    for (var i = 0; i < ones.length; i++) {
      score += ones[i];
    }
  }
  return score;
}

//Calculate the score for twos
function twos() {
  let twos = roll;
  let score = 0;
  if (twos.indexOf(2) != -1) {
    twos = $.grep(twos, function(n) {
      return n === 2;
    });
    for (var i = 0; i < twos.length; i++) {
      score += twos[i];
    }
  }
  return score;
}

//Calculate the score for threes
function threes() {
  let threes = roll;
  let score = 0;
  if (threes.indexOf(3) != -1) {
    threes = $.grep(threes, function(n) {
      return n === 3;
    });
    for (var i = 0; i < threes.length; i++) {
      score += threes[i];
    }
  }
  return score;
}

//Calculate the score for fours
function fours() {
  let fours = roll;
  let score = 0;
  if (fours.indexOf(4) != -1) {
    fours = $.grep(fours, function(n) {
      return n === 4;
    });
    for (var i = 0; i < fours.length; i++) {
      score += fours[i];
    }
  }
  return score;
}

//Calculate the score for fives
function fives() {
  let fives = roll;
  let score = 0;
  if (fives.indexOf(5) != -1) {
    fives = $.grep(fives, function(n) {
      return n === 5;
    });
    for (var i = 0; i < fives.length; i++) {
      score += fives[i];
    }
  }
  return score;
}

//Calculate the score for sixes
function sixes() {
  let sixes = roll;
  let score = 0;
  if (sixes.indexOf(6) != -1) {
    sixes = $.grep(sixes, function(n) {
      return n === 6;
    });
    for (var i = 0; i < sixes.length; i++) {
      score += sixes[i];
    }
  }
  return score;
}

//Counts how many of the same number there are in an array
Array.prototype.countOfSameNum = function() {
  var count = 0;
  for (var i = 0; i < this.length; ++i) {
    if (this[i] === this[0]) count++;
  }
  return count;
};

function frequency(array) {
  let frequency = {};
  let max = 0; // holds the max frequency.
  let most; // holds the max frequency element.
  for (var v in array) {
    frequency[array[v]] = (frequency[array[v]] || 0) + 1; // increment frequency.
    if (frequency[array[v]] > max) {
      // is this frequency > max so far ?
      max = frequency[array[v]]; // update max.
      most = array[v]; // update result.
    }
  }
  return max;
}

//Checks to see if all elements in the array are the same
function isSame(array) {
  if (array.every((val, i, arr) => val == arr[0])) {
    return true;
  } else {
    return false;
  }
}

//Sorts array and counts how many dice -1 are in a straight
function how_many_straight(array) {
  let sorted = array.sort();
  let length = 0;
  for (var i = 0; i < sorted.length - 1; i++) {
    if (sorted[i + 1] - sorted[i] === 1) {
      length += 1;
    }
  }
  return length;
}

//Calculates score for a large straight
function lg_straight() {
  let score = 0;
  let length = how_many_straight(roll);
  if (length === 4) {
    score = 40;
  }
  return score;
}

//Calculates score for a small straight
function sml_straight() {
  let score = 0;
  let length = how_many_straight(roll);
  if (length >= 3) {
    score = 30;
  }
  return score;
}

//Calculate the score for a fullhouse
function fullhouse() {
  let score = 0;
  let fullhouse = roll;
  let frequency = {};
  let max = 0; // holds the max frequency.
  let most; // holds the max frequency element.
  for (var v in fullhouse) {
    frequency[fullhouse[v]] = (frequency[fullhouse[v]] || 0) + 1; // increment frequency.
    if (frequency[fullhouse[v]] > max) {
      // is this frequency > max so far ?
      max = frequency[fullhouse[v]]; // update max.
      most = fullhouse[v]; // update result.
    }
    // makes sure there is at least 3 of the same numbers
    if (max === 3) {
      fullhouse = $.grep(fullhouse, function(value) {
        //returns an array of remaining differing numbers
        return value != most;
      });
      //check to see if there are two items in the array and that they are the same score
      if (isSame(fullhouse) && fullhouse.length === 2) {
        score = 25;
      }
    }
  }
  return score;
}

//Calculates the score for three of a kind
function three_of_kind() {
  let score = 0;
  let isSameNum = frequency(roll);
  if (isSameNum >= 3) {
    for (var i = 0; i < roll.length; i++) {
      score += roll[i];
    }
    return score;
  } else {
    return score;
  }
}

//Calculates the score for four of a kind
function four_of_kind() {
  let score = 0;
  let isSameNum = frequency(roll);
  if (isSameNum >= 4) {
    for (var i = 0; i < roll.length; i++) {
      score += roll[i];
    }
    return score;
  } else {
    return score;
  }
}

//Calculates the score for a yahtzee
function yahtzee() {
  let score = 0;
  let is_same = isSame(roll);
  if (is_same) {
    score = 50;
  }
  return score;
}

//Counts how many yahtzees have occurred
function count_yahtzees() {
  let count = 1;
  let is_same = isSame(roll);
  if (is_same) {
    count++;
  }
  return count;
}

//Calculates the score for extra yahtzees
function extra_yahtzee() {
  let score = parseInt($yahtzee.html());
  score += 100;
  $yahtzee.html(score);
}

//Gets the values of all the held die and places them in an array
function save_held_dice() {
  let saveNum = [];
  let heldDice = $(".hold").toArray();
  for (var i = 0; i < heldDice.length; i += 1) {
    saveNum.push(parseInt(heldDice[i].innerHTML));
  }
  return saveNum;
}

function printHTML(message) {
  $(".output").html(message);
}

//Grabs all the scores for the individual rolls and adds them up
function upper_score() {
  let total = 0;
  let saving = parseInt($(".upper-scores li .saving").html());
  if (saving) {
    total = saving;
  }
  let values = $(".upper-scores .saved")
    .map(function() {
      return parseInt($(this).html());
    })
    .get();
  for (var i = 0; i < values.length; i++) {
    total += values[i];
  }
  return total;
}

//Checks if the upper score is greater than or equals 65 and applies a bonus if appropriate
function bonus() {
  let score = 0;
  let upper = parseInt($(".upper-total span").html());
  if (upper >= 65) {
    score = 35;
  }
  return score;
}

//Grabs any values in the process of being saved, bonus, and saved values and adds them up
function final_score() {
  let total = 0;
  let saving = parseInt($(".saving").html());
  if (saving) {
    total = saving;
  }
  if (bonus() !== 0) {
    total += bonus();
  }
  let values = $(".saved")
    .map(function() {
      return parseInt($(this).html());
    })
    .get();
  for (var i = 0; i < values.length; i++) {
    total += values[i];
  }
  return total;
}

//Creates HTML if a bonus roll occurs for an extra yahtzee
function bonus_roll_html() {
  let html = '<div class="bonus-roll-wrapper">';
  html += '<div class="bonus-roll">';
  html += "<h2>You got an extra Yahtzee!</h2>";
  html += "<p>You get an extra roll too.</p>";
  html += "<p>(click this box to close)</p>";
  html += "</div>";
  html += "</div>";
  $(".score").append(html);
}

//Creates Welcome message
function welcome_html() {
  let html = '<div class="overlay"></div>';
  html += '<div class="modal-wrapper">';
  html += '<div class="modal" id="welcome">';
  html += "<h2>Welcome to Yahtzee!</h2>";
  html += "<p>Do you need instructions to use this app?</p>";
  html += "<div class='button yes'>Yes</div>";
  html += "<div class='button no'>No</div>";
  html += "</div>";
  html += "</div>";
  $(".wrapper").append(html);
}

//Creates HTML for the end of the game.
function finish_game_html() {
  let html = '<div class="overlay"></div>';
  html += '<div class="modal-wrapper">';
  html += '<div class="modal" id="finish-game">';
  html += '<h2>Congratulations!</h2>';
  html += '<p>You scored ' + final_score() + ' points!</p>';
  html += '<p>Would you like to play again?</p>';
  html += '<div class="button yes">Yes</div>';
  html += '<div class="button no">No</div>';
  html += '</div>';
  html += '</div>';
  $(".wrapper").append(html);
}

function scoring_info_html( i ) {
  let score = i;
  let scoring_info = [
    {
      title: 'Ones',
      instructions: 'Ones sums up only the dice that are a one.',
      die_values: '<div class="dice die-value-1"></div><div class="dice die-value-1"></div><div class="dice die-value-1"></div><div class="dice die-value-5"></div><div class="dice die-value-1"></div>',
      score: 4
    },
    {
      title: 'Twos',
      instructions: 'Twos sums up only the dice that are a two.',
      die_values: '<div class="dice die-value-2"></div><div class="dice die-value-5"></div><div class="dice die-value-2"></div><div class="dice die-value-4"></div><div class="dice die-value-2"></div>',
      score: 6
    },
    {
      title: 'Threes',
      instructions: 'Threes sums up only the dice that are a three.',
      die_values: '<div class="dice die-value-3"></div><div class="dice die-value-6"></div><div class="dice die-value-3"></div><div class="dice die-value-4"></div><div class="dice die-value-2"></div>',
      score: 6
    },
    {
      title: 'Fours',
      instructions: 'Fours sums up only the dice that are a four.',
      die_values: '<div class="dice die-value-4"></div><div class="dice die-value-1"></div><div class="dice die-value-3"></div><div class="dice die-value-4"></div><div class="dice die-value-4"></div>',
      score: 12
    },
    {
      title: 'Fives',
      instructions: 'Fives sums up only the dice that are a five.',
      die_values: '<div class="dice die-value-5"></div><div class="dice die-value-1"></div><div class="dice die-value-3"></div><div class="dice die-value-4"></div><div class="dice die-value-5"></div>',
      score: 10
    },
    {
      title: 'Sixes',
      instructions: 'Sixes sums up only the dice that are a six.',
      die_values: '<div class="dice die-value-6"></div><div class="dice die-value-2"></div><div class="dice die-value-6"></div><div class="dice die-value-6"></div><div class="dice die-value-5"></div>',
      score: 18
    },
    {
      title: 'Three of a Kind',
      instructions: 'Three of a Kind sums up all the dice so long as at least three dice are the same.',
      die_values: '<div class="dice die-value-4"></div><div class="dice die-value-4"></div><div class="dice die-value-2"></div><div class="dice die-value-6"></div><div class="dice die-value-4"></div>',
      score: 20
    },
    {
      title: 'Four of a Kind',
      instructions: 'Four of a Kind sums up all the dice so long as at least four dice are the same.',
      die_values: '<div class="dice die-value-5"></div><div class="dice die-value-5"></div><div class="dice die-value-5"></div><div class="dice die-value-3"></div><div class="dice die-value-5"></div>',
      score: 23
    },
    {
      title: 'Full House',
      instructions: 'Full House scores 25 points if there is both a set of 3 and a set of 2.',
      die_values: '<div class="dice die-value-4"></div><div class="dice die-value-4"></div><div class="dice die-value-2"></div><div class="dice die-value-2"></div><div class="dice die-value-4"></div>',
      score: 25
    },
    {
      title: 'Chance',
      instructions: 'Chance sums up the value of all the dice.',
      die_values: '<div class="dice die-value-4"></div><div class="dice die-value-1"></div><div class="dice die-value-6"></div><div class="dice die-value-5"></div><div class="dice die-value-4"></div>',
      score: 20
    },
    {
      title: 'Small Straight',
      instructions: 'A Small Straight scores 30 points if at least 4 dice are in a straight',
      die_values: '<div class="dice die-value-5"></div><div class="dice die-value-3"></div><div class="dice die-value-6"></div><div class="dice die-value-5"></div><div class="dice die-value-4"></div>',
      score: 30
    },
    {
      title: 'Large Straight',
      instructions: 'A Large Straight scores 40 points if all the dice are in a straight',
      die_values: '<div class="dice die-value-5"></div><div class="dice die-value-3"></div><div class="dice die-value-1"></div><div class="dice die-value-2"></div><div class="dice die-value-4"></div>',
      score: 40
    },
    {
      title: 'Yahtzee',
      instructions: 'A Yahtzee scores 50 points if all the dice are the same. Each additional Yahtzee is worth 100 points.',
      die_values: '<div class="dice die-value-3"></div><div class="dice die-value-3"></div><div class="dice die-value-3"></div><div class="dice die-value-3"></div><div class="dice die-value-3"></div>',
      score: 50
    },
  ];
  let html = '';
  html += '<div class="overlay"></div>';
  html += '<div class="modal-wrapper">';
  html += '<div class="modal scoring-info">';
  html += '<h2>How Scoring Works</h2>';
  html += '<p>You must select one score every round. You can only choose this score once per game.</p>';
  html += '<p>'+ scoring_info[score].instructions + '</p>';
  html += '<div class="output">';
  html += scoring_info[score].die_values;
  html += '</div>';
  html += '<p>The score for this <strong>' + scoring_info[score].title + '</strong> example is <strong>' + scoring_info[score].score + '</strong>.</p>';
  html += '</div>';
  html += '</div>';
  $(".wrapper").append(html);
}

function end_game() {
  $('#finish-game .button').off().on("click", function() {
    $('.overlay').remove();
    $('.modal-wrapper').remove();
    
    if( $(this).hasClass('yes') ) {
       restart_game();
       roll_count = 3;
    } else if( $(this).hasClass('no') ) {
        $(".saving").removeClass("saving").addClass("saved").text();  
        $roll_dice.addClass("disabled");
    }
  });
}

function restart_game() {
  let roll_count = 3;
   $scores.empty().removeClass('saved').removeClass('saving');
   $('.dice').removeClass('hold');
   $(".rolls-left span").empty().html(roll_count);
   $roll_dice.removeClass("disabled");
   return roll_count;
}

function start_game() {
  $('#welcome .button').off().on("click", function() {
    $('.overlay').remove();
    $('.modal-wrapper').remove();
    
    if( $(this).hasClass('yes') ) {
       tooltip();
    } else {
      return;
    }
  });
}

function close_modal() {
  $('.modal-wrapper').on('click', function(){
     $('.overlay').remove();
     $('.modal-wrapper').remove();
   });
  $('.overlay').on('click', function(){
     $('.overlay').remove();
     $('.modal-wrapper').remove();
   });
}

function show_scoring_info() {
  // let scores_instructions = [
  //   '.one a',
  //   '.two a',
  //   '.three a',
  // ];
  // for( var i=0; i<3; i++ ) {
  //   $(document).on( 'click', scores_instructions[i], function(){
  //    scoring_info_html(i);
  //    close_modal();
  //   });
  // }
  
  $(document).on( 'click', '.one a', function(){
   scoring_info_html(0);
   close_modal();
  });
  $(document).on( 'click', '.two a', function(){
   scoring_info_html(1);
   close_modal();
  });
  $(document).on( 'click', '.three a', function(){
   scoring_info_html(2);
   close_modal();
  });
  $(document).on( 'click', '.four a', function(){
   scoring_info_html(3);
   close_modal();
  });
  $(document).on( 'click', '.five a', function(){
   scoring_info_html(4);
   close_modal();
  });
  $(document).on( 'click', '.six a', function(){
   scoring_info_html(5);
   close_modal();
  });
  $(document).on( 'click', '.three-kind a', function(){
   scoring_info_html(6);
   close_modal();
  });
  $(document).on( 'click', '.four-kind a', function(){
   scoring_info_html(7);
   close_modal();
  });
  $(document).on( 'click', '.full-house a', function(){
   scoring_info_html(8);
   close_modal();
  });
  $(document).on( 'click', '.chance a', function(){
   scoring_info_html(9);
   close_modal();
  });
  $(document).on( 'click', '.sml-straight a', function(){
   scoring_info_html(10);
   close_modal();
  });
  $(document).on( 'click', '.lg-straight a', function(){
   scoring_info_html(11);
   close_modal();
  });
  $(document).on( 'click', '.yahtzee a', function(){
   scoring_info_html(12);
   close_modal();
  });
}

$(document).ready(function() {
  printHTML( diceHTML() );
  welcome_html();
  start_game();
  show_scoring_info();
  
  let timeout = null;
    
  //If no activity for 8 secs, shake the dice
  $(document).on('mousemove', function() {
    clearTimeout(timeout);
    $('.game .dice').removeClass('shake');

    timeout = setTimeout(function() {
      $('.game .dice').addClass('shake');
    }, 8000);
  });
  
  //Restarts the game
  $restart.off().on("click", function() {
    restart_game();
    roll_count = 3;
  });
  
  // Displays how many rolls are left;
  $(".rolls-left span").html(roll_count);
  $("#roll-dice").on("click", function() {
    //Decrease the roll count by 1
    roll_count--;
    
    //single_scores();
    
     //Only allows 3 rolls before selecting score
    if (roll_count <= -1 && 
        !$scores.hasClass("saving") || 
        $roll_dice.hasClass('disabled') ) {
          return;
    }

    // Updates the number of remaing rolls after the dice are rolled;
    $(".rolls-left span").empty().html(roll_count);

    // Doesn't allow the held dice to be changed.
    if ($(".dice").hasClass("hold")) {
      let count = save_held_dice().length;
      roll = rollDice();
      roll.splice(0, count, save_held_dice());
      roll = [].concat.apply([], roll);
      printHTML(diceHTML());
      for (var i = 0; i < count; i += 1) {
        $(".die-" + i).addClass("hold");
      }
    } else {
      // makes an entirely new random roll
      roll = rollDice();
      printHTML(diceHTML());
    }
    
    //Let's you select the score you want to enter
    $only_scores.off().on("click", function() {
      $scores.removeClass("saving");
      
      //Ensure there isn't an already saved score
      if ( ! $(this).hasClass('saved') ) {
        $(this).addClass("saving").text();
      } 

      //refreshes the upper and final scores
      $upper_total.empty().append(upper_score());
      $roll_dice.removeClass("disabled");
      $final.empty().append(final_score());

      //Prepares to set up a new round
      $(".dice").removeClass("hold");
      roll_count = 3;
      
      //Checks to see if game needs to end
      let length = $only_scores.length;
      let saved = $(".saved").length;
      let saving = $(this).hasClass('saving');
      let remaining = ( length - saved ) - 1;
      
      if ( remaining < 1 && saving ) {
        finish_game_html();
        end_game();
      } 
    });
    
    //Saves pending scores when you roll
    if ($("span").hasClass("saving")) {
      $(".saving").removeClass("saving").addClass("saved").text();
      $('dice').off();
      $upper_total.empty().append(upper_score());
      $final.empty().append(final_score());
    }

    //Visual cue to save score before continuing to roll
    if (roll_count === 0) {
      $roll_dice.addClass("disabled");
    }
    
     if (roll_count !== 0 && ! $only_scores.hasClass('saving') ) {
      //Clicking the die holds or removes its hold
      $(".dice").on("click", function() {
        $(this).toggleClass("hold").text();
      });
    }

    //Array
    let scoreboard = [ 
      {
        selector: $chance,
        method: chance()
      },
      {
        selector: $ones,
        method: ones()
      },
      {
        selector: $twos,
        method: twos()
      },
      {
        selector: $threes,
        method: threes()
      },
      {
        selector: $fours,
        method: fours()
      },
      {
        selector: $fives,
        method: fives()
      },
      {
        selector: $sixes,
        method: sixes()
      },
      {
        selector: $three_kind,
        method: three_of_kind()
      },
      {
        selector: $four_kind,
        method: four_of_kind()
      },
      {
        selector: $fullhouse,
        method: fullhouse()
      },
      {
        selector: $sml_straight,
        method: sml_straight()
      },
      {
        selector: $lg_straight,
        method: lg_straight()
      }
     ];
    
    //Appends all the scores to the scoreboards
    for( var i=0, l=scoreboard.length; i<l; i++ ) {
        let selector = scoreboard[i].selector;
        let score = scoreboard[i].method;
        if( ! selector.hasClass( "saved" ) ) {
          selector.empty().append( score );
        }
    }

    if (!$yahtzee.hasClass("saved")) {
      $yahtzee.empty().append(yahtzee());
      // checks to see if there is a saved yahtzee, there is more than one yahtzee, and the score at least equals 50.
    } else if (count_yahtzees() > 1 && parseInt($yahtzee.html()) >= 50) {
      $yahtzee.removeClass("saved").addClass("saving");
      extra_yahtzee();
      bonus_roll_html();
      $roll_dice.addClass('disabled');
      $(".bonus-roll-wrapper").on("click", function() {
        $(this).remove();
        $yahtzee.addClass("saved");
        $roll_dice.removeClass('disabled');
      });
    }
    $bonus.empty().append( bonus() );
  });
});


//To Do
// - Refactor
// - Play with shake animation some more
// - Have shake repeat every 8 secs not moved, not just the first 8



