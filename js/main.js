

document.addEventListener('keydown', movingCell, false);

function beginGame() {
    for(var i = 0; i < 2; i++){
        createNewElem();
    }
}

function movingCell(EO) {
    EO = EO || window.event;
    EO.preventDefault();

    if (EO.keyCode == '40'){
        var coordsACopy = DeepCopy(coordsA);
        callingMovingDown(3);
        additionCellDown();
        deleteElem();
        callingMovingDown(2);
    }
    if (EO.keyCode == '38'){
        var coordsACopy = DeepCopy(coordsA);
        callingMovingUp(3);
        additionCellUp();
        deleteElem();
        callingMovingUp(2);
    }
    if (EO.keyCode == '39'){
        var coordsACopy = DeepCopy(coordsA);
        callingMovingRight(3);
        additionCellRight();
        deleteElem();
        callingMovingRight(2);
    }
    if (EO.keyCode == '37'){
        var coordsACopy = DeepCopy(coordsA);
        callingMovingLeft(3);
        additionCellLeft();
        deleteElem();
        callingMovingLeft(2);
    }
    if (EO.keyCode == '37' || EO.keyCode == '38'|| EO.keyCode == '39' || EO.keyCode == '40'){
        var res_game_over = testGameOver();
        if(res_game_over[0])
            gameOver(res_game_over[1], 'classic')
        if (!(Comp(coordsACopy, coordsA))){
            ClickSound();
            createNewElem();
    }

    }


    counter();


}

function createNewElem() {

    var elem = document.createElement('div');
    number(elem);

    var elemInArray = getRandomCell(0, 3);
    elemInArray[3] = parseInt(elem.textContent);

    elem.style.left = elemInArray[0] + 'px';
    elem.style.top = elemInArray[1] +'px';
    gameContainer.appendChild(elem);
}

function getRandomCell(min, max) {
    var row = random(min,max);
    var cell = random(min,max);
    if (!(coordsA[row][cell][2])){
        coordsA[row][cell][2]=true;
        return coordsA[row][cell];
    }
    else{
        return getRandomCell(0, 3);
    }

}

function deleteElem() {
    var movingCellA = document.getElementsByClassName('elem');
    var movingCellForDeleteA = [];
    for (var j = 0; j < movingCellA.length; j++){
        if (movingCellA[j].style.display == 'none'){
            movingCellForDeleteA.push(movingCellA[j])
        }
    }
    for (var i = 0; i<movingCellForDeleteA.length; i++){
        document.querySelector('.game_container').removeChild(movingCellForDeleteA[i]);
    }
}

function testGameOver() {
    var res = true;
    var res2 = 'lose';
    for (var i = 0; i < coordsA.length; i++){
        for (var j = 0; j < coordsA[i].length; j++){
            if (coordsA[i][j][2] == true){
                if (coordsA[i][j][3] == 2048)
                    res2 = 'win'
                if (j < coordsA[i].length - 1 && coordsA[i][j+1][2] == true && coordsA[i][j][3] == coordsA[i][j+1][3])
                    res = false;
                if (i < coordsA.length-1 && coordsA[i+1][j][2] == true && coordsA[i][j][3] == coordsA[i+1][j][3])
                    res = false
            }
            if (coordsA[i][j][2] == false)
                res = false;
        }
    }
    return [res, res2];
}

function newGame() {
    RestoreInfoForRecordClassic();
    ClickSoundInit();
    document.addEventListener('keydown', movingCell, false);

    document.querySelector('.count').textContent = 0;

    document.querySelector('.game_over').style.display = 'none';
    for (var i = 0; i < coordsA.length; i++){
        for (var j = 0; j < coordsA[i].length; j++){
            coordsA[i][j][2] = false;
        }
    }
    var elemsA = document.getElementsByClassName('elem');
    var elemForDeleteA=[]
    for (var j = 0; j < elemsA.length; j++){
        elemForDeleteA.push(elemsA[j])
    }
    for (var k = 0; k < elemForDeleteA.length; k++){
        document.querySelector('.game_container').removeChild(elemForDeleteA[k]);
    }
    document.querySelector('.text_game_over').textContent = '';
    beginGame();
}



beginGame();
RestoreInfoForRecordClassic();