Pawn.prototype = new Piece();
Pawn.prototype.constructor = Pawn;

function Pawn(xx,yy,colour){
    this.xx = xx;
    this.yy = yy;
    this.colour = colour;
    this.loc = '';
    this.stepCounter = 2;
    this.setId();
}

Pawn.prototype.decrementStepCounter = function(){
    this.stepCounter -= 1;
}

Pawn.prototype.determineStepCounter = function(to_x){
    var step = 0;
    if (this.stepCounter > 1){
        if (Math.abs(this.xx - to_x) == 1){
            step = 1;
        }else if (Math.abs(this.xx - to_x) == 2){
            step = 2;
        }
    }else{
        step = 1;
    }
    return step;
}

Pawn.prototype.checkPieceMovementBoundaries = function(to_x, to_y){
    var step = this.determineStepCounter(to_x);

    if (Piece.prototype.checkPieceMovementBoundaries.call(this)){
        if (this.colour == 'white'){
            if (to_x == (this.xx - step) && (to_y == this.yy)){
                return true;
            }else{
                return false;
            }
        }else {
            if (to_x == (this.xx + step) && (to_y == this.yy)){
                return true;
            }else{
                return false;
            }
        }
    }
}

Pawn.prototype.canCaptureEnemy = function(to_x, to_y){
    var x = Math.abs(this.xx - to_x);
    var y = Math.abs(this.yy - to_y);
    if (this.xx != to_x && this.yy != to_y && x <= 1 && y <= 1){
        return true;
    }else{
        return false;
    }
}

Pawn.prototype.checkIfMoveIsValid = function(board, to_x, to_y){
    var destination = board.destination;
    if (destination == null){
        return this.checkPieceMovementBoundaries(to_x, to_y);
    }else{
        if (destination.colour != this.colour && this.canCaptureEnemy(to_x, to_y)) {
            return true;
        }
    }
}
