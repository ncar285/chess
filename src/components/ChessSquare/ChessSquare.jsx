// import { clickMove } from "../../Utils/pieceMovement";
import { useSelector } from "react-redux";
import ChessPiece from "../ChessPiece/ChessPiece";
import "./ChessSquare.css"
import { getSelected } from "../../store/uiReducer";
import { useEffect } from "react";

function ChessSquare( {squareParams} ) {

    const {id, className, rankLabel, fileLabel, pieceObj} = squareParams;
    const [file, rank] = id.split("");

    const selectedSquare = useSelector(getSelected);
    let fullClassName = className;
    useEffect(()=>{
        if (selectedSquare === id) fullClassName = `${className} selected`;
        console.log("fullClassName", fullClassName)
    }, [selectedSquare])

    let source = "";

    if (pieceObj){
        const name = `${pieceObj.getColor() === "white" ? "w_" : "b_"}${pieceObj.getType()}`;
        source = `/src/pieces/${name}.png`;
    }
    
    return (
        <div id={id} className={fullClassName}>
            {rankLabel && <div className="rank square-label">{rank}</div>}
            {fileLabel && <div className="file square-label">{file.toLowerCase()}</div>}
            {pieceObj && <ChessPiece pieceObj={pieceObj} source={source}/>}
        </div>
    )

}

export default ChessSquare