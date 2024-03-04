import React from "react";
import styled, { ThemeProvider } from "styled-components";
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
import { EntrieCategory, EntrieType } from "../constants/enums";
import {
  openMenu,
  openLogin,
  OPEN_LOGIN,
  OPEN_MENU,
  CLOSE_MENU,
  updateAvatar,
  updateName,
} from "../redux/appActions";

import AsyncStorage from "@react-native-async-storage/async-storage";
import CategoriesChart from "../components/CategoriesChart";

function mapStateToProps(state) {
  return {
    action: state.appReducer.action,
    name: state.appReducer.name,
    theme: state.appReducer.theme,
  };
}

function mapDispatchToProps() {
  return {
    openMenu,
    openLogin,
    updateAvatar,
    updateName,
  };
}

const i18n = new I18n(Translations);
// i18n.locale = Localization.getLocales()[0].languageCode;

class HomeScreen extends React.Component {
  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
    name: "",
  };

  componentDidMount() {
    // StatusBar.setBarStyle("dark-content", true);
    // if (Platform.OS == "android") StatusBar.setBarStyle("light-content", true);

    this.loadState();
  }
  loadState = () => {
    AsyncStorage.getItem("state").then((serializedState) => {
      const state = JSON.parse(serializedState);

      if (state) {
        // console.log("Load state: " + JSON.stringify(state));
        if (state.name != this.props.name) {
          this.props.updateAvatar({ uri: state.avatar });
          this.props.updateName(state.name);
        }
      } else {
        this.setState({
          photo: require("../assets/avatar-default.jpg"),
        });
        this.props.openLogin();
      }
    });
  };

  componentDidUpdate() {
    this.toggleMenu();
    if (this.props.action == OPEN_LOGIN) {
      this.props.navigation.navigate("Login");
    }
  }

  toggleMenu = () => {
    if (this.props.action == OPEN_MENU) {
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

    if (this.props.action == CLOSE_MENU) {
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
      <ThemeProvider theme={this.props.theme}>
        <RootView>
          <Menu />
          <AnimatedContainer
            style={{
              transform: [{ scale: this.state.scale }],
              opacity: this.state.opacity,
            }}
          >
            <Overlay
              source={
                this.props.theme.mode == "light"
                  ? require("../assets/vector-2.png")
                  : require("../assets/vector-2-dark.png")
              }
            />
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
                    <HeaderTitle>Categories Expense</HeaderTitle>
                  </Header>
                  <Content>
                    <CategoriesChart data={entries} />
                  </Content>
                </Section>
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
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(HomeScreen);

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
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  font-weight: 600;
  font-size: 18px;
  margin-left: 20px;
  margin-top: 20px;
`;

const HeaderTitle = styled.Text`
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  font-weight: 600;
  font-size: 18px;
  flex: 1;
`;

const Content = styled.View``;

const Container = styled(LinearGradient).attrs((props) => ({
  colors: props.theme.PRIMARY_LINEAR_GRADIENT || ["#ffffff", "#EFF1F5"],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
}))`
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
  color: ${(props) => props.theme.SECOND_TEXT_COLOR};
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
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
  border: 1px dashed ${(props) => props.theme.BORDER_COLOR};
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
    category: EntrieCategory.EATING,
    icon: "fast-food",
    color: "#80C4DC",
  },
  {
    title: "Salary",
    date: "2024/02/01",
    description: "Cash",
    amount: 3000,
    type: EntrieType.INCOME,
    category: EntrieCategory.SALARY,
    icon: "cash",
    color: "#913434",
  },
  {
    title: "Uber",
    date: "2024/02/01",
    description: "Cash",
    amount: 60,
    type: EntrieType.EXPENSE,
    category: EntrieCategory.MOVING,
    icon: "bicycle",
    color: "#3B3DBF",
  },
  {
    title: "Shopping",
    date: "2024/02/01",
    description: "Cash",
    amount: 300,
    type: EntrieType.EXPENSE,
    category: EntrieCategory.LIFE,
    icon: "cart",
    color: "#FF9E9E",
  },
  {
    title: "Internet",
    date: "2024/02/01",
    description: "Cash",
    amount: 120,
    type: EntrieType.EXPENSE,
    category: EntrieCategory.BILL,
    icon: "cash",
    color: "#3aa55a",
  },
];
