function Board(){
    this.kingCollection = [];
    this.destination = null;
    this.board = [];
    for(var i = 0; i < 8; i++){
        this.board[i] = [];
        for(var j=0; j< 8; j++){
            this.board[i][j] = null;
        }
    }
}

Board.prototype.setupPieces = function(){
    for (var i = 0; i < 8; i++){
        this.board[6][i] = new Pawn(6,i,'white');
        this.board[1][i] = new Pawn(1,i,'black');
    }

    var king1 = new King(0,4,'black');
    var king2 = new King(7,4,'white');

    this.board[0][0] = new Rook(0,0,'black');
    this.board[0][7] = new Rook(0,7,'black');
    this.board[0][2] = new Bishop(0,2,'black');
    this.board[0][5] = new Bishop(0,5,'black');
    this.board[0][1] = new Knight(0,1,'black');
    this.board[0][6] = new Knight(0,6,'black');
    this.board[0][3] = new Queen(0,3,'black');
    this.board[0][4] = king1;
    this.board[7][0] = new Rook(7,0,'white');
    this.board[7][7] = new Rook(7,7,'white');
    this.board[7][2] = new Bishop(7,2,'white');
    this.board[7][5] = new Bishop(7,5,'white');
    this.board[7][1] = new Knight(7,1,'white');
    this.board[7][6] = new Knight(7,6,'white');
    this.board[7][3] = new Queen(7,3,'white');
    this.board[7][4] = king2;

    // populate collection of kings
    this.kingCollection.push(king1);
    this.kingCollection.push(king2);

    for (var i = 0; i < 8; i++){
        for (var j = 0; j < 8; j++){
            var loc = $("div").find("[row="+i +"]"+"[col="+j+"]").attr('loc');
            if (this.board[i][j] != null) this.board[i][j].loc = loc;
        }
    }
}

Board.prototype.updatePiecesInCell = function(piece, x, y){
    this.board[piece.xx][piece.yy] = null;
    piece.moveTo(x,y);
    this.board[piece.xx][piece.yy] = piece;
}

Board.prototype.checkIfPathIsFree = function(from_x, from_y, to_x, to_y){
    var direction_x = from_x > to_x ? 1 : -1;
    var direction_y = from_y > to_y ? 1 : -1;

    var row = Math.abs(from_x - to_x);
    var col = Math.abs(from_y - to_y);

    if  (row > col) var diff = row;
    else var diff = col;

    for (var i = 1; i < diff; i++){
        var new_x = parseInt(to_x) +i*direction_x;
        var new_y = parseInt(to_y)+i*direction_y;
        if (row > col){
            var element = this.board[new_x][to_y];
            if (element != null) return true;
        }else if (col > row){
            var element = this.board[to_x][new_y];
            if (element != null) return true;
        }else{
            var element = this.board[new_x][new_y];
            if (element != null) return true;
        }
    }
    return false;
}

Board.prototype.findThreateningPiece = function(king){
    var threat = null;
    for(var i = 0; i < 8; i++){
        for (var j = 0; j < 8; j++){
            var piece = this.board[i][j];
            if (piece != null){
                if (piece.checkIfMoveIsValid(this, king.xx, king.yy) && king.colour != piece.colour) {
                    threat = piece;
                    return threat;
                }
            }
        }
    }
    return threat;
}

Board.prototype.checkIfLegalMovesLeft = function(king){
    var places = king.checkWhereCanHide(this);
    var counter = 0;
    places.length == 0 ? counter = 1 : counter = places.length;
    while (places.length ){
        var cors = places.pop();
        var x = cors[0];
        var y = cors[1];
        for(var i = 0; i < 8; i++){
            for (var j = 0; j < 8; j++){
                var piece = this.board[i][j];
                if (piece != null){
                    if (piece.checkIfMoveIsValid(this, x, y) && king.colour != piece.colour) {
                        counter -= 1;
                    }
                }
            }
        }
    }
    if (counter > 0) return true;
    else return false;
}
