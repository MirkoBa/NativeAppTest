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

import { Constants, MapView } from 'expo';

import styles from './styles';
import Heading from '../../Header';

//these imports are used for building the collapsible content
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

/*
This class renders the given data from the job overview in detail
the data is presented in collapsible sections
a MapView with the position of the job is rendered after the collapsible sections
*/
class JobDetails extends Component {

  //is set when a section is clicked
  state = {
    activeSection: false,
    collapsed: true,
  };


  //sets the collapsed state when element is clicked
  _toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  //sets the activeSection state when element is clicked
  _setSection(section) {
    this.setState({ activeSection: section });
  }

  _renderHeader(section, i, isActive) {
    return (
      <Animatable.View duration={400} style={[styles.header, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  }

  _renderContent(section, i, isActive) {
    return (
      <Animatable.View duration={400}  style={[styles.content, isActive ? styles.active : styles.inactive]} transition="backgroundColor">
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>{section.content}</Animatable.Text>
      </Animatable.View>
    );
  }

  /*
  This function extract every line of the given array and returns it as one String
  */
  getLines(path){
    var answerString="";
      for (var i = 0; i < path.length; i++){
        answerString =  answerString + path[i] + "\n"
      }
      return(
        answerString
      );
  }


  static navigationOptions = {
    title: 'JobDetails',
  };

  render(){

    //this represents the given JobData from the job, which has been clicked in the Job overview
    var {params} = this.props.navigation.state;


    //sets variables for the different content sections
    const qualifikation = this.getLines(params.job.Qualifikation);
    const angebote = this.getLines(params.job.Angebot);
    const aufgaben = this.getLines(params.job.Aufgaben);


    //sets the content to each collapsible section
    const CONTENT = [
      {
        title: 'Beschreibung:',
        content: params.job.beschreibung,
      },
      {
        title: 'Ihre Aufgaben: ',
        content: aufgaben,
      },
      {
        title: 'Ihre Qualifikationen:',
        content: qualifikation,
      },
      {
        title: 'Angebot: ',
        content: angebote,
      },
      {
        title: 'Ihre Bewerbung: ',
        content: params.job.bewerbung[0].gehalt,
      },
    ];



    return(

      <Container style={styles.container}>

      <Heading title={params.job.title} icon="arrow-back" navigation={this.props.navigation} route="Jobs"/>


        <Content scrollEnabled={true}>

          <View style={styles.container}>


            <View style={styles.titleContainer}>
              <Image style={styles.jobimage} source={{uri: params.job.image}} />
            </View>

            <View style={styles.title_box}>
                <Text style={styles.titleText}>{params.job.title}</Text>
                <Text style={styles.text}>Beschäftigung: {params.job.beschaeftigung} </Text>
                <Text style={styles.text}>Fachbereich: {params.job.fachbereich} </Text>
            </View>

            <Accordion
              activeSection={this.state.activeSection}
              sections={CONTENT}
              renderHeader={this._renderHeader}
              renderContent={this._renderContent}
              duration={400}
              onChange={this._setSection.bind(this)}
            />

            <View style = {{width:deviceWidth, height: deviceHeight*0.35}}>
              <MapView style = {{flex:1, margin:5}}
                region={{ latitude: params.job.location[0].coords[0].latitude, longitude: params.job.location[0].coords[0].longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
              >
                <MapView.Marker
                  coordinate={params.job.location[0].coords[0]}
                  title={params.job.location[0].city}
                  description={params.job.location[0].adress}
                />
              </MapView>
            </View>

            <View style = {styles.textcontainer}>
              <HTMLView stylesheet={styles} value={params.job.bewerbung[0].footer}/>
            </View>

          </View>



        </Content>

      </Container>
    );
  }
}

export default JobDetails;
