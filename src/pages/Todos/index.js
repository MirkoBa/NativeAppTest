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
  View
} from "native-base";

import {Dimensions} from 'react-native';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default class Todos extends React.Component {


  render() {
    return (

      <View>
        <Text style={{padding: 5, margin: 5, fontSize: deviceHeight*0.025}}>Google API Key nutzen für Maps?</Text>
        <Text style={{padding: 5, margin: 5, fontSize: deviceHeight*0.025}}>Push Nachrichten aktuell über Expo Server</Text>
        <Text style={{padding: 3, margin: 5, fontSize: deviceHeight*0.02}}>Android: Google-Cloud Messaging mit Server API Key and a Sender ID</Text>
        <Text style={{padding: 3, margin: 5, fontSize: deviceHeight*0.02}}>IOS: Apple Push Notification Service</Text>
        <Text style={{padding: 5, margin: 5, fontSize: deviceHeight*0.025}}>Akkuverbrauch?</Text>
        <Text style={{padding: 5, margin: 5, fontSize: deviceHeight*0.025}}>Was passiert bei fehlender Internetverbindung?</Text>
        <Text style={{padding: 5, margin: 5, fontSize: deviceHeight*0.025}}>Ladezeiten beim fetchen von Daten?</Text>
        <Text style={{padding: 5, margin: 5, fontSize: deviceHeight*0.025}}>Mit XML & JSON darauf achten: By default, iOS will block any request that's not encrypted using SSL</Text>
        <Text style={{padding: 5, margin: 5, fontSize: deviceHeight*0.025}}>Stack-Navigation routet mit zurück nicht immer richtig</Text>
      </View>

    );
  }
}
