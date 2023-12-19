
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