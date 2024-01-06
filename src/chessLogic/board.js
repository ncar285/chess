import { printBoard } from '../Utils/printBoard.js';
import { idToPos } from '../Utils/posIdConversion.js';
import { Pawn } from './pawn.js';

export function Board(){
    this.board = 
    Array(8).fill(null).map(() => Array(8).fill(null));
    this.placePieces()
    this.takenPieces = new Set();
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

Board.prototype.getPieceFromId = function(id){
    const [r,c] = idToPos(id);
    const board = this.getBoard();
    return board[r][c];
}

Board.prototype.addTakenPiece = function(piece){
    this.takenPieces.add(piece);
    return this.takenPieces;
}

Board.prototype.getTakenPieces = function(){
    return this.takenPieces;
}

Board.prototype.movePiece = function(startSquare, endSquare, piece){
    try {

        if (!Board.isInsideBoard(startSquare) || !Board.isInsideBoard(endSquare)) {
            throw new Error("Move is outside the board.");
        }

        if (!this.isOccupied(startSquare)) {
            throw new Error("No piece at the start square.");
        }

        // store captured piece if there is one
        const capturedPiece = this.getPiece(endSquare);

        // Update the moved piece
        this.board[startSquare[0]][startSquare[1]] = null;
        this.board[endSquare[0]][endSquare[1]] = piece;
        piece.setSquare(endSquare);

        // Update a captured piece
        if (capturedPiece) {
            capturedPiece.setSquare(null);
            this.addTakenPiece(capturedPiece);
            capturedPiece.taken = true;
        }

        // Update a pawn's firstMove property
        if (piece.type.slice(2) === "pawn") {
            piece.firstMove = false;
        }

        // const boardPrinted = printBoard(this.board);
        // console.log("boardHash",boardPrinted)
        
    } catch (error) {
        console.error(error.message);
    }
}

Board.prototype.isOccupied = function(pos) {
    if (!Board.isInsideBoard(pos)) return false;
    const [rank,file] = pos;
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