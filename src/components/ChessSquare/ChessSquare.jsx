import { clickMove } from "../../Utils/pieceMovement";
import ChessPiece from "../ChessPiece/ChessPiece";

function ChessSquare(squareParams) {

    const {id, className, rankLabel, fileLabel, pieceObj} = squareParams;
    const [rank, file] = id.split("-");

    let source = "";

    if (pieceObj){
        const name = `${pieceObj.getColor() === "white" ? "w_" : "b_"}${pieceObj.getType()}`;
        source = `../../assets/images/pieces/${name}.png`;
    }
    
    return (
        <div onClick={clickMove} id={id} className={className}>

            {rankLabel &&<div className="rank square-label">{rank}</div>}
            
            {fileLabel && <div className="file square-label">{file}</div>}

            {pieceObj && <ChessPiece pieceObj={pieceObj} source={source}/>}

        </div>
    )

}

export default ChessSquare