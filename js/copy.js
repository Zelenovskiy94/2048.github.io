'use strict'


function DeepCopy(data) {
    if (data === null){
        return null;
    }
    if (typeof (data) == 'string' || typeof (data) == 'number'){
        return data;
    }

    if (Array.isArray(data)){
        var A2 = [];
        for (var i = 0; i < data.length; i++){
            A2.push(DeepCopy(data[i]));
        }
        return A2;
    }
    if (typeof data == 'object'){
        var H2 = {};
        for (var key in data){
            H2[key] = DeepCopy(data[key]);
        }
        return H2;
    }
    return data;
}
function Comp(array1, array2) {
    for (var i = 0; i < array1.length; i++){
        for (var j = 0; j < array1[i].length; j++){
            for (var k = 0; k < array1[i][j].length; k++){
                if (array1[i][j][k] != array2[i][j][k])
                    return false;
            }
        }
    }
    return true;
}

