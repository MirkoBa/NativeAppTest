import * as Expo from "expo";
import React, { Component } from "react";

import{Container,  Content, Header, Form, Input, Item, Button, Label, Text} from 'native-base';

import {Permissions, Notifications} from 'expo';
import * as firebase from 'firebase';

/*
this is set to hide the warning 'Setting a timer for a long period of time' in the app (can be shown in console),
which is produced by the fact that the firebase real-time database uses a method to refresh the token
look for details at: https://github.com/firebase/firebase-js-sdk/issues/97
*/
console.ignoredYellowBox = [
  'Setting a timer'
];

const firebaseConfig = {
  apiKey: "AIzaSyAGGN3DGwYFP5FyQ-ASN6eKjBzX8HuWn7E",
  authDomain: "testpushnotifications-69fe5.firebaseapp.com",
  databaseURL: "https://testpushnotifications-69fe5.firebaseio.com",
  projectId: "testpushnotifications-69fe5",
  storageBucket: "testpushnotifications-69fe5.appspot.com",
  messagingSenderId: "931917352103"
};

firebase.initializeApp(firebaseConfig);


class Login extends Component {

  constructor() {
    super()
    this.state = ({
      email: '',
      password: ''
    });
  }

  registerForPushNotificationsAsync = async(user) =>{
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    var updates = {}
    updates['/expoToken'] = token
    updates['/userEmail'] = user.email
    firebase.database().ref('users').child(user.uid).update(updates)

  }

  signUpUser = (email,password) => {
      try{
        if(password.length<6){
          alert("Passwort muss mindestens 6 Zeichen haben")
          return;
        }
        firebase.auth().createUserWithEmailAndPassword(email,password);
        alert("Hi " + email + " - account registerd");
      }catch(error){
        console.log(error.toString())
      }
  }

  loginUser = (email,password) => {
    try{
      firebase.auth().signInWithEmailAndPassword(email,password).then(user => {
        this.registerForPushNotificationsAsync(user);
        this.props.navigation.navigate('Home');
      })
    }catch(error){
      console.log(error.toString())
    }
  }


  render(){
    return(
      <Container style={{flex: 1, padding:5, justifyContent: 'center'}}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={(email) =>this.setState({email})}
            />

          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={(password) =>this.setState({password})}
            />
          </Item>

          <Button style={{marginTop:10}}
            full
            rounded
            success
            onPress={()=>this.loginUser(this.state.email, this.state.password)}
          >
            <Text style={{color:'white'}}>Login</Text>
          </Button>

          <Button style={{marginTop:10}}
            full
            rounded
            primary
            onPress={()=>this.signUpUser(this.state.email, this.state.password)}
          >
            <Text style={{color:'white'}}>SignUp</Text>
          </Button>
        </Form>

      </Container>

    );
  }
}

export default Login;
