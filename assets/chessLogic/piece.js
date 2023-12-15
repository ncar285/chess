function Piece(color, square){
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

module.exports = Piece;