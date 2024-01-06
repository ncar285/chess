const PIECE_KEYS = {
    'b_bishop': " B-BIS ",
    'w_bishop': " W-BIS ",
    'b_king': " B-KIN ",
    'w_king': " W-KIN ",
    'b_knight': " B-KGT ",
    'w_knight': " W-KGT ",
    'w_pawn': " W-PAW ",
    'b_pawn': " B-PAW ",
    'b_queen': " B-QUE ",
    'w_queen': " W-QUE ",
    'b_rook': " B-ROK ",
    'w_rook': " W-ROK "
};

export function printBoard(boardArray){
    const hash = [...boardArray].reverse().map(row => "        |" + getRowHash(row) + "|")
    return '\n \n' + hash.join('\n \n');
}

function getRowHash(row){
    return row.map(piece=>{
        if (piece){
            return PIECE_KEYS[piece.getType()]
        } else {
            return '       ';    // 7 spaces
        }
    }).join('|')
}