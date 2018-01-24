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

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;


class Jobs extends Component {

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
    this.getData('https://api.myjson.com/bins/jlogl', 'data');   //represents the data of the top carousel
  }

  render() {

      return(

        <Container style={styles.container}>

          <Header>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.navigate("DrawerOpen")}
              >
                <Icon name="ios-menu" />
              </Button>
            </Left>
            <Body>
              <Title>Jobs</Title>
            </Body>
            <Right />
          </Header>

          <Content scrollEnabled={true}>
            {this.state.data.map((jobData, index) => (
                <Card key={index}>
                  <View style={{flex: 1, flexDirection: 'column', margin: 5}}>
                    <View>
                      <View>
                        <TouchableOpacity key={index} onPress={()=> this.props.navigation.navigate('JobDetails', {job: jobData})}>
                          <View>
                            <Image style ={styles.image} source={{uri: jobData.image}} />
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.textOverlay}>
                        <Text style ={styles.text_overImage}>{jobData.title}</Text>
                      </View>
                    </View>

                    <View style={{flex:1, alignItems: 'flex-start', justifyContent: 'space-around', margin: 5}}>
                      <Text style={styles.CardText}>Standort: {jobData.location[0].city}</Text>
                      <Text style={styles.CardText}>Beschäftigung: {jobData.beschaeftigung} </Text>
                      <Text style={styles.CardText}>Fachbereich: {jobData.fachbereich} </Text>
                    </View>
                  </View>
                </Card>
            ))}
          </Content>

      </Container>
    );
  }
}

export default Jobs;
