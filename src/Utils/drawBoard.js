import { addDragEventsToPiece } from "./eventHandlers.js";
import { posToId } from "../chessLogic/utils.js";
import { startDrag } from './pieceMovement.js';
import { clickMove } from "./pieceMovement.js";
// import { gameBoard } from "../chessLogic/board.js";

export function drawChessBoard(gameBoard){
    setupChessBoardDomElements();
    renderPiecesOnDOM(gameBoard);
}


function setupChessBoardDomElements(){
    const board = document.querySelector('.chess-board');
    let color = "brown";
    for (let a = 0 ; a  < 8 ; a++ ){
        const row = document.createElement('div');
        const rank = a + 1;
        row.id = `rank-${rank}`;
        row.className = `board-row ${a+1}`;
        board.prepend(row);
        for (let b = 0 ; b  < 8 ; b++ ){
            const square = document.createElement('div');
            const charCode = 'a'.charCodeAt(0) + b;
            const file = String.fromCharCode(charCode)
            square.id = `${rank}-${file}`;
            square.className = `board-square ${color}`;

            square.addEventListener('click', (event) => clickMove(event), false);

            addSquareLabels(square, [file,rank]);
            row.appendChild(square);
            color = (color === "brown") ? "white" : "brown";
        }
        color = (color === "brown") ? "white" : "brown";
    }
}

function renderPiecesOnDOM(gameBoard){

    const board = gameBoard.getBoard();

    board.forEach((row, a)=>{
        row.forEach((_, b) => {
            const pos = [a,b];
            const squareId = posToId([a,b])
            const squareElement = document.getElementById(squareId);
            const piece = document.createElement('img');
            const pieceObj = gameBoard.getPiece(pos);

            if (pieceObj){
                let name = "";
                name += (pieceObj.getColor() === "white") ? "w_" : "b_";
                name += pieceObj.getType();
                const source = `./images/pieces/${name}.png`;
                piece.src = source;
                piece.className = "chess-piece";
                squareElement.appendChild(piece);

                // Add event listeners to this piece
                piece.addEventListener('mousedown', (event) => startDrag(event, piece, pieceObj), false);
                piece.addEventListener('touchstart', (event) => startDrag(event, piece, pieceObj), false);

                addDragEventsToPiece(piece, pieceObj);
            }

        })
    })

}

function addSquareLabels(square, pos){
    const [file,rank] =  pos;
    if (file === "a") {
        const rankLabel = document.createElement('div');
        rankLabel.className = 'rank square-label';
        rankLabel.innerText = `${rank}`;
        square.appendChild(rankLabel);
    } 
    if (rank === 1) {
        const fileLabel = document.createElement('div');
        fileLabel.className = 'file square-label';
        fileLabel.innerText = `${file}`;
        square.appendChild(fileLabel);
    }
}