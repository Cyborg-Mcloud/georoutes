// (_) |           (_)          (_)       / _|    (_) |    | |   (_)                 | |     (_) |                                         (_) |   | |             | |            (_)                          | |  
//   _| | ____ _     _ ___ ______ _ ___   | |_ __ _ _| | ___| |__  _    __ _  __ _  __| | __ _ _| |_ __ _ _ __   ___    __ ___   _______   ___| |_  | |__   ___   __| |_   _ ______ _ ___    __ _  __ _ _ __ ___| |_ 
//  | | |/ / _` |   | / __|______| / __|  |  _/ _` | | |/ _ \ '_ \| |  / _` |/ _` |/ _` |/ _` | | __/ _` | '_ \ / _ \  / _` \ \ / / _ \ \ / / | __| | '_ \ / _ \ / _` | | | |______| / __|  / _` |/ _` | '__/ _ \ __|
//  | |   < (_| |   | \__ \      | \__ \  | || (_| | | |  __/ |_) | | | (_| | (_| | (_| | (_| | | || (_| | | | |  __/ | (_| |\ V /  __/\ V /| | |_  | |_) | (_) | (_| | |_| |      | \__ \ | (_| | (_| | | |  __/ |_ 
//  |_|_|\_\__,_|   | |___/      |_|___/  |_| \__,_|_|_|\___|_.__/|_|  \__, |\__,_|\__,_|\__,_|_|\__\__,_|_| |_|\___|  \__, | \_/ \___| \_/ |_|\__| |_.__/ \___/ \__,_|\__, |      |_|___/  \__, |\__,_|_|  \___|\__|
//                 _/ |                                                 __/ |                                             | |                                           __/ |                __/ |                   
//                |__/                                                 |___/                                              |_|                                          |___/                |___/                    


var activeMenu = "none";
var leftPositionStart = '';
var rightPositionStart = '';
//var sliderMenuStatus = 0; //0: closed 1: opened

function positionToInt(num) {
    return parseInt( num.replace('px', ''));
}

var menuLeft = $("#menu-left");
var menuRight = $("#menu-right");
var blackBg = $(".black-bg");
var swipeEnable = true;
var globalPhase = "";
var sliderMenuStatus = 0;
var touchCounter = false;

 //0: closed 1: opened


/***********
FUNCTIONS
***********/
var menuClickDuration = 400;
    // Z-INDEX changing functions
    function zindexOnOpen(side){
        if(side === "left"){
            menuLeft.css('z-index', '1021');
            menuRight.css('z-index', '1019');
        } else {
            menuLeft.css('z-index', '1019');
            menuRight.css('z-index', '1021');
        }
    }
    
    function zindexOnClose(){
        menuLeft.css('z-index', '1019');
        menuRight.css('z-index', '1019');
    }
    
    // MENU OPEN-CLOSE on click functions
    function menuOpenClick(side){
    
        $("body").swipe("disable");
        swipeEnable = false;
    
        //console.log("swipe disabled");
    
        if(side == "left"){
            zindexOnOpen("left");
            activeMenu = "left";
            touchCounter = true;
            menuLeft.animate({left: "0px"}, menuClickDuration, function(){
                $("body").swipe("enable");
                swipeEnable = true;
                //console.log("swipe enabled");
            });
            sliderMenuStatus = 1;
            //console.log("Click opened: left");
        } else if(side == "right"){
            zindexOnOpen("right");
            activeMenu = "right";
            touchCounter = true;
            menuRight.animate({right: "0px"}, menuClickDuration, function(){
                $("body").swipe("enable");
                swipeEnable = true;
            });
            sliderMenuStatus = 1;
            //console.log("Click opened: right");
        }
        
        blackBg.show(0);
        blackBg.animate({
            opacity: 1
        }, 300);
    
        //console.log("---menuOpened---");
        //console.log(`sliderMenuStatus: ${sliderMenuStatus}, activeMenu: ${activeMenu}`);
    }
    
    function menuCloseClick(side){
        $("body").swipe("disable");
        swipeEnable = false;
    
        //console.log("swipe disabled");
        
        if(side == "left"){
            activeMenu = "none";
            touchCounter = false;
            menuLeft.animate({left: leftPositionStart+"px"}, menuClickDuration, function(){
                $("body").swipe("enable");
                swipeEnable = true;
                zindexOnClose();
                //console.log("swipe enabled");
            });
            sliderMenuStatus = 0;
            //console.log("Click closed: left");
        } else if(side == "right"){
            activeMenu = "none";
            touchCounter = false;
            menuRight.animate({right: rightPositionStart+"px"}, menuClickDuration, function(){
                $("body").swipe("enable");
                swipeEnable = true;
                zindexOnClose("right");
               // console.log("swipe enabled");
            });
            sliderMenuStatus = 0;
            //console.log("Click closed: right");
        }
    
        blackBg.animate({
            opacity: 0
        }, 300, function(){
            blackBg.hide(0);
        });
    
       // console.log("---menuClosed---");
        //console.log(`sliderMenuStatus: ${sliderMenuStatus}, activeMenu: ${activeMenu}`);
    }



    








$(function () {
     

    function movementRight(){
        return (currentX-prevX) > 0
    }
    
    function movementLeft(){
        return (currentX-prevX) < 0
    }



    //Enable swiping...
    var searchButtonCloseTrigger = $(".search-close-tigger");
    var menuButtonCloseTrigger = $(".menu-close-tigger");

    var menuWidth = menuLeft.width();
    // var the_threshold_left = menuLeft.width() / 3;
    var the_threshold_right = menuLeft.width() / 4;
    var the_maxTimeThreshold = 2000;

    var leftPosition = positionToInt(menuLeft.css("left"));
    //console.log(leftPosition)
    leftPositionStart = leftPosition;

    var rightPosition = positionToInt(menuRight.css("right"));
    //console.log(rightPosition)
    rightPositionStart = rightPosition;

    var prevDistance = 0;

    
    

    var cssProperty;
    var startPosition;

    var currentX = null;
    var prevX;

    var startTouch = false;
    var firstPointX = 0;

    var leftCurrentPosition = null;
    var rightCurrentPosition = null;

    

    

    searchButtonCloseTrigger.click(function(){
        if(sliderMenuStatus == 1){
            // menu close
			doSearch();
            menuCloseClick("left");
        } else {
            // menu open
            menuOpenClick("left");
        }
    });

    // RIGHT MENU

    menuButtonCloseTrigger.click(function(){
        if(sliderMenuStatus == 1){
            menuCloseClick("right");
        } else {
            menuOpenClick("right");
        }
    });

    blackBg.click(function(){
        
        if(swipeEnable){
            //console.log("blackBG clicked");
            if(activeMenu === "right" && sliderMenuStatus == 1){
                menuCloseClick("right");
            }
            else if(activeMenu === "left" && sliderMenuStatus == 1){
                menuCloseClick("left");
            }
        }
        
    });


    $("body").swipe({
        swipeStatus: function (event, phase, direction, distance, duration, fingers, fingerData, currentDirection) {
            globalPhase = phase;
            
            //console.log(sliderMenuStatus);

            // $('.phase').append("<div>phase: "+phase+"</div>");
            // console.log("phase: "+phase);
            // console.log("move right", movementRight());

            //Here we can check the:
            //phase : 'start', 'move', 'end', 'cancel'
            //direction : 'left', 'right', 'up', 'down'
            //distance : Distance finger is from initial touch point in px
            //duration : Length of swipe in MS
            //(currentX-firstPointX) : Distance on X axis from initial point till current point (PX)
            //fingerCount : the number of fingers used
            
            
            if(currentX === null){
                prevX = event.changedTouches[0].clientX;
            } else {
                prevX = currentX;
            }

            currentX = event.changedTouches[0].clientX;
            
            //console.log("currentX: "+currentX+", prevX: "+prevX+", (currentX-prevX)="+Math.abs(currentX-prevX)+", firstPoint: "+firstPointX);

            //console.log("\n---------START----------");
            //console.log(`phase: ${phase}, sliderMenuStatus: ${sliderMenuStatus}, leftPosition: ${leftPosition}, activeMenu: ${activeMenu}`);

            if (phase != "cancel" && phase != "end") {

                if (phase == "start") {
                    startTouch = true;
                    touchCounter = false;
                    firstPointX = event.changedTouches[0].clientX;
                    
                } 

                if(direction === "left" || direction === "right"){
                    if(!touchCounter && startTouch)
                        touchCounter = true;
                }

                if (touchCounter && (movementLeft() || movementRight()) ) {
                            

                    // console.log("phase: moving, startTouch:"+startTouch);

                    if (activeMenu == "none") {
                        blackBg.show();
                        switch (currentDirection) {
                            case "right": 
                                activeMenu = "left";
                                zindexOnOpen("left");
                                break;
                            case "left": 
                                activeMenu = "right";
                                zindexOnOpen("right");
                                break;
                        }
                    }

                    /********************************
                                LEFT MENU 
                    *******************************/

                    if (startTouch && activeMenu == "left") {

                        

                        leftPosition = positionToInt(menuLeft.css("left"));
                        /****
                        console.log("currentDirection: "+currentDirection);
                        console.log("leftPosition: "+leftPosition);
                        console.log("leftPositionStart: "+leftPositionStart);
                        console.log("distance: "+distance);
                        console.log("prevDistance: "+prevDistance); 
                        */

                        /* movementRight() => (movement right) */
                        /* movementLeft() => (movement left) */

                        if (movementRight()) { //MOVING RIGHT
                            leftCurrentPosition = null;
                            
                            if (leftPosition < 0) {
                                    
                                leftPosition = leftPosition + Math.abs(currentX-prevX);

                                menuLeft.css("left", leftPosition + "px");

                                // prevDistance = distance;

                            

                                if (Math.abs(leftPositionStart-leftPosition) > the_threshold_right) {

                                    sliderMenuStatus = 1;
                                    //console.log("threshhold: passed, sliding: right");

                                } 
                            }
                        } 
                        else if (movementLeft()) { // MOVING LEFT

                            if(leftCurrentPosition === null ){
                                leftCurrentPosition = leftPosition;
                               // console.log(leftCurrentPosition);
                            }
                            
                            if(leftPosition > leftPositionStart){
                                
                                leftPosition = leftPosition - Math.abs(currentX-prevX);
                                

                                menuLeft.css("left", leftPosition + "px");

                                // prevDistance = distance;

                            

                                if (Math.abs(leftCurrentPosition-leftPosition) > the_threshold_right) {

                                    sliderMenuStatus = 0;
                                   // console.log("threshhold: passed, sliding: left");

                                }
                            }
                        }

                        blackBg.css("opacity", (menuWidth + leftPosition) / menuWidth);
                    }

                    /********************************
                                RIGHT MENU 
                    *******************************/
                    else if (startTouch && activeMenu == "right") {

                        rightPosition = positionToInt(menuRight.css("right"));

                        if (movementLeft()) { // MOVEMENT LEFT

                            rightCurrentPosition = null;
                            
                            if(rightPosition < 0){
                                    
                                rightPosition = rightPosition + Math.abs(currentX-prevX);

                                menuRight.css("right", rightPosition + "px");

                                prevDistance = distance;

                            
                                //console.log(0-rightPosition, the_threshold_right);

                                if (Math.abs(rightPositionStart-rightPosition) > the_threshold_right) {
                                    //console.log("THRESHHOLD CROSSED. "+Math.abs(currentX-firstPointX)+", THRESHOLD: "+the_threshold_right);
                                    sliderMenuStatus = 1;

                                }
                            }
                        } else if (movementRight()) { // MOVEMENT RIGHT

                            if(rightCurrentPosition === null){
                                rightCurrentPosition = rightPosition;
                            }
                            
                            if(rightPosition > rightPositionStart){
                                    
                                rightPosition = rightPosition - Math.abs(currentX-prevX);

                                menuRight.css("right", rightPosition + "px");

                                prevDistance = distance;

                            

                                if (Math.abs(rightCurrentPosition-rightPosition) > the_threshold_right) {
                                    //console.log("THRESHHOLD CROSSED. "+Math.abs(currentX-firstPointX)+", THRESHOLD: "+the_threshold_right);
                                    sliderMenuStatus = 0;

                                }
                            }
                        }

                        blackBg.css("opacity", (menuWidth + rightPosition) / menuWidth);
                    }

                } else if (direction == "up" || direction == "down") {
                    if (startTouch && touchCounter == false) {
                        startTouch = false;
                    }

                    if(sliderMenuStatus == 0)
                        blackBg.hide();
                    // //console.log("startTouch: "+startTouch);
                }
            } else if (phase == "cancel" && direction != null && startTouch == true) {
                leftCurrentPosition = null;
                rightCurrentPosition = null;
                $("body").swipe("disable");
                swipeEnable = false;

                
                switch (activeMenu) {
                    case "left": var div = menuLeft; cssProperty = 'left'; startPosition = leftPositionStart; break;
                    case "right": var div = menuRight; cssProperty = 'right'; startPosition = rightPositionStart;  break;
                }
                // //console.log(div, " chuchu " + cssProperty + " chuchu " + startPosition);
                
                if(activeMenu !== "none"){
                    if (sliderMenuStatus) {
                        // //console.log("cssProperty: "+cssProperty);
                        div.animate({[cssProperty]: 0}, 300, function () {
                            div.stop(true, true);
                            $("body").swipe("enable");
                            swipeEnable = true;
                        });

                        blackBg.animate({
                            "opacity": 1
                        }, 250);

                    } else {
                        // //console.log('movedi aqq2q');
                        // //console.log("cssProperty: "+cssProperty);

                        div.animate({[cssProperty]: startPosition}, 300, function () {
                            div.stop(true, true);
                            $("body").swipe("enable");
                            swipeEnable = true;
                        });

                        blackBg.animate({
                                "opacity": 0
                            }, 250, function () {
                                blackBg.hide(); 
                                $('.menu-left-sub').hide();
                        });

                        activeMenu = "none";
                       // console.log("activeMenu");
                    }
                }

                prevDistance = 0;

            } else if (phase == "end" && startTouch == true) {
                
                if(activeMenu !== "none"){

                    $("body").swipe("disable");
                    swipeEnable = false;

                    switch (activeMenu) {
                        case "left": var div = menuLeft; cssProperty = 'left'; startPosition = leftPositionStart; break;
                        case "right": var div = menuRight; cssProperty = 'right'; startPosition = rightPositionStart;  break;
                    }

                    if (sliderMenuStatus) {
                        div.animate({[cssProperty]: 0}, 300, function () {
                            div.stop(true, true);
                            $("body").swipe("enable");
                            swipeEnable = true;
                        });

                        blackBg.animate({
                            "opacity": 1
                        }, 250);

                    } else {
                        div.animate({[cssProperty]: startPosition}, 300, function () {
                            div.stop(true, true);
                            $("body").swipe("enable");
                            swipeEnable = true;
                            rightPosition = rightPositionStart;
                            leftPosition = leftPositionStart;
                            zindexOnClose();
                        });

                        blackBg.animate({
                                "opacity": 0
                            }, 250, function () { $(this).hide(); $('.menu-left-sub').hide();}
                        );

                        activeMenu = "none";
                    }
                } else {
                    blackBg.hide();
                }

                prevDistance = 0;

                if(sliderMenuStatus == 1){
                    //console.log("sliderMenuStatus: open");
                } else {
                    //console.log("sliderMenuStatus: closed");
                }
                
            }
            //console.log("blackBg -> opacity: "+blackBg.css('opacity'), "blackBg -> display: "+blackBg.css('display'));
           // console.log("---------END----------");
        },
        threshold: the_threshold_right,
        // maxTimeThreshold: the_maxTimeThreshold,
        fingers: 'all',
        preventDefaultEvents: false
    });

});