import Game from "./engine/game.js";
let initialize = false;

export const setup = function(game) {
    document.getElementById("1").innerHTML = game.gameBoard[0];
    document.getElementById("2").innerHTML = game.gameBoard[1];
    document.getElementById("3").innerHTML = game.gameBoard[2];
    document.getElementById("4").innerHTML = game.gameBoard[3];
    document.getElementById("5").innerHTML = game.gameBoard[4];
    document.getElementById("6").innerHTML = game.gameBoard[5];
    document.getElementById("7").innerHTML = game.gameBoard[6];
    document.getElementById("8").innerHTML = game.gameBoard[7];
    document.getElementById("9").innerHTML = game.gameBoard[8];
    document.getElementById("10").innerHTML = game.gameBoard[9];
    document.getElementById("11").innerHTML = game.gameBoard[10];
    document.getElementById("12").innerHTML = game.gameBoard[11];
    document.getElementById("13").innerHTML = game.gameBoard[12];
    document.getElementById("14").innerHTML = game.gameBoard[13];
    document.getElementById("15").innerHTML = game.gameBoard[14];
    document.getElementById("16").innerHTML = game.gameBoard[15];
}

export const keys = function(key, board){
    switch (key) {
        case '&':
            board.move('up');
            break;
        case '(':
            board.move('down');
            break;
        case '%':
            board.move('left');
            break;
        case '\'':
            board.move('right');
            break;
        default:
            break;
    }
}

export const newGame = function(game){
    document.getElementById("score").innerHTML = "Score: " + game.score;
    if(initialize == false){
        initialize = true;
        $('#reset').on("click", function(){
            game.setupNewGame();
            newGame(game);
            document.getElementById("end").innerHTML = "";
        });
        $(document).keydown(function(e){
            var s = String.fromCharCode(e.which);
            keys(s, game);
            update(game);
        });
    }
    setup(game);
};

export const update = function(game){
    setup(game);
    document.getElementById("score").innerHTML = "Score: " + game.score;
    if(game.over){
        document.getElementById("end").innerHTML = "You Lost <br> Score: " + game.score + "<br> Press Reset Game to Try Again" + 
        " <img src=http://www.cs.unc.edu/~kmp/kmp.jpg alt=http://www.cs.unc.edu/~kmp/kmp.jpg>" ;
        // document.getElementById("end").innerHTML = "<img src="//www.cs.unc.edu/~kmp/kmp.jpg" 
        // alt="http://www.cs.unc.edu/~kmp/">
    }
    if(game.won){
        document.getElementById("end").innerHTML = "Congrats! You wasted the time to win" + 
        "<img src=http://www.cs.unc.edu/~kmp/kmp.jpg alt=http://www.cs.unc.edu/~kmp/kmp.jpg>";
    }
}

$(document).ready(function () {
    let game = new Game(4);
    newGame(game);
});