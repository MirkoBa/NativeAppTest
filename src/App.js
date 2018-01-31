import React from "react";
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";

import Home from './pages/Home/';
import News from './pages/News/';
import Jobs from './pages/Jobs/';
import JobDetails from './pages/Jobs/JobDetails/';
import NewsDetails from './pages/News/NewsDetails/';
import Todos from './pages/Todos/';
import Login from './boot/LoginScreen';
import SideBar from './pages/Sidebar/';

import connection from './connection'

import LiveNewsFeed from './pages/News/LiveNewsFeed/';

/*
this const stores logical references to different screens to navigate through the app
the drawer will be rendered over the actual content
the view itself is defined in Sidebar
*/
const Drawer = DrawerNavigator(
  {
    Home: {screen: Home},
    News: {screen: News},
    Jobs: {screen: Jobs},
    Todos: {screen: Todos},
    Login : {screen: Login},
    LiveNewsFeed : {screen: LiveNewsFeed},
    connection : {screen: connection},
  },
  {
  initialRouteName: "Home",
      contentOptions: {
        activeTintColor: "#e91e63"
      },
      contentComponent: props => <SideBar {...props} />
  }
);


const AppNavigator = StackNavigator(
  {
    Drawer: { screen: Drawer },
    JobDetails: {screen: JobDetails},
    NewsDetails : {screen: NewsDetails}
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

export default () =>
  <Root>
    <AppNavigator />
  </Root>;
