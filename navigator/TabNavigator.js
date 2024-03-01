import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import TabBarAdvancedButton from "./TabBarAdvancedButton";
import styled from "styled-components";
import LoginScreen from "../screens/LoginScreen";

const activeColor = "#3B3DBF";
const inactiveColor = "#b8bece";

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ presentation: "fullScreenModal", headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

const WalletsStack = createNativeStackNavigator();
const WalletsStackScreen = () => {
  return (
    <WalletsStack.Navigator>
      <WalletsStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </WalletsStack.Navigator>
  );
};

const ReportStack = createNativeStackNavigator();
const ReportStackScreen = () => {
  return (
    <ReportStack.Navigator>
      <ReportStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </ReportStack.Navigator>
  );
};

const OthertStack = createNativeStackNavigator();
const OthertStackScreen = () => {
  return (
    <OthertStack.Navigator>
      <OthertStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </OthertStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const AddStack = createNativeStackNavigator();
const AddStackScreen = () => {
  return (
    <AddStack.Navigator>
      <AddStack.Screen
        name="Logout"
        component={AddButtonComponent}
        options={{ headerShown: false }}
      />
    </AddStack.Navigator>
  );
};

const AddButtonComponent = () => {
  return null;
};

const getTabOptions = (label, iconName) => {
  return {
    tabBarLabel: ({ focused }) => (
      <TabBarLabel
        isFocused={focused}
        style={{ color: focused ? activeColor : inactiveColor }}
      >
        {label}
      </TabBarLabel>
    ),
    tabBarIcon: ({ focused }) => (
      <Ionicons
        name={iconName}
        size={26}
        color={focused ? activeColor : inactiveColor}
      />
    ),
  };
};

function getNextIndex(index) {
  var nextIndex = index + 1;
  if (nextIndex > projects.length - 1) {
    return 0;
  }
  return nextIndex;
}

export default TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={getTabOptions("Home", "home")}
      />
      <Tab.Screen
        name="WalletsTab"
        component={WalletsStackScreen}
        options={getTabOptions("Wallet", "wallet")}
      />

      <Tab.Screen
        name="AddTab"
        component={AddStackScreen}
        options={({ navigation }) => ({
          tabBarButton: (props) => (
            <TabBarAdvancedButton
              {...props}
              onPress={() => {
                // console.log("Click add");
              }}
            />
          ),
        })}
      />
      <Tab.Screen
        name="ReportsTab"
        component={ReportStackScreen}
        options={getTabOptions("Reports", "stats-chart")}
      />
      <Tab.Screen
        name="OtherTab"
        component={OthertStackScreen}
        options={getTabOptions("Other", "cog")}
      />
    </Tab.Navigator>
  );
};

const TabBarLabel = styled.Text`
  font-size: 12px;
`;
