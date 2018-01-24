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
import {Image, StatusBar, Dimensions, TouchableHighlight} from 'react-native';
import HTMLView from 'react-native-htmlview';

import styles from "./styles";

import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

class JobDetails extends Component {


  static navigationOptions = {
    title: 'JobDetails',
  };

  render(){

    const deviceHeight = Dimensions.get("window").height;
    const deviceWidth = Dimensions.get("window").width;

    var {params} = this.props.navigation.state;

    let qualifikationen = params.job.Qualifikation.map(function(qualifikation, index){
      return (
            <Text key={index} style={styles.text}>{qualifikation}</Text>
      )
    });

    let angebote = params.job.Angebot.map(function(angebot, index){
      return (
            <Text key={index} style={styles.text}>{angebot}</Text>
      )
    });


    return(

      <Container style={styles.container}>
        <Content scrollEnabled={true}>
          <View>
            <View style={styles.titleContainer}>
              <Image style={styles.jobimage} source={{uri: params.job.image}} />
              <Text style={styles.titleText}>{params.job.title}</Text>
            </View>
            <View style = {styles.textcontainer}>
              <Text style={styles.text}>Standort: <Text style={{fontWeight: 'bold', fontSize: deviceHeight*0.019}}>{params.job.standort}</Text></Text>
              <Text style={styles.text}>Beschäftigungsart: <Text style={{fontWeight: 'bold', fontSize: deviceHeight*0.019}}>{params.job.beschaeftigung}</Text></Text>
              <Text style={styles.text}>Fachbereich: <Text style={{fontWeight: 'bold', fontSize: deviceHeight*0.019}}>{params.job.fachbereich}</Text></Text>
            </View>


            <View style = {styles.textcontainer}>
              <Text style={styles.text}>{params.job.beschreibung}</Text>
            </View>
            <View style = {styles.textcontainer}>
              <Text style={styles.titleText}>Ihre Aufgaben:</Text>
              <Text style={styles.text}>{params.job.Aufgaben}</Text>
            </View>
            <View style = {styles.textcontainer}>
              <Text style={styles.titleText}>Ihre Qualifikationen:</Text>
              {qualifikationen}
            </View>
            <View style = {styles.textcontainer}>
              <Text style={styles.titleText}>Angebot:</Text>
              {angebote}
            </View>
            <View style = {styles.textcontainer}>
              <Text style={styles.titleText}>Ihre Bewerbung:</Text>
              <Text style={styles.gehaltstext}>{params.job.bewerbung[0].gehalt}</Text>
              <HTMLView stylesheet={styles} value={params.job.bewerbung[0].footer}/>
            </View>

          </View>
        </Content>

      </Container>
    );
  }
}

export default JobDetails;
