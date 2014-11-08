function GridPreparer(){

    this.prepareGrid = function(){
        $(".grid").remove();
        var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        for (var i = 0; i < 8; i++){
            for (var j = 0; j < 8; j++){
                this.createCells(letters, i, j);
                this.createCellLabels(letters, i, j);
            }
        }

        $('.cell').each(function(index){
            $(this).addClass((parseInt(index / 8) + index) % 2 == 0 ? 'light' : 'dark');
        })

        for (var i = 0; i < 8; i++){
            $("div").find("[row="+1+"]"+"[col="+i+"]").addClass('piece').prepend('<img src="images/bP.png"/>');
            $("div").find("[row="+6+"]"+"[col="+i+"]").addClass('piece').prepend('<img src="images/wP.png"/>');
        }

        $("div").find("[row="+0+"]"+"[col="+0+"]").addClass('piece').prepend('<img src="images/bR.png"/>');
        $("div").find("[row="+0+"]"+"[col="+7+"]").addClass('piece').prepend('<img src="images/bR.png"/>');
        $("div").find("[row="+0+"]"+"[col="+1+"]").addClass('piece').prepend('<img src="images/bN.png"/>');
        $("div").find("[row="+0+"]"+"[col="+6+"]").addClass('piece').prepend('<img src="images/bN.png"/>');
        $("div").find("[row="+0+"]"+"[col="+2+"]").addClass('piece').prepend('<img src="images/bB.png"/>');
        $("div").find("[row="+0+"]"+"[col="+5+"]").addClass('piece').prepend('<img src="images/bB.png"/>');
        $("div").find("[row="+0+"]"+"[col="+3+"]").addClass('piece').prepend('<img src="images/bQ.png"/>');
        $("div").find("[row="+0+"]"+"[col="+4+"]").addClass('piece').prepend('<img src="images/bK.png"/>');
        $("div").find("[row="+7+"]"+"[col="+0+"]").addClass('piece').prepend('<img src="images/wR.png"/>');
        $("div").find("[row="+7+"]"+"[col="+7+"]").addClass('piece').prepend('<img src="images/wR.png"/>');
        $("div").find("[row="+7+"]"+"[col="+1+"]").addClass('piece').prepend('<img src="images/wN.png"/>');
        $("div").find("[row="+7+"]"+"[col="+6+"]").addClass('piece').prepend('<img src="images/wN.png"/>');
        $("div").find("[row="+7+"]"+"[col="+2+"]").addClass('piece').prepend('<img src="images/wB.png"/>');
        $("div").find("[row="+7+"]"+"[col="+5+"]").addClass('piece').prepend('<img src="images/wB.png"/>');
        $("div").find("[row="+7+"]"+"[col="+3+"]").addClass('piece').prepend('<img src="images/wQ.png"/>');
        $("div").find("[row="+7+"]"+"[col="+4+"]").addClass('piece').prepend('<img src="images/wK.png"/>');
    }

    this.createCells = function(letters,i,j){
        d = document.createElement('div');
        $(d).addClass("grid");
        $(d).data("value", { row: i, col: j } );
        $(d).attr("id", i*8+j+1);
        $(d).attr("col", j );
        $(d).attr("row", i );
        $(d).css("left", parseInt(j * 70, 10) + "px");
        $(d).css("top", parseInt(i * 70, 10) + "px");
        $(d).attr('loc', (8-i) + letters[j]);
        $(d).appendTo($('.wrapper'));
    }

    this.createCellLabels = function(letters,i,j){
        d = document.createElement('div');
        $(d).addClass("cell");
        $(d).css("left", parseInt(j * 70, 10) + "px");
        $(d).css("top", parseInt(i * 70, 10) + "px");
        $(d).text((8-i) + letters[j]);
        // $(d).text(i*8+j+1);
        $(d).appendTo($('.wrapper'));
    }
}
