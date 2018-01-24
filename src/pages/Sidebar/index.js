import React, { Component } from "react";
import { Image, StatusBar } from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge
} from "native-base";
import styles from "./style";

const datas = [
  {
    name: "Home",
    route: "Home",
    icon: "home",
    bg: "#C5F442"
  },
  {
    name: "LiveNewsFeed",
    route: "LiveNewsFeed",
    icon: "browsers",
    bg: "#C5F442"
  },
  {
    name: "Jobs",
    route: "Jobs",
    icon: "person",
    bg: "#C5F442"
  },
  {
    name: "Todos",
    route: "Todos",
    icon: "list",
    bg: "#C5F442"
  },
  {
    name: "Login",
    route: "Login",
    icon: "person",
    bf: "#C5F442",
  }

];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  render() {
    return (
      <Container style={{marginTop: StatusBar.currentHeight}}>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >

          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;
