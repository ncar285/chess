const Piece = require("./piece.js");
const inherit = require("./inherit.js");

function Pawn(square){
    Piece.call(this, color, square);
}

inherit(Piece, Pawn);

Pawn.prototype.getMoves = function(){
    const [rank, file] = this.square;
    const color = this.getColor;
    const options = [];
    if (color === "white"){
        options.push([rank + 1, file]);
        if (rank === 2){
            options.push([rank + 2, file]);
        }
    } else {
        options.push([rank - 1, file]);
        if (rank === 7){
            options.push([rank - 2, file]);
        }
    }
    return options;
}

module.exports = Pawn;