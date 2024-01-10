import { idToPos, posToId } from "./posIdConversion";

export function playMoveIfValid(piece, game, endSquare){
    const startPos = piece.getSquare()
    const startSquare = posToId(startPos);
    const endPos = idToPos(endSquare);
    if (startSquare && endSquare && startSquare !== endSquare){
        const validOptions = piece.getMoves().options;
        const validTakeOptions = piece.getMoves().takeOptions;
        if (validOptions.has(endSquare) || validTakeOptions.has(endSquare)){
            game.movePiece(startPos, endPos, piece);
            return true;
            // console.log("VALID MOVE")
        } else {
            return false;
            // console.log("NOT A VALID MOVE")
        }
    }
}



