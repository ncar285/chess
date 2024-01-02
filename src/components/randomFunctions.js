function handleSquareClick(e){
    const square = e.target.id;
    if (selectedSquare && square !== selectedSquare){
        if (movingOptions && movingOptions.has(square)){
            playMoveIfValid(selectedSquare, square);
        } else if (takingOptions && takingOptions.has(square)){
            playMoveIfValid(selectedSquare, square);
        }

    }
}


const handleTouchStart = (piece, e) => {
    e.preventDefault();

    setDraggedPiece(piece);

    const touch = e.touches[0];
    startTouchPos = [touch.clientX, touch.clientY];

    const pos = pieceObj.getSquare();
    const id = posToId(pos);
    dispatch(receiveSelected(id));
    dispatch(receiveMoveOptions(pieceObj.getMoves()));

};

function createClone(x,y){
    const clone = pieceRef.current.cloneNode(true);
    clone.classList.add('dragging');

    // im not sure this will update automatically with props passed in
    clone.style.left = `${x - pieceRef.current.offsetWidth / 2}px`;
    clone.style.top = `${y}px`;

    clone.style.position = 'absolute';
    document.body.appendChild(clone);
    pieceRef.current.style.visibility = 'hidden';
    cloneRef.current = clone;
}


const handleTouchMove = (e) => {
    if (draggedPiece && !isDragging) {
        const touch = e.touches[0];

        if (distanceSinceTouchStart(touch) > 20) {
            createClone(touch.clientX, touch.clientY)
            setIsDragging(true);
            setDragPosition({x: touch.clientX, y: touch.clientY})
        }
    }

    if (isDragging){
        setDragPosition({x: touch.clientX, y: touch.clientY})
        finalSquareDuringDrag = squareUnderneath;
        if (lasthighlightedSquare !== squareUnderneath){
            dispatch(receiveHighlightedSquare(squareUnderneath))
        }
    }
};

function distanceSinceTouchStart(touch){
    const currentTouchPos = [touch.clientX, touch.clientY];
    const deltaX = currentTouchPos[0] - startTouchPos[0];
    const deltaY = currentTouchPos[1] - startTouchPos[1];
    return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
}

const handleTouchEnd = (e) => {
    e.preventDefault();

    if (isDragging) {
        setIsDragging(false);
        // ... handle drag end ...
    }
    setDraggedPiece(null);

    playMoveIfValid();

    setLasthighlightedSquare(null);

    dispatch(removeSelected());
};

function playMoveIfValid(){
    const startSquare = pieceObj.getSquareId()
    const endSquare = finalSquareDuringDrag;
    if (startSquare && endSquare && startSquare !== endSquare){
        const validOptions = pieceObj.getMoves().options;
        const validTakeOptions = pieceObj.getMoves().takeOptions;

        if (validOptions.has(endSquare) || validTakeOptions.has(endSquare)){
            const startPos = idToPos(startSquare);
            const endPos = idToPos(endSquare);

            gameBoard.movePiece(startPos, endPos, pieceObj);
            updateBoard();

        }

    }
    return false;
}

useEffect(() => {
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
    };
}, []);


function findChessSquareFromCoordinates(x, y) {

    if (cloneRef.current) { // Make the clone "click-through"
        cloneRef.current.style.pointerEvents = 'none';
    }

    const element = document.elementFromPoint(x, y);
    let res = null;

    if (element && element.classList.contains('board-square')) {
        res = element.id; 
    } else if (element.parentElement.classList.contains('board-square')){
        res = element.parentElement.id;
    } else{
        console.log("couldn't find a chess square")
    }

    if (cloneRef.current) { 
        cloneRef.current.style.pointerEvents = '';
    }

    return res;
}

function getMousePos(e){
    let x, y;
    if (e.type === 'touchstart' && e.touches) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
    } else {
        x = e.clientX;
        y = e.clientY;
    }
    return [x, y];
}


function updateBoard(){
    const updatedBoard = chessBoard;
    for (let a = 0 ; a  < 8 ; a++ ){
        for (let b = 0 ; b  < 8 ; b++ ){

            const localPiece = updatedBoard[a][b].pieceObj;
            const reduxPiece = gameBoard.getPiece([a, b]);

            if ((localPiece === null ^ reduxPiece === null) || 
                (localPiece && reduxPiece && localPiece.constructor !== reduxPiece.constructor)) {
                const screenRank = 7 - a;
                updatedBoard[screenRank][b].pieceObj = reduxPiece
            }
        }
    }
    setChessBoard(updatedBoard)
}