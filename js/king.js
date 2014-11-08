King.prototype = new Piece();
King.prototype.constructor = King;

function King(xx,yy,colour){
    this.xx = xx;
    this.yy = yy;
    this.colour = colour;
    this.loc = '';
    this.setId();
}

King.prototype.checkPieceMovementBoundaries = function(to_x, to_y){
    var x = Math.abs(this.xx - to_x);
    var y = Math.abs(this.yy - to_y);
    if (Piece.prototype.checkPieceMovementBoundaries.call(this)) {
        if (x >= 0 && x <= 1 && y >= 0 && y <= 1 ){
            return true;
        }else{
            return false;
        }
    }
}

King.prototype.checkWhereCanHide = function(board){
    var places = [];
    var moves = [[this.xx - 1,this.yy], [this.xx - 1, this.yy - 1], [this.xx, this.yy - 1], [this.xx + 1, this.yy - 1], [this.xx + 1, this.yy], [this.xx + 1, this.yy + 1], [this.xx, this.yy + 1], [this.xx - 1, this.yy + 1]];
    for (var i = 0; i < moves.length; i++){
        var option = moves[i];
        to_x = option[0];
        to_y = option[1];
        if (to_x < 0 || to_y < 0 || to_x > 7 || to_y > 7){
        }else{
            if (this.checkPieceMovementBoundaries(to_x, to_y)){
                var cell = board.board[to_x][to_y];
                if (cell == null) {
                    places.push([to_x,to_y]);
                }else{
                    if (cell.colour != this.colour) places.push([to_x,to_y]);
                }
            }
        }
    }
    return places;
}
