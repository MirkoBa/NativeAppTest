import { Dimensions, StatusBar} from 'react-native';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  container: {
    backgroundColor: "#FFF",
  },
  text:{
    fontSize: deviceHeight*0.018,
    backgroundColor: "#FFF",
    marginLeft: 5,
    marginRight: 5,
    padding: 3,
  },
  dateText:{
    fontSize: deviceHeight*0.02,
    fontWeight: 'bold',
    marginLeft: 15,
    marginRight: 5,
    padding: 3,
    backgroundColor: '#b8bec6',
  },
  title:{
    fontSize: deviceHeight*0.025,
    fontWeight: 'bold',
    textAlign: 'left',
    margin: 5,
  },
  image:{
    height: deviceWidth*0.6,
    width: deviceWidth*0.8,
    resizeMode: 'cover',
  },
  textConatiner:{
    position: 'absolute',
    left: deviceWidth*0.16,
    top: deviceWidth*0.18,
    height: deviceWidth*0.4,
    width: deviceWidth*0.8,
    backgroundColor: '#efd915',
  },
  imageContainer:{
    height: deviceWidth*0.6,
    width: deviceWidth,
    padding: 3,
    margin: 5,
  },
};
