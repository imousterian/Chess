Knight.prototype = new Piece();
Knight.prototype.constructor = Knight;

function Knight(xx,yy,colour){
    this.xx = xx;
    this.yy = yy;
    this.colour = colour;
    this.loc = '';
    this.setId();
}

Knight.prototype.checkPieceMovementBoundaries = function(to_x, to_y){
    var x = Math.abs(this.xx - to_x);
    var y = Math.abs(this.yy - to_y);
    if (Piece.prototype.checkPieceMovementBoundaries.call(this)) {
        if ((x * 2 == 4 && y == 1) || (x * 2 == 2 && y == 2) ) return true;
    }
}

Knight.prototype.checkIfMoveIsValid = function(board, to_x, to_y){
    return this.checkPieceMovementBoundaries(to_x, to_y);
}
