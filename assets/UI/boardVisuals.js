export function selectSquare(piece, pieceObj){
    const validOptions = pieceObj.getMoves().options;
    const validTakeOptions = pieceObj.getMoves().takeOptions;
    const currentId = piece.parentNode.id;
    if (selectedId === currentId) {
        pieceSelected = false; // if current selection is reclicked
        selectedId = null;
    } else {
        selectedId = currentId;
        document.getElementById(selectedId).classList.add('selected');
        showMovePossibilities(validOptions);
        showTakePossibilities(validTakeOptions);
    }
}

export function unSelectSquare(){
    const selected = document.querySelectorAll('.selected');
    selected.forEach(selected => selected.classList.remove('selected'));
    hideMovePossibilities();
    pieceSelected = false; 
    selectedId = null;
}


export function showMovePossibilities(validMoves){
    validMoves.forEach((squareId)=>{
        const suggestion = document.createElement('div');
        suggestion.className = 'suggested-square';
        const squareElement = document.getElementById(squareId);
        squareElement.appendChild(suggestion);
    })
}

export function showTakePossibilities(validTakes){
    validTakes.forEach((squareId)=>{
        const suggestion = document.createElement('div');
        suggestion.className = 'suggested-capture';
        const squareElement = document.getElementById(squareId);
        squareElement.appendChild(suggestion);
    })
}

export function hideMovePossibilities() {
    const suggestions = document.querySelectorAll('.suggested-square, .suggested-capture');
    suggestions.forEach(suggestion => {
        suggestion.parentNode.removeChild(suggestion);
    });
}