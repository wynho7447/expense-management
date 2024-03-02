export const OPEN_MENU = "OPEN_MENU";
export const CLOSE_MENU = "CLOSE_MENU";
export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_AVATAR = "UPDATE_AVATAR";
export const OPEN_CARD = "OPEN_CARD";
export const CLOSE_CARD = "CLOSE_CARD";
export const OPEN_LOGIN = "OPEN_LOGIN";
export const CLOSE_LOGIN = "CLOSE_LOGIN";
export const FOCUS_INPUT_IN = "FOCUS_INPUT_IN";
export const FOCUS_INPUT_OUT = "FOCUS_INPUT_OUT";
export const SWITCH_THEME = "SWITCH_THEME";

export const openLogin = () => {
  return (dispatch) => {
    dispatch({
      type: OPEN_LOGIN,
    });
  };
};

export const closeLogin = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_LOGIN,
    });
  };
};

export const openMenu = () => {
  return (dispatch) => {
    dispatch({
      type: OPEN_MENU,
    });
  };
};

export const closeMenu = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_MENU,
    });
  };
};

export const focusInputIn = () => {
  return (dispatch) => {
    dispatch({
      type: FOCUS_INPUT_IN,
    });
  };
};

export const focusInputOut = () => {
  return (dispatch) => {
    dispatch({
      type: FOCUS_INPUT_OUT,
    });
  };
};

export const updateAvatar = (avatar) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_AVATAR,
      avatar: avatar,
    });
  };
};

export const updateName = (name) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_NAME,
      name: name,
    });
  };
};

export const switchTheme = (theme) => {
  return (dispatch) => {
    dispatch({
      type: SWITCH_THEME,
      theme: theme,
    });
  };
};
