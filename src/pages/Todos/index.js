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
      "Push Nachrichten aktuell über Expo Server",
      "Android: Google-Cloud Messaging mit Server API Key and a Sender ID",
      "IOS: Apple Push Notification Service",
      "Akkuverbrauch?",
      "Mit XML & JSON darauf achten: By default, iOS will block any request that's not encrypted using SSL",
      "Smartphone orientation",
      "Test mit installierter App",
      "Performance",
      "Header als Klasse"
    ];

    let view = todos.map(function(todo,index){
      return(
        <ListItem key = {index} style={{margin: 5, padding: 2}}>
          <Body>
            <Text style={{padding: 2, margin: 5, fontSize: deviceHeight*0.025}}>{todo}</Text>
          </Body>
        </ListItem>
      )
    });

    return (
      <Content>
        <View style={{margin: 5, padding: 2, width: deviceWidth*0.95}}>
          {view}
        </View>
      </Content>
    );
  }
}
