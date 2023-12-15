import { Board } from './chessLogic/board.js';
import { Pawn } from './chessLogic/pawn.js'; 

window.Pawn = Pawn;

document.addEventListener("DOMContentLoaded", function() {
    if (document.body.classList.contains('is-preload')) {
        document.body.classList.remove('is-preload');
    }

    setupChessBoard();

    const gameBoard = new Board();
    renderPiecesOnDOM(gameBoard);

});

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

function setupChessBoard(){
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
        row.forEach((square, b) => {
            const pos = [a,b];

            const squareId = posToId([a,b])

            const squareElement = document.getElementById(squareId);
            const piece = document.createElement('img');
            const pieceObj = gameBoard.getPiece(pos);

            // console.log(pieceObj)

            if (pieceObj){
                let name = "";
                name += (pieceObj.getColor() === "white") ? "w_" : "b_";
                name += pieceObj.getType();
                const source = `./images/pieces/${name}.png`;
                piece.src = source;
                // console.log(squareId)
                piece.className = "chess-piece";
                squareElement.appendChild(piece);

                // Add event listeners to this piece
                addDragEventsToPiece(piece, pieceObj);
            }

        })
    })

}


function addDragEventsToPiece(piece, pieceObj) {

    const validMoves = pieceObj.getMoves();

    piece.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent the click from reaching the document
        showMovePossibilities(validMoves);
        // Global click event listener to hide move possibilities
        // document.addEventListener('click', function(event) {
        //     hideMovePossibilities();
        // });
    });


    piece.addEventListener('dragstart', function(event) {
        this.style.opacity = '0'; // Hide the original piece
        showMovePossibilities(validMoves);
    });

    piece.addEventListener('dragend', function(event) {
        this.style.opacity = '1'; // Show the piece again when the drag ends
        // Update the piece's position in game state here
        hideMovePossibilities()
    });
}

function showMovePossibilities(validMoves){
    validMoves.forEach((pos)=>{
        const suggestion = document.createElement('div');
        suggestion.className = 'suggested-square';
        const squareId = posToId(pos);
        const squareElement = document.getElementById(squareId);
        squareElement.appendChild(suggestion);
    })
}

function hideMovePossibilities(){
    const suggestions = document.querySelectorAll('.suggested-square');
    suggestions.forEach(suggestion => {
        suggestion.parentNode.removeChild(suggestion);
    })
}

function posToId(pos){
    const [a,b] =  pos;
    const charCode = 'a'.charCodeAt(0) + b;
    const rank = a + 1;
    const file = String.fromCharCode(charCode);
    return `${rank}-${file}`
}