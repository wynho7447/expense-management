import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  UPDATE_AVATAR,
  updateName,
  updateAvatar,
  openLogin,
} from "../redux/appActions";

function mapStateToProps(state) {
  return { name: state.appReducer.name, avatar: state.appReducer.avatar };
}

function mapDispatchToProps(dispatch) {
  return {
    updateName,
    updateAvatar,
    openLogin,
  };
}

class Avatar extends React.Component {
  state = {
    photo: require("../assets/avatar-default.jpg"),
  };

  componentDidUpdate() {
    if (this.props.action == UPDATE_AVATAR) {
    }
  }

  render() {
    return <Image source={this.props.avatar} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps())(Avatar);

const Image = styled.Image`
  width: 44px;
  height: 44px;
  background: black;
  border-radius: 22px;
  margin-left: 20px;
`;
