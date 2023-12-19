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
    const color = this.getColor();
    const options = [];
    const takeOptions = [];
    if (color === "white"){
        if (!this.board.isOccupied([rank + 1, file])){
            options.push([rank + 1, file]);
        }
        if (rank === 1){
            options.push([rank + 2, file]);
        }
    } else {
        if (!this.board.isOccupied([rank - 1, file])){
            options.push([rank - 1, file]);
        }
        if (rank === 6){
            options.push([rank - 2, file]);
        }
    }
    return options;
}

// module.exports = Pawn;