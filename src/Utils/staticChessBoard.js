// const STATIC_WHITE_BOARD = [];
// for (let a = 7 ; a  >= 0 ; a-- ){
//     STATIC_WHITE_BOARD.push([]);
//     const rank = a + 1;
//     for (let b = 0 ; b  < 8 ; b++ ){
//         const color = ((a + b) % 2 === 0) ? "brown" : "white"
//         const file = indexToFile(b);
//         const len = STATIC_WHITE_BOARD.length;
//         STATIC_WHITE_BOARD[len-1].push({file, rank, color});
//     }
// }

import { indexToFile } from "./posIdConversion";

// const STATIC_BLACK_BOARD = [];
// for (let a = 0 ; a < 8 ; a++ ){
//     STATIC_BLACK_BOARD.push([]);
//     const rank = a + 1;
//     for (let b = 0 ; b  < 8 ; b++ ){
//         const color = ((a + b) % 2 === 0) ? "brown" : "white"
//         const file = indexToFile(b);
//         const len = STATIC_BLACK_BOARD.length;
//         STATIC_BLACK_BOARD[len-1].push({file, rank, color});
//     }
// }

// export STATIC_WHITE_BOARD
// export STATIC_BLACK_BOARD


// const indexToFile = (index) => {
//     // Your implementation of indexToFile function
//     // ...

//     return /* calculated file */;
// };

const generateStaticBoard = (isWhite) => {
    const staticBoard = [];

    for (let a = isWhite ? 7 : 0; isWhite ? a >= 0 : a < 8; isWhite ? a-- : a++) {
        staticBoard.push([]);
        const rank = a + 1;

        for (let b = 0; b < 8; b++) {
            const color = (a + b) % 2 === 0 ? "brown" : "white";
            const file = indexToFile(b);
            const len = staticBoard.length;

            staticBoard[len - 1].push({ file, rank, color });
        }
    }

    return staticBoard;
};

export const STATIC_WHITE_BOARD = generateStaticBoard(true);
export const STATIC_BLACK_BOARD = generateStaticBoard(false);