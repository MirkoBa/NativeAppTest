import React, { Component} from "react";
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
import {Image, StatusBar, Dimensions} from 'react-native';
import Carousel from "react-native-carousel-control";


//allows to use hyperlinks
import Hyperlink from 'react-native-hyperlink';

//allows to use calls and e-mail
import Communications from 'react-native-communications';

import styles from './styles';
import {checkConnection, isAvailable} from '../../helpers/helpers' ;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const phonenumber = '+43 7242 4910';
const email_adress = 'info.wels@ssi-schaefer.com';

const dataUrl = 'https://api.myjson.com/bins/14aapl';
const infosUrl = 'https://api.myjson.com/bins/6bd8x';
const newsUrl = 'https://api.myjson.com/bins/rm8i1';

const count = 0;


const [no_connection, carousel_data, server_down, news_text, landing_start_text, landing_info1, landing_info2]
    = Array(7).fill(<Text style={styles.empty}></Text>);

/*
This class represents the StartPage of the App
*/
class Home extends Component {


  constructor(props){
    super(props);
    this.state = {
      data:[],
      infos:[],
      news:[],
      ready: false,
      connection: false,
      dataStatus: "",
      infoStatus: "",
      newsStatus: ""
    }
  }

  //fetches the JSON data from a specific url to a specific state variable
  async getData(url, status){
    console.log("begin with: " + status);
    await fetch(url)
    .then((response) => response.json())
    .then((responseJSON) =>{
        this.setState({[status]: responseJSON});
        console.log("End with: " + status);
    })
    .catch((error) => {
      console.error(error);
    });
  }


  //sets states of the Object to the incoming json data
  async componentDidMount(){

    count = 0;

    await checkConnection().then(response =>
        this.setState({connection: response})
    );

    var prom1 = isAvailable(dataUrl);
    var prom2 = isAvailable(infosUrl);
    var prom3 = isAvailable(newsUrl);

    await Promise.all([prom1,prom2,prom3]).then(response =>{

      response.forEach(function(entry){

        if(entry==666){
          count = count+1;
        }
        else
        {
          if(entry.url == dataUrl){
              this.setState({dataStatus: entry.status});
          }
          else if (entry.url == infosUrl){
              this.setState({infoStatus: entry.status});
          }
          else if (entry.url == newsUrl){
              this.setState({newsStatus: entry.status});
          }
          if(entry.ok){
            if(entry.url == dataUrl){
              this.getData(entry.url, 'data')
            }
            else if(entry.url == infosUrl){
              this.getData(entry.url, 'infos')
            }
            else if (entry.url == newsUrl){
              this.getData(entry.url, 'news');
            }
          }
        }
        },
        this
      );
    });


    (() => {

      console.log(this.state.connection);
      console.log(count);
      console.log(this.state.dataStatus);
      console.log(this.state.newsStatus);
      console.log(this.state.infoStatus);


            //if device has no internetconnection
            if(!this.state.connection){
              no_connection =
                <View >
                  <Text style={styles.servermsg}>Gerät hat keine Internetverbindung</Text>
                </View>
            }

            //if internetconnection is established and all servers do not return
            else if(this.state.connection && count==3){
              server_down =
                <View >
                  <Text style={styles.servermsg}>Alle Server nicht erreichbar</Text>
                </View>
            }

            else if(this.state.dataStatus == 200) {

              //represents the view of the data in the carousel on top of the HomeScreen
              carousel_data = this.state.data.map(function(carousel_data, index){
                return(
                  <View key={index} style={{flex:1, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row'}}>
                    <View>
                      <Image source={{uri: carousel_data.url}} style ={styles.carouselimage} />
                    </View>
                    <View style={styles.textOverlay}>
                      <View style={{marginLeft: 5}}>
                        <Text style ={styles.textHeader_overImage}>{carousel_data.text[0]}</Text>
                      </View>
                      <Text style ={styles.text_overImage}>{carousel_data.text[1]}</Text>
                    </View>
                  </View>
                )
              });

              console.log("Bin mit dataStatus durch");
              }


              else if(this.state.newsStatus == 200){
                //represents the view of the data news on the bottom of the HomeScreen
                news_text = this.state.news.map(function(news_text, index){
                  return(
                    <Card key={index}>
                      <View style={{flex: 1, flexDirection: 'row', marginBottom: 5, alignItems: 'center', justifyContent: 'center', padding: 5}}>
                        <View style={{width: deviceWidth*0.3}}>
                          <Image source={{uri: news_text.image}} style ={styles.image} />
                        </View>
                        <View style={{width: deviceWidth*0.7}}>
                          <Text style ={styles.textHeader_news}>{news_text.title}</Text>
                          <Text style ={styles.text_news}>{news_text.text}</Text>
                        </View>
                      </View>
                    </Card>
                  )
                });

                console.log("Bin mit newsStatus durch");
              }


              else if(this.state.infoStatus == 200){
                //represents the view of the first text pragraph after the carousel on top of the HomeScreen
                landing_start_text = this.state.infos.map(function(landing_start_text, index){
                  return(
                      <View key={index}>
                        <View style= {{backgroundColor: '#efd915', margin: 5}}>
                          <Text style={styles.textHeader}>{landing_start_text.header[0]}</Text>
                        </View>
                          <Text style={styles.text_start}>{landing_start_text.header[1]} </Text>
                      </View>
                  )
                });

                //represents the view of the first of two info cards in the center of the HomeScreen
                landing_info1 = this.state.infos.map(function(landing_info1, index){
                  return(
                      <View key={index} style={styles.landing_info_view}>
                        <View style={styles.landing_info_text_view}>
                          <Text style ={styles.textHeader_news}>{landing_info1.images[0].head}</Text>
                        </View>
                        <Image source={{uri: landing_info1.images[0].url}} style ={{height: deviceWidth*0.47, width: deviceWidth*0.47}} />
                        <Text style ={styles.text}>{landing_info1.images[0].text}</Text>
                      </View>
                  )
                });

                //represents the view of the second of two info cards in the center of the HomeScreen
                landing_info2 = this.state.infos.map(function(landing_info2, index){
                  return(
                      <View key={index} style={styles.landing_info_view}>
                        <View style={styles.landing_info_text_view}>
                          <Text style ={styles.textHeader_news}>{landing_info2.images[1].head}</Text>
                        </View>
                        <Image source={{uri: landing_info2.images[1].url}} style ={{height: deviceWidth*0.47, width: deviceWidth*0.47}} />
                        <Text style ={styles.text}>{landing_info2.images[1].text}</Text>
                      </View>
                  )
                });

                console.log("Bin mit InfoStatus durch");

              }


            //represents the footer of the StartPage, which includes also the ability to contact SSI via Mail and phone
            let footer =
              <View>
                <Text style={styles.textHeader_footer}> KONTAKTIEREN SIE UNS. IHRE ANFRAGE UND BERATUNG PER E-MAIL. </Text>
                <View style={{padding:5}}>
                  <View style ={styles.footerContainer}>

                          <Button iconLeft
                            transparent style ={styles.buttonStyling}
                            onPress={() => Communications.email(email_adress,null,null,'SSI Schaefer','Schreiben Sie uns Ihr Anliegen')}
                          >
                            <Icon name ="mail" style={styles.buttonIcon}/>
                            <Text style={styles.buttonText}>Schreiben Sie uns</Text>
                          </Button>

                          <Button iconLeft
                            transparent style ={styles.buttonStyling}
                            onPress={() => Communications.phonecall(phonenumber, true)}
                          >
                            <Icon name ="call" style={styles.buttonIcon} />
                            <Text style={styles.buttonText}>Rufen Sie uns an</Text>
                          </Button>
                  </View>
                </View>

                <Hyperlink linkStyle={ styles.hyperlinks} linkDefault={ true }>
                  <Text style={{ margin: 15, textAlign: 'center', fontSize: deviceHeight*0.025}}> Besuchen Sie uns auch online: ssi-schaefer.com</Text>
                </Hyperlink>
              </View>
        })();


  }



  render() {

    if(!this.state.ready){
      return(
      <Container>
        <Content>
          <Spinner color='blue' />
        </Content>
      </Container>
      );
    }

    else if(this.state.ready){

      console.log("Arbeite weil ready");


      /*
      in this return statement all the above delcared parts are returned
      all parts are bundelded in a container
      first of all the header includes a menu sidebar, which contains all primary routes of the app
      the secound element ist the carouselview - this includes images and short text information
      === The next 3 components are composed by one view
        following after the carousel comes some information text about the company called {landing_start_text}
        the {landing_info1} and {landing_info2} are two information blocks which are presented next to each other
        {news_text} includes seperate news, each in one row, including an image and a short text
      ===
      the footer marks the end of the startPage - it has no seperate View
      */
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
                <Title>Home</Title>
              </Body>
              <Right />
            </Header>

            <Content scrollEnabled={true}>

              {no_connection}
              {server_down}

              <View style={styles.carouselContent}>
                <Carousel pageWidth={deviceWidth} sneak={0.1}>
                  {carousel_data}
                </Carousel>
              </View>

              <View style={{flex: 1}}>
                {landing_start_text}
                <View style={{flex: 1, flexDirection: 'row', alignContent: 'space-between',  padding: 5}}>
                  {landing_info1}
                  {landing_info2}
                </View>
                {news_text}
              </View>

            </Content>
          </Container>
        );
    }
  }
}

export default Home;
