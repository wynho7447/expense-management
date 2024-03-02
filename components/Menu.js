import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Animated, TouchableOpacity, Dimensions } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MenuItem from "./MenuItem";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CLOSE_MENU,
  OPEN_MENU,
  closeMenu,
  updateName,
  updateAvatar,
  openLogin,
  switchTheme,
  SWITCH_THEME,
} from "../redux/appActions";

import { darkTheme, lightTheme } from "../constants/Theme";

let screenWidth = Dimensions.get("window").width;
var cardWidth = screenWidth;
if (screenWidth > 500) {
  cardWidth = 500;
}

function mapStateToProps(state) {
  return {
    action: state.appReducer.action,
    name: state.appReducer.name,
    theme: state.appReducer.theme,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeMenu,
    updateName,
    updateAvatar,
    openLogin,
    switchTheme,
  };
}

const screenHeight = Dimensions.get("window").height;

class Menu extends React.Component {
  state = {
    top: new Animated.Value(screenHeight),
  };

  theme = this.props.theme;

  componentDidMount() {
    this.toggleMenu();
  }

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.action == OPEN_MENU) {
      Animated.spring(this.state.top, {
        toValue: 54,
        useNativeDriver: false,
      }).start();
    }

    if (this.props.action == CLOSE_MENU) {
      Animated.spring(this.state.top, {
        toValue: screenHeight,
        useNativeDriver: false,
      }).start();
    }
  };

  handleMenu = (index) => {
    if (index === 3) {
      AsyncStorage.clear();
      this.props.updateName();
      this.props.updateAvatar(require("../assets/avatar-default.jpg"));
      this.props.openLogin();

      setTimeout(() => {
        this.props.closeMenu();
      }, 500);
    }

    if (index === 2) {
      this.props.theme.mode == "light"
        ? this.props.switchTheme(darkTheme)
        : this.props.switchTheme(lightTheme);

      setTimeout(() => {
        this.props.closeMenu();
      }, 500);
    }
  };

  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <AnimatedContainer style={{ top: this.state.top }}>
          <Cover>
            <Title>{this.props.name}</Title>
            <Subtitle>Setting Menu</Subtitle>
          </Cover>
          <TouchableOpacity
            onPress={this.props.closeMenu}
            style={{
              position: "absolute",
              top: 120,
              left: "50%",
              marginLeft: -22,
              zIndex: 1,
            }}
          >
            <CloseView>
              <Ionicons name="close" size={44} color={"#546bfb"} />
            </CloseView>
          </TouchableOpacity>
          <Content>
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  this.handleMenu(index);
                }}
              >
                <MenuItem
                  icon={item.icon}
                  title={item.title}
                  text={item.text}
                />
              </TouchableOpacity>
            ))}
          </Content>
        </AnimatedContainer>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(Menu);

const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  font-weight: 600;
  font-size: 24px;
`;
const Subtitle = styled.Text`
  font-size: 13px;
  color: ${(props) => props.theme.SECOND_TEXT_COLOR};

  margin-top: 8px;
`;

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
`;

const Containner = styled.View`
  position: absolute;
  background: white;
  height: 100%;
  width: ${cardWidth};
  align-self: center;
  z-index: 100;
  border-radius: 10px;
  overflow: hidden;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Containner);

const Cover = styled.View`
  height: 142px;
  background: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  height: ${screenHeight};
  background: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
  padding: 50px;
`;

const items = [
  {
    icon: "settings",
    title: "Account",
    text: "settings",
  },
  {
    icon: "card",
    title: "Billing",
    text: "payments",
  },
  {
    icon: "compass",
    title: "Switch Theme",
    text: "Change to Ligth or Dark Theme",
  },
  {
    icon: "exit",
    title: "Log out",
    text: "see you soon!",
  },
];
