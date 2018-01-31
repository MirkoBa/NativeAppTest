import React, { Component } from 'react';

import {
  Header,
  Title,
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

class heading extends Component {

  constructor(){
    super()
  }

  render(){

    return(
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate(this.props.route)}
            >
              <Icon name={this.props.icon} />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.title}</Title>
          </Body>
          <Right />
        </Header>
    );
  }
}

export default heading;
