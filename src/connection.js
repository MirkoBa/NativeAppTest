import React, { Component } from 'react';
import {
  NetInfo
} from 'react-native';

import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
  Body,
  View,
  Card,
  Spinner
} from "native-base";

import {checkConnection, isAvailable} from './helpers/helpers' ;


class connection extends Component {

  constructor(props){
    super(props);
    this.state = {
      connection: false,
      status: "",
      json: []
    }
  }




  async componentDidMount(){
    await checkConnection().then(response =>
        this.setState({connection: response})
    );
    var prom = isAvailable('http://10.151.9.28:3000/News');

    //if the response of the server contains no status but just the set integer 666 - set the status to 666
    await prom.then(response => {

        if(response==666){
          this.setState({status: 666});
        }
        else{
          this.setState({status: response.status});
        }
    });


    //if server responses with 200er code set json state
    if(this.state.status == 200 )
    {
      return prom
      .then((response) => response.json())
      .then((responseJSON) =>{
        this.setState({json: responseJSON});
      })
    }

  }

  render() {


    //if internetconnection established and server does not answer
    if (this.state.connection && this.state.status == 666){
      return(
        <Container>
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
              <Title>Verbindungstest</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <View >
              <Text>Server nicht erreichbar</Text>
            </View>
          </Content>
        </Container>
    );}

    //if internetconnection established and server does answer
    else if (this.state.connection && this.state.status == 200 ){
      return(
        <Container>
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
              <Title>rechne JSON</Title>
            </Body>
            <Right />
          </Header>
          <Content>
          {this.state.json.map((news, index) => (

            <View key={index} style={{flex:1, alignItems: 'flex-start', justifyContent: 'space-around', flexDirection: 'row', padding: 5, margin:5}}>
                <View>
                  <View style={{marginLeft: 5}}>
                    <Text>{news.title} </Text>
                    <Text>{news.date}</Text>
                    <Text>{news.previewText}</Text>
                  </View>
                </View>

            </View>

          ))}
          </Content>
        </Container>
    );}

    //if internetconnection established and server does answer with error
    else if (this.state.connection && this.state.status != 200 && this.state.status != 666){
      return(
        <Container>
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
              <Title>Verbindungstest</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <View >
              <Text>Error: {this.state.status}</Text>
            </View>
          </Content>
        </Container>
    );}

    //if internetconnection is not established
    else if(!this.state.connection){
      return(
        <Container>
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
              <Title>keine verbindung</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <View >
              <Text>{this.state.status}</Text>
            </View>
          </Content>
        </Container>
    );}
  }
}

export default connection;
