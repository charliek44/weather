$(document).ready();

var $search = $(".search");
var $mySearch = $(".mySearch");
var key = "AIzaSyC55OXoNH9ueERWdTINW_QcnIAbCw1sBGk";
var baseurl = "https://maps.googleapis.com/maps/api/geocode/json?address=";
var baseurlreverse = "https://maps.googleapis.com/maps/api/geocode/json?location="
var ajaxurl = "";
var latitude = 40.7127753;
var longitude = -74.0059728;
var temperature = 1; // 1 = Celsius 0 = Fahrenheit
var $celsius = $("#Celsius");
var $fahrenheit = $('#Fahrenheit')

/*$search.on("click", function() {
    var address = $mySearch.val();
    ajaxurl = baseurl + address + "&key=" + key;
    console.log(ajaxurl);
    $(document).ready(getMapCode);
});*/

$search.on("click", function(event) {
    event.preventDefault();
    var address = $mySearch.val();
    ajaxurl = baseurl + address + "&key=" + key;
    getMapCode();
});

function getMapCode() {
    $.ajax({
        url: ajaxurl,
        success: function(quoteData) {
            console.log(quoteData.results[0].formatted_address);
            $('#location').text(quoteData.results[0].formatted_address + " Latitude: " + quoteData.results[0].geometry.location.lat + " Longitude: " + quoteData.results[0].geometry.location.lng);
            latitude = quoteData.results[0].geometry.location.lat;
            longitude = quoteData.results[0].geometry.location.lng;
            getWeather();
        },
        error: function() {
            alert('error');
        },
        cache: false,
        type: 'GET'
    });
};

function getWeather() {
    $.ajax({
        url: "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude,
        success: function(quoteData) {
            console.log(quoteData);
            if (temperature === 1) {
                $('#temperature').text(Math.round(quoteData.main.temp));
                $('#temperature').val(quoteData.main.temp);
            } else {
                $('#temperature').text(Math.round(quoteData.main.temp * 9 / 5 + 32));
                $('#temperature').val(quoteData.main.temp * 9 / 5 + 32);
            }
            $('#icon').attr("src", quoteData.weather[0].icon);
            $('#weather-description').text(quoteData.weather[0].main);
        },

        error: function(jqXHR, textStatus, errorThrown) {
            alert('Exception:' + errorThrown);
        },
        cache: false,
        type: 'GET'
    });
}


function celsiusActive() {
    if (temperature === 0) {
        temperature = 1;
        $celsius.css({
            "color": "rgb(66, 139, 202)",
        });
        $fahrenheit.css({
            "color": "rgb(153, 153, 153)",
        });
        var beforeTemp = $('#temperature').val();
        if (beforeTemp) {
            var afterTemp = (beforeTemp - 32) * 5 / 9;
            $('#temperature').val(afterTemp);
            $('#temperature').text(Math.round(afterTemp));
        };
    };
};

function fahrenheitActive() {
    if (temperature === 1) {
        temperature = 0;
        $celsius.css({
            "color": "rgb(153, 153, 153)",
        });
        $fahrenheit.css({
            "color": "rgb(66, 139, 202)",
        });
        var beforeTemp = $('#temperature').val();
        if (beforeTemp) {
            var afterTemp = beforeTemp * 9 / 5 + 32;
            $('#temperature').val(afterTemp);
            $('#temperature').text(Math.round(afterTemp));
        };
    };

};

$celsius.on("click", celsiusActive);
$fahrenheit.on("click", fahrenheitActive);

function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(function(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        var address = latitude + "," + longitude;
        ajaxurl = baseurl + address + "&key=" + key;
        getMapCode();
    });
}

$(document).ready(getCurrentLocation);