import { lightTheme } from "../constants/Theme";
import {
  CLOSE_CARD,
  CLOSE_LOGIN,
  CLOSE_MENU,
  OPEN_CARD,
  OPEN_LOGIN,
  OPEN_MENU,
  UPDATE_AVATAR,
  UPDATE_NAME,
  SWITCH_THEME,
} from "./appActions";

const initalState = {
  action: "",
  name: "",
  avatar: require("../assets/avatar-default.jpg"),
  theme: lightTheme,
};

const appReducer = (state = initalState, action) => {
  switch (action.type) {
    case OPEN_MENU:
      return { ...state, action: OPEN_MENU };
    case CLOSE_MENU:
      return { ...state, action: CLOSE_MENU };
    case UPDATE_NAME:
      return { ...state, action: UPDATE_NAME, name: action.name };
    case UPDATE_AVATAR:
      return { ...state, action: UPDATE_AVATAR, avatar: action.avatar };
    case OPEN_CARD:
      return { ...state, action: OPEN_CARD };
    case CLOSE_CARD:
      return { ...state, action: CLOSE_CARD };
    case OPEN_LOGIN:
      return { ...state, action: OPEN_LOGIN };
    case CLOSE_LOGIN:
      return { ...state, action: CLOSE_LOGIN };
    case SWITCH_THEME:
      return { ...state, action: SWITCH_THEME, theme: action.theme };
    default:
      return state;
  }
};

export default appReducer;
