
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
var streetStr = $('#street').val();
var cityStr = $('#city').val();
var address = streetStr + ', '+ cityStr;

$greeting.text('So, you want to explore ' +" " + address + '?');
  
var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address + ''; 

$body.append('<img class="bgimg" src="' + streetviewUrl + '">');   


var nytimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=2859d4d0d7454ba5b0038f1d494df4d0'

$.getJSON(nytimesUrl, function(data){

$nytHeaderElem.text('New York Times Articles About  ' + cityStr)
;
articles = data.response.docs; //set variable = to reurned data
for (var i=0; i < articles.length; i++){
    var article = articles[i]; //iterate through each JSON object
     $nytElem.append('<li class="article">'+ 
     '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+
     '<p>' + article.snippet + '</p>'+ 
     '</li>'); // add article to html 

};


}).error(function(e){
$nytHeaderElem.text('NYT articles could not be loaded');
});
// YOUR CODE GOES HERE!
var wikiUrl = "http://en.wikipedhahahahahafjfjfjfhia.org/w/api.php?action=opensearch&search=" + cityStr + "&format=json&callback=wikiCallback";

var wikiRequestTimeout = setTimeout(function(){$wikiElem.text("failed to get wikipedia resources");},8000);

$.ajax({
url: wikiUrl, 
dataType: "jsonp",
success: function( response ) {
    var articleList = response[1];

    for(var i = 0; i<articleList.length; i++){
        articleStr = articleList[i];
        var url = "http://en.wikipedia.org/wiki/" + articleStr;
        $wikiElem.append("<li><a href=" + url + ">" + articleStr + "</a></li>")
    };
    clearTimeout(wikiRequestTimeout);
}
});


    return false;
};

$('#form-container').submit(loadData);
