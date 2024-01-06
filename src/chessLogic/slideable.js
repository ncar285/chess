import { Board } from "./board";

export class Slideable {
    constructor(board, currentPosition) {
        this.board = board;
        this.currentPosition = currentPosition;
    }

    calculateMoves(piece, dirs) {
        const color = piece.getColor();
        const isWhite = color === "white";
        const opponentColor = isWhite ? "black" : "white";

        const moves = [];
        const takes = [];
        dirs.forEach(dir=>{
            const dX = dir[0];
            const dY = dir[1];
            let newPos = [this.currentPosition[0],this.currentPosition[1]];
            newPos = [newPos[0]+dX,newPos+dY];

            while (Board.isInsideBoard(newPos) && !this.board.isOccupiedByColor(newPos,color)){
                if (!this.board.isOccupiedByColor(newPos,opponentColor)){
                    moves.push(newPos);
                } else {
                    takes.push(newPos);
                    break;
                }

                newPos = [newPos[0]+dX,newPos+dY];
            }

        })

        return [moves,takes];
    }
}