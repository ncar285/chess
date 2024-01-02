// // import { clickMove } from "../../Utils/pieceMovement";
// import { useSelector } from "react-redux";
// import ChessPiece from "../ChessPiece/ChessPiece";
// import { getHighlightedSquare, getMoveOptions, getSelected, getTakeOptions } from "../../store/uiReducer";
// import "./ChessSquare.css"

// function ChessSquare( {squareParams, updateBoard} ) {

//     const {id, className, rankLabel, fileLabel, pieceObj} = squareParams;
//     const [file, rank] = id.split("");

//     const selectedSquare = useSelector(getSelected);

//     const movingOptions = useSelector(getMoveOptions);
//     const takingOptions = useSelector(getTakeOptions);

//     const highlightedSquare = useSelector(getHighlightedSquare);

//     function handleSquareClick(e){
//         const square = e.target.id;
//         if (selectedSquare && square !== selectedSquare){
//             if (movingOptions && movingOptions.has(square)){
//                 playMoveIfValid(selectedSquare, square);
//             } else if (takingOptions && takingOptions.has(square)){
//                 playMoveIfValid(selectedSquare, square);
//             }

//         }
//     }


    
//     return (
//         <div id={id} onClick={handleSquareClick}
//             className={`${className} 

//             ${(selectedSquare === id) ? 'selected' : ''}
//             ${(highlightedSquare === id) ? 'highlight' : ''}`}>

//             {rankLabel && <div className="rank square-label">{rank}</div>}
//             {fileLabel && <div className="file square-label">{file.toLowerCase()}</div>}
//             {pieceObj && <ChessPiece pieceObj={pieceObj} updateBoard={updateBoard}/>}
//             {movingOptions && movingOptions.has(id) && 
//                 <div className="suggested-square" onClick={makeMove}></div>
//             }
//             {takingOptions && takingOptions.has(id) && 
//                 <div className="suggested-capture" onClick={makeMove}></div>
//             }
//         </div>
//     )

// }

// export default ChessSquare