import { inherit } from './inherit.js';
import { Piece } from './piece.js';
import { Slideable } from './slideable.js';

const DIRS = [[1,0],[0,1],[-1,0],[0,-1]];

export function Rook(color,square, board){
    this.type = color.slice(0,1) + "_rook";
    Piece.call(this, color, square, board);
    this.slideable = new Slideable(board);
}

inherit(Piece, Rook);

Rook.prototype.getType = function(){
    return this.type;
}

Rook.prototype.validMoves = function(){
    const color = this.getColor();
    const pos = this.getSquare();
    return this.slideable.calculateMoves(color, pos, DIRS);
}