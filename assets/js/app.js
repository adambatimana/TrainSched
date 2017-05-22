window.onload = function(){


// =======================================================================
//                    FIREBASE
// =======================================================================

var config = {
    apiKey: "AIzaSyD45vwAk6Yaq_bIaOMeDbrjz-FYPww_Cfg",
    authDomain: "trainsched-a7839.firebaseapp.com",
    databaseURL: "https://trainsched-a7839.firebaseio.com",
    projectId: "trainsched-a7839",
    storageBucket: "trainsched-a7839.appspot.com",
    messagingSenderId: "121331039303"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  // =======================================================================
  //                   ONCLICK EVENT LISTENERS
  // =======================================================================
$("#addTrain").on("click", function(event){

        event.preventDefault();

        //grab user input
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        //need moment.js to create military time
        var firstTrain = moment($("#firstTrain").val().trim(), "LT").format("HH:mm");
        var frequency = $("#frequency").val().trim();

        //new train object to hold input data-name
        var newTrain = {
          name: trainName,
          place: destination,
          first: firstTrain,
          freq: frequency
        };

        //make sure you are grabbing right information from inputs
        // Logs everything to console
        console.log(newTrain.name);
        console.log(newTrain.place);
        console.log(newTrain.first);
        console.log(newTrain.freq);


        //clear boxes after click
        $("#trainName").val("");
        $("#destination").val("");
        $("#firstTrain").val("");
        $("#frequency").val("");
});


  // =======================================================================
  //                    MOMENT.JS
  // =======================================================================




  // =======================================================================
  //                   FUNCTIONS
  // =======================================================================






















}
