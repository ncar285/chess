// import { clickMove } from "../../Utils/pieceMovement";
import { useSelector } from "react-redux";
import ChessPiece from "../ChessPiece/ChessPiece";
import { getMoveOptions, getSelected, getTakeOptions } from "../../store/uiReducer";
import "./ChessSquare.css"

function ChessSquare( {squareParams} ) {

    const {id, className, rankLabel, fileLabel, pieceObj} = squareParams;
    const [file, rank] = id.split("");

    const selectedSquare = useSelector(getSelected);

    const movingOptions = useSelector(getMoveOptions);
    const takingOptions = useSelector(getTakeOptions);

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

    function makeMove(e){
        e.preventDefault();
        // const [startSquare, endSquare] = [selectedSquare, e.target.parentElement.id];
        playMoveIfValid(selectedSquare, e.target.parentElement.id);
    }

    function playMoveIfValid(startSquare, endSquare){
        if (startSquare && endSquare && endSquare !== startSquare){
            console.log("move will be made")
            console.log("start square: ", startSquare)
            console.log("endSquare: ", endSquare)
        }
    }
    
    return (
        <div id={id} onClick={handleSquareClick}
            className={`${className} ${(selectedSquare === id) ? 'selected' : ''}`}>
            {rankLabel && <div className="rank square-label">{rank}</div>}
            {fileLabel && <div className="file square-label">{file.toLowerCase()}</div>}
            {pieceObj && <ChessPiece pieceObj={pieceObj}/>}
            {movingOptions && movingOptions.has(id) && 
                <div className="suggested-square" onClick={makeMove}></div>
            }
            {takingOptions && takingOptions.has(id) && 
                <div className="suggested-capture" onClick={makeMove}></div>
            }
        </div>
    )

}

export default ChessSquare