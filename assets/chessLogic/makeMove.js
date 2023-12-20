import { unSelectSquare } from "../UI/pieceSelection.js";
// import { updateBoard } from "../UI/updateBoard.js";
import { idToPos } from "./utils.js"
import { gameState } from "./gameState.js";
// import { gameBoard } from "./board.js";
import { gameBoard } from "../main.js";

export function playMoveIfValid(pieceObj, startSquare, dropSquare){


    const validOptions = pieceObj.getMoves().options;
    const validTakeOptions = pieceObj.getMoves().takeOptions;

    // if they haven't moved do nothing
    if (startSquare.id === dropSquare.id || dropSquare.id === '') {
        return
    }

    const startPos = idToPos(startSquare.id);
    const endPos = idToPos(dropSquare.id);

    // Update the piece's position in game state
    if (validOptions.has(dropSquare.id) || validTakeOptions.has(dropSquare.id)){

        gameBoard.movePiece(startPos, endPos, pieceObj);
        gameState.setSelectedId(null);

        // update DOM elements
        updateBoard(startSquare, dropSquare);
    }

    gameState.setSelectedId(null);
    unSelectSquare();
    // if (lastHighlightedSquare) {
    //     lastHighlightedSquare.classList.remove('highlight');
    // }
}


function updateBoard(startSquare, endSquare) {

    // Find the image element within the start square
    const imageElement = startSquare.querySelector('img');

    // If an image is found in the start square, remove it
    if (imageElement) {
        startSquare.removeChild(imageElement);
    }

    // Check if there's already an image in the end square, remove it
    const existingImageElement = endSquare.querySelector('img');
    if (existingImageElement) {
        endSquare.removeChild(existingImageElement);
    }

    // Append the image element to the end square
    endSquare.appendChild(imageElement);
}
