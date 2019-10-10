// Initialize Firebase
var config = {
    apiKey: "AIzaSyCtalMeRBSLF13eCne_ok17vOe6y_PR26s",
    authDomain: "train-scheduler-calvinm.firebaseapp.com",
    databaseURL: "https://train-scheduler-calvinm.firebaseio.com",
    projectId: "train-scheduler-calvinm",
    storageBucket: "train-scheduler-calvinm.appspot.com",
    messagingSenderId: "G-QVN8FNZ6LY"
  };

firebase.initializeApp(config)

var database = firebase.database()

$('#addTrainBtn').on('click', function(event){
     event.preventDefault()
    //first lets grab user input
    var trainName = $("#trainNameInput").val().trim()
    var destinationName = $("#destinationInput").val().trim()
    var firstTrainTime = $('#firstTrainTimeInput').val().trim()
    var frequencyAmount = $('#frequencyInput').val().trim()
    // create temporary data for new train
    var newTrain = {
        name: trainName,
        destination: destinationName,
        startTime: firstTrainTime,
        frequency: frequencyAmount
    }

    // push new Train to database
    database.ref().push(newTrain)
      
    // log data to console
    console.log(newTrain.name)
    console.log(newTrain.destination)
    console.log(newTrain.startTime)
    console.log(newTrain.frequency)

    // Alert
    alert("Train added to schedule")
    // clear Text Boxes
    $("#trainNameInput").val("")
    $("#destinationInput").val("")
    $("#firstTrainTimeInput").val("")
    $("#frequencyInput").val("")
})

  
// Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val())
    // Store everything into a variable
    var trainName = childSnapshot.val().name
    var destinationName = childSnapshot.val().destination
    var firstTrainTime = childSnapshot.val().startTime
    var frequencyAmount = childSnapshot.val().frequency

    // Employee Info
    console.log(trainName)
    console.log(destinationName)
    console.log(firstTrainTime)
    console.log(frequencyAmount)

    //The Math
    var firstTimeConverted = moment(firstTrainTime, "hh:mm A");
    //console.log(firstTimeConverted)

    var currentTime = moment()
    console.log('Current time: ' + moment(currentTime).format('hh:mm A'))

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes")
    //console.log("Difference in Time: " + diffTime)

    var tRemainder = diffTime % frequencyAmount
    //console.log(tRemainder)

    var tMinutesTillTrain = frequencyAmount - tRemainder
    //console.log('Minutes Till Train: ' + tMinutesTillTrain)

            
    var nextTrain = moment().add(tMinutesTillTrain, "minutes")
    console.log("ARRIVAL TIMESSS: " + moment(nextTrain).format("hh:mm"))

          
    // add html for each entry
    $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destinationName + "</td><td>" + frequencyAmount + "</td><td>" + nextTrain.format("hh:mm A") + "</td><td>" + tMinutesTillTrain +"</td></tr>")

  })