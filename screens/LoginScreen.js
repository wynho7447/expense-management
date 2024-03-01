import React from "react";
import styled from "styled-components";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";
import {
  Alert,
  Keyboard,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

function mapStateToProps(state) {
  return { action: state.action };
}

function mapDispatchToProps(dispatch) {
  return {
    closeLogin: () =>
      dispatch({
        type: "CLOSE_LOGIN",
      }),
  };
}

class LoginScreen extends React.Component {
  state = {
    email: "",
    password: "",
    iconEmail: require("../assets/icon-email.png"),
    iconPassword: require("../assets/icon-password.png"),
  };

  tapBackground = () => {
    Keyboard.dismiss();
  };

  handleLogin = () => {
    // Start loading
    this.setState({ isLoading: true });

    // Simulate API Call
    setTimeout(() => {
      // Stop loading and show success
      this.setState({ isLoading: false });
      this.setState({ isSuccessful: true });

      setTimeout(() => {
        this.props.closeLogin();
        this.setState({ isSuccessful: false });
      }, 1000);

      Alert.alert("Congrats", "You've logged in successfuly!");
    }, 2000);
  };

  componentDidUpdate() {
    if (this.props.action == "closeLogin") {
      console.log("Tôi nghe close login");
      this.props.navigation.navigate("Home");
    }
  }

  render() {
    return (
      <Container>
        <TouchableWithoutFeedback onPress={this.tapBackground}>
          <BlurView
            tint="default"
            intensity={100}
            style={{ position: "absolute", width: "100%", height: "100%" }}
          />
        </TouchableWithoutFeedback>
        <StatusBar hidden />
        <Overlay source={require("../assets/vector-1.png")} />
        <Logo source={require("../assets/icon.png")} />
        <Text style={{ marginTop: 60 }}>Email: tester01@gmail.com</Text>
        <Text>Password: tester01</Text>
        <InputGroup>
          <TextInput
            onChangeText={(email) => this.setState({ email })}
            placeholder="Email"
            value={this.state.email}
            keyboardType="email-address"
          />
          <IconEmail source={this.state.iconEmail} />
        </InputGroup>
        <InputGroup>
          <TextInput
            onChangeText={(password) => this.setState({ password })}
            placeholder="Password"
            value={this.state.password}
            secureTextEntry={true}
          />
          <IconPassword source={this.state.iconPassword} />
        </InputGroup>
        <TouchableOpacity onPress={this.handleLogin}>
          <ButtonView>
            <ButtonText>Log in</ButtonText>
          </ButtonView>
        </TouchableOpacity>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

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

const Overlay = styled.Image`
  position: absolute;
  top: 0;
  width: 100%;
`;

const TextInput = styled.TextInput`
  border: 1px solid #dbdfea;
  width: 295px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #3c4560;
  padding-left: 44px;
`;

const Logo = styled.Image`
  width: 80px;
  height: 80px;
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

const ButtonView = styled.View`
  background: #5263ff;
  width: 295px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 10px 20px #c2cbff;
`;

const ButtonText = styled.Text`
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 20px;
`;

const InputGroup = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

const IconEmail = styled.Image`
  width: 24px;
  height: 16px;
  position: absolute;
  left: 10px;
`;

const IconPassword = styled.Image`
  width: 18px;
  height: 24px;
  position: absolute;
  left: 15px;
`;

const BlurView = styled.View``;
