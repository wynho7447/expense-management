import React from "react";
import styled from "styled-components";
import Ionicons from "@expo/vector-icons/Ionicons";
import { EntrieType } from "../constants/enums";

const options = {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
};
const numberFormat = new Intl.NumberFormat("en-US", options);

const EntrieItem = (props) => {
  const isDisplay = props.index > 0;
  return (
    <Container>
      <Division style={{ display: isDisplay ? "block" : "none" }} />
      <IconBox>
        <Ionicons name={props.icon} size={26} color={"#7FC2DA"} />
      </IconBox>
      <EntrieContent>
        <Title>{props.title}</Title>
        <Subtitle>{props.date}</Subtitle>
      </EntrieContent>
      <EntrieAmount>
        {props.type == EntrieType.INCOME && (
          <Income>+ {numberFormat.format(props.amount)}</Income>
        )}
        {props.type == EntrieType.EXPENSE && (
          <Amount>- {numberFormat.format(props.amount)}</Amount>
        )}
        <Subtitle>{props.description}</Subtitle>
      </EntrieAmount>
    </Container>
  );
};

export default EntrieItem;

const Container = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
  padding: 18px 0;
`;

const Division = styled.View`
  height: 1px;
  width: 100%;
  background-color: rgba(47, 47, 47, 0.05);
  position: absolute;
  top: 0;
`;

const IconBox = styled.View`
  background: rgba(186, 223, 236, 0.2);
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border-radius: 10px;
`;

const EntrieContent = styled.View`
  flex-direction: column;
  gap: 4;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: #2f2f2f;
`;

const Subtitle = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: #b6b6b6;
`;

const EntrieAmount = styled.View`
  flex: 1;
  justify-content: start;
  align-items: flex-end;
  flex-direction: column;
  gap: 4;
`;

const Amount = styled.Text`
  font-weight: 600;
  font-size: 16px;
  color: #c06060;
`;

const Income = styled(Amount)`
  color: #4abd63;
`;
