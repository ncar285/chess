export function findChessSquareFromCoordinates(x, y, cloneRef) {

    if (cloneRef) { // Make the clone "click-through"
        cloneRef.style.pointerEvents = 'none';
    }

    let res = null;
    let element = null;
    if (x && y){
        element = document.elementFromPoint(x, y);

        if (element && element.classList.contains('board-square')) {
            res = element.id; 
        } else if (element.parentElement && element.parentElement.classList.contains('board-square')){
            res = element.parentElement.id;
        } 
    }

    if (cloneRef) { 
        cloneRef.style.pointerEvents = '';
    }

    return res;
}