$(function(){

    var gridPreparer = new GridPreparer();
    gridPreparer.prepareGrid();

    var game = new Game();

    $('.grid').click(function(){
        $('.grid').removeClass('selected');
        $(this).addClass('selected');
        game.playGame($(this));
    });

    $('#button_wrapper').click(function(){
        location.reload();
    });
});

function Game(){
    var board = new Board();
    board.setupPieces();
    var chessPiece = null;
    var playerTurns = 0;
    var winner = null;

    var GameState = {
        NO_CLICKS: 0,
        ONE_CLICK: 1,
    }

    var clicks = GameState.NO_CLICKS;
    var king = null;

    this.determineWinner = function(board){
        playerTurns % 2 == 0 ? king = board.kingCollection[0] : king = board.kingCollection[1];
        board.destination = king;
        var underCheck = board.findThreateningPiece(king);
        var legalMoves = board.checkIfLegalMovesLeft(king);
        if (legalMoves && underCheck != null){
            alert("Check!");
        }else if (!legalMoves && underCheck != null){
            alert("CheckMate!");
        }else if (!legalMoves && underCheck == null){
            alert("StaleMate!");
        }
        return winner;
    }

    this.gameOver = function(piece){
        if (this.determineWinner(board) != null){
            $("#winner_name").text(piece.constructor.name + " " + winner.colour);
            alert("Thanks for playing!");
        }
    }

    this.playGame = function($element){
        if (winner == null){
            var turn = this.returnPlayerTurn(playerTurns, board);
            if (clicks == GameState.NO_CLICKS){
                var at_x = $element.attr("row");
                var at_y = $element.attr("col");
                chessPiece = board.board[at_x][at_y];
                if (chessPiece != null) {
                    if (chessPiece.colour == turn){
                        clicks = GameState.ONE_CLICK;
                    }else{
                        clicks = GameState.NO_CLICKS;
                    }
                } else clicks = GameState.NO_CLICKS;
            } else if (clicks == GameState.ONE_CLICK) {
                var to_x = $element.attr("row");
                var to_y = $element.attr("col");
                board.destination = board.board[to_x][to_y];
                if (chessPiece.checkIfMoveIsValid(board, to_x, to_y)){
                    if (chessPiece instanceof Pawn) chessPiece.decrementStepCounter();
                    $("div").find("[loc="+chessPiece.loc+"]").removeClass('piece').empty();
                    board.updatePiecesInCell(chessPiece, to_x, to_y);
                    $("div").find("[loc="+chessPiece.loc+"]").removeClass('piece').empty();
                    this.displayBoard(chessPiece,to_x,to_y);
                    this.updateTable(chessPiece);
                    $('.grid').removeClass('selected');
                    this.gameOver(chessPiece);
                    playerTurns += 1;
                }else{
                    $('.grid').removeClass('selected');
                    alert("Invalid move");
                }
                clicks = GameState.NO_CLICKS;
            }

        }
    }

    this.updateTable = function(chess){
        if (chess.colour == 'white'){
            $('.whites > tbody').append('<tr><td>'+ chess.constructor.name + " " + chess.loc+'</td></tr>');
        }else{
            $('.blacks > tbody').append('<tr><td>'+ chess.constructor.name + " " + chess.loc+'</td></tr>');
        }
    }

    this.returnPlayerTurn = function(playerTurns,board){
        var player = null;
        playerTurns % 2 == 0 ? player = board.kingCollection[1] : player = board.kingCollection[0];
        return player.colour;
    }

    this.displayBoard = function(piece, row, col){
        if (piece.colour == "black"){
            if (piece instanceof Pawn){
                $("div").find("[row="+row+"]"+"[col="+col+"]").addClass('piece').prepend('<img src="images/bP.png"/>');
            }
            if (piece instanceof Bishop){
                $("div").find("[row="+row+"]"+"[col="+col+"]").addClass('piece').prepend('<img src="images/bB.png"/>');
            }
            if (piece instanceof Rook){
                $("div").find("[row="+row+"]"+"[col="+col+"]").addClass('piece').prepend('<img src="images/bR.png"/>');
            }
            if (piece instanceof Knight){
                $("div").find("[row="+row+"]"+"[col="+col+"]").addClass('piece').prepend('<img src="images/bN.png"/>');
            }
            if (piece instanceof King){
                $("div").find("[row="+row+"]"+"[col="+col+"]").addClass('piece').prepend('<img src="images/bK.png"/>');
            }
            if (piece instanceof Queen){
                $("div").find("[row="+row+"]"+"[col="+col+"]").addClass('piece').prepend('<img src="images/bQ.png"/>');
            }
        }else if (piece.colour == "white"){
            if (piece instanceof Pawn){
                $("div").find("[row="+row+"]"+"[col="+col+"]").addClass('piece').prepend('<img src="images/wP.png"/>');
            }
            if (piece instanceof Bishop){
                $("div").find("[row="+row+"]"+"[col="+col+"]").addClass('piece').prepend('<img src="images/wB.png"/>');
            }
            if (piece instanceof Rook){
                $("div").find("[row="+row+"]"+"[col="+col+"]").addClass('piece').prepend('<img src="images/wR.png"/>');
            }
            if (piece instanceof Knight){
                $("div").find("[row="+row+"]"+"[col="+col+"]").addClass('piece').prepend('<img src="images/wN.png"/>');
            }
            if (piece instanceof King){
                $("div").find("[row="+row+"]"+"[col="+col+"]").addClass('piece').prepend('<img src="images/wK.png"/>');
            }
            if (piece instanceof Queen){
                $("div").find("[row="+row+"]"+"[col="+col+"]").addClass('piece').prepend('<img src="images/wQ.png"/>');
            }
        }
    }
}

