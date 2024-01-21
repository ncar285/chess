import { idToPos } from '../Utils/posIdConversion.js';
import { Bishop } from './bishop.js';
import { King } from './king.js';
import { Knight } from './knight.js';
import { Pawn } from './pawn.js';
import { Queen } from './queen.js';
import { Rook } from './rook.js';

const pieceClasses = {
    "pawn": Pawn,
    "rook": Rook,
    "knight": Knight,
    "bishop": Bishop,
    "queen": Queen,
    "king": King
};

export function Board(){
    this.board = 
    Array(8).fill(null).map(() => Array(8).fill(null));
    this.placePieces()
    this.takenPieces = new Set();
    this.history = [{move: null, board: this.board}];

    this.whosTurn = "white";
    this.whiteCanCastle = true;
    this.blackCanCastle = true;
}

Board.prototype.placePieces = function() {

    const backRank = ["rook","knight","bishop","queen","king","bishop","knight","rook"];

    backRank.forEach((pieceName, i)=>{
        const PieceClass = pieceClasses[pieceName];
        this.board[0][i] = new PieceClass("white", [0, i], this);
        this.board[7][i] = new PieceClass("black", [7, i], this);
    })
    for (let i = 0; i < 8 ; i++){
        this.board[1][i] = new Pawn("white", [1, i], this);
        this.board[6][i] = new Pawn("black", [6, i], this);
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

Board.prototype.getBoardHash = function() {
    return this.board.map(row => 
        row.map(square => {
            if (square) {
                return `${square.getPieceName()}-${square.getColor()}`;
            }
            return "empty";
        }).join("_")
    ).join("|");
}

Board.prototype.setBoardTo = function(boardHash){
    boardHash.split("|").forEach((row, r) => {
        row.split("_").forEach((square, c) => {
            if (square === "empty"){
                this.board[r][c] = null;
            } else {
                const [pieceName, color] = square.split("-");
                const PieceClass = pieceClasses[pieceName];
                this.board[r][c] = new PieceClass(color, [r,c], this);
            }
        })
    })
}

// this.playersMove = "white";
// this.whiteCanCastle = true;
// this.blackCanCastle = true;

Board.prototype.whosMove = function(){
    return this.whosTurn;
}

Board.prototype.isPlayersMove = function(piece){
    return piece.getColor() === this.whosMove();
}



Board.prototype.switchTurn = function(){
    if (this.whosTurn === "white"){
        this.whosTurn = "black";
    } else {
        this.whosTurn = "white";
    }
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

        // update move history
        const move = {piece: piece, endSquare}
        const newHistoryEntry = {
            move,
            board: this.board
        };
        const newHistory = [...this.history, newHistoryEntry];
        this.history = newHistory;

        // switch the turn
        this.switchTurn();
        
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

Board.createBoardFromHash = function(boardHash) {
    const board = new Board();
    board.setBoardTo(boardHash);
    return board;
};