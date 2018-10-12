
var excerciseColumnDiv = $("#excerciseColumnDiv");
var buttonBegin = $("#btnBegin");

window.onload = function(){
    buttonBegin.on("click",function(){
        $(this).attr("disabled","");
        DoObject.mDoStart();
    });
}

var DoObject = {
// General settings. Affect the functioning of all (or most) methods.
    boolOrderedExcercises: false,  // If true, loads excercises in order, as specified in the arOrderedExcercises array. Otherwise, loads them randomly.
    arOrderedExcercises: [],       // List of excercises to load in order if boolOrderedExcercises is set too true
    intAnimationDuration: 1,   // The duration of animations, in seconds.
    strExcerciseClass: "text-center",      // Default class for styling the excercise area.
    strRepeatAnimation: "",                // Animation for repeating excercise updates.

// Dynamic properties. These change during the course of the program. Variable behavior used as starting point, do not alter.
    arSessionExcercises:[], // Array that clones excercises for this session, to avoid messing with the original collection
    intCurrentExcercise: 0, // Keeps track of the index in the current excercise.
    intExcerciseRepeat: 0,  // Keeps track of current repetition for repeting excercises.
    boolExcerciseRunning: false, // True when an excercise has began.

// Activities collection____________________________________________________________________________
    arActivities:[
        {
            strID: "see",
            strDisplay: "Count 5 things you can see",   // Display text for the activity
            strDisplayStyle: "",                        // CSS for styling the display text.
            strImage: "",                               // Path of an optional image that accompanies the activity.
            strInAnimation: "fadeIn",       // Animation class from the animate.css for introducing the activity.  (leave empty for no animation)
            strUrl: "",                     // Optional URL to link to, if "link" is specified inside the onConfirm or onTime arrays.
            strAnimation: "fadeOut",         // Optional animation to be launched after the activity is done, by including "animation" in the onConfirm or onTime arrays.
            boolButtonConfirm: true,        // Boolean that specifies if the activity will have a confirm button to be done.
            strButtonConfirm: "done",       // Display text of the confirm button.
            strButtonClass: "btn-light",  // Class for styling the confirm button.
            onConfirm: ["animation","remove"], // Ordered actions after confirm button has been pressed: "in" replays strInAnimation, "animate" plays strAnimation, "remove" removes the HTML element of the activity, "link" redirects the user to another url in strUrl.
            boolTimed: false, // Indicates if the activity is timed. If timed, the confirm button and actions are ignored.
            intTimer: 0, // How many secodns the activity will run for.
            strTimerStyle: "", // CSS for styling the timer.
            onTime:[], // Ordered actions after timer has run out: "in" replays strInAnimation, "animate" plays strAnimation, "remove" removes the HTML element of the activity, "link" redirects the user to another url in strUrl.
        },
        {
            strID: "touch",
            strDisplay: "Count 4 things you can touch",
            strDisplayStyle: "",
            strImage: "",
            strInAnimation: "fadeIn",
            strUrl: "",
            strAnimation: "fadeOut",
            boolButtonConfirm: true,
            strButtonConfirm: "done",
            strButtonClass: "btn-light",
            onConfirm: ["animation","remove"],
            boolTimed: false,
            intTimer: 0,
            strTimerStyle: "",
            onTime:[],
        },
        {
            strID: "hear",
            strDisplay: "Count 3 things you can hear",
            strDisplayStyle: "",
            strImage: "",
            strInAnimation: "fadeIn",
            strUrl: "",
            strAnimation: "fadeOut",
            boolButtonConfirm: true,
            strButtonConfirm: "done",
            strButtonClass: "btn-light",
            onConfirm: ["animation","remove"],
            boolTimed: false,
            intTimer: 0,
            strTimerStyle: "",
            onTime:[],
        },
        {
            strID: "smell",
            strDisplay: "Count 2 things you can smell",
            strDisplayStyle: "",
            strImage: "",
            strInAnimation: "fadeIn",
            strUrl: "",
            strAnimation: "fadeOut",
            boolButtonConfirm: true,
            strButtonConfirm: "done",
            strButtonClass: "btn-light",
            onConfirm: ["animation","remove"],
            boolTimed: false,
            intTimer: 0,
            strTimerStyle: "",
            onTime:[],
        },
        {
            strID: "taste",
            strDisplay: "Count 1 thing you can taste",
            strDisplayStyle: "",
            strImage: "",
            strInAnimation: "fadeIn",
            strUrl: "",
            strAnimation: "fadeOut",
            boolButtonConfirm: true,
            strButtonConfirm: "done",
            strButtonClass: "btn-light",
            onConfirm: ["animation","remove"],
            boolTimed: false,
            intTimer: 0,
            strTimerStyle: "",
            onTime:[],
        },
        {
            strID: "breatheIn",
            strDisplay: "Breathe in for 5 seconds",
            strDisplayStyle: "",
            strImage: "",
            strInAnimation: "fadeIn",
            strUrl: "",
            strAnimation: "halfFadeOut",
            boolButtonConfirm: false,
            strButtonConfirm: "done",
            strButtonClass: "btn-light",
            onConfirm: [],
            boolTimed: true,
            intTimer: 5,
            strTimerStyle: "color:rgb(220,220,220)",
            onTime:["animation"],
        },
        {
            strID: "holdBreath",
            strDisplay: "Hold your breath for 6 seconds",
            strDisplayStyle: "",
            strImage: "",
            strInAnimation: "fadeIn",
            strUrl: "",
            strAnimation: "halfFadeOut",
            boolButtonConfirm: false,
            strButtonConfirm: "done",
            strButtonClass: "btn-light",
            onConfirm: [],
            boolTimed: true,
            intTimer: 6,
            strTimerStyle: "color:rgb(220,220,220)",
            onTime:["animation"],
        },
        {
            strID: "breatheOut",
            strDisplay: "Breathe out for 7 seconds",
            strDisplayStyle: "",
            strImage: "",
            strInAnimation: "fadeIn",
            strUrl: "",
            strAnimation: "halfFadeOut",
            boolButtonConfirm: false,
            strButtonConfirm: "done",
            strButtonClass: "btn-light",
            onConfirm: [],
            boolTimed: true,
            intTimer: 7,
            strTimerStyle: "color:rgb(220,220,220)",
            onTime:["animation"],
        },
        {
            strID: "syncBreathe01",
            strDisplay: "Sync your breathing with the image",
            strDisplayStyle: "",
            strImage: "assets/images/breathe_01.gif",
            strInAnimation: "fadeIn",
            strUrl: "",
            strAnimation: "fadeOut",
            boolButtonConfirm: false,
            strButtonConfirm: "done",
            strButtonClass: "btn-light",
            onConfirm: [],
            boolTimed: true,
            intTimer: 30,
            strTimerStyle: "color:rgb(220,220,220)",
            onTime:["animation"],
        },
        {
            strID: "syncBreathe02",
            strDisplay: "Sync your breathing with the image",
            strDisplayStyle: "",
            strImage: "assets/images/breathe_02.gif",
            strInAnimation: "fadeIn",
            strUrl: "",
            strAnimation: "fadeOut",
            boolButtonConfirm: false,
            strButtonConfirm: "done",
            strButtonClass: "btn-light",
            onConfirm: [],
            boolTimed: true,
            intTimer: 30,
            strTimerStyle: "color:rgb(220,220,220)",
            onTime:["animation"],
        },
        {
            strID: "syncBreathe03",
            strDisplay: "Sync your breathing with the image",
            strDisplayStyle: "",
            strImage: "assets/images/breathe_03.gif",
            strInAnimation: "fadeIn",
            strUrl: "",
            strAnimation: "fadeOut",
            boolButtonConfirm: false,
            strButtonConfirm: "done",
            strButtonClass: "btn-light",
            onConfirm: [],
            boolTimed: true,
            intTimer: 30,
            strTimerStyle: "color:rgb(220,220,220)",
            onTime:["animation"],
        },
        {
            strID: "describeTemp",
            strDisplay: "Got it? Think of it's temperature. Is it cold? Is it hot?",
            strDisplayStyle: "",
            strImage: "",
            strInAnimation: "fadeIn",
            strUrl: "",
            strAnimation: "fadeOut",
            boolButtonConfirm: true,
            strButtonConfirm: "done",
            strButtonClass: "btn-light",
            onConfirm: ["animation","remove"],
            boolTimed: false,
            intTimer: 0,
            strTimerStyle: "",
            onTime:[],
        },
        {
            strID: "describeTaste",
            strDisplay: "Concentrate on it's taste. Is it sweet, sour, salty, spicy?",
            strDisplayStyle: "",
            strImage: "",
            strInAnimation: "fadeIn",
            strUrl: "",
            strAnimation: "fadeOut",
            boolButtonConfirm: true,
            strButtonConfirm: "done",
            strButtonClass: "btn-light",
            onConfirm: ["animation","remove"],
            boolTimed: false,
            intTimer: 0,
            strTimerStyle: "",
            onTime:[],
        },
        {
            strID: "describeLike",
            strDisplay: "Do you like it? What about it do you like or dislike?",
            strDisplayStyle: "",
            strImage: "",
            strInAnimation: "fadeIn",
            strUrl: "",
            strAnimation: "fadeOut",
            boolButtonConfirm: true,
            strButtonConfirm: "done",
            strButtonClass: "btn-light",
            onConfirm: ["animation","remove"],
            boolTimed: false,
            intTimer: 0,
            strTimerStyle: "",
            onTime:[],
        },
        {
            strID: "describeLastTime",
            strDisplay: "Do you remember the last time you had it?",
            strDisplayStyle: "",
            strImage: "",
            strInAnimation: "fadeIn",
            strUrl: "",
            strAnimation: "fadeOut",
            boolButtonConfirm: true,
            strButtonConfirm: "done",
            strButtonClass: "btn-light",
            onConfirm: ["animation","remove"],
            boolTimed: false,
            intTimer: 0,
            strTimerStyle: "",
            onTime:[],
        },
        {
            strID: "describeFirstTime",
            strDisplay: "Do you remember the first time you had it?",
            strDisplayStyle: "",
            strImage: "",
            strInAnimation: "fadeIn",
            strUrl: "",
            strAnimation: "fadeOut",
            boolButtonConfirm: true,
            strButtonConfirm: "done",
            strButtonClass: "btn-light",
            onConfirm: ["animation","remove"],
            boolTimed: false,
            intTimer: 0,
            strTimerStyle: "",
            onTime:[],
        },
    ],

// Excercises collection_________________________________________________________________________________________
    arExcercises:[
        {
            strID: "LookAround",
            strDisplay: "Look around you", 
            strDisplayStyle: "color:white", 
            strBoxStyle: "background-image:linear-gradient(to right,rgb(0,0,0,0),rgb(0,0,0,0.5),rgb(0,0,0,0.5),rgb(0,0,0,0));max-width:75%;margin:auto;padding: 10px",
            strImage: "",  
            arActivityList:["see","touch","hear","smell","taste"],
            strInAnimation: "fadeIn", 
            strOutAnimation: "fadeOut",  
            intRepeat:0,  
            intCurrentActivity: 0,  
            boolCurrentActivityDone: false 
        },
        {
            strID: "BreatheSlowly", 
            strDisplay: "Breathe slowly",
            strDisplayStyle: "color:white", 
            strBoxStyle: "background-image:linear-gradient(to right,rgb(0,0,0,0),rgb(0,0,0,0.5),rgb(0,0,0,0.5),rgb(0,0,0,0));max-width:75%;margin:auto;padding: 10px",
            strImage: "",  
            arActivityList:["breatheIn","holdBreath","breatheOut"], 
            strInAnimation: "fadeIn", 
            strOutAnimation: "fadeOut", 
            intRepeat:3,    
            intCurrentActivity: 0,   
            boolCurrentActivityDone: false 
        },
        {
            strID: "BreatheSync01", 
            strDisplay: "just breathe", 
            strDisplayStyle: "color:white", 
            strBoxStyle: "background-image:linear-gradient(to right,rgb(0,0,0,0),rgb(0,0,0,0.5),rgb(0,0,0,0.5),rgb(0,0,0,0));max-width:75%;margin:auto;padding: 10px",
            
            arActivityList:["syncBreathe01"], 
            strInAnimation: "fadeIn",  
            strOutAnimation: "fadeOut", 
            intRepeat:0,   
            intCurrentActivity: 0,  
            boolCurrentActivityDone: false
        },
        {
            strID: "BreatheSync02", 
            strDisplay: "just breathe", 
            strDisplayStyle: "color:white", 
            strBoxStyle: "background-image:linear-gradient(to right,rgb(0,0,0,0),rgb(0,0,0,0.5),rgb(0,0,0,0.5),rgb(0,0,0,0));max-width:75%;margin:auto;padding: 10px", 
            strImage: "",    
            arActivityList:["syncBreathe02"], 
            strInAnimation: "fadeIn", 
            strOutAnimation: "fadeOut",
            intRepeat:0,   
            intCurrentActivity: 0, 
            boolCurrentActivityDone: false
        },
        {
            strID: "BreatheSync03",  
            strDisplay: "just breathe",
            strDisplayStyle: "color:white", 
            strBoxStyle: "background-image:linear-gradient(to right,rgb(0,0,0,0),rgb(0,0,0,0.5),rgb(0,0,0,0.5),rgb(0,0,0,0));max-width:75%;margin:auto;padding: 10px",
            strImage: "",   
            arActivityList:["syncBreathe03"], 
            strInAnimation: "fadeIn",
            strOutAnimation: "fadeOut", 
            intRepeat:0,
            intCurrentActivity: 0, 
            boolCurrentActivityDone: false 
        },
        {
            strID: "EatDrink", 
            strDisplay: "Get something to eat or drink", 
            strDisplayStyle: "color:white",
            strBoxStyle: "background-image:linear-gradient(to right,rgb(0,0,0,0),rgb(0,0,0,0.5),rgb(0,0,0,0.5),rgb(0,0,0,0));max-width:75%;margin:auto;padding: 10px",
            strImage: "", 
            arActivityList:["describeTemp","describeTaste","describeLike","describeLastTime","describeFirstTime"], 
            strInAnimation: "fadeIn",  
            strOutAnimation: "fadeOut",  
            intRepeat:0,  
            intCurrentActivity: 0, 
            boolCurrentActivityDone: false 
        }
    ],

//------------------------------------------------------------------------------------
// Methods----------------------------------------------------------------------------
//------------------------------------------------------------------------------------

// General utility methods. For array manipulation
    mFindObject: function(array = [],property = "", value){ //Uses find method to return first object from [array] to match [property] == [value] condition
        var returnObject = array.find(function(object){
            if(object[property] !== undefined) return object[property] == value;
        });
        return returnObject;
    },
    mShuffleArray: function(array = new Array){ // Randomly switches the indexes of elements inside an array
        if (array.length > 1){ // Only runs shuffle if the array contains more than one element
            var newPosition = 0;
            for (var i=0; i < array.length; i++){
                newPosition = Math.floor(Math.random()*array.length);
                var newElement = array[newPosition];
                array[newPosition] = array[i];
                array[i] = newElement;
            }
        }
        return array;
    },
    
// Logic flow methods. Control the changes and options available.
    mDoStart:function(){ // Start function. Fills up this session's excercise list
        if (this.boolOrderedExcercises && this.arOrderedExcercises.length > 0){ // If the excercises are set to run in a predefined order, and the order is specified in the array
            for (var i = 0; i < this.arOrderedExcercises.length; i++){
                var excerciseId = this.arOrderedExcercises[i]; // Gets the id from the ordered excercise array
                var excercise = this.mFindObject(this.arExcercises,"strID",excerciseId); // Retrieves the excercise object that matches the id from the master collection
                this.arSessionExcercises.push(excercise); // Adds the retrieved object to this session's excercise list
            }
        }
        else{ // If excercises are set to run in random order
            var doObject = this;
            $.extend(doObject.arSessionExcercises,doObject.arExcercises); // Clones excercises from the master collection into the this session's excercise list
            this.mShuffleArray(this.arSessionExcercises); // Shuffles excercises
        }
        this.mDoRunExcercises(this.arSessionExcercises);
    },

    mButtonControl:function(excerciseArray = new Array){// Update button control
        var doObject = this;
        buttonBegin.off();
        buttonBegin.on("click",function(){ // Set control for next excercise
            var btn = $(this);
            btn.attr("disabled","");
            doObject.mDoRunExcercises(excerciseArray);
        });
        buttonBegin.removeAttr("disabled"); // Enable button
    },

    mDoRunExcercises:function(excerciseArray = new Array){ // Loops through the session's excercise list, and executes them in order.
    // Determine current excercise and retrieve object
        var doObject = this;
        var exIndex = this.intCurrentExcercise; // Current excercise index in the session's excercise list.
        var exObject = excerciseArray[exIndex]; // Current excercise object
        var activityObject = this.mSetActivity(exObject); // Sets current activity
        if (!this.boolExcerciseRunning){ // If its the first time to launch the excercise, create DOM element and run introductory animations
            console.log("First time running excercise!!!");
            this.boolExcerciseRunning = true; // Sets flag to "Excercise running = true"
            this.intExcerciseRepeat = exObject.intRepeat; // Sets repetitions counter.
            this.mDisplayExcercise(excerciseColumnDiv,exObject,activityObject); // Creates DOM element for the Excercise
        }
        else{ // The excercise is running. 
            var excerciseDiv = $("div[udexcercisediv]");
            if (exObject.boolCurrentActivityDone){ // The current activity is done.
                if (exObject.intCurrentActivity+1 >= exObject.arActivityList.length){ // If the user has finished all of the excercises' activities
                    if (exObject.intRepeat > 0 && this.intExcerciseRepeat > 1){ // The excercise has repetitions remaining
                        console.log(">>> Repeating excercise");
                        this.intExcerciseRepeat--; // Reduces repetitions
                        exObject.intCurrentActivity = 0; // Resets activity index to first one in the list
                        this.mDisplayExcerciseUpdate(exObject,activityObject);
                    }
                    else { // Excercise over, remove DOM elements and change excercise object
                        console.log("Excercise is over. Removing and reseting variables");
                        this.mDisplayExcerciseRemove(excerciseDiv,exObject);
                        this.boolExcerciseRunning = false;
                        exObject.intCurrentActivity = 0;
                        if (this.intCurrentExcercise + 1 < this.arSessionExcercises.length){ // If this isn't the last excercise in the list
                            console.log("This isn't the last excercise in the list");
                            console.log("this.intCurrentExcercise + 1: "+(this.intCurrentExcercise+1));
                            console.log("this.arSessionExcercises.length: "+this.arSessionExcercises.length);
                            exIndex++; // Next excercise index
                            exObject = excerciseArray[exIndex];
                            this.intCurrentExcercise = exIndex;
                        }
                        else { // Resets to the first excercise in the list
                            console.log("Last excercise in the list, starting over");
                            exIndex=0;
                            exObject = excerciseArray[exIndex];
                            this.intCurrentExcercise = exIndex;
                        }
                        var animationMilliseconds = 1000*this.intAnimationDuration;
                        var waitForAnimation = setTimeout(function(){
                            doObject.mButtonControl(excerciseArray);
                            clearTimeout(waitForAnimation);
                        },animationMilliseconds);
                    }
                }
                else{// Otherwise, sets the index to the next activity
                    exObject.intCurrentActivity++;
                }
            }
            if (this.boolExcerciseRunning){
                activityObject = this.mSetActivity(exObject); // Sets current activity
                this.mDoRunActivity(excerciseDiv,activityObject,exObject); // Runs activity (appends it to the excercise box).
            }
        }
    },

    mSetActivity:function(exObject = new Object){ 
    // Retrieves activity object and returns it
        var activityIndex = exObject.intCurrentActivity; // Current activity in the excercise object's activities array
        var activityId = exObject.arActivityList[activityIndex]; // Retrieves current activity id from the excercise object's activities array
        var activityObject = this.mFindObject(this.arActivities,"strID",activityId); // Fetch activity object from the master collection that matches the id
        console.log("Set Activity ["+activityIndex+"] from object");
        return activityObject;
    },

    mDisplayExcercise:function(HtmlParentElement, exObject = new Object,activityObject = new Object){
        var doObject = this;
    // DOM element settings
        var defaultClass = this.strExcerciseClass; // General default class for all excercise boxes, from the general settings.
        if (this.intExcerciseRepeat > 0) var exTitle = exObject.strDisplay+" "+"("+this.intExcerciseRepeat+")"; // The header for the excercise DOM element.
        else var exTitle = exObject.strDisplay;
        var exTitleStyle = exObject.strDisplayStyle; // The style for the excercise display text.
        var exBoxStyle = exObject.strBoxStyle; // The style for the excercise Box.
        var inAnimation = "animated "+exObject.strInAnimation; // Retrives animation for introducing the excercise box.
        var animationTime = "";
        if (exObject.strInAnimation !== "") animationTime = "animation-duration:"+this.intAnimationDuration+"s";
    // Append DOM element
        var excerciseDiv = $("<div>",{class:defaultClass+" "+inAnimation,style:exBoxStyle+";"+animationTime,udexcercisediv:""});
        var excerciseTitle = $("<h3>",{style:exTitleStyle,html:exTitle,udexcercisetitle:""});
        excerciseDiv.append(excerciseTitle);
        HtmlParentElement.append(excerciseDiv);
    // Wait for excercise introductory animation (if specified) before launching first activity
        var animationMilliseconds = 0;
        if (exObject.strInAnimation !== "") var animationMilliseconds = 1000*this.intAnimationDuration;
        var waitForAnimation = setTimeout(function(){
            doObject.mDoRunActivity(excerciseDiv,activityObject,exObject); // Runs activity, appends it to the excercise box.
            clearTimeout(waitForAnimation);
        },animationMilliseconds);
    },

    mDisplayExcerciseUpdate:function(exObject = new Object,activityObject = new Object){
        console.log("---- Update Excercise Div ----");
    // DOM element update
        var excerciseTitleDiv = $("h3[udexcercisetitle]");
        var exTitle = exObject.strDisplay+" "+"("+this.intExcerciseRepeat+")"; // The header for the excercise DOM element.
        var animationClass = this.strRepeatAnimation;
        var animationTime = "animation-duration:"+this.intAnimationDuration+"s";
        var exTitleStyle = exObject.strDisplayStyle;
    // Run animation and update title
        excerciseTitleDiv.html(exTitle);
        excerciseTitleDiv.removeClass("animated");
        excerciseTitleDiv.removeClass(animationClass);
        excerciseTitleDiv.addClass("animated");
        excerciseTitleDiv.addClass(animationClass);
        excerciseTitleDiv.attr("style",exTitleStyle+";"+animationTime);
    },

    mDisplayExcerciseRemove:function(HtmlParentElement,excerciseObject = new Object){
    // Changes class to exit animation (if one is specified)
        var oldClass = excerciseObject.strInAnimation;
        var newClass = excerciseObject.strOutAnimation;
        HtmlParentElement.removeClass("animated");
        HtmlParentElement.removeClass(oldClass);
        HtmlParentElement.addClass("animated");
        HtmlParentElement.addClass(newClass);
        var animationMilliseconds = 1000*this.intAnimationDuration;
        var outAnimation = setTimeout(function(){
            HtmlParentElement.remove();
            clearTimeout(outAnimation);
        },animationMilliseconds);
    },

    mDoRunActivity: function(HtmlParentElement, activityObject = new Object, exObject = new Object){
        exObject.boolCurrentActivityDone = false;
        // If it's a repeating activity, and it doesn't remove itself, skip creating DOM elements, just update animation
        if(exObject.intRepeat - this.intExcerciseRepeat > 0 && (
            (activityObject.boolButtonConfirm && !activityObject.onConfirm.includes("remove"))
            || (activityObject.boolTimed && !activityObject.onTime.includes("remove"))
        )){
            this.mDisplayActivityUpdate(activityObject,exObject);
        }
        else this.mDisplayActivity(HtmlParentElement,activityObject,exObject);
    },

    mDisplayActivity:function(HtmlParentElement, activityObject = new Object, exObject = new Object){
        console.log("----- Displaying activity ["+activityObject.strID+"]----");
        var doObject = this;
        var actIndex = exObject.arActivityList.indexOf(activityObject.strID);
        var actTitle = activityObject.strDisplay;
        var actTitleCSS = activityObject.strDisplayStyle;
        var actImage = activityObject.strImage;
        var actAnimationClass = "animated "+activityObject.strInAnimation;
        var actDiv = $("<div>",{class:actAnimationClass,udactivitydiv:actIndex}); // Activity container (animates everything inside)
        var actParagraph = $("<p>",{style:actTitleCSS,html:actTitle}); // The activity text, a regular paragraph
        actDiv.append(actParagraph);
        if(activityObject.boolTimed){ // If the activity has a timer, generate a timer container, get it running, set timeout.
            var actTimer = $("<div>",{udacttimer:actIndex});
            actDiv.append(actTimer);
            var seconds = activityObject.intTimer;
            var actTimerStyle = activityObject.strTimerStyle;
            this.mDisplayTimer(actTimer,seconds,actTimerStyle);
            var countDown = setInterval(function(){
                if (seconds <= 1){
                    seconds--;
                    doObject.mDisplayTimer(actTimer,seconds,actTimerStyle);
                    doObject.mDisplayActivityRemove(actDiv,activityObject,exObject);
                    clearInterval(countDown);
                }
                else{
                    seconds--;
                    doObject.mDisplayTimer(actTimer,seconds,actTimerStyle);
                }
            },1000);
        }
        else if (activityObject.boolButtonConfirm) { // If the activity has a confirm button, create, append, and assign on-click event
            var actButtonClass = activityObject.strButtonClass;
            var actButtonText = activityObject.strButtonConfirm;
            var actButton = $("<button>",{class:"btn "+actButtonClass,udactivitybutton:actIndex,text:actButtonText});
            actDiv.append(actButton);
        // Assign on-click event
            actButton.off();
            actButton.on("click",function(){
                actButton.attr("disabled",""); // Disable button to avoid further clicks
                doObject.mDisplayActivityRemove(actDiv,activityObject,exObject);
            });
        }
        if (actImage !== ""){
            var actImgDiv = $("<img>",{src:actImage});
            actDiv.append(actImgDiv);
        }
        HtmlParentElement.append(actDiv);
    },

    mDisplayActivityUpdate:function(activityObject = new Object, exObject = new Object){
        console.log("----- Updating activity display ["+activityObject.strID+" | "+actIndex+"]----");
        var doObject = this;
        var actIndex = exObject.arActivityList.indexOf(activityObject.strID);
        var actDiv = $("div[udactivitydiv="+actIndex+"]"); // Activity container
        console.log("actDiv.attr(udactivitydiv): "+actDiv.attr("udactivitydiv"));
    // Activity entrance animation
        actDiv.removeClass("animated");
        actDiv.removeClass(activityObject.strAnimation);
        actDiv.removeClass(activityObject.strInAnimation);
        actDiv.addClass("animated");
        actDiv.addClass(activityObject.strInAnimation);
    // Activity timer
        if(activityObject.boolTimed){ // If the activity has a timer, generate a timer container, get it running, set timeout.
            var actTimer = $("div[udacttimer="+actIndex+"]");
            var seconds = activityObject.intTimer;
            var actTimerStyle = activityObject.strTimerStyle;
            this.mDisplayTimer(actTimer,seconds,actTimerStyle);
            var countDown = setInterval(function(){
                if (seconds <= 1){
                    seconds--;
                    doObject.mDisplayTimer(actTimer,seconds,actTimerStyle);
                    doObject.mDisplayActivityRemove(actDiv,activityObject,exObject);
                    clearInterval(countDown);
                }
                else{
                    seconds--;
                    doObject.mDisplayTimer(actTimer,seconds,actTimerStyle);
                }
            },1000);
        }
    // If the activity has a confirm button, enable it.
        else if (activityObject.boolButtonConfirm) { // If the activity has a confirm button, create, append, and assign on-click event
            var actButton = $("button[udactivitybutton="+actIndex+"]");
            actButton.removeAttr("disabled"); // Enable button
        // Assign on-click event
            actButton.off();
            actButton.on("click",function(){
                doObject.mDisplayActivityRemove(actDiv,activityObject,exObject);
                actButton.attr("disabled","");
            });
        }
    },

    mDisplayActivityRemove:function(HtmlElement, activityObject = new Object, exObject = new Object){
        console.log("----- Removing activity ["+activityObject.strID+"]----");
        var doObject = this;
        var animationMilliseconds = 0;
        if(activityObject.onConfirm.includes("animation") || activityObject.onTime.includes("animation")){
            var oldClass = activityObject.strInAnimation;
            var newClass = activityObject.strAnimation;
            console.log("Removing class: animated "+oldClass);
            console.log("Adding class: animated "+newClass);
            HtmlElement.removeClass("animated");
            HtmlElement.removeClass(oldClass);
            HtmlElement.addClass("animated");
            HtmlElement.addClass(newClass);
            if (activityObject.boolTimed) animationMilliseconds = 250*doObject.intAnimationDuration;
            else if(activityObject.boolButtonConfirm) animationMilliseconds = 1000*doObject.intAnimationDuration;
        }
        var exitAnimation = setTimeout(function(){
            if(activityObject.onConfirm.includes("remove")) HtmlElement.remove(); // If specified, remove the activity container after animation is done playing
            exObject.boolCurrentActivityDone = true; // Activity is done running
            doObject.mDoRunExcercises(doObject.arSessionExcercises); // Go to excercises method
            clearTimeout(exitAnimation);
        },animationMilliseconds);
    },

    mDisplayTimer: function(HtmlElement, seconds = 0,style=""){ // Displays a timer based on the number of seconds.
        var minTen = Math.floor(Math.floor(seconds/60)/10);
        var minUnit = Math.floor(seconds/60)%10;
        var secTen = Math.floor((seconds%60)/10);
        var secUnit = (seconds%60)%10;
        var minTenSpan = $("<span>",{html:minTen,style:style});
        var minUnitSpan = $("<span>",{html:minUnit,style:style});
        var secTenSpan = $("<span>",{html:secTen,style:style});
        var secUnitSpan = $("<span>",{html:secUnit,style:style});
        var dotsSpan = $("<span>",{html:":",style:style});
        HtmlElement.empty();
        HtmlElement.append(secUnitSpan);
        if(seconds >= 10) HtmlElement.prepend(secTenSpan);
        if(seconds >= 60) HtmlElement.prepend(minUnitSpan,dotsSpan);
        if(seconds >= 600) HtmlElement.prepend(minTenSpan);
    }
}