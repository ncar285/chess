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
            sessionStorage.setItem("ongoingGame", JSON.stringify(game.getBoardHash()));
            return true;
        } else {
            return false;
        }
    }
}