export function Piece(color, square){
    this.color = color;
    this.square = square;
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
    const moves = new Set();
    this.validMoves().forEach(([a,b]) => {
        // const [a,b] =  pos;
        const charCode = 'a'.charCodeAt(0) + b;
        const rank = a + 1;
        const file = String.fromCharCode(charCode);
        moves.add(`${rank}-${file}`);
    });
    return moves;
}

// module.exports = Piece;