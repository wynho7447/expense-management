import React from "react";
import styled from "styled-components";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import EntrieItem from "./EntrieItem";

class Entries extends React.Component {
  render() {
    return (
      <EntriesContainer>
        {!this.props.data && (
          <NotEntriesContainer>
            <TouchableOpacity style={{ width: "100%" }}>
              <ButtonAdd>
                <Ionicons name="add" size={24} color="#C8C8C8" />
              </ButtonAdd>
            </TouchableOpacity>
            <Text>Current, Not have entries.</Text>
          </NotEntriesContainer>
        )}
        {this.props.data &&
          this.props.data.map((entrie, index) => (
            <EntrieItem
              key={index}
              index={index}
              title={entrie.title}
              date={entrie.date}
              amount={entrie.amount}
              description={entrie.description}
              type={entrie.type}
              icon={entrie.icon}
            />
          ))}
      </EntriesContainer>
    );
  }
}

export default Entries;

const EntriesContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  margin: 20px;
`;

const NotEntriesContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  gap: 16px;
`;

const Text = styled.Text`
  font-size: 14;
  color: #c8c8c8;
  font-weight: 400;
`;

const ButtonAdd = styled.View`
  border-radius: 10px;
  width: 100%;
  height: 52px;
  border: 1px dashed #c8c8c8;
  justify-content: center;
  align-items: center;
`;
