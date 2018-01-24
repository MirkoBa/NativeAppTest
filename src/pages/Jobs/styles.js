import { Dimensions, StatusBar} from 'react-native';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;


export default {
  container: {
    backgroundColor: "#FFF"
  },
  image:{
    width: deviceWidth,
    height: deviceHeight*0.25,
    resizeMode: 'cover',
  },
  textOverlay:{
    position: 'absolute',
    top: 15,
    right: deviceWidth*0.3,
    width: deviceWidth*0.6,
    height: deviceHeight*0.1,
    backgroundColor: 'rgba(230,230,230,0.7)',
  },
  text_overImage:{
    fontSize: deviceHeight*0.02,
    textAlign: 'left',
    margin: 5,
    color: 'black',
  },
  CardText:{
    fontSize: deviceHeight*0.02,
  }
};
