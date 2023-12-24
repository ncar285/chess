export function posToId(pos){
    const [a,b] =  pos;
    const rank = a + 1;
    const file = indexToFile(b);
    // const charCode = 'a'.charCodeAt(0) + b;
    // const file = String.fromCharCode(charCode);
    return `${file}${rank}`
}

export function idToPos(id){
    const [rank, file] = id.split('-');
    // const b = file.charCodeAt(0) - 'a'.charCodeAt(0);
    const b = fileToPos(file);
    const a = parseInt(rank) - 1;
    return [a,b];
}

export function indexToFile(index){
    const charCode = 'A'.charCodeAt(0) + index;
    return String.fromCharCode(charCode)
}

export function fileToPos(file){
    return file.charCodeAt(0) - 'A'.charCodeAt(0);
}
