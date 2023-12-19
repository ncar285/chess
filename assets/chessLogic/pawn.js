// const Piece = require("./piece.js");
// const inherit = require("./inherit.js");
import { inherit } from './inherit.js';
import { Piece } from './piece.js';

export function Pawn(color,square, board){
    this.type = "pawn";
    Piece.call(this, color, square, board);
}

inherit(Piece, Pawn);

Pawn.prototype.getType = function(){
    return this.type;
}

Pawn.prototype.validMoves = function(){
    const [rank, file] = this.getSquare();
    const options = [];
    const takeOptions = [];
    const isWhite = this.getColor() === "white";
    const dir = isWhite ? 1 : -1;
    const startRank = isWhite ? 1 : 6;
   
    if (!this.board.isOccupied([rank + 1*dir, file])){
        options.push([rank + 1*dir, file]);
    }
    if (rank === startRank){
        options.push([rank + 2*dir, file]);
    }

    const leftDiag = [rank + 1*dir, file - 1*dir];
    const rightDiag = [rank + 1*dir, file + 1*dir];
    if (this.board.isOccupied(leftDiag)){
        takeOptions.push(leftDiag);
    }
    if (this.board.isOccupied(rightDiag)){
        takeOptions.push(rightDiag);
    }

    return [options,takeOptions];
}

// module.exports = Pawn;