$(document).ready();

$section = $(".section");
$tweet = $("#tweet");
$tweetLink = $(".twitter-share-button");

$section.on("click", getQuote);

function getQuote() {
    $.ajax({
        url: "#",
        success: function(quoteData) {
            var post = quoteData[0];
            var tweeturl = "https://twitter.com/intent/tweet?text=";
            $('#quote-quote').text(post);
            tweeturl += "\"" + post + "\" - Ron Swanson";
            $tweetLink.attr("href", tweeturl)
        },
        error: function() {
            alert("error");
        },
        cache: false,
        type: 'GET'
    });
};

$(document).ready(getQuote);

function imgBold() {
    $tweet.css({
        "width": "30px",
        "height": "30px"
    });
};

function imgNormal() {
    $tweet.css({
        "width": "25px",
        "height": "25px"
    });
};

$tweet.on("mouseover", imgBold);
$tweet.on("mouseout", imgNormal);