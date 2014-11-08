function Piece(xx,yy,colour){
    this.xx = xx;
    this.yy = yy;
    this.colour = colour;
    this.loc = '';
    this.setId();
}

Piece.prototype.setId = function(){
    var loc = $("div").find("[row="+this.xx+"]"+"[col="+this.yy+"]").attr('loc');
    this.loc = loc;
}

Piece.prototype.moveTo = function(to_x, to_y){
    this.xx = parseInt(to_x);
    this.yy = parseInt(to_y);
    this.setId();
}

Piece.prototype.checkPieceMovementBoundaries = function(to_x, to_y){
    return true;
}

Piece.prototype.checkIfMoveIsValid = function(board, to_x, to_y){
    var destination = board.destination;//board.board[to_x][to_y];
    var move = this.checkPieceMovementBoundaries(to_x, to_y);
    path_blocked = board.checkIfPathIsFree(this.xx, this.yy, to_x, to_y);
    if (destination != null){
        if (destination.colour != this.colour){
            if (move && !path_blocked) return true;
        }
    }else{
        if (move && !path_blocked) return true;
    }
    return false;
}
