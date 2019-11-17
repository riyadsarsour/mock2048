/*
Add your code for Game here
 */
export default class Game{
    
    constructor(size){
        // create board
       this.size = size;
       this.gameBoard = [];
       this.score= 0;
       this.won = false;
       this.over = false;
       this.boardSize = size * size;
       this.moveCalls = [];
       this.winCalls =[];
       this.overCalls = [];
       this.didIMove =false;
    //    this.gameState = {
    //        "board": this.gameBoard,
    //        "score": this.score,
    //        "won": this.won,
    //        "over": this.over
    //    };
       this.setupNewGame();
    }

    setupNewGame(){
        // resets game back to random starting position
        // fill board
        this.moveCalls = [];
        this.winCalls =[];
        this.overCalls = [];
        let ranIndex1 =  Math.floor(Math.random() * (this.boardSize));
        let ranIndex2 = Math.floor(Math.random() * (this.boardSize));
        while(true) {
            if (ranIndex1 != ranIndex2) {
                break;
            } else {
                ranIndex2= Math.floor(Math.random() * (this.size*this.size));
            }
        }
        let newBoard = []
        for(let i =0; i< this.boardSize; i++){
            if(i == ranIndex1){
                newBoard.push(this.getRandomTile());
            }
            else if ( i == ranIndex2){
                newBoard.push(this.getRandomTile());
            }else{
                newBoard.push(0);
            }

        }
        this.gameBoard = newBoard;
        this.score= 0;
        this.won = false;
        this.over = false;
        // this.gameState ={
        //     "board": this.gameBoard,
        //     "score": this.score,
        //     "won": this.won,
        //     "over":this.over
        // };
    }
    // help me find tile
    getRandomTile() {
        let x = Math.random();
        if( x < .1){
            return 4;
        } else{
            return 2;
        }     
    }

    loadGame(gameState){
        // given a gamestate obj loads scores, btns, etc
        this.size = Math.sqrt(gameState.board.length);
        // this.gameState ={
        //     "board": gameState.board,
        //     "score": gameState.score,
        //     "won": gameState.won,
        //     "over": gameState.over
        // };
        this.gameBoard= gameState.board;
        this.score = gameState.score;
        this.won =gameState.won;
        // this.gameState={
        //     "board": this.gameBoard,
        //     "score": this.score,
        //     "won": this.won,
        //     "over": this.over
        // };
        this.over = gameState.over;
    }

    // helper is board full

    isFull(){
        for(let i =0; i< this.boardSize; i++){
            if(this.gameBoard[i] == 0){
                return false;
            } 
        }
        return true;
    }
    move(direction){
        // Move bish get out the way
        //give move as string makes the shift and adds random tile
        switch (direction) {
            case 'up':
                this.moveUp()
                this.adjustEmpty()
                //this.loseCheck()
                //this.addSingleTile()
                break;

            case 'left':
                this.rotateNinety()
                this.moveUp()
                this.adjustEmpty()
                this.rotateNinety()
                this.rotateNinety()
                this.rotateNinety()
                //this.loseCheck()
                //this.addSingleTile()
                break;
            case 'right':
                this.rotateNinety()
                this.rotateNinety()
                this.rotateNinety()
                this.moveUp()
                this.adjustEmpty()
                this.rotateNinety()
                //this.loseCheck()
                //this.addSingleTile()
                break;
            case 'down':
                this.rotateNinety()
                this.rotateNinety()
                this.moveUp()
                this.adjustEmpty()
                this.rotateNinety()
                this.rotateNinety()
                //this.loseCheck()
                //this.addSingleTile()
                break;
        } // end switch
        // add methods of moves
        for(let i=0;i<this.moveCalls.length;i++){
                let tempState ={
                    board: this.gameBoard,
                    score: this.score,
                    won: this.won,
                    over: this.over
                  };
                   this.moveCalls[i](tempState);
        }
        // add win callback
        if(this.won){
            for(let i=0;i<this.winCalls.length;i++){
                let tempState ={
                    board: this.gameBoard,
                    score: this.score,
                    won: this.won,
                    over: this.over
                  };
                   this.winCalls[i](tempState);
               } 
        }
        if(!this.isFull()) {
            this.addSingleTile()
        }
        // add lose callback
        if(this.isFull()){
            if(this.gameOver()){
                this.rotateNinety();
                if(this.gameOver()){
                    this.rotateNinety();
                    this.rotateNinety();
                    this.rotateNinety();
                    this.over=true;
                    for(let i=0;i<this.overCalls.length;i++){
                        let tempState ={
                            board: this.gameBoard,
                            score:this.score,
                            won: this.won,
                            over: this.over
                        };
                        this.overCalls[i](tempState);
                    }
                }else{
                    this.rotateNinety();
                    this.rotateNinety();
                    this.rotateNinety();
                }
            }
        }
        this.didIMove = false;
    }// end of method

    // loseCheck(){
    //     if(this.isFull()){
    //         if(this.gameOver()){
    //             this.rotateNinety();
    //             if(this.gameOver()){
    //                 this.rotateNinety();
    //                 this.rotateNinety();
    //                 this.rotateNinety();
    //                 this.over =true;
    //                 for(let i=0;i<this.overCalls.length;i++){
    //                     let tempState ={
    //                         board: this.gameBoard,
    //                         score:this.score,
    //                         won: this.won,
    //                         over: this.over
    //                     };
    //                     this.overCalls[i](tempState);
    //                 }
    //             }else{
    //                 this.rotateNinety();
    //                 this.rotateNinety();
    //                 this.rotateNinety();
    //             }
    //         }
    //     }
    // }

    gameOver(){
        for(let x=0;x<this.size;x++){
            for(let y=x; y<this.boardSize; y=y+this.size){
                for(let i=y+this.size; i<this.boardSize; i=i+this.size){
                    if(this.gameBoard[i]==0){
                        return false;
                    }
                    else if(this.gameBoard[i]==this.gameBoard[y]){
                        return false;
                    }else{
                        break;
                    }
                }
            }
        }
        return true;
    }

    // add one tile random
    addSingleTile(){
        if(this.didIMove){
            let fullBoard = this.isFull();
            for(let i =0; i <this.boardSize; i++){
                if(this.gameBoard[i] == 0 && !this.isFull()){
                    this.gameBoard[i] = this.getRandomTile();
                    break;
                }
            }
        }
    }
    // rotates clockwise
    rotateNinety() {
        this.go1Dto2D();
        const n = this.size;
        const x = Math.floor(n/2);
        const y = n - 1;
        let grid = this.gameBoard;
        for (let i = 0; i < x; i++) {
            for (let j = i; j < y - i; j++) {
                let k = grid[i][j];
                grid[i][j] = grid[y - j][i];
                grid[y - j][i] = grid[y - i][y - j];
                grid[y - i][y - j] = grid[j][y - i];
                grid[j][y - i] = k;
            }
    }

        this.gameBoard= this.flatten2D(this.gameBoard);
    }
    // make a 2d array for rotation
    go1Dto2D(){
        let new1D = [];
        while(this.gameBoard.length) {
            new1D.push(this.gameBoard.splice(0,this.size));
        }
        this.gameBoard=new1D;
    }

    // flatten  2D --> 1D
    flatten2D(arr){
        let flattened=[]
        for(let x=0;x<arr.length;x++){
            for(let y=0;y<arr.length;y++){
                flattened.push(arr[x][y]);
            }
        }
    return flattened;
    }

    //helper merge fxns up
    moveUp(){
        // check column
        for(let x=0;x<this.size;x++){
            // check row
            for(let y=x; y<this.boardSize; y=y+this.size){
                // check each tile at x, y
                for(let i=y+this.size; i<this.boardSize; i=i+this.size){
                    if(this.gameBoard[i]==0){
                        continue;
                    }
                    if(this.gameBoard[i]==this.gameBoard[y]){
                        
                        this.score=this.score+(this.gameBoard[i]*2);
                        this.gameBoard[i]=0;
                        this.gameBoard[y]=this.gameBoard[y]*2;
                        this.didIMove;
                        if(this.gameBoard[y] == 2048){
                            this.won = true;
                        }
                        break;
                        
                     }
                    if(this.gameBoard[i]!=this.gameBoard[y]){
                        break;
                    }
                }
            }
        }  
        this.adjustEmpty();
    }

    // moving into emptys slot
    adjustEmpty(){
        // same as mergiing column
        for(let x=0; x<this.size; x++){
            // merge look at row
            for(let y=x; y<this.boardSize; y=y+this.size){
                if(this.gameBoard[y]!=0){
                    continue;
                }
                // now merge look at column
                for(let i=y+this.size; i<this.boardSize; i=i+this.size){
                    if(this.gameBoard[i]==0){
                        continue;
                    }else{
                        this.didIMove = true;
                        this.gameBoard[y]=this.gameBoard[i];
                        this.gameBoard[i]=0;
                        break;
                    }
               }
            }
        }
    }

    toString(){
        // return string rep of game as text/ascii
        // useful for testing
           for(let i = 0; i < (this.boardSize); i += this.size) {
                            var together = []
                            for (let j = 0; j < this.size; j++) {
                                together.push(this.gameBoard[i+j]);
                            }
                            console.log(together);
                        }
    }

    onMove(callback){
        //Takes a callback function as input and registers 
        // that function as a listener to the move event. 
        // Every time a move is made, the game should call 
        // all previously registered move callbacks, passing 
        // in the game's current gameState as an argument to 
        // the function
        this.moveCalls.push(callback);
    }

    onWin(callback){
        //Takes a callback function as input and registers 
        // that function as a listener to the win event. 
        // When the player wins the game (by making a 2048 tile), 
        // the game should call all previously registered win callbacks, 
        // passing in the game's current gameState as an argument to the function
        this.winCalls.push(callback);
    }

    onLose(callback){
        //Takes a callback function as input and registers that function 
        //as a listener to the move event. When the game transitions into a 
        //state where no more valid moves can be made, the game should call 
        //all previously registered lose callbacks, passing in the game's current 
        //gameState as an argument to the function.
        this.overCalls.push(callback);
    }

    getGameState(){
        //Returns a accurate gameState object representing the current game state
        let tempState={
            "board": this.gameBoard,
            "score": this.score,
            "won": this.won,
            "over": this.over
        };        
        return tempState;
    }

} // endClass

