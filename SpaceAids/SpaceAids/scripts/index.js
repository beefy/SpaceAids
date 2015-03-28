// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.


        gameStart();
    };
})();

var margin_top_num_1 = 0;
var margin_top_num_2 = 0;
var margin_btm_num_1 = 0;

function gameStart() {
    starsMove();
    margin_btm_num_1 = -625;

    //make main screen items hidden
    $("#content").css("visibility", "hidden");
    $("#logo").css("visibility", "hidden");
}

function starsMove() {

    margin_top_num_1++;
    margin_btm_num_1--;
    $("#stars").css("margin-top", margin_top_num_1 + "px");
    $("#stars").css("margin-bottom", margin_btm_num_1 + "px");

    setTimeout(starsMove, 5);
}