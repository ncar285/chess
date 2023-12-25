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
    
    return (
        <div id={id} className={`${className} ${(selectedSquare === id) ? 'selected' : ''}`}>
            {rankLabel && <div className="rank square-label">{rank}</div>}
            {fileLabel && <div className="file square-label">{file.toLowerCase()}</div>}
            {pieceObj && <ChessPiece pieceObj={pieceObj}/>}
            {movingOptions && movingOptions.has(id) && <div className="suggested-square"></div>}
            {takingOptions && takingOptions.has(id) && <div className="suggested-capture"></div>}
        </div>
    )

}

export default ChessSquare