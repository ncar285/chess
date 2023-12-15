function mapPieceImages(attributes){
    const [type, color] = attributes;
    let name = "";
    name += (color === "white") ? "w_" : "b_";
    name += type;
    
}