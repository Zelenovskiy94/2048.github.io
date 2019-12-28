'use strict';
var game = {
    container:null,
    moveStart: null, //координаты начала жеста
    moveState:0, //0 - нет жеста, 1 - начался непонятно какой, 2 - жест влево, 3 - жест вправо, 4 - жест вверх, 5 - жест вниз
    mouseDebug: false // разрешена ли отладка мышью вместо тачскрина
};
game.container = document.querySelector('.game_container');
addTouch(false);
function addTouch(mouseDebug){
    game.mouseDebug = mouseDebug;
    if (mouseDebug){

        game.container.addEventListener('mousedown', move_mouseDown, false);
        game.container.addEventListener('mouseup', move_mouseUp, false);
    }
    else {
        game.container.addEventListener('touchstart', move_touchStart, false);
        game.container.addEventListener('touchend', move_touchEnd, false);
    }
}

function move_anyStart(EO, X, Y) {
    EO.preventDefault();
    game.MoveStart={ x:X, y:Y };
    game.MoveState=1; // начался жест (пока непонятно какой)
    if ( game.mouseDebug )
        game.container.addEventListener("mousemove",move_mouseMove,false);
    else
        game.container.addEventListener("touchmove",move_touchMove,false);
}
function move_anyMove(EO,MoveX,MoveY)
{
    EO.preventDefault();
    if ( game.MoveState==1 )
    {
        var HorzShift=Math.abs(MoveX-game.MoveStart.x);
        var VertShift=Math.abs(MoveY-game.MoveStart.y);
        if ( HorzShift>VertShift ) {
            // по горизонтали касание сместилось больше чем по вертикали -
            // значит это наш жест
            // если в ту сторону можно сместиться:
            // переводим состояние в 2, начинаем смещать контейнер,
            // и не пропускаем событие выше
            // если нельзя:
            // переводим состояние в 0, снимаем обработчики перемещения

            if (MoveX > game.MoveStart.x) {

                var coordsACopy = DeepCopy(coordsA);
                callingMovingRight(3);
                additionCellRight();
                deleteElem();
                callingMovingRight(2);
                EO.preventDefault();
            }

            else {

                var coordsACopy = DeepCopy(coordsA);
                callingMovingLeft(3);
                additionCellLeft();
                deleteElem();
                callingMovingLeft(2);
                EO.preventDefault();
            }
            game.MoveState=0; // нет жеста
            game.container.removeEventListener("mousemove",move_mouseMove,false);
            game.container.removeEventListener("touchmove",move_touchMove,false);

        }
        else if ( VertShift>HorzShift )
        {
            if (MoveY > game.MoveStart.y) {
                EO.preventDefault();
                var coordsACopy = DeepCopy(coordsA);
                callingMovingDown(3);
                additionCellDown();
                deleteElem();
                callingMovingDown(2);
                EO.preventDefault();
            }
            else{
                EO.preventDefault();
                var coordsACopy = DeepCopy(coordsA);
                callingMovingUp(3);
                additionCellUp();
                deleteElem();
                callingMovingUp(2);
                EO.preventDefault();
            }
            game.MoveState=0; // нет жеста
            game.container.removeEventListener("mousemove",move_mouseMove,false);
            game.container.removeEventListener("touchmove",move_touchMove,false);

        }
        else
        {
            // касание не сдвинуто или сдвинуто ровно по диагонали
            // ситуация неясная, ничего не делаем
        }
        if (!(Comp(coordsACopy, coordsA)))
            createNewElem();

        counter();


    }
}

function move_anyEnd(EO,X, Y)
{
    // жест по-любому закончен, наш или не наш
    game.container.removeEventListener("mousemove",move_mouseMove,false);
    game.container.removeEventListener("touchmove",move_touchMove,false);
    game.container.MoveState=0; // нет жеста
}

function move_mouseDown(EO) {
    move_anyStart(EO, EO.pageX, EO.pageY);
}
function move_touchStart(EO) {
    if ( EO.touches.length==1 )
        move_anyStart(EO,EO.touches[0].pageX,EO.touches[0].pageY);
}

function move_mouseUp(EO)
{
    move_anyEnd(EO,EO.pageX, EO.pageY);
}

function move_touchEnd(EO)
{
    // если отпущено непоследнее касание - игнорируем
    if ( !EO.touches.length )
        move_anyEnd(EO,EO.changedTouches[0].pageX);
}

function move_mouseMove(EO)
{
    // вызываем универсальную функцию для любого перемещения - и мыши, и пальца
    move_anyMove(EO,EO.pageX,EO.pageY);
}

function move_touchMove(EO)
{
    // даже если касаний несколько - работаем только с самым первым
    // вызываем универсальную функцию для любого перемещения - и мыши, и пальца
    move_anyMove(EO,EO.touches[0].pageX,EO.touches[0].pageY);
}

