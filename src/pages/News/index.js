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
import {Image, StatusBar, Dimensions, TouchableOpacity} from 'react-native';

import styles from "./styles";

import {ContentSnippet} from './../../helpers/helpers/';
import Heading from '../Header/';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

class News extends Component {

  constructor(){
    super()
    this.state = {
      data:[]
    }
  }

  //fetches the JSON data from a specific url to a specific state variable
  getData(url, status){
    return fetch(url)
    .then((response) => response.json())
    .then((responseJSON) =>{
      this.setState({[status]: responseJSON});
    })
    .catch((error) => {
      console.error(error);
    });
  }


  //sets states of the Object to the incoming json data
  componentDidMount(){    //will always be executed when the HomeScreen will be addressed
    this.getData('http://10.151.9.28:3000/News', 'data');   //represents the data of the top carousel
  }

  render() {

    return (
      <Container style={styles.container}>
        <Heading title="News"icon="ios-menu" navigation={this.props.navigation} route="DrawerOpen"/>

        <Content scrollEnabled={true}>
          {this.state.data.map((news, index) => (

            <View key={index} style={{flex:1, alignItems: 'flex-start', justifyContent: 'space-around', flexDirection: 'row', padding: 5, margin:5, height: deviceWidth*0.6}}>

              <TouchableOpacity key={index} onPress={()=> this.props.navigation.navigate('NewsDetails', {NewsDetails: news})}>
                <View style={styles.imageContainer}>
                  <Image style={styles.image}  source={{uri: news.image}} />
                </View>
              </TouchableOpacity>


                <View style={styles.textConatiner}>
                  <View style={{marginLeft: 5}}>
                    <Text style={styles.title}>{news.title} </Text>
                    <Text style={styles.dateText}>{news.date}</Text>
                    <Text style={styles.text}>{ContentSnippet(news.previewText, 15)}</Text>
                  </View>
                </View>

            </View>

          ))}
        </Content>

      </Container>
    );
  }
}

export default News;
