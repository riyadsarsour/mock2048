import keypress from 'keypress';
import Game from "./engine/game";

keypress(process.stdin);


/**
 * The code in this file is used to run your game in the console. Use it
 * to help develop your game engine.
 *
 */

 let game = new Game(4);
    //let game;
 let tempGameState ={
        board:[16,2,64,8,8,4,2,16,0,32,4,2,16,8,2,4],
        score: 0,
        won: false,
        over:false
    }
game.loadGame(tempGameState);
console.log(game.toString());

game.move('down');
console.log(game.toString());

console.log(game.getGameState['over']);
// console.log(game.gameOver());
// game.rotateNinety();
// console.log(game.gameOver());

//console.log(game.toString());
// console.log(game.getGameState());
// console.log(game.setupNewGame());

// game.onMove(gameState => {
//     //console.log(game.toString());
     console.log(game.gameState);
// });
console.log(game.getGameState());
console.log(game.getGameState());
// game.onWin(gameState => {
//     //console.log('You won with a gameState of...', gameState)
// });

// game.onLose(gameState => {
//    // console.log('You lost! :(', gameState)
//     //console.log(`Your score was ${gameState.score}`);
// });

 process.stdin.on('keypress', function (ch, key) {
    switch (key.name) {
//         case 'right':
//             game.move('right');
//             break;
           case 'left':
            game.move('left');

//             break;
//         case 'down':
//             game.move('down');

//             break;
         case 'up':
           game.move('up');
           break;
   }
//     if (key && key.ctrl && key.name == 'c') {
//         process.stdin.pause();
  //}
});


// process.stdin.setRawMode(true);
// process.stdin.resume();

