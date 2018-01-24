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

//allows to use calls and e-mail
import Communications from 'react-native-communications';

import styles from "./styles";

var parseString = require('react-native-xml2js').parseString;

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

    if(!this.state.ready){
      return null;
    }
    else{
      let news_text = this.state.news.rss.channel[0].item.map(function(news_text, index){
        return(
            <Card style={styles.card} key={index}>
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
          <View style={styles.content}>
            {news_text}
          </View>
        </Content>
      </Container>
      );
    }
  }
}
export default LiveNewsFeed;
