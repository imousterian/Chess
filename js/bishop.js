Bishop.prototype = new Piece();
Bishop.prototype.constructor = Bishop;

function Bishop(xx,yy,colour){
    this.xx = xx;
    this.yy = yy;
    this.colour = colour;
    this.loc = '';
    this.setId();
}

Bishop.prototype.checkPieceMovementBoundaries = function(to_x, to_y){
    if (Piece.prototype.checkPieceMovementBoundaries.call(this)) {
        if (Math.abs(this.xx - to_x) == Math.abs(this.yy - to_y)) return true;
    }
}
