import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import styled, { ThemeProvider } from "styled-components";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";

//custom tabBarButton
const TabBarAdvancedButton = ({ bgColor, ...props }) => {
  const theme = useSelector((state) => state.appReducer.theme);

  return (
    <ThemeProvider theme={theme}>
      <Container pointerEvents="box-none">
        <TouchableOpacity onPress={props.onPress}>
          <Button>
            <Ionicons name="add" size={24} color={"white"} />
          </Button>
        </TouchableOpacity>
      </Container>
    </ThemeProvider>
  );
};

export default TabBarAdvancedButton;

const Container = styled.View`
  position: relative;
  width: 75px;
  align-items: center;
`;

const Button = styled.View`
  top: -32px;
  justify-content: center;
  align-items: center;
  width: 62px;
  height: 62px;
  border-radius: 32px;
  background-color: #3b3dbf;
  overflow: hidden;
  border: 6px solid ${(props) => props.theme.BORDER_BUTTON_BOTTOM_BAR};
`;
