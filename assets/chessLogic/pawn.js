const Piece = require("./piece.js");
const inherit = require("./inherit.js");

function Pawn(square){
    Piece.call(this, color);
    this.square;
}

inherit(Piece, Pawn);

module.exports = Pawn;