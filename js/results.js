var resultsH = {};
var resA=[];
var count ;

function showResult(ResultH) {
    var game_version = 'classic'
    if (document.querySelector('.hide_result')){
        var hide_result = document.querySelector('.hide_result');
        document.querySelector('.game_wrapper').removeChild(hide_result);
    }
    if (!document.querySelector('.result_container')){
        var results_container = document.createElement('div');
        results_container.className = 'result_container';

        var img_close = document.createElement('img');
        img_close.setAttribute('src','img/close.png');

        img_close.className = 'close';
        img_close.setAttribute('onclick', 'closeResult('+ '\'' + game_version+'\''+');');

        results_container.innerHTML = '<div class="title_result">Лучшие результаты</div>';

        var result;
        resA=JSON.parse(ResultH.result);

        resA = resA.sort(CompareRes);
        var counter = resA.length;
        if (resA.length > 10)
            counter = 10;
        for (var i = 1; i <= counter; i++){
            result = document.createElement('div');
            result.className='result';
            result.textContent = i + '. ' + resA[i-1];
            results_container.appendChild(result);
        }
        results_container.appendChild(img_close);
        document.querySelector('.game_wrapper').appendChild(results_container)
    }

}

function closeResult(game_version) {
    var results_container = document.querySelector('.result_container');
        results_container.className = 'hide_result';

}

function CompareRes(a, b)
{
    if ( a < b )  return 1;
    if ( a > b )  return -1;
    return 0;
}

function gameOver(result, game) {
    Vibro();
    var text;
    var count_div = document.querySelector('.count');
    count = parseInt(count_div.textContent);
    document.querySelector('.text_game_over').textContent = '';
    if (result == 'lose')
        text = 'Game over!';
    if (result == 'win')
        text = 'You Win';
    document.querySelector('.text_game_over').innerHTML = text + '<br/><span class="your_result"> Ваш результат:' + count + '</span>';

    document.querySelector('.game_over').style.display = 'block';


    document.removeEventListener('keydown', movingCell, false);
    StoreInfo(StringName1);
}



var AjaxHandlerScript="http://fe.it-academy.by/AjaxStringStorage2.php";
var UpdatePassword;
var StringName1='Max_Zeleniy';


newSting(StringName1);

function newSting(string) {
    $.ajax(
        {
            url : AjaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'INSERT', n : string, v: JSON.stringify([])},
            error : ErrorHandler
        }
    );
}

function RestoreInfo(string)
{
    $.ajax(
        {
            url : AjaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'READ', n : string },
            success : showResult, error : ErrorHandler
        }
    );
}

function StoreInfo(string)
{
    UpdatePassword=Math.random();
    $.ajax(
        {
            url : AjaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'LOCKGET', n : string, p : UpdatePassword },
            success : LockGetReady, error : ErrorHandler
        }
    );
}

function UpdateReady(ResultH)
{
}

function LockGetReady(ResultH)
{
        // if (!Array.isArray(ResultH.result)){
        //     $.ajax(
        //         {
        //             url : AjaxHandlerScript, type : 'POST', cache : false, dataType:'json',
        //             data : { f : 'UPDATE', n : StringName, v : JSON.stringify([count]), p : UpdatePassword },
        //             success : UpdateReady, error : ErrorHandler
        //         }
        //     );
        // }

            resA=JSON.parse(ResultH.result);

            resA.push(count);

            if (resA.length>2){
                resA.sort(CompareRes);

            }
            if (resA.length>10)
                resA.splice(10, resA.length);

            $.ajax(
                {
                    url : AjaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                    data : { f : 'UPDATE', n : StringName1, v : JSON.stringify(resA), p : UpdatePassword },
                    success : UpdateReady, error : ErrorHandler
                }
            );

}


function ErrorHandler(jqXHR,StatusStr,ErrorStr)
{
  
}

function showRecordClassic(ResultH) {
    var  record_div = document.querySelector('.record');
    resA = JSON.parse(ResultH.result).sort(CompareRes);
    if (record_div.textContent != resA[0])
        record_div.textContent = resA[0];
}

function RestoreInfoForRecordClassic()
{
    $.ajax(
        {
            url : AjaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'READ', n : StringName1 },
            success : showRecordClassic, error : ErrorHandler
        }
    );
}



