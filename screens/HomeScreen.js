import React from "react";
import styled from "styled-components";
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";

import { NotificationIcon } from "../components/Icons";
import Menu from "../components/Menu";
import Avatar from "../components/Avatar";
import Wallet from "../components/Wallet";

import { I18n } from "i18n-js";
import { Translations } from "../Localization";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entries from "../components/Entries";
import { EntrieType } from "../constants/enums";

function mapStateToProps(state) {
  return { action: state.action, name: state.name, locale: state.locale };
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () =>
      dispatch({
        type: "OPEN_MENU",
      }),
    openLogin: () =>
      dispatch({
        type: "OPEN_LOGIN",
      }),
  };
}

const i18n = new I18n(Translations);
// i18n.locale = Localization.getLocales()[0].languageCode;

class HomeScreen extends React.Component {
  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
    // locale: i18n.locale,
  };

  componentDidMount() {
    StatusBar.setBarStyle("dark-content", true);
    // if (Platform.OS == "android") StatusBar.setBarStyle("light-content", true);
  }

  componentDidUpdate() {
    this.toggleMenu();

    if (this.props.action == "openLogin") {
      this.props.navigation.navigate("Login");
    }
  }

  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.timing(this.state.scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in(),
        useNativeDriver: false,
      }).start();

      Animated.spring(this.state.opacity, {
        toValue: 0.5,
        useNativeDriver: false,
      }).start();

      StatusBar.setBarStyle("light-content", true);
    }

    if (this.props.action == "closeMenu") {
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in(),
        useNativeDriver: false,
      }).start();

      Animated.spring(this.state.opacity, {
        toValue: 1,
        useNativeDriver: false,
      }).start();

      StatusBar.setBarStyle("dark-content", true);
    }
  };

  handleAvatar = () => {
    if (this.props.name) {
      this.props.openMenu();
    } else {
      this.props.navigation.push("Login");
    }
  };

  render() {
    return (
      <RootView>
        <Menu />
        <AnimatedContainer
          style={{
            transform: [{ scale: this.state.scale }],
            opacity: this.state.opacity,
          }}
        >
          <Overlay source={require("../assets/vector-2.png")} />
          <SafeAreaView>
            <ScrollView>
              <TitleBar>
                <TouchableOpacity
                  onPress={this.handleAvatar}
                  style={{ position: "absolute", top: 0 }}
                >
                  <Avatar />
                </TouchableOpacity>
                <Title>{i18n.t("greeting")}</Title>
                <Name>{this.props.name}</Name>
                <NotificationIcon
                  style={{ position: "absolute", right: 20, top: 5 }}
                />
              </TitleBar>
              <Subtitle>Overview</Subtitle>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ padding: 20, paddingLeft: 10, paddingTop: 20 }}
              >
                <WalletsContainer>
                  {/* Add wallet button */}
                  <TouchableOpacity>
                    <ButtonAddWallet>
                      <Ionicons name="add" size={24} color="#C8C8C8" />
                    </ButtonAddWallet>
                  </TouchableOpacity>
                  {/* Wallet list */}
                  {wallets.map((wallet, index) => (
                    <Wallet
                      key={index}
                      index={index}
                      title={wallet.title}
                      amount={wallet.amount}
                    />
                  ))}
                </WalletsContainer>
              </ScrollView>
              <Section style={{ marginTop: 56 }}>
                <Header>
                  <HeaderTitle>Latest Entries</HeaderTitle>
                </Header>
                <Content>
                  <Entries data={entries} />
                </Content>
              </Section>
            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
      </RootView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const Section = styled.View`
  flex-direction: column;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  height: 32px;
  padding: 0 20px;
`;

const Subtitle = styled.Text`
  color: #2f2f2f;
  font-weight: 600;
  font-size: 18px;
  margin-left: 20px;
  margin-top: 20px;
`;

const HeaderTitle = styled.Text`
  color: #2f2f2f;
  font-weight: 600;
  font-size: 18px;
  flex: 1;
`;

const Content = styled.View``;

const Container = styled(LinearGradient).attrs({
  colors: ["#ffffff", "#EFF1F5"],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
})`
  flex: 1;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  flex-direction: row;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Overlay = styled.Image`
  position: absolute;
  top: -100;
  width: 100%;
`;

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #2f2f2f;
  font-weight: bold;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 20px;
  padding-left: 80px;
`;

const WalletsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const ButtonAddWallet = styled.View`
  border-radius: 10px;
  width: 52px;
  height: 52px;
  border: 1px dashed #c8c8c8;
  justify-content: center;
  align-items: center;
  margin-left: 16px;
`;

// Contanst
const wallets = [
  {
    title: "Total Salary",
    amount: "1800",
  },
  {
    title: "Total Expense",
    amount: "1800",
  },
  {
    title: "Monthly Expense",
    amount: "4000",
  },
];

const entries = [
  {
    title: "Food",
    date: "2024/02/01",
    description: "Google Pay",
    amount: 200,
    type: EntrieType.EXPENSE,
    icon: "fast-food",
  },
  {
    title: "Salary",
    date: "2024/02/01",
    description: "Cash",
    amount: 3000,
    type: EntrieType.INCOME,
    icon: "cash",
  },
  {
    title: "Uber",
    date: "2024/02/01",
    description: "Cash",
    amount: 18,
    type: EntrieType.EXPENSE,
    icon: "bicycle",
  },
  {
    title: "Shopping",
    date: "2024/02/01",
    description: "Cash",
    amount: 400,
    type: EntrieType.EXPENSE,
    icon: "cart",
  },
];
