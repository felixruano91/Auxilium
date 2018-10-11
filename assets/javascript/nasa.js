var queryURL =" https://api.nasa.gov/planetary/apod?api_key=8VGfPrXF3DyfP5agTz5qj23DxCB5pBg5BBkCWLg8"

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
      
    var imgURL= response.url;
    console.log(imgURL);

    document.body.style.backgroundImage = "url('"+ imgURL +"')";
    document.body.style.backgroundSize = "cover";
});