import React from "react";
import styled from "styled-components";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";
import {
  Alert,
  Animated,
  Dimensions,
  Keyboard,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import AppTextInput from "../components/AppTextInput";
import firebase from "../components/Firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Success from "../components/Success";
import Loading from "../components/Loading";
import { saveState } from "../components/AsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CLOSE_LOGIN,
  FOCUS_INPUT_IN,
  FOCUS_INPUT_OUT,
  closeLogin,
  updateAvatar,
  updateName,
} from "../redux/appActions";

const screenHeight = Dimensions.get("window").height;

function mapStateToProps(state) {
  return { action: state.appReducer.action };
}

function mapDispatchToProps(dispatch) {
  return {
    closeLogin,
    updateName,
    updateAvatar,
  };
}

class LoginScreen extends React.Component {
  state = {
    email: "tester01@gmail.com",
    password: "tester01",
    isSuccessful: false,
    isLoading: false,
    errors: {},

    // Animated
    top: new Animated.Value(0),
  };

  tapBackground = () => {
    Keyboard.dismiss();
  };

  validateForm = () => {
    let errors = {};
    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const email = this.state.email;
    const password = this.state.password;

    if (!email) errors.email = "Email is required";
    else if (regEmail.test(email) === false)
      errors.email = "Email is Not Valid email address";

    if (!password) errors.password = "Password is required";

    this.setState({ errors });

    return Object.keys(errors).length === 0;
  };

  retrieveName = async () => {
    try {
      const name = await AsyncStorage.getItem("name");
      if (name !== null) {
        this.props.updateName(name);
      }
    } catch (error) {
      console.log("Error get name:" + error);
    }
  };

  handleLogin = () => {
    if (this.validateForm()) {
      // Start loading
      this.setState({ isLoading: true });

      const email = this.state.email;
      const password = this.state.password;

      const auth = getAuth(firebase);

      signInWithEmailAndPassword(auth, email, password)
        .catch(function (error) {
          // Error message
          if (error.code == "auth/invalid-credential")
            Alert.alert(
              "Error",
              "You've logged in Fail. Email or password is Not Correct"
            );
          else Alert.alert("Error", error.message);
        })
        .then((response) => {
          this.setState({ isLoading: false });

          if (response) {
            // Successful
            this.setState({ isSuccessful: true });

            this.fetchUser();

            setTimeout(() => {
              Keyboard.dismiss();
              this.setState({ isSuccessful: false });
              // Alert.alert("Congrats", "You've logged in successfuly!");
              this.props.closeLogin();
            }, 1000);

            // console.log(response.user);
          }
        });
    }
  };

  fetchUser = () => {
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((response) => {
        const avatar = response.results[0].picture.thumbnail;
        const name =
          response.results[0].name.first + " " + response.results[0].name.last;

        saveState({ name, avatar });
        this.props.updateName(name);
        this.props.updateAvatar({ uri: avatar });
      });
  };

  componentDidMount() {
    // this.retrieveName();
  }

  componentDidUpdate() {
    if (this.props.action == CLOSE_LOGIN) {
      this.props.navigation.navigate("Home");
    }

    if (this.props.action == FOCUS_INPUT_IN) {
      Animated.timing(this.state.top, {
        toValue: -80,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }

    if (this.props.action == FOCUS_INPUT_OUT) {
      Animated.timing(this.state.top, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }

  render() {
    return (
      <>
        <AnimatedContainer style={{ top: this.state.top }}>
          <Overlay source={require("../assets/vector-1.png")} />
          <StatusBar hidden />
          <TouchableWithoutFeedback onPress={this.tapBackground}>
            <BlurView tint="default" intensity={100} />
          </TouchableWithoutFeedback>

          <Logo source={require("../assets/logo.png")} />
          <Text style={{ marginTop: 60 }}>Email: tester01@gmail.com</Text>
          <Text>Password: tester01</Text>
          <LoginForm>
            <AppTextInput
              onChangeText={(email) => this.setState({ email })}
              placeholder="Email"
              value={this.state.email}
              keyboardType="email-address"
              icon="mail"
              error={this.state.errors.email}
            />
            <AppTextInput
              onChangeText={(password) => this.setState({ password })}
              placeholder="Password"
              value={this.state.password}
              secureTextEntry={true}
              icon="lock-closed"
              error={this.state.errors.password}
            />
            <TouchableOpacity onPress={this.handleLogin}>
              <ButtonView>
                <ButtonText>Log in</ButtonText>
              </ButtonView>
            </TouchableOpacity>
          </LoginForm>
          <Success isActive={this.state.isSuccessful} />
          <Loading isActive={this.state.isLoading} />
        </AnimatedContainer>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(LoginScreen);

const Container = styled(LinearGradient).attrs({
  colors: ["#ffffff", "#EFF1F5"],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
})`
  flex: 1;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  flex-direction: column;
  align-items: center;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Overlay = styled.Image`
  position: absolute;
  top: 0;
  width: 100%;
`;

const Logo = styled.Image`
  width: 80px;
  height: 92px;
  margin-top: 120px;
`;

const Text = styled.Text`
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  width: 260px;
  color: #b8bece;
  text-align: center;
  margin-top: 20px;
`;

const LoginForm = styled.View`
  padding: 0 32px;
  flex-direction: column;
`;

const ButtonView = styled.View`
  background: #3b3dbf;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 10px 20px rgba(93, 94, 217, 0.2);
`;

const ButtonText = styled.Text`
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 20px;
`;

const BlurView = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
`;
