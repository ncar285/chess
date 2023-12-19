export function updateBoard(startSquare, endSquare) {
    // debugger;
    // Get the DOM elements for the start and end squares
    const startSquareElement = document.getElementById(startSquare);
    const endSquareElement = document.getElementById(endSquare);

    // Find the image element within the start square
    const imageElement = startSquareElement.querySelector('img');

    // If an image is found in the start square, remove it
    if (imageElement) {
        startSquareElement.removeChild(imageElement);
    }

    // Check if there's already an image in the end square, remove it
    const existingImageElement = endSquareElement.querySelector('img');
    if (existingImageElement) {
        endSquareElement.removeChild(existingImageElement);
    }

    // Append the image element to the end square
    endSquareElement.appendChild(imageElement);
}