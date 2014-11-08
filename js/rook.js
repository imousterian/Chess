Rook.prototype = new Piece();
Rook.prototype.constructor = Rook;

function Rook(xx,yy,colour){
    this.xx = xx;
    this.yy = yy;
    this.colour = colour;
    this.loc = '';
    this.setId();
}

Rook.prototype.checkPieceMovementBoundaries = function(to_x, to_y){
    if (Piece.prototype.checkPieceMovementBoundaries.call(this)) {
        if (this.xx == to_x || this.yy == to_y) return true;
    }
}
