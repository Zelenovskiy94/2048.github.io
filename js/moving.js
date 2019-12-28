var gameContainer = document.querySelector('.game_container');


function number(elem) {
    var num;
    var rand = random(0,2);
    if (rand == '0' || rand == '1'){
        num = document.createTextNode('2');
        elem.appendChild(num);
        elem.setAttribute('class', 'elem elem_2 new_elem');
    }
    if (rand == '2'){
        num = document.createTextNode('4');
        elem.appendChild(num);
        elem.setAttribute('class', 'elem elem_4 new_elem');
    }
    return elem;
}
function getCoordsA() {
    var coordinates = [];
    var cellsA = document.getElementsByClassName('cell');
    for(var i = 0; i < 4; i++){
        var coordCellRow=[];
        for (var j = 0 ; j < 4; j++){
            var coordCell=[];
            var left = cellsA[i*4+j].offsetLeft;
            var top = cellsA[i*4+j].offsetTop;
            coordCell.push(left);
            coordCell.push(top);
            coordCell.push(false);
            coordCellRow.push(coordCell)
        }
        coordinates.push(coordCellRow);
    }
    return coordinates;
}


function random(min, max) {
    return min + Math.floor(Math.random() * (max + 1 - min));
}


function callingMovingDown(count) {

    for (var i = 0; i < count; i++){
        movingElem(1, 0);
    }
    return;
}

function movingElem(coefRow, coefColumn) {
    var movingCellA = document.getElementsByClassName('elem');

    for (var i =0; i < movingCellA.length; i++){
        var leftCoord = parseInt(movingCellA[i].style.left);
        var topCoord = parseInt(movingCellA[i].style.top);

        var row;
        var column;

        for (var k = 0; k < 4; k++){
            for (var l = 0; l < 4; l++){
                if (coordsA[k][l][0] == leftCoord && coordsA[k][l][1] == topCoord){
                    row = k;
                    column = l;
                }
            }
        }

        if((coefRow > 0 && row<3 && coordsA[row+coefRow][column][2]== false) ||
            (coefRow < 0 && row>0 && coordsA[row+coefRow][column][2]== false) ||
            (coefColumn > 0 && column < 3 &&  coordsA[row][column + coefColumn][2] == false) ||
            (coefColumn < 0 && column >0 && coordsA[row][column + coefColumn][2] == false)
        ){

            movingCellA[i].style.top = coordsA[row+coefRow][column][1] + 'px';
            movingCellA[i].style.left = coordsA[row][column + coefColumn][0] + 'px';

            coordsA[row + coefRow][column + coefColumn][2] = true;
            coordsA[row + coefRow][column + coefColumn][3] = parseInt(movingCellA[i].textContent);
            coordsA[row][column][2] = false;
        }
        if(movingCellA[i].textContent == 2){
            colorCell(movingCellA[i])
        }
    }

    return;
}

function additionCellDown() {
    var movingCellAdd = document.getElementsByClassName('elem');


    for (var i =0; i < movingCellAdd.length; i++) {
        var leftCoord = parseInt(movingCellAdd[i].style.left);
        var topCoord = parseInt(movingCellAdd[i].style.top);

        var row;
        var column;
        for (var k = 0; k < 4; k++) {
            for (var l = 0; l < 4; l++) {
                if (coordsA[k][l][0] == leftCoord && coordsA[k][l][1] == topCoord) {
                    row = k;
                    column = l;
                }
            }
        }
        if ((row ==0 && coordsA[row + 1][column][2] == true  && parseInt(movingCellAdd[i].textContent) == coordsA[row + 1][column][3] && coordsA[row + 2][column][2] == true && parseInt(movingCellAdd[i].textContent) == coordsA[row + 2][column][3] && coordsA[row + 3][column][2] == true && parseInt(movingCellAdd[i].textContent) == coordsA[row + 3][column][3])
            || (row ==1 && coordsA[row - 1][column][2] == true  && parseInt(movingCellAdd[i].textContent) == coordsA[row - 1][column][3] && coordsA[row +1][column][2] == true  && parseInt(movingCellAdd[i].textContent) == coordsA[row + 1][column][3] && coordsA[row + 2][column][2] == true && parseInt(movingCellAdd[i].textContent) == coordsA[row + 2][column][3] )
            || (row ==2 && coordsA[row - 2][column][2] == true  && parseInt(movingCellAdd[i].textContent) == coordsA[row - 2][column][3] && coordsA[row -1][column][2] == true  && parseInt(movingCellAdd[i].textContent) == coordsA[row - 1][column][3] && coordsA[row + 1][column][2] == true && parseInt(movingCellAdd[i].textContent) == coordsA[row + 1][column][3] )){
            var fullrow = true;
            for (var g = 0; g < movingCellAdd.length; g++) {
                var left = parseInt(movingCellAdd[g].style.left);
                var top = parseInt(movingCellAdd[g].style.top);
                if (left == coordsA[3][column][0] && top == coordsA[3][column][1]) {
                    movingCellAdd[g].style.display = 'none';
                }
                if (left == coordsA[2][column][0] && top == coordsA[2][column][1]) {
                    movingCellAdd[g].style.top = coordsA[3][column][1] + 'px';
                    movingCellAdd[g].textContent = parseInt(movingCellAdd[g].textContent) * 2;
                    coordsA[3][column][3] = parseInt(movingCellAdd[g].textContent);

                    plus_count += parseInt(movingCellAdd[g].textContent);

                    colorCell(movingCellAdd[g]);
                }
                if (left == coordsA[1][column][0] && top == coordsA[1][column][1]){
                    movingCellAdd[g].style.display = 'none';
                    coordsA[1][column][2] = false;
                }
                if (left == coordsA[0][column][0] && top == coordsA[0][column][1]) {
                    movingCellAdd[g].style.top = coordsA[2][column][1] + 'px';
                    movingCellAdd[g].textContent = parseInt(movingCellAdd[g].textContent) * 2;
                    coordsA[2][column][3] = parseInt(movingCellAdd[g].textContent);

                    plus_count += parseInt(movingCellAdd[g].textContent);

                    colorCell(movingCellAdd[g]);
                    coordsA[0][column][2] = false;
                }
            }
            continue;
        }
        if ( !fullrow && row < 2 && coordsA[row + 1][column][2] == true  && parseInt(movingCellAdd[i].textContent) == coordsA[row + 1][column][3] && coordsA[row + 2][column][2] == true && parseInt(movingCellAdd[i].textContent) == coordsA[row + 2][column][3]) {

            fullrow = true;
            for (var g=0; g < movingCellAdd.length; g++) {
                var left = parseInt(movingCellAdd[g].style.left);
                var top = parseInt(movingCellAdd[g].style.top);
                if (left == coordsA[row + 2][column][0] && top == coordsA[row + 2][column][1]){
                    movingCellAdd[g].style.display = 'none';

                }
                if (left == coordsA[row + 1][column][0] && top == coordsA[row + 1][column][1]){
                    movingCellAdd[g].style.top = coordsA[row + 2][column][1] + 'px';
                    movingCellAdd[g].textContent = parseInt(movingCellAdd[g].textContent) * 2;
                    coordsA[row + 2][column][3] =parseInt(movingCellAdd[g].textContent);

                    plus_count += parseInt(movingCellAdd[g].textContent);

                    colorCell(movingCellAdd[g]);
                }
            }
            movingCellAdd[i].style.top = coordsA[row + 1][column][1] + 'px';

            coordsA[row][column][2] = false;
            continue;
        }

        if (!fullrow && row < 3 && coordsA[row + 1][column][2] == true  && parseInt(movingCellAdd[i].textContent) == coordsA[row + 1][column][3]) {
            for (var g=0; g < movingCellAdd.length; g++) {
                var left = parseInt(movingCellAdd[g].style.left);
                var top = parseInt(movingCellAdd[g].style.top);
                if (left == coordsA[row + 1][column][0] && top == coordsA[row + 1][column][1]){
                    movingCellAdd[g].style.display = 'none';

                }
            }
            movingCellAdd[i].style.top = coordsA[row + 1][column][1] + 'px';
            movingCellAdd[i].textContent = parseInt(movingCellAdd[i].textContent) * 2;
            coordsA[row + 1][column][3] =parseInt(movingCellAdd[i].textContent);

            plus_count += parseInt(movingCellAdd[i].textContent);

            colorCell(movingCellAdd[i]);

            coordsA[row][column][2] = false;
        }
    }


    return;
}

function callingMovingUp(count) {

    for (var i = 0; i < count; i++){
        movingElem(-1, 0);
    }
    return;
}

function additionCellUp() {

    var movingCellAdd = document.getElementsByClassName('elem');

    for (var i = 0; i < movingCellAdd.length; i++) {
        var leftCoord = parseInt(movingCellAdd[i].style.left);
        var topCoord = parseInt(movingCellAdd[i].style.top);

        var row;
        var column;
        for (var k = 0; k < 4; k++) {
            for (var l = 0; l < 4; l++) {
                if (coordsA[k][l][0] == leftCoord && coordsA[k][l][1] == topCoord) {
                    row = k;
                    column = l;
                }
            }
        }
        if ((row ==0 && coordsA[row + 1][column][2] == true  && parseInt(movingCellAdd[i].textContent) == coordsA[row + 1][column][3] && coordsA[row + 2][column][2] == true && parseInt(movingCellAdd[i].textContent) == coordsA[row + 2][column][3] && coordsA[row + 3][column][2] == true && parseInt(movingCellAdd[i].textContent) == coordsA[row + 3][column][3])
            || (row ==1 && coordsA[row - 1][column][2] == true  && parseInt(movingCellAdd[i].textContent) == coordsA[row - 1][column][3] && coordsA[row +1][column][2] == true  && parseInt(movingCellAdd[i].textContent) == coordsA[row + 1][column][3] && coordsA[row + 2][column][2] == true && parseInt(movingCellAdd[i].textContent) == coordsA[row + 2][column][3] )
            || (row ==2 && coordsA[row - 2][column][2] == true  && parseInt(movingCellAdd[i].textContent) == coordsA[row - 2][column][3] && coordsA[row -1][column][2] == true  && parseInt(movingCellAdd[i].textContent) == coordsA[row - 1][column][3] && coordsA[row + 1][column][2] == true && parseInt(movingCellAdd[i].textContent) == coordsA[row + 1][column][3] )){
            var fullrow = true;
            for (var g = 0; g < movingCellAdd.length; g++) {
                var left = parseInt(movingCellAdd[g].style.left);
                var top = parseInt(movingCellAdd[g].style.top);
                if (left == coordsA[0][column][0] && top == coordsA[0][column][1]) {
                    movingCellAdd[g].style.display = 'none';
                }
                if (left == coordsA[1][column][0] && top == coordsA[1][column][1]) {
                    movingCellAdd[g].style.top = coordsA[0][column][1] + 'px';
                    movingCellAdd[g].textContent = parseInt(movingCellAdd[g].textContent) * 2;
                    coordsA[0][column][3] = parseInt(movingCellAdd[g].textContent);

                    plus_count += parseInt(movingCellAdd[g].textContent);

                    colorCell(movingCellAdd[g]);
                }
                if (left == coordsA[2][column][0] && top == coordsA[2][column][1]){
                    movingCellAdd[g].style.display = 'none';
                    coordsA[2][column][2] = false;
                }
                if (left == coordsA[3][column][0] && top == coordsA[3][column][1]) {
                    movingCellAdd[g].style.top = coordsA[1][column][1] + 'px';
                    movingCellAdd[g].textContent = parseInt(movingCellAdd[g].textContent) * 2;
                    coordsA[1][column][3] = parseInt(movingCellAdd[g].textContent);

                    plus_count += parseInt(movingCellAdd[g].textContent);

                    colorCell(movingCellAdd[g]);
                    coordsA[3][column][2] = false;
                }
            }
            continue;
        }
        if (!fullrow && row > 1 && coordsA[row - 1][column][2] == true && parseInt(movingCellAdd[i].textContent) == coordsA[row - 1][column][3] && coordsA[row - 2][column][2] == true && parseInt(movingCellAdd[i].textContent) == coordsA[row - 2][column][3]) {
            fullrow = true;
            for (var g = 0; g < movingCellAdd.length; g++) {
                var left = parseInt(movingCellAdd[g].style.left);
                var top = parseInt(movingCellAdd[g].style.top);
                if (left == coordsA[row - 2][column][0] && top == coordsA[row - 2][column][1]) {
                    movingCellAdd[g].style.display = 'none';
                }
                if (left == coordsA[row - 1][column][0] && top == coordsA[row - 1][column][1]) {
                    movingCellAdd[g].style.top = coordsA[row - 2][column][1] + 'px';
                    movingCellAdd[g].textContent = parseInt(movingCellAdd[g].textContent) * 2;
                    coordsA[row - 2][column][3] = parseInt(movingCellAdd[g].textContent);

                    plus_count += parseInt(movingCellAdd[g].textContent);

                    colorCell(movingCellAdd[g]);
                }
            }
            movingCellAdd[i].style.top = coordsA[row - 1][column][1] + 'px';
            coordsA[row][column][2] = false;
            continue;
        }
        if (!fullrow && row > 0 && coordsA[row - 1][column][2] === true && parseInt(movingCellAdd[i].textContent) === coordsA[row - 1][column][3]) {

            for (var g = 0; g < movingCellAdd.length; g++) {
                var left = parseInt(movingCellAdd[g].style.left);
                var top = parseInt(movingCellAdd[g].style.top);
                if (left === coordsA[row - 1][column][0] && top === coordsA[row - 1][column][1]) {
                    movingCellAdd[g].style.display = 'none';

                }
            }

            movingCellAdd[i].style.top = coordsA[row - 1][column][1] + 'px';
            movingCellAdd[i].textContent = parseInt(movingCellAdd[i].textContent) * 2;
            coordsA[row - 1][column][3] = parseInt(movingCellAdd[i].textContent);

            plus_count += parseInt(movingCellAdd[i].textContent);

            colorCell(movingCellAdd[i]);

            coordsA[row][column][2] = false;
        }
    }
    return;


}

function callingMovingRight(count) {

    for (var i = 0; i < count; i++) {
        movingElem(0, 1);
    }
    return;
}

function additionCellRight() {
    var movingCellAdd = document.getElementsByClassName('elem');

    for (var i = 0; i < movingCellAdd.length; i++) {
        var leftCoord = parseInt(movingCellAdd[i].style.left);
        var topCoord = parseInt(movingCellAdd[i].style.top);

        var row;
        var column;
        for (var k = 0; k < 4; k++) {
            for (var l = 0; l < 4; l++) {
                if (coordsA[k][l][0] == leftCoord && coordsA[k][l][1] == topCoord) {
                    row = k;
                    column = l;
                }
            }
        }
        if ((column ==0 && coordsA[row][column + 1][2] == true  && parseInt(movingCellAdd[i].textContent) == coordsA[row][column + 1][3] && coordsA[row][column + 2][2] == true && parseInt(movingCellAdd[i].textContent) == coordsA[row][column + 2][3] && coordsA[row][column + 3][2] == true && parseInt(movingCellAdd[i].textContent) == coordsA[row][column + 3][3])
            || (column ==1 && coordsA[row][column - 1][2] == true  && parseInt(movingCellAdd[i].textContent) == coordsA[row][column - 1][3] && coordsA[row][column + 1][2] == true  && parseInt(movingCellAdd[i].textContent) == coordsA[row][column + 1][3] && coordsA[row][column + 2][2] == true && parseInt(movingCellAdd[i].textContent) == coordsA[row][column + 2][3] )
            || (column ==2 && coordsA[row][column - 2][2] == true  && parseInt(movingCellAdd[i].textContent) == coordsA[row][column - 2][3] && coordsA[row][column -1][2] == true  && parseInt(movingCellAdd[i].textContent) == coordsA[row][column - 1][3] && coordsA[row][column + 1][2] == true && parseInt(movingCellAdd[i].textContent) == coordsA[row][column + 1][3] )){
            var fullcolumn = true;
            for (var g = 0; g < movingCellAdd.length; g++) {
                var left = parseInt(movingCellAdd[g].style.left);
                var top = parseInt(movingCellAdd[g].style.top);
                if (left == coordsA[row][3][0] && top == coordsA[row][3][1]) {
                    movingCellAdd[g].style.display = 'none';
                }
                if (left == coordsA[row][2][0] && top == coordsA[row][2][1]) {
                    movingCellAdd[g].style.left = coordsA[row][3][0] + 'px';
                    movingCellAdd[g].textContent = parseInt(movingCellAdd[g].textContent) * 2;
                    coordsA[row][3][3] = parseInt(movingCellAdd[g].textContent);

                    plus_count += parseInt(movingCellAdd[g].textContent);

                    colorCell(movingCellAdd[g]);
                }
                if (left == coordsA[row][1][0] && top == coordsA[row][1][1]){
                    movingCellAdd[g].style.display = 'none';
                    coordsA[row][1][2] = false;
                }
                if (left == coordsA[row][0][0] && top == coordsA[row][0][1]) {
                    movingCellAdd[g].style.left = coordsA[row][2][0] + 'px';
                    movingCellAdd[g].textContent = parseInt(movingCellAdd[g].textContent) * 2;
                    coordsA[row][2][3] = parseInt(movingCellAdd[g].textContent);

                    plus_count += parseInt(movingCellAdd[g].textContent);

                    colorCell(movingCellAdd[g]);
                    coordsA[row][0][2] = false;
                }
            }
            continue;
        }
        if (!fullcolumn && column < 2 && coordsA[row][column + 1][2] == true && parseInt(movingCellAdd[i].textContent) == coordsA[row][column + 1][3] && coordsA[row][column + 2][2] == true && parseInt(movingCellAdd[i].textContent) == coordsA[row][column + 2][3]) {
            fullcolumn = true;
            for (var g = 0; g < movingCellAdd.length; g++) {
                var left = parseInt(movingCellAdd[g].style.left);
                var top = parseInt(movingCellAdd[g].style.top);
                if (left == coordsA[row][column + 2][0] && top == coordsA[row][column + 2][1]) {
                    movingCellAdd[g].style.display = 'none';
                }
                if (left == coordsA[row][column + 1][0] && top == coordsA[row][column + 1][1]) {
                    movingCellAdd[g].style.left = coordsA[row][column + 2][0] + 'px';
                    movingCellAdd[g].textContent = parseInt(movingCellAdd[g].textContent) * 2;
                    coordsA[row][column + 2][3] = parseInt(movingCellAdd[g].textContent);

                    plus_count += parseInt(movingCellAdd[g].textContent);

                    colorCell(movingCellAdd[g]);
                }
            }
            movingCellAdd[i].style.left = coordsA[row][column + 1][0] + 'px';

            coordsA[row][column][2] = false;
            //coordsA[row][column].pop();
            continue;
        }
        if (!fullcolumn && column < 3 && coordsA[row][column + 1][2] == true && parseInt(movingCellAdd[i].textContent) == coordsA[row][column + 1][3]) {
            for (var g = 0; g < movingCellAdd.length; g++) {
                var left = parseInt(movingCellAdd[g].style.left);
                var top = parseInt(movingCellAdd[g].style.top);
                if (left == coordsA[row][column + 1][0] && top == coordsA[row][column + 1][1]) {
                    movingCellAdd[g].style.display = 'none';

                }
            }
            movingCellAdd[i].style.left = coordsA[row][column + 1][0] + 'px';
            movingCellAdd[i].textContent = parseInt(movingCellAdd[i].textContent) * 2;
            coordsA[row][column + 1][3] = parseInt(movingCellAdd[i].textContent);

            plus_count += parseInt(movingCellAdd[i].textContent);

            colorCell(movingCellAdd[i]);

            coordsA[row][column][2] = false;
            //coordsA[row][column].pop();
        }
    }
    return;
}

function callingMovingLeft(count) {
    for (var i = 0; i < count; i++) {
        movingElem(0, -1);
    }
    return ;
}

function additionCellLeft() {
    var movingCellAdd = document.getElementsByClassName('elem');

    for (var i = 0; i < movingCellAdd.length; i++) {
        var leftCoord = parseInt(movingCellAdd[i].style.left);
        var topCoord = parseInt(movingCellAdd[i].style.top);

        var row;
        var column;
        for (var k = 0; k < 4; k++) {
            for (var l = 0; l < 4; l++) {
                if (coordsA[k][l][0] == leftCoord && coordsA[k][l][1] == topCoord) {
                    row = k;
                    column = l;
                }
            }
        }

        if ((column ==0 && coordsA[row][column + 1][2] == true  && parseInt(movingCellAdd[i].textContent) == coordsA[row][column + 1][3] && coordsA[row][column + 2][2] == true && parseInt(movingCellAdd[i].textContent) == coordsA[row][column + 2][3] && coordsA[row][column + 3][2] == true && parseInt(movingCellAdd[i].textContent) == coordsA[row][column + 3][3])
            || (column ==1 && coordsA[row][column - 1][2] == true  && parseInt(movingCellAdd[i].textContent) == coordsA[row][column - 1][3] && coordsA[row][column + 1][2] == true  && parseInt(movingCellAdd[i].textContent) == coordsA[row][column + 1][3] && coordsA[row][column + 2][2] == true && parseInt(movingCellAdd[i].textContent) == coordsA[row][column + 2][3] )
            || (column ==2 && coordsA[row][column - 2][2] == true  && parseInt(movingCellAdd[i].textContent) == coordsA[row][column - 2][3] && coordsA[row][column -1][2] == true  && parseInt(movingCellAdd[i].textContent) == coordsA[row][column - 1][3] && coordsA[row][column + 1][2] == true && parseInt(movingCellAdd[i].textContent) == coordsA[row][column + 1][3] )){
            var fullcolumn = true;
            for (var g = 0; g < movingCellAdd.length; g++) {
                var left = parseInt(movingCellAdd[g].style.left);
                var top = parseInt(movingCellAdd[g].style.top);
                if (left == coordsA[row][0][0] && top == coordsA[row][0][1]) {
                    movingCellAdd[g].style.display = 'none';
                }
                if (left == coordsA[row][1][0] && top == coordsA[row][1][1]) {
                    movingCellAdd[g].style.left = coordsA[row][0][0] + 'px';
                    movingCellAdd[g].textContent = parseInt(movingCellAdd[g].textContent) * 2;
                    coordsA[row][0][3] = parseInt(movingCellAdd[g].textContent);

                    plus_count += parseInt(movingCellAdd[g].textContent);

                    colorCell(movingCellAdd[g]);
                }
                if (left == coordsA[row][2][0] && top == coordsA[row][2][1]){
                    movingCellAdd[g].style.display = 'none';
                    coordsA[row][2][2] = false;
                }
                if (left == coordsA[row][3][0] && top == coordsA[row][3][1]) {
                    movingCellAdd[g].style.left = coordsA[row][1][0] + 'px';
                    movingCellAdd[g].textContent = parseInt(movingCellAdd[g].textContent) * 2;
                    coordsA[row][1][3] = parseInt(movingCellAdd[g].textContent);

                    plus_count += parseInt(movingCellAdd[g].textContent);

                    colorCell(movingCellAdd[g]);
                    coordsA[row][3][2] = false;
                }
            }
            continue;
        }

        if (!fullcolumn && column > 1 && coordsA[row][column - 1][2] == true && parseInt(movingCellAdd[i].textContent) == coordsA[row][column - 1][3] && coordsA[row][column - 2][2] == true && parseInt(movingCellAdd[i].textContent) == coordsA[row][column - 2][3]) {
            fullcolumn = true;
            for (var g = 0; g < movingCellAdd.length; g++) {
                var left = parseInt(movingCellAdd[g].style.left);
                var top = parseInt(movingCellAdd[g].style.top);
                if (left == coordsA[row][column - 2][0] && top == coordsA[row][column - 2][1]) {
                    movingCellAdd[g].style.display = 'none';

                }
                if (left == coordsA[row][column - 1][0] && top == coordsA[row][column - 1][1]) {
                    movingCellAdd[g].style.left = coordsA[row][column - 2][0] + 'px';
                    movingCellAdd[g].textContent = parseInt(movingCellAdd[g].textContent) * 2;
                    coordsA[row][column - 2][3] = parseInt(movingCellAdd[g].textContent);

                    plus_count += parseInt(movingCellAdd[g].textContent);

                    colorCell(movingCellAdd[g]);


                }
            }


            movingCellAdd[i].style.left = coordsA[row][column - 1][0] + 'px';

            coordsA[row][column][2] = false;
            //coordsA[row][column].pop();
            continue;
        }

        if (!fullcolumn && column > 0 && coordsA[row][column - 1][2] == true && parseInt(movingCellAdd[i].textContent) == coordsA[row][column - 1][3]) {
            for (var g = 0; g < movingCellAdd.length; g++) {
                var left = parseInt(movingCellAdd[g].style.left);
                var top = parseInt(movingCellAdd[g].style.top);
                if (left == coordsA[row][column - 1][0] && top == coordsA[row][column - 1][1]) {
                    movingCellAdd[g].style.display = 'none';

                }
            }
            movingCellAdd[i].style.left = coordsA[row][column - 1][0] + 'px';
            movingCellAdd[i].textContent = parseInt(movingCellAdd[i].textContent) * 2;
            coordsA[row][column - 1][3] = parseInt(movingCellAdd[i].textContent);

            plus_count += parseInt(movingCellAdd[i].textContent);

            colorCell(movingCellAdd[i]);

            coordsA[row][column][2] = false;
            //coordsA[row][column].pop();
        }
    }
    return;
}

function colorCell(cell) {
    if (cell.textContent == '2'){
        cell.setAttribute('class', 'elem elem_2')
    }
    if (cell.textContent == '4'){
        cell.setAttribute('class', 'elem elem_4')
    }
    if (cell.textContent == '8'){
        cell.setAttribute('class', 'elem elem_8')
    }
    if (cell.textContent == '16'){
        cell.setAttribute('class', 'elem elem_16')
    }
    if (cell.textContent == '32'){
        cell.setAttribute('class', 'elem elem_32')
    }
    if (cell.textContent == '64'){
        cell.setAttribute('class', 'elem elem_64')
    }
    if (cell.textContent == '128'){
        cell.setAttribute('class', 'elem elem_128')
    }
    if (cell.textContent == '256'){
        cell.setAttribute('class', 'elem elem_256')
    }
    if (cell.textContent == '512'){
        cell.setAttribute('class', 'elem elem_512')
    }
    if (cell.textContent == '1024'){
        cell.setAttribute('class', 'elem elem_1024')
    }
    if (cell.textContent == '2048'){
        cell.setAttribute('class', 'elem elem_2048')
    }
    return;
}

var coordsA = [];

var plus_count = 0;

var clickAudio = new Audio('sound/click.mp3')
function ClickSoundInit()
{
    
    clickAudio.play(); // запускаем звук
    clickAudio.pause(); // и сразу останавливаем
}

function ClickSound()
{
    clickAudio.currentTime=0; // в секундах
    clickAudio.play();
}

function Vibro()
{
    if ( navigator.vibrate ) // есть поддержка Vibration API?
    {
            window.navigator.vibrate(200); // вибрация 300мс
    }
}
function changeGame(game) {
    var answer = confirm('Вы потеряте результат игры, Вы уверены?')
    if (answer){
        document.location.href='index.html'
    }
}


function getCoordsCell(moving_cell) {
    var left = parseInt(moving_cell.style.left);
    var top = parseInt(moving_cell.style.top);
    var column;
    var row;
    switch (left){
        case coordsA[0][0][0]:
            column = 0;
            break;
        case coordsA[0][1][0]:
            column = 1;
            break;
        case coordsA[0][2][0]:
            column = 2;
            break;
        case coordsA[0][3][0]:
            column = 3;
            break;
    }

    switch (top){
        case coordsA[0][0][1]:
            row = 0;
            break;
        case coordsA[1][0][1]:
            row = 1;
            break;
        case coordsA[2][0][1]:
            row = 2;
            break;
        case coordsA[3][0][1]:
            row = 3;
            break;
        default:
            row = -1;
    }
    return [row,column]


}

coordsA = getCoordsA();




