// const Piece = require("./piece.js");
// const inherit = require("./inherit.js");
import { inherit } from './inherit.js';
import { Piece } from './piece.js';

export function Pawn(color,square){
    this.type = "pawn";
    Piece.call(this, color, square);
}

inherit(Piece, Pawn);

Pawn.prototype.getType = function(){
    return this.type;
}

Pawn.prototype.getMoves = function(){
    const [rank, file] = this.getSquare();
    // debugger
    const color = this.getColor();
    const options = [];
    if (color === "white"){
        options.push([rank + 1, file]);
        if (rank === 1){
            options.push([rank + 2, file]);
        }
    } else {
        options.push([rank - 1, file]);
        if (rank === 6){
            options.push([rank - 2, file]);
        }
    }
    return options;
}

// module.exports = Pawn;