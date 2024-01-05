// import { useSelector } from "react-redux";
// import { getGameBoard } from "../store/gameReducer";
import { idToPos, posToId } from "./posIdConversion";

// const gameBoard = useSelector(getGameBoard);

export function playMoveIfValid(piece, gameBoard, endSquare){
    const startPos = piece.getSquare()
    const startSquare = posToId(startPos);
    const endPos = idToPos(endSquare);
    if (startSquare && endSquare && startSquare !== endSquare){
        const validOptions = piece.getMoves().options;
        const validTakeOptions = piece.getMoves().takeOptions;
        if (validOptions.has(endSquare) || validTakeOptions.has(endSquare)){
            gameBoard.movePiece(startPos, endPos, piece);
            console.log("VALID MOVE")
        } else {
            console.log("NOT A VALID MOVE")
        }
    }
}