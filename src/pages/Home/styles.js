
import { Dimensions, StatusBar} from 'react-native';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  container: {
    backgroundColor: "#fff",
  },
  textHeader: {
    color: 'black',
    paddingTop: 5,
    fontSize: deviceHeight*0.03,
    fontWeight: 'bold',
    textAlign: 'center',
    margin:5,
  },
  textHeader_footer:{
    color: 'grey',
    paddingTop: 5,
    fontSize: deviceHeight*0.03,
    fontWeight: 'bold',
    textAlign: 'center',
    margin:5,
  },
  textHeader_news: {
    color: 'black',
    paddingTop: 5,
    fontSize: deviceHeight*0.02,
    fontWeight: 'bold',
    textAlign: 'left',
    margin:5,
  },
  text: {
    color: 'black',
    padding: 5,
    fontSize: deviceHeight*0.02,
    textAlign: 'left',
  },
  text_start: {
    color: 'black',
    margin: 5,
    fontSize: deviceHeight*0.02,
    textAlign: 'left',
  },
  text_news: {
    color: 'black',
    margin: 2,
    padding: 2,
    fontSize: deviceHeight*0.02,
    textAlign: 'left',
  },
  carouselimage: {
    width: deviceWidth,
    height: deviceHeight*0.45,
    resizeMode: 'cover',
  },
  textOverlay:{
    position: 'absolute',
    top: 60,
    left: deviceWidth*0.4,
    width: deviceWidth*0.6,
    height: deviceHeight*0.45,
  },
  textHeader_overImage:{
    backgroundColor: '#efd915',
    fontWeight: 'bold',
    fontSize: deviceHeight*0.026,
    textAlign: 'center',
    padding: 5,
  },
  text_overImage:{
    backgroundColor: 'white',
    fontSize: deviceHeight*0.018,
    textAlign: 'left',
    padding: 5,
  },
  image:{
    width: (deviceWidth/3.7),
    height: (deviceWidth/3.7),
    margin: 5,
  },
  carouselContent:{
    backgroundColor : '#fff',
    paddingTop: 0,
    paddingBottom: 10,
    height: deviceHeight*0.45,
  },
  buttonText:{
    fontSize: deviceHeight*0.018,
  },
  buttonIcon:{
    fontSize: deviceHeight*0.02,
  },
  buttonStyling:{
    backgroundColor: 'white' ,
    margin:5 ,
    width: deviceWidth*0.45 ,
    justifyContent: 'center',
    alignItems: 'center' ,
  },
  hyperlinks:{
     color: '#2980b9',
     fontSize: deviceHeight*0.025,
  },
  footerContainer:{
      backgroundColor: 'grey',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
  },
  landing_info_text_view:{
      backgroundColor: '#edece8',
      width: deviceWidth*0.47,
      marginBottom: 5,
      padding: 3 ,
  },
  landing_info_view:{
      width: deviceWidth*0.5,
      height: deviceWidth*0.9,
      alignContent: 'flex-start',
      justifyContent: 'center',
  }
};
