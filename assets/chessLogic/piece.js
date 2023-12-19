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
    moves.forEach(([a,b]) => {
        const charCode = 'a'.charCodeAt(0) + b;
        const rank = a + 1;
        const file = String.fromCharCode(charCode);
        options.add(`${rank}-${file}`);
    });
    takeMoves.forEach(([a,b]) => {
        const charCode = 'a'.charCodeAt(0) + b;
        const rank = a + 1;
        const file = String.fromCharCode(charCode);
        takeMoves.add(`${rank}-${file}`);
    });
    const res = {options: options, takeOptions: takeOptions}
    return moves;
}

// module.exports = Piece;