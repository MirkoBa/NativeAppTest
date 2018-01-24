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


import styles from "./styles";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default class NewsDetails extends Component {



  render() {

    var {params} = this.props.navigation.state;

    return (

      <Container style={styles.container}>

        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('News')}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>News Details</Title>
          </Body>
          <Right />
        </Header>

        <Content scrollEnabled={true}>
          <View style={styles.contentcontainer}>
            <Image source={{uri:params.NewsDetails.image}} style={styles.image}/>
            <Text style = {styles.date}>{params.NewsDetails.date}</Text>
            <Text style = {styles.pageTitel}>{params.NewsDetails.Details[0].PageTitle}</Text>
            <Text style = {styles.pageText}>{params.NewsDetails.Details[0].PageText}</Text>
          </View>
        </Content>

      </Container>
    );
  }
}
