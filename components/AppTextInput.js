import React, { useState } from "react";
import styled from "styled-components";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { focusInputIn, focusInputOut } from "../redux/appActions";

function mapStateToProps(state) {
  return { action: state.appReducer.action };
}

function mapDispatchToProps() {
  return {
    focusInputIn,
    focusInputOut,
  };
}

class AppTextInput extends React.Component {
  state = {
    isFocused: false,
    isHideText: true,
  };
  render() {
    return (
      <>
        <InputGroup>
          <Input
            {...this.props}
            onBlur={() => {
              this.setState({ isFocused: false });
              this.props.focusInputOut();
              if (this.props.secureTextEntry) {
                this.setState({ isHideText: true });
              }
            }}
            onFocus={() => {
              this.setState({ isFocused: true });
              this.props.focusInputIn();
            }}
            isFocused={this.state.isFocused}
            secureTextEntry={
              this.state.isFocused
                ? this.props.secureTextEntry && this.state.isHideText
                : this.props.secureTextEntry
            }
          />
          <Icon
            name={this.props.icon}
            size={24}
            isFocused={this.state.isFocused}
            color={this.state.isFocused ? "#3B3DBF" : "#dbdfea"}
          />
          {this.props.secureTextEntry && (
            <TouchableOpacity
              onPress={() =>
                this.setState({ isHideText: !this.state.isHideText })
              }
              style={{ position: "absolute", right: 10 }}
              disabled={!this.state.isFocused}
            >
              <IconHide
                name={this.state.isHideText ? "eye" : "eye-off"}
                size={24}
                color={this.state.isFocused ? "#3B3DBF" : "#dbdfea"}
              />
            </TouchableOpacity>
          )}
        </InputGroup>
        {this.props.error && this.props.error != "" && (
          <ErrorText>{this.props.error}</ErrorText>
        )}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(AppTextInput);

const Input = styled.TextInput`
  border: ${(props) =>
    props.isFocused ? "2px solid #3B3DBF" : "1px solid #dbdfea"};
  width: 100%;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #3c4560;
  padding-left: ${(props) => (props.icon ? "44px" : "10px")};
`;

const InputGroup = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

const Icon = styled(Ionicons)`
  position: absolute;
  left: 10px;
`;

const IconHide = styled(Ionicons)``;
const ErrorText = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: #c06060;
  margin-top: 8px;
  width: 100%;
  text-align: left;
`;
