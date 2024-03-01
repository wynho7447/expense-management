import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

function mapStateToProps(state) {
  return { name: state.name, avatar: state.avatar };
}

function mapDispatchToProps(dispatch) {
  return {
    updateName: (name) =>
      dispatch({
        type: "UPDATE_NAME",
        name: name,
      }),
    updateAvatar: (avatar) =>
      dispatch({
        type: "UPDATE_AVATAR",
        avatar: avatar,
      }),
    openLogin: () =>
      dispatch({
        type: "OPEN_LOGIN",
      }),
  };
}

class Avatar extends React.Component {
  state = {
    photo: require("../assets/avatar-default.jpg"),
  };

  componentDidMount() {
    this.loadState();
  }

  componentDidUpdate() {
    if (this.props.action == "updateAvatar") {
    }
  }

  loadState = () => {
    AsyncStorage.getItem("state").then((serializedState) => {
      const state = JSON.parse(serializedState);
      // console.log("Load state: " + JSON.stringify(state));
      if (state) {
        this.props.updateAvatar({ uri: state.avatar });
      } else {
        this.setState({
          photo: require("../assets/avatar-default.jpg"),
        });
        this.props.openLogin();
      }
    });
  };

  render() {
    return <Image source={this.props.avatar} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);

const Image = styled.Image`
  width: 44px;
  height: 44px;
  background: black;
  border-radius: 22px;
  margin-left: 20px;
`;
