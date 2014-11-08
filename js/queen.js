Queen.prototype = new Piece();
Queen.prototype.constructor = Queen;

function Queen(xx,yy,colour){
    this.xx = xx;
    this.yy = yy;
    this.colour = colour;
    this.loc = '';
    this.setId();
}

Queen.prototype.checkPieceMovementBoundaries = function(to_x, to_y){
    var x = Math.abs(this.xx - to_x);
    var y = Math.abs(this.yy - to_y);
    if (Piece.prototype.checkPieceMovementBoundaries.call(this)) {
        if ((this.xx == to_x) || (this.yy == to_y) || (x == y) ){
            return true;
        }else{
            return false;
        }
    }
}
