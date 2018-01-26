import React, { Component } from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Badge,
  Text,
  Left,
  Right,
  Body,
  Card,
  CardItem,
  View,
  ListItem,
  CheckBox
} from "native-base";

import {Dimensions} from 'react-native';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default class Todos extends React.Component {




  render() {

    var todos = [
      "Google API Key nutzen für Maps?",
      "Push Nachrichten aktuell über Expo Server",
      "Android: Google-Cloud Messaging mit Server API Key and a Sender ID",
      "IOS: Apple Push Notification Service",
      "Akkuverbrauch?",
      "Was passiert bei fehlender Internetverbindung?",
      "Ladezeiten beim fetchen von Daten?",
      "Mit XML & JSON darauf achten: By default, iOS will block any request that's not encrypted using SSL",
      "Stack-Navigation routet mit zurück nicht richtig - geht nur auf die StartPage",
      "Smartphone orientation"
    ];

    let view = todos.map(function(todo,index){
      return(
        <ListItem key = {index} style={{margin: 5, padding: 5}}>
          <Body>
            <Text style={{padding: 5, margin: 5, fontSize: deviceHeight*0.025}}>{todo}</Text>
          </Body>
        </ListItem>
      )
    });

    return (
      <Content>
          {view}
      </Content>
    );
  }
}
