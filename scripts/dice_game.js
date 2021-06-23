let player_dice = document.getElementById("player_dice");
let computer_dice = document.getElementById("computer_dice");

let player_this_round = 0;
let player_round_score = document.getElementById("player_score");

let player_game_total = 0;
let player_total_score = document.getElementById("player_total_score");

let computer_this_round = 0;
let computer_round_score = document.getElementById("computer_score");

let computer_game_total = 0;
let computer_total_score = document.getElementById("computer_total_score");

let player_roll_1 = 0;
let player_roll_2 = 0;


let computer_roll_1 = 0;
let computer_roll_2 = 0;


let round_number = 0;
/*
Generate a random number from 1-6
*/
function rollDice(){
    return Math.floor(Math.random() * 6 + 1);
}

/* 
Scoring rules:
    if either number is equal to 1, return 0
    if both numbers are equal, return sum * 2
    otherwise, simply return sum
*/
function calculateScore(playerSelector){

    if(playerSelector == "player")
    {
        if(player_roll_1 == 1 || player_roll_2 == 1)
        {
            return 0;
        }
        else if(player_roll_1 == player_roll_2)
        {
            return (player_roll_1 + player_roll_2) * 2
        }
        else
        {
            return player_roll_1 + player_roll_2;
        }
    }
    else
    {
        if(computer_roll_1 == 1 || computer_roll_2 == 1)
        {
            return 0;
        }
        else if(computer_roll_1 == computer_roll_2)
        {
            return (computer_roll_1 + computer_roll_2) * 2
        }
        else
        {
            return computer_roll_1 + computer_roll_2;
        }
    }
}

/*
Change dice image depending on the rolled numbers
*/
function changeDiceImage(playerSelector){


    if(playerSelector == "player")
    {
        player_roll_1 = rollDice();
        player_roll_2 = rollDice();


        player_dice.innerHTML = `<img src="images/game_images/dice/die_${player_roll_1}.png" alt="Die side ${player_roll_1}">`;
        player_dice.innerHTML += `<img src="images/game_images/dice/die_${player_roll_2}.png" alt="Die side ${player_roll_2}">`;

    }
    else
    {
        computer_roll_1 = rollDice();
        computer_roll_2 = rollDice();

        computer_dice.innerHTML = `<img src="images/game_images/dice/die_${computer_roll_1}.png" alt="Die side ${computer_roll_1}">`;
        computer_dice.innerHTML += `<img src="images/game_images/dice/die_${computer_roll_2}.png" alt="Die side ${computer_roll_2}">`;

    }
}


function updateRoundScore(playerSelector){
    if(playerSelector == "player")
    {
        player_this_round = calculateScore("player");
        player_round_score.innerHTML = `<p>${player_this_round}</p>`;
    }
    else
    {
        computer_this_round = calculateScore("computer");
        computer_round_score.innerHTML =  `<p>${computer_this_round}</p>`;
    }
}

// function updateTotalScore(){
//     // let player_game_total = 0;
//     // let computer_game_total = 0;

//     if(player_this_round == computer_this_round)
//     {
//         ++player_game_total;
//         ++computer_game_total;
//     }
//     else if(player_this_round > computer_this_round)
//     {
//         player_game_total = player_game_total + 10;
//     }
//     else
//     {
//         ++computer_game_total;
//     }

//     player_total_score.innerHTML += `<p>${player_game_total}</p>`;
//     computer_total_score.innerHTML += `<p>${computer_game_total}</p>`;
// }

function updateTotalScore(){
    // let player_game_total = 0;
    // let computer_game_total = 0;

    if(player_this_round > computer_this_round)
    {
        ++player_game_total;

        player_total_score.innerHTML = `<p>${player_game_total}</p>`;
        computer_total_score.innerHTML = `<p>${computer_game_total}</p>`;
    }
    else if(player_this_round < computer_this_round)
    {
        ++computer_game_total;

        player_total_score.innerHTML = `<p>${player_game_total}</p>`;
        computer_total_score.innerHTML = `<p>${computer_game_total}</p>`;
    }
    else
    {
        player_total_score.innerHTML = `<p>${player_game_total}</p>`;
        computer_total_score.innerHTML = `<p>${computer_game_total}</p>`;
    }

}

function endGameMessage()
{
    if(player_game_total > computer_game_total)
    {
        $("#end_game_message").html("You Won!");
    }
    else if (player_game_total < computer_game_total)
    {
        $("#end_game_message").html("You Lost!"); 
    }
    else
    {
        $("#end_game_message").html("It's a Draw.");
    }
}


//Play the game!
$("#roll_dice").click(function(){

    changeDiceImage("player");
    updateRoundScore("player");
    
    changeDiceImage("computer");
    updateRoundScore("computer");
    
    updateTotalScore();

    round_number++;

    $("#current_round").html(round_number);

    endGameMessage();

    if(round_number > 2)
    {
        $(document).ready(function(){
            $("#overlay").fadeIn(600);
         });

        $("#end_game_score").html(`The final score was ${player_game_total} to ${computer_game_total}`);
    }
});


$(".new_game").click(function(){
    location.reload();
});

