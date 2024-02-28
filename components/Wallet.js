import React from "react";
import styled from "styled-components";
import { WalletIcon } from "../components/Icons";

const options = { style: "currency", currency: "USD" };
const numberFormat = new Intl.NumberFormat("en-US", options);

const Wallet = (props) => {
  const isColor = props.index % 2 != 0;
  return (
    <Container style={{ backgroundColor: isColor ? "#7FC4DC" : "#ffffff" }}>
      <Titlebar>
        <WalletIcon color={isColor ? "rgba(255, 255, 255,0.8)" : "#d2d2d2"} />
        <Title
          style={{ color: isColor ? "rgba(255, 255, 255,0.8)" : "#d2d2d2" }}
        >
          {props.title}
        </Title>
      </Titlebar>

      <Amount style={{ color: isColor ? "#ffffff" : "#2F2F2F" }}>
        {numberFormat.format(props.amount)}
      </Amount>
    </Container>
  );
};

export default Wallet;

const Container = styled.View`
  flex-direction: column;
  background: white;
  width: 150px;
  padding: 12px 16px 12px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  margin: 0 8px;
`;

const Titlebar = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Title = styled.Text`
  font-weight: 600;
  font-size: 14px;
  margin-left: 8px;
  color: #d2d2d2;
`;

const Amount = styled.Text`
  font-weight: 600;
  font-size: 18px;
  margin-left: 8px;
  margin-top: 20px;
`;
