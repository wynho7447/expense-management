import React from "react";
import styled from "styled-components";
import LottieView from "lottie-react-native";
import { Dimensions, Animated } from "react-native";

let screenHeight = Dimensions.get("window").height;

class Success extends React.Component {
  state = {
    top: new Animated.Value(screenHeight),
    opacity: new Animated.Value(0),
  };

  componentDidMount() {
    // this.animation.play();
  }

  componentDidUpdate() {
    if (this.props.isActive) {
      Animated.timing(this.state.top, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start();
      Animated.timing(this.state.opacity, {
        toValue: 1,
        useNativeDriver: false,
      }).start();

      this.animation.play();
    } else {
      Animated.timing(this.state.top, {
        toValue: screenHeight,
        duration: 0,
        useNativeDriver: false,
      }).start();
      Animated.timing(this.state.opacity, {
        toValue: 0,
        useNativeDriver: false,
      }).start();

      this.animation.loop = false;
    }
  }

  render() {
    return (
      <AnimatedContainer
        style={{ top: this.state.top, opacity: this.state.opacity }}
      >
        <LottieView
          source={require("../assets/lottie-checked-done.json")}
          style={{ width: 200, height: 200 }}
          autoPlay={false}
          loop={false}
          ref={(animation) => {
            this.animation = animation;
          }}
        />
      </AnimatedContainer>
    );
  }
}

export default Success;

const Container = styled.View`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);
