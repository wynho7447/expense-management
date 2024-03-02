import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useSelector } from "react-redux";

const MenuItem = (props) => {
  const theme = useSelector((state) => state.appReducer.theme);
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <IconView>
          <Ionicons name={props.icon} size={24} color="#546bfb" />
        </IconView>
        <Content>
          <Title>{props.title}</Title>
          <Text>{props.text}</Text>
        </Content>
      </Container>
    </ThemeProvider>
  );
};

export default MenuItem;

const Container = styled.View`
  flex-direction: row;
  margin: 15px 0;
`;

const IconView = styled.View`
  width: 32;
  height: 32;
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  padding-left: 20;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  font-size: 24;
  font-weight: 600;
`;

const Text = styled.Text`
  color: ${(props) => props.theme.SECOND_TEXT_COLOR};
  font-weight: 600;
  opacity: 0.6;
  margin-top: 5px;
`;
