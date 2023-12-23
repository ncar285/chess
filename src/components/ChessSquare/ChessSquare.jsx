import { clickMove } from "../../Utils/pieceMovement";

function ChessSquare(squareParams) {

    const {id, className, rankLabel, fileLabel, color} = squareParams;
    const [rank, file] = id.split("-");
    
    return (
        <div onClick={clickMove} id={id} className={className}>
            {rankLabel &&
                <div className="rank square-label">{rank}</div>
            }
            {rankLabel &&
                <div className="file square-label">{file}</div>
            }
        </div>
    )

}

export default ChessSquare