
(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAGGN3DGwYFP5FyQ-ASN6eKjBzX8HuWn7E",
    authDomain: "testpushnotifications-69fe5.firebaseapp.com",
    databaseURL: "https://testpushnotifications-69fe5.firebaseio.com",
    projectId: "testpushnotifications-69fe5",
    storageBucket: "testpushnotifications-69fe5.appspot.com",
    messagingSenderId: "931917352103"
  };

  firebase.initializeApp(config);

  var database = firebase.database();
  var ref = database.ref('users');


  var allTokens=[];
  var email="";
  var password="";

  //onload or reload the logout function will be triggered to erase cached user auth
  $(window).on('load', function(){
    logout();
  });


  /*
  when the auth state changes to true via login, the logout budden will be shown
  when the auth state changes to false , the logout budden will be hidden
  */
  firebase.auth().onAuthStateChanged( firebaseUser => {

    if (firebaseUser) {
      console.log("Logged in");
      console.log(firebaseUser);
      $('#logout').removeClass("hidden");
    }
    else{
      console.log("Not logged in");
      $('#logout').addClass("hidden");
    }
  });


  //setting up all functions to be executed on cliking the different buttons
  $('#getData').click(getData);
  $('#logout').click(logout);
  $('#sendPushMsg').click(sendPushMsg);
  $('#login').click(login);



  //when the user has logged in , the data from firebase database can be rendered in a list and all ExpoTokens will be stored in an array
  function getData(){

        //clear Array and list to avoid double entries
        allTokens=[];
        $('#tokens').empty();

        try{
          firebase.auth().signInWithEmailAndPassword(email,password).then(

            ref.on('value', function(snapshot){
              var data = (snapshot.val());
              var keys = Object.keys(data);


              //setting up the list with data from firebase and pushing all Tokens to an array
              for (var i = 0; i<keys.length; i++){
                var k = keys[i];
                var token = data[k].expoToken;
                var mail = data[k].userEmail;

                allTokens.push(token);

                var li = "<li>" + mail + ": " +  token + "</li>";
                $('#tokens').append(li);
                $('#tokenContainer').removeClass('hidden');
              }
            },
            function(error){
              alert("Keine Berechtigung");
              console.log("The read failed: " + error.code);
            })
          );
        }
        catch(error){
          alert("Keine Berechtigung");
          console.log(error);
        }
  }

  /*
  the logout function signs out the user from firebase.auth and emptys the list and the array with all tokens
  also the password and the email adress will be cleared
  */
  function logout(){
    firebase.auth().signOut();
    $('#tokenContainer').addClass('hidden');
    allTokens=[];
    $('#tokens').empty();
    email="";
    password="";
  }

  //the values of title and body will be posted to all ExpoTokens in array 'allTokens'
  function sendPushMsg(){

        allTokens.forEach(function(entry){
            var post={
              to: entry,
              title: $('#title').val(),
              body: $('#pushMsg').val(),
            };

            $.ajax({
                type: 'POST',
                url: 'https://exp.host/--/api/v2/push/send',
                data: post
            });
        });
  }

  /*
  the values of the email and password textfields will be used to to try to signin @ firebase
  after the user has been logged in a timeout is set, so that the user will be automatically logged out when the set duration is over
  */
  function login(){
    email = $('#email').val();
    password = $('#pw').val();

    $('#email').val("");
    $('#pw').val("");

    const promise = firebase.auth().signInWithEmailAndPassword(email,password);
    promise.then(
      setTimeout(logout, 20000)
    );
    promise.catch(
      e=> console.log(e.message));
  }

  }());
