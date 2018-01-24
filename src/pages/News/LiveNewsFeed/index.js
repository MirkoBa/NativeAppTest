import React, { Component } from 'react';
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
  Card
} from "native-base";

import {TouchableOpacity} from 'react-native';

//allows to use calls, e-mail and the browser
import Communications from 'react-native-communications';

import styles from "./styles";

//transforming data into JSON
var parseString = require('react-native-xml2js').parseString;


/*
This class renders all the data coming from a XML NewsFeed
The XML is fetched as text and transformed to JSON via the package 'xml2js'
Via the Communications package E-Mail address from the XML will not only be text but can be used
the titles of the cards are clickable urls
*/
class LiveNewsFeed extends Component {

  constructor(props){
    super(props)
    this.state = {
      news:[],
      ready: false
    }
  }

  //fetches the XML data from a specific url to a specific state variable and parses it to JSON
  getData(url, status){
    return fetch(url)
    .then((response) => response.text())
    .then((response) =>{
    parseString(response, (err, result) => {
      this.setState({[status]: result});
      this.setState({ready: true});
    });
    })
    .catch((error) => {
      console.error(error);
    });
  }




  componentDidMount(){
    this.getData('https://test-preview.ssi-schaefer.com/blueprint/servlet/service/rss/en-de/80522/feed.rss', 'news');
  }


  render() {

    /*
    because the fetching of the XML and parsing it to JSON takes longer as wished, null will be returned to wait for data (ready state is false)
    when fetching and parsing is done the state is set to true and the data is mapped to a card view
    the render statement can fire the return of null multiple times until the state is set to true
    */
    if(!this.state.ready){
      return null;
    }
    else{
      let news_text = this.state.news.rss.channel[0].item.map(function(news_text, index){
        return(
          //switching orientation from left to right in relation to the index
          <View key={index} style={[styles.content_left, (index%2==1) && styles.content_right ]}>
            <Card style={styles.card}>
              <View style={styles.card_header}>
                  <TouchableOpacity onPress={() => Communications.web(news_text.link[0])}>
                      <Text style={styles.title}>{news_text.title}</Text>
                  </TouchableOpacity>
                  <Text style={styles.date}>{news_text.pubDate}</Text>
              </View>
              <Text style={styles.text}>{news_text.description}</Text>
                <View style={styles.contact}>
                  <Text style={styles.contact_text}>{news_text.contact[0].name}</Text>
                  <Text style={styles.contact_text}>{news_text.contact[0].position}</Text>
                  <TouchableOpacity onPress={() => Communications.email(news_text.contact[0].mail,null,null,news_text.title,'Schreiben Sie uns Ihr Anliegen')}>
                    <Text style={styles.email}>{news_text.contact[0].mail}</Text>
                  </TouchableOpacity>
                  <Text style={styles.contact_text}>{news_text.locations[0].location}</Text>
                </View>
            </Card>
          </View>
        )
      });

      return (
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
            <Title>NewsFeed</Title>
          </Body>
          <Right />
        </Header>

        <Content scrollEnabled={true}>
            {news_text}
        </Content>
      </Container>
      );
    }
  }
}
export default LiveNewsFeed;
