import { Dimensions, StatusBar} from 'react-native';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;


export default {
    
  text:{
    fontSize: deviceHeight*0.02,
    padding: 5,
    textAlign: 'left',
  },
  jobimage:{
      width: deviceWidth,
      height: deviceHeight*0.3,
  },
  titleText:{
    fontSize: deviceHeight*0.03,
    fontWeight: 'bold',
    textAlign: 'left',
    padding: 5,
  },
  titleContainer:{
    paddingBottom: 10,
  },
  textcontainer:{
    margin: 5,
    padding: 5,
  },
  p:{
    color: '#7c7f82',
    fontSize: deviceHeight*0.02,
    paddingTop: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    textAlign: 'center',
    fontSize: deviceHeight*0.025,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'left',
    fontSize: deviceHeight*0.025,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,245,245,0.9)',
  },
  title_box:{
    flex:1,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    padding: 5,
    margin: 5,
    backgroundColor: '#efd915',
  }
};
