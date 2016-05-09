
function loadData(event) {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // - *********** - Google  streetview - *********** -


    var streetStr = $('#street').val();
    var cityStr = $("#city").val();
    var address = streetStr + ' ' + cityStr;


    $greeting.text('Welcome to' + ' ' + address + '!');

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';

    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    //   - *********** - End of Google Street View API - *********** -

    // - *********** - NY Times API - *********** -

    var newsUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
    cityStr + '&sort=newest&api-key=4860314b78b546f9b58b28ef25f21da1'

    $.getJSON(newsUrl, function ( data ){

        $nytHeaderElem.text('New York Times Ariticle About' + cityStr);

        articles = data.response.docs;
        for(var i = 0; i<articles.length; i++){
            var article = articles[i];
            $nytElem.append('<li class = "article">' + '<a href ="'+article.web_url + '">' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>');
        };


    });


    // - *********** - End of NY Times API - *********** -




    return false;
    event.preventDefault();
};

$('#form-container').submit(loadData);

