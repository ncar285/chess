// Piece images
import b_bishop from '../assets/pieces/b_bishop.png'
import w_bishop from '../assets/pieces/w_bishop.png'
import b_king from '../assets/pieces/b_king.png'
import w_king from '../assets/pieces/w_king.png'
import b_knight from '../assets/pieces/b_knight.png'
import w_knight from '../assets/pieces/w_knight.png'
import b_pawn from '../assets/pieces/b_pawn.png'
import w_pawn from '../assets/pieces/w_pawn.png'
import b_queen from '../assets/pieces/b_queen.png'
import w_queen from '../assets/pieces/w_queen.png'
import b_rook from '../assets/pieces/b_rook.png'
import w_rook from '../assets/pieces/w_rook.png'

export const PIECE_IMAGES = {
    'b_bishop': b_bishop,
    'w_bishop': w_bishop,
    'b_king': b_king,
    'w_king': w_king,
    'b_knight': b_knight,
    'w_knight': w_knight,
    'w_pawn': w_pawn,
    'b_pawn': b_pawn,
    'b_queen': b_queen,
    'w_queen': w_queen,
    'b_rook': b_rook,
    'w_rook': w_rook
};

export const FEN_PIECE_IMAGES = {
    'b': b_bishop,
    'B': w_bishop,
    'k': b_king,
    'K': w_king,
    'n': b_knight,
    'N': w_knight,
    'p': b_pawn,
    'P': w_pawn,
    'q': b_queen,
    'Q': w_queen,
    'r': b_rook,
    'R': w_rook
};

export const PIECE_NAMES = {
    'b': "black bishop",
    'B': "white bishop",
    'k': "black king",
    'K': "white king",
    'n': "black knight",
    'N': "white knight",
    'p': "black pawn",
    'P': "white pawn",
    'q': "black queen",
    'Q': "white queen",
    'r': "black rook",
    'R': "white rook"
};