window.onload = function() {


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
  $("#addTrain").on("click", function(event) {

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

    // Uploads train  data to the database
    database.ref().push(newTrain);

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

  //grab information for values of input from firebase
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().place;
    var firstTrain = childSnapshot.val().first;
    var frequency = childSnapshot.val().freq;

    // Employee Info
    console.log("Firebase " + trainName);
    console.log("Firebase " + destination);
    console.log("Firebase " + firstTrain);
    console.log("Firebase " + frequency);


    // =======================================================================
    //                    MOMENT.JS
    // =======================================================================

    var tFrequency = frequency;

    // Time is 3:30 AM
    var firstTime = firstTrain;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    // Add each train's data into the table

    $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td><td>" + "<button class ='delete btn btn-danger'>Remove </button> " + "</td></tr>");

  });


  // =======================================================================
  //                   GOOGLE LOG IN
  // =======================================================================
  function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;

    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'https://adambatimana.github.io/TrainSched');

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = function() {
      console.log('Signed in as: ' + xhr.responseText);
    };

    xhr.send('idtoken=' + id_token);
    console.log("ID Token: " + id_token);
    console.log(profile);


    if (auth2.isSignedIn.get()) {
        var profile = auth2.currentUser.get().getBasicProfile();
        console.log('ID: ' + profile.getId());
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
      }

      gapi.load('auth2', function() {
        auth2 = gapi.auth2.init({
          client_id: '171536910-ncc56hpidbfcp1dsjat9e7238k64tq34.apps.googleusercontent.com',
          fetch_basic_profile: false,
          scope: 'profile'
        });

        // Sign the user in, and then retrieve their ID.
        auth2.signIn().then(function() {
          console.log(auth2.currentUser.get().getId());
        });
      });
  };

function onSuccess(googleUser) {
       console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
     }

function onFailure(error) {
       console.log(error);
     }

function renderButton() {
       gapi.signin2.render('my-signin2', {
         'scope': 'profile email',
         'width': 240,
         'height': 50,
         'longtitle': true,
         'theme': 'dark',
         'onsuccess': onSuccess,
         'onfailure': onFailure
       });
     }

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
      console.log('User signed out.');
    });
  }


  // =======================================================================
  //                   FUNCTIONS
  // =======================================================================

  // remove row with button in it
  $('table').on('click', 'button', function(e) {
    $(this).closest('tr').remove();
  });
  // update whole schedule
  $('table').on("click", "#upDate", function(e) {
    location.reload();
  });
  // sign out of google
  $(".signOut").on("click", signOut);
  //sign in using google
  $('.g-signin2').on("click", "#signIn", function(e) {
    onSignIn();
  });

}
