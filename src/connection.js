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
    var prom = isAvailable('https://httpstat.us/300');

    //if the response of the server contains no status but just the set integer 666 - set the status to 666
    await prom.then(response => {

        if(response==666){
          this.setState({status: 666});
        }
        else{
          this.setState({status: response.status});
        }
    });

  }

  render() {

    let header =
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


    //if internetconnection established and server does not answer
    if (this.state.connection && this.state.status == 666){
      return(
        <Container>
          {header}
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
          {header}
          <Content>
            <Text>
              Status 200 OK
            </Text>
          </Content>
        </Container>
    );}

    //if internetconnection established and server does answer with error
    else if (this.state.connection && this.state.status != 200 && this.state.status != 666){
      return(

        <Container>
          {header}
          <Content>
            <View >
              <Text>Status: {this.state.status}</Text>
            </View>
          </Content>
        </Container>
    );}

    //if internetconnection is not established
    else if(!this.state.connection){
      return(
        <Container>
          {header}
          <Content>
            <View >
              <Text>Keine Internetverbindung</Text>
            </View>
          </Content>
        </Container>
    );}
  }
}

export default connection;
