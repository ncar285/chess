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
    this.board[startSquare[0]][startSquare[1]] = null;
    this.board[endSquare[0]][endSquare[1]] = piece;
    const takenPiece = this.getPiece(endSquare);
    if (takenPiece) takenPiece.setSquare(null);
    piece.setSquare(endSquare);

    if (piece.type === "pawn") {
        piece.firstMove = false;
    }
    
    return this.board;
}

Board.prototype.isOccupied = function(pos) {
    if (!Board.isInsideBoard(pos)) return false;
    const [rank, file] =  pos;
    return this.board[rank][file] != null;
};

Board.prototype.isOccupiedByColor = function(pos, color) {
    if (!Board.isInsideBoard(pos)) return false;
    const [rank, file] =  pos;
    return this.isOccupied(pos) && this.board[rank][file].color === color;
};

Board.isInsideBoard = function(pos) {
    const [rank, file] = pos;
    return rank >= 0 && rank < 8 && file >= 0 && file < 8;
};
