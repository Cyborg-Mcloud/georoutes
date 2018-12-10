function fadeSubMenu(menu) {
    menu = $('.menu-left-sub-' + menu);
    if (menu.css("display") == "block") {
        menu.fadeOut();
    }
    else {
        var hasDiv = false;
        $('.menu-left-sub').each(function() {
            if ($(this).css("display") == "block") hasDiv = $(this);
        })
        if (hasDiv) {
            console.log(hasDiv);
            $(hasDiv).fadeOut(400, function() {
                menu.fadeIn();
            })
        } else {
            menu.fadeIn();
        }
    }
}