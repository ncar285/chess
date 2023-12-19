export function posToId(pos){
    const [a,b] =  pos;
    const charCode = 'a'.charCodeAt(0) + b;
    const rank = a + 1;
    const file = String.fromCharCode(charCode);
    return `${rank}-${file}`
}

export function idToPos(id){
    // debugger
    const [rank, file] = id.split('-');
    const b = file.charCodeAt(0) - 'a'.charCodeAt(0);
    const a = parseInt(rank) - 1;
    return [a,b];
}
