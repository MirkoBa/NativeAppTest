import { Dimensions, StatusBar} from 'react-native';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  container: {
    backgroundColor: "#FFF",
  },
  card:{
    width: deviceWidth*0.9,
  },
  card_header:{
      backgroundColor: '#efd915',
  },
  content_left:{
    alignItems:'flex-start',
    paddingLeft: 5,
  },
  content_right:{
    alignItems:'flex-end',
    paddingRight: 5,
  },
  title:{
    fontWeight: 'bold',
    color: '#585b5e',
    fontSize: deviceHeight*0.03,
    margin: 5,
    paddingLeft: 5,
  },
  text:{
    fontSize: deviceHeight*0.025,
    margin: 5,
    padding: 5,
  },
  contact_text:{
    fontSize: deviceHeight*0.02,
  },
  email:{
    fontSize: deviceHeight*0.02,
    color: '#5e8be2',
  },
  contact:{
    margin: 5,
    padding: 5,
  },
  date:{
    marginLeft: 5,
    marginBottom: 5,
    paddingLeft: 5,
    fontSize: deviceHeight*0.02,
    fontWeight: 'bold',
  }
};
