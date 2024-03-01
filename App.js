import React, { useState } from "react";
import styled from "styled-components";
import { legacy_createStore as createStore } from "redux";
import { LinearGradient } from "expo-linear-gradient";
import { Provider } from "react-redux";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import HomeScreen from "./screens/HomeScreen";
import { Translations } from "./Localization";
import AppNavigator from "./navigator/AppNavigator";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "https://graphql.contentful.com/content/v1/spaces/smle2xs2cg99",
  credentials: "same-origin",
  headers: {
    Authorization: `Bearer cStW7IQCAvNmQe9Z0-QSkQGur-h3cAl_hwbsx_S5DMg`,
  },
  cache: new InMemoryCache(),
});

const initalState = {
  // action: "openMenu",
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case "OPEN_MENU":
      return { action: "openMenu" };
    case "CLOSE_MENU":
      return { action: "closeMenu" };
    case "UPDATE_NAME":
      return { name: action.name };
    case "OPEN_LOGIN":
      return { action: "openLogin" };
    case "CLOSE_LOGIN":
      return { action: "closeLogin" };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default function App() {
  const i18n = new I18n(Translations);
  i18n.locale = Localization.getLocales()[0].languageCode;
  i18n.enableFallback = true;
  i18n.defaultLocale = "en";

  let [locale, setLocale] = useState(Localization.locale);

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </ApolloProvider>
  );
}

// const Container = styled(LinearGradient).attrs({
//   colors: ["#EFF1F5", "#ffffff"],
//   start: { x: 0, y: 0 },
//   end: { x: 0, y: 1 },
// })`
//   flex: 1;
// `;

const Container = styled.View`
  flex: 1;
`;

const Overlay = styled.Image`
  width: 100%;
  height: 92px;
`;
