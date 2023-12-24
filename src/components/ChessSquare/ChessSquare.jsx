// import { clickMove } from "../../Utils/pieceMovement";
import { useSelector } from "react-redux";
import ChessPiece from "../ChessPiece/ChessPiece";
import { getSelected } from "../../store/uiReducer";
import "./ChessSquare.css"

function ChessSquare( {squareParams} ) {

    const {id, className, rankLabel, fileLabel, pieceObj} = squareParams;
    const [file, rank] = id.split("");

    const selectedSquare = useSelector(getSelected);
    
    return (
        <div id={id} className={`${className} ${(selectedSquare === id) ? 'selected' : ''}`}>
            {rankLabel && <div className="rank square-label">{rank}</div>}
            {fileLabel && <div className="file square-label">{file.toLowerCase()}</div>}
            {pieceObj && <ChessPiece pieceObj={pieceObj}/>}
        </div>
    )

}

export default ChessSquare