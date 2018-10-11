//==========================================================
//=============== Variables and settings ===================
//==========================================================

// General settings-----------------------------------------------------
// We use these to change general behavior of the player.
var orderVideos = false;    // If true, plays videos in order, if false, plays videos in shuffled order.
var numberOfVideos = 7;     // How many videos to chain playing at max.
var loopVideos = true;      // If true, when the last video on the list is finished playing, loop around to the first one. Otherwise, playback is stopped.
var qualityProperties = ['small','medium','large','hd720','hd1080','highres'];     // The list of strings that dictate the player's quality (sd,hq,hd,etc)
var qualityScreenBreaks = [340,680,880,1300,1990,2200];                             // The list of screen widths that will be evaluated for selecting the player's quality.
var screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);        // Stores the width of the user's screen, for responsive support.

// Array of videos-------------------------------------------------------
// This is our custom playlist, we can add or remove videos any time. Stores YT videos Ids.
// If the setting orderVideos is set to true, this is the order they'll take.
var videosCollection = [
    'IAODG6KaNBc','PCy4Yhqn3Ls','HjOtMA4sZxI','vXZ5l7G6T2I','0P8f4ExY3vs','eTEKGOi6SVg','uEUMVwc4o5U'
];

// Dynamic variables-----------------------------------------------------
// These will change according to the current player conditions
var player = new Object;    // Stores player object.
var currentVideo = 0;       // Stores the index of the video currently playing inside the videosCollection array.
var videoId = "";           // Stores the current video being played.

//=============================================
//=============== Functions ===================
//=============================================

// Switches the indexes of elements inside an array randomly
function shuffleArray(array){
    var newPosition = 0;
    for (var i=0; i < array.length; i++){
        newPosition = Math.floor(Math.random()*array.length);
        var newElement = array[newPosition];
        array[newPosition] = array[i];
        array[i] = newElement;
    }
    return array;
}

// Determine player quality depending on screen width. Returns player quality string
function playerQuality(screenWidth){
    var quality = new String;
    for (var i = 0; i < qualityScreenBreaks.length; i++){
        if (screenWidth >= qualityScreenBreaks[i]) quality = qualityProperties[i]; // If screen width is higher, take highest available queality.
    }
    return quality;
}

// Player cue control
function playerCue(player){
    var quality = playerQuality(screenWidth);
    if(currentVideo + 1 < videosCollection.length && currentVideo + 1 < numberOfVideos){ // If this is not the last video in the list.
        currentVideo++; // Increase the video index
        videoId = videosCollection[currentVideo]; // Sets the next video's ID
        player.loadVideoById(videoId,1,quality); // Cues the video
    }
    else if(loopVideos){ // If this is the last video and the settings say to loop the video list
        currentVideo = 0; // Resets the video index to the first one
        videoId = videosCollection[currentVideo]; // Sets the next video's ID
        player.loadVideoById(videoId,1,quality); // Cues the video
    }
    else{ // Last video and loop is disabled
        player.stopVideo(); // Stops the player
    }
}

// The API will call this function when the video player is ready.
function playMe(event) {
    var quality = playerQuality(screenWidth);
    event.target.setPlaybackQuality(quality);
    event.target.playVideo(); // Begin playback
    $("#player").removeClass("embed-responsive-item") // Removes, then adds the Bootstrap v4 class to make the <iframe> responsive
    $("#player").addClass("embed-responsive-item"); // Adds 
}

// The API will call this function when the video player suffers a state change
// Possible states for the event.data property value: -1: unstarted | 0: ended | 1: playing | 2: paused | 3: buffering | 5: video cued
function checkMe(event){
    if (event.data == 0){// If the video has ended playing
        playerCue(player);
    }
}

// The API will call this function if an error occurs
// Possible error codes for the event.data property value: 
//  2 – The request contains an invalid parameter value. 
//  5 – The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.
//  100 – The video requested was not found, was removed, or marked as private.
//  101 – The owner of the requested video does not allow it to be played in embedded players.
//  150 – Same as 101.
function errorHandler(event){
    if(event.data==100){ // If the video isn't available
        playerCue(player); // Calls cue conntrol
    }
}

// Creates an <iframe> with a Youtube Player object after the API code downloads.
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: videoId,
        events: {
        'onReady': playMe, // Function to call when player is ready
        'onStateChange': checkMe, // Function to call when player state changes
        'onError': errorHandler // Function to call when an error occurs
        }
    });
    $("#btnPrevious").off();
    $("#btnPrevious").on("click",function(){
        currentVideo = Math.max(-1,currentVideo-2);
        playerCue(player);
    });
    $("#btnNext").off();
    $("#btnNext").on("click",function(){
        playerCue(player);
    });
}

//========================================
//=============== Code ===================
//========================================

// Videos to be played depending on general settings
if(!orderVideos) shuffleArray(videosCollection); // Shuffle video collection if order isn't specified.
currentVideo = 0;
videoId = videosCollection[currentVideo];

// Load the player code asynchronously (before the window is finished loading, so nasa image and YT player load at their own pace)
var scriptTag = document.createElement('script'); // Creates a "script" tag
var firstScriptTag = document.getElementsByTagName('script')[0]; // First positioned script tag
scriptTag.src = "https://www.youtube.com/iframe_api"; // Sets the source to load the YT iframe api
firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag); // Inserts the script before the first script.

/*
Notes:
-The "General settings" variables allow us to edit and control the order of played videos, and the max amount of videos played.
-The video list is completely scalable and editable, might even take user suggestions (or in the future, store a "favorite" playlist array per user in firebase)
-The checkMe function allows to add actions for every possible state. Right now, only ques another video when the previous one ended.
-The errorHandler can be expanded to consider different browsers with varying html5 support
*/
