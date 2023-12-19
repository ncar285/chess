import { posToId, idToPos } from "./utils.js";

export function Piece(color, square, board){
    this.color = color;
    this.square = square;
    this.board = board;
}

Piece.prototype.getColor = function(){
    return this.color;
}

Piece.prototype.getSquare = function(){
    return this.square;
}

Piece.prototype.setSquare = function(pos){
    this.square = pos;
}

Piece.prototype.getMoves = function(){
    const options = new Set();
    const takeOptions = new Set();
    const [moves, takeMoves] = this.validMoves();
    moves.forEach( pos => {
        options.add(posToId(pos));
    });
    takeMoves.forEach( pos => {
        takeOptions.add(posToId(pos));
    });
    return {options: options, takeOptions: takeOptions}
}