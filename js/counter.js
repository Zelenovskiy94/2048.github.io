'use strict'
function counter() {
    if (plus_count != 0) {
        var count = document.querySelector('.count');
        var old_count = parseInt(count.textContent);


        count.textContent = old_count + plus_count;
        var plus_count_div = document.createElement('div');
        plus_count_div.textContent = '+' + plus_count;
        plus_count_div.className = 'plus_count'
        count.appendChild(plus_count_div);

        plus_count = 0;
}

}