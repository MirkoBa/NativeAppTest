import { Dimensions, StatusBar} from 'react-native';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;


export default {
  container: {
    backgroundColor: "#FFF",
  },
  contentcontainer:{
    margin:5,
    padding:5,
  },
  date:{
    marginTop: 10,
    fontSize: deviceHeight*0.02,
    fontWeight: 'bold',
  },
  pageTitel:{
    fontSize: deviceHeight*0.035,
    fontWeight: 'bold',
  },
  PageText:{
    fontSize: deviceHeight*0.02,
  },
  image:{
    width: deviceWidth*0.9,
    height: deviceHeight*0.3,
  }
};
