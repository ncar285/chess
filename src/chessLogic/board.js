import { Pawn } from './pawn.js';

export function Board(){
    this.board = 
    Array(8).fill(null).map(() => Array(8).fill(null));
    this.placePieces()
}

Board.prototype.placePieces = function() {
    // Place white pawns
    for (let file = 0; file < 8; file++) {
        this.board[1][file] = new Pawn("white", [1, file], this);
    }
    // Place black pawns
    for (let file = 0; file < 8; file++) {
        this.board[6][file] = new Pawn("black", [6, file], this);
    }
}


Board.prototype.getBoard = function(){
    return this.board;
}

Board.prototype.getPiece = function(pos){
    const board = this.getBoard();
    return board[pos[0]][pos[1]];
}

Board.prototype.movePiece = function(startSquare, endSquare, piece){
    try {

        // debugger

        if (!Board.isInsideBoard(startSquare) || !Board.isInsideBoard(endSquare)) {
            throw new Error("Move is outside the board.");
        }

        if (!this.isOccupied(startSquare)) {
            throw new Error("No piece at the start square.");
        }

        // Capture logic
        const capturedPiece = this.getPiece(endSquare);
        if (capturedPiece) {
            capturedPiece.setSquare(null);
        }

        // Move the piece
        this.board[startSquare[0]][startSquare[1]] = null;
        this.board[endSquare[0]][endSquare[1]] = piece;
        piece.setSquare(endSquare);

        // Update pawn's firstMove property
        if (piece.type === "pawn") {
            piece.firstMove = false;
        }
        
    } catch (error) {
        console.error(error.message);
    }
}

Board.prototype.isOccupied = function(pos) {
    // debugger
    // console.log("position: ", pos)
    // console.log("isInsideBoard?: ", Board.isInsideBoard(pos))
    if (!Board.isInsideBoard(pos)) return false;
    const [rank,file] = pos;
    // console.log("this.board",this.board)
    // console.log("rank",rank)
    // console.log("file",file)
    // console.log("this.board[rank]",this.board[rank])
    // console.log("this.board[rank][file]",this.board[rank][file])
    return this.board[rank][file] != null;
};

Board.prototype.isOccupiedByColor = function(pos, color) {
    if (!Board.isInsideBoard(pos)) return false;
    const [rank,file] = pos;
    return this.isOccupied(pos) && this.board[rank][file].color === color;
};

Board.isInsideBoard = function(pos) {
    const [rank,file] = pos;
    return rank >= 0 && rank < 8 && file >= 0 && file < 8;
};


// export const gameBoard = new Board();