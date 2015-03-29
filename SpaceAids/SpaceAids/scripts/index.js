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
var margin_btm_num_2 = 0;
var cursorX = 0;
var cursorY = 0;
var bullet_num = 0;
var enemy_num = 0;
var isDead = false;

function gameStart() {
    starsMove();
    shoot();
    bullet_move();
    enemy();
    enemyMove();
    enemy_bullet_collision();
    enemy_player_collision();
    margin_btm_num_1 = -625;
    margin_top_num_2 = -625;

    //make main screen items hidden
    $("#main_module").css("visibility", "hidden");
    $("#logo").css("visibility", "hidden");

    //make game screen items visible
    $("#game_module").css("visibility", "visible");

}

function enemy_bullet_collision() {
    
    for(var enemy_num = 0; enemy_num < 5; enemy_num++) {
        for (var bullet_num = 0; bullet_num < 5; bullet_num++) {

            var enemy_left = $("#enemy_" + enemy_num).offset().left;
            //var enemy_right = $("#enemy_" + enemy_num).offset().left + 5;
            var enemy_top = $("#enemy_" + enemy_num).offset().top;
            //var enemy_bottom = $("#enemy_" + enemy_num).offset().top + 5;

            var bullet_left = $("#bullet_" + bullet_num).offset().left;
            //var bullet_right = $("#bullet_" + bullet_num).offset().left + 2;
            var bullet_top = $("#bullet_" + bullet_num).offset().top;
            //var bullet_bottom = $("#bullet_" + bullet_num).offset().top + 2;

            var rect1 = { x: enemy_left, y: enemy_top, width: 70, height: 70 }
            var rect2 = { x: bullet_left, y: bullet_top, width: 15, height: 20 }

            if (rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.height + rect1.y > rect2.y) {

                enemyReset(enemy_num);
                fire(bullet_num);
            }
        }
    }


    setTimeout(enemy_bullet_collision, 2);
}

function enemy_player_collision() {

    if (isDead) return;

    for (var enemy_num = 0; enemy_num < 5; enemy_num++) {


        var enemy_left = $("#enemy_" + enemy_num).offset().left;
        //var enemy_right = $("#enemy_" + enemy_num).offset().right+50;
        var enemy_top = $("#enemy_" + enemy_num).offset().top;
        //var enemy_bottom = $("#enemy_" + enemy_num).offset().bottom+50;

        var player_left = $("#player").offset().left;
        //var player_right = $("#player").offset().right+50;
        var player_top = $("#player").offset().top;
        //var player_bottom = $("#player").offset().bottom+50;

        var rect1 = { x: enemy_left, y: enemy_top, width: 70, height: 70 }
        var rect2 = { x: player_left, y: player_top, width: 82, height: 126 }

        if (rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.height + rect1.y > rect2.y) {

            window.alert("Thank you for your donation of: $0.05");
            death();
        }
    }

    setTimeout(enemy_player_collision, 2);
}

function enemy() {
    if (isDead) return;

    enemyReset(enemy_num);

    enemy_num++;
    if (enemy_num > 4) enemy_num %= 5;

    //regenerate when hit the user
    setTimeout(enemy, 2000);
}

function enemyMove() {
    if (isDead) return;

    var margin_top

    for (var i = 0; i < 5; i++) {
        margin_top = parseInt($("#enemy_" + i).css("margin-top").replace("px", ""));
        $("#enemy_" + i).css("margin-top", margin_top + 2 + "px");
    }

    setTimeout(enemyMove, 1);
}

function enemyReset(number) {
    var margin_left = Math.random()*350;
    $("#enemy_" + number).css("margin-left", margin_left + 30 + "px");
    $("#enemy_" + number).css("margin-top", "-700px");
}

function stopScrolling() {

    if ($("#highscore_module").css("visibility") != "hidden" ||
       $("#credit_module").css("visibility") != "hidden" ||
        $("#settings_module").css("visibility") != "hidden" ||
        $("#transaction_module").css("visibility") != "hidden") return;

    window.scrollTo(0, 0);
    
    setTimeout(stopScrolling, 1);
}

function starsMove() {

    margin_top_num_1++;
    margin_top_num_2++;
    margin_btm_num_1--;
    margin_btm_num_2--;
    $("#stars").css("margin-bottom", margin_btm_num_1 + "px");
    $("#stars").css("margin-top", margin_top_num_1 + "px");
    $("#stars2").css("margin-bottom", margin_btm_num_2 + "px");
    $("#stars2").css("margin-top", margin_top_num_2 + "px");

    if (margin_btm_num_1 < -1250) {
        margin_btm_num_1 = 0;
        margin_top_num_1 = -625;
    }

    if (margin_btm_num_2 < -1250) {
        margin_btm_num_2 = 0;
        margin_top_num_2 = -625;
    }

    setTimeout(starsMove, 1);
}

function shoot() {

    if (isDead) return;

    ////create the bullet
    //var bullet = document.createElement("div");
    ////id
    ////var bullet_id = document.createAttribute("id");   
    ////bullet_id.value = bullet_num.toString;
    ////bullet.setAttributeNode(bullet_id);
    ////class
    //var bullet_class = document.createAttribute("class"); 
    //bullet_class.value = "bulletclass";
    //bullet.setAttributeNode(bullet_class);

    //fire the bullet
    fire(bullet_num);

    bullet_num++;
    if (bullet_num > 4) bullet_num %= 5;

    //automatic fire
    setTimeout(shoot, 500);
}

//move current bullets
function bullet_move() {

    if (isDead) return;

    //var margin_num = $(bullet_num.toString).css("margin-top");
    //$(bullet_num.toString).css("margin-top", margin_num - 1);

    var margin_top

    for (var i = 0; i < 5; i++) {
        margin_top = parseInt($("#bullet_" + i).css("margin-top").replace("px", ""));
        $("#bullet_" + i).css("margin-top", margin_top-5 + "px");
    }

    setTimeout(bullet_move, 1);
}

//reset a bullet
function fire(number) {
    var margin_left = parseInt($("#player").css("margin-left").replace("px", ""));
    $("#bullet_" + number).css("margin-left", margin_left+30 + "px");
    $("#bullet_" + number).css("margin-top", "-150px");
}

document.body.onmousedown = function (e) {

    if (isDead) {
        main_view();
        return;
    }

    if ($("#game_module").css("visibility") != "visible") return;

    var margin_num = parseInt($("#player").css("margin-left").replace("px", ""));

    if (e.clientX < document.body.clientWidth / 2) {
        //left side click
        $("#player").css("margin-left", margin_num-10 + "px");
    } else {
        //right side click
        $("#player").css("margin-left", margin_num+10 + "px");
    }
}

function death() {
    isDead = true;

    //display game over
    $("#death_module").css("visibility", "visible");
    $("#death_module").css("position", "absolute");
    //$("#death").css("position", "absolute");
    //$("#death").css("margin-top", "-180%");
    donate();
}

function donate() {
    var api_string = "https://api.firstgiving.com/donation/creditcard";
    /*
ccNumber – Required. User’s credit card number.
ccType – User’s credit card type. * “VI” ‐ Visa * “MC” ‐ MasterCard * “DI” ‐ Discover Card * “AX” – American Express
ccExpDateYear – Required. The 4 digit year the card expires.
ccExpDateMonth – Required. The 2 digit month the card expires.
ccCardValidationNum – Required. Card security number. Valid values include the following: * “CVV2″ ‐ Visa. (three‐digit value) * “CVC2″ ‐ MasterCard. (three‐digit value) * “CID” ‐ American Express. (four‐digit value)
billToTitle – The donor’s “title”, such as “Mr.”, “Mrs.”, “Dr.” etc. (Max length: 10)
billToFirstName – Required. The customer’s first name. (Max length 100).
billToMiddleName – The customer’s middle name. (Max length 100).
billToLastName – Required. The customer’s last name. (Max length 100).
billToAddressLine1 – Required. Address line 1 for customer bill to address. (Max length: 255)
billToAddressLine2 – Address line 2 for customer bill to address. (Max length: 255)
billToAddressLine3 – Address line 3 for customer bill to address. (Max length: 255)
billToCity – Required. City value for customer bill to address. (Max length: 35)
billToState – Required when billToCountry is US. State name for customer bill to address. In the US, the two character state code should be used. E.g., “FL”, “NY”, etc instead of “Florida” or “New York”. The full list of valid US state codes can be found here (Max length 30)
billToZip – Required. Zip for customer bill to address. (Max length 20)
billToCountry – Required. Two character Country code for customer bill to address. The country names corresponding to the abbreviations can be found in the ISO 3166-1 standard. Example: “US”. The full list of countries accepted by the donations API can be found here. (Max length: 3)
billToEmail – Required. Email address that corresponds to the customer bill to address. (Max length: 100)
billToPhone – Phone number that corresponds to the customer bill to address. (Max length: 20)
remoteAddr – Required. The end user’s IP address. This optional parameter is used to block common sources of fraud.
amount – Required. The amount of currency units to be donated. This should be in decimal format. Example: “1.23″ (without quotes). The minimum value is “5.00″.
currencyCode – The currency code for the currency that describes the number of units to withdraw from the donor’s account. * “USD”

charityId – Required. A UUID identifier provided by FirstGiving which identifies the recipient of the donation.

eventId – An identifier provided by FirstGiving which identifies the event associated with the donation. If donation does not relate to an event id, pass “” (zero length string).
fundraiserId – A universally unique ID which identifies the user account that was responsible for the donation that was collected. This is almost always a different person than the donor.
orderId – A universally unique ID genereated by the 3rd party which identifies the donation in their system.
description – Required. A short textual description of the donation.
reportDonationToTaxAuthority – Boolean (1|0) indicating whether or not this donation should be reported to the tax authority in the donor’s country. *Not applicable in the U.S.
personalIdentificationNumber – The national id number assigned to the donor who wants the donation reported to the tax authority. If the customer does not want the donation reported, just pass a blank string here.  *Not applicable in the U.S.
donationMessage – Message from donor to the charity.
honorMemoryName – Name of individual or organization that the donation was made to honor.
pledgeId – A user defined field that persists to the NPO report linking the transaction from your page to the FirstGiving System.
campaignName – A free-text field that persists to the NPO report notifying the NPO of the user defined Campaign Name.  If the Campaign Name ranks within the top 5 campaigns during the pay cycle, the Campaign Name will also appear on the NPO check stub.
*/
}

/*
    NAVIGATION
*/
function main_view() {
    $("#game_module").css("visibility", "hidden");
    $("#death_module").css("visibility", "hidden");
    $("#credit_module").css("visibility", "hidden");
    $("#highscore_module").css("visibility", "hidden");
    $("#transactions_module").css("visibility", "hidden");
    $("#settings_module").css("visibility", "hidden");
    $("#main_module").css("visibility", "visible");
    $("#logo").css("visibility", "visible");
    stopScrolling();
}

function highscores_view() {

    $("#main_module").css("visibility", "hidden");
    $("#highscore_module").css("visibility", "visible");
}

function settings_view() {

    $("#main_module").css("visibility", "hidden");
    $("#settings_module").css("visibility", "visible");
}

function transaction_view() {

    $("#main_module").css("visibility", "hidden");
    $("#transactions_module").css("visibility", "visible");
}