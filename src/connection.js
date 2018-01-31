import React, { Component } from 'react';

import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body,
  View,
  Card,
  Spinner
} from "native-base";

import {
  NetInfo
} from 'react-native';

import {checkConnection, isAvailable} from './helpers/helpers' ;

import Heading from './pages/Header/';

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
    var prom = isAvailable('http://10.151.9.28:3000/Jobs');

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

    //if internetconnection established and server does not answer
    if (this.state.connection && this.state.status == 666){
      return(
        <Container>
          <Heading title="Server nicht erreichbar" icon ="ios-menu" navigation={this.props.navigation} route="DrawerOpen"/>
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
          <Heading title="Server nicht erreichbar" icon ="ios-menu" navigation={this.props.navigation} route="DrawerOpen"/>
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
          <Heading title="Server nicht erreichbar" icon ="ios-menu" navigation={this.props.navigation} route="DrawerOpen"/>
          <Content>
            <View >
              <Text>{this.state.status}</Text>
            </View>
          </Content>
        </Container>
    );}

    //if internetconnection is not established
    else if(!this.state.connection){
      return(
        <Container>
          <Heading title="Server nicht erreichbar" icon ="ios-menu" navigation={this.props.navigation} route="DrawerOpen"/>
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
