var queryURL =" https://api.nasa.gov/planetary/apod?api_key=8VGfPrXF3DyfP5agTz5qj23DxCB5pBg5BBkCWLg8"

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
        console.log("image is running");
        console.log(response.Runtime);

        var imgURL= response.hdurl;

        var image = $("<img>").attr("src", imgURL);

        $(body).append(image);
      });