window.addEventListener('resize', newPosition, false);

function newPosition(EO) {
    EO = EO || window.event;

    var newCoords = getCoordsA();
    var cellsA = document.getElementsByClassName('elem');
    for (var k = 0; k < cellsA.length; k++){
            var coordsCell = getCoordsCell(cellsA[k]);
            if(coordsCell[0] != -1){
                cellsA[k].style.left = newCoords[coordsCell[0]][coordsCell[1]][0] + 'px';
                cellsA[k].style.top = newCoords[coordsCell[0]][coordsCell[1]][1] + 'px';
            }
            if (coordsCell[0] == -1){
                cellsA[k].style.left = newCoords[0][coordsCell[1]][0] + 'px';
                //cellsA[k].style.top = newCoords[coordsCell[0]][coordsCell[1]][1] + 'px';
            }


    }

    for (var i = 0; i < coordsA.length; i++){
        for (var j = 0; j < coordsA[i].length; j++){
            coordsA[i][j][0]= newCoords[i][j][0];
            coordsA[i][j][1] = newCoords[i][j][1];
        }
    }

}