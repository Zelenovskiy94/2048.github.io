function showMenu () {

    var menu_to_open =  document.querySelector('.versions');
    if (!document.querySelector('.versions.open')){
        menu_to_open.style.position='absolute';
        menu_to_open.style.visibility = 'hidden'
        menu_to_open.style.height='auto';
        var TargetHeight=menu_to_open.offsetHeight;

        menu_to_open.style.height='0px';
        menu_to_open.style.position='';
        menu_to_open.style.visibility='';

        setTimeout(function() { menu_to_open.style.height=TargetHeight+"px"; }, 0);
        menu_to_open.className = 'versions open';
        document.querySelector('.chevron').src = 'img/chevron_up.png'
    }
    else {
        menu_to_open.style.height = 0 + 'px';
        menu_to_open.className = 'versions';
        document.querySelector('.chevron').src = 'img/chevron_down.png'
    }

}