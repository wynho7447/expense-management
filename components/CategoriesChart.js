import React from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components";
import { VictoryPie } from "victory-native";
import { EntrieType } from "../constants/enums";

function processCategoryDataToDisplay(data) {
  let expenses = data.filter((a) => a.type == EntrieType.EXPENSE);

  let chartData = expenses.reduce((acc, item) => {
    const existingItem = acc.find((entry) => entry.name === item.category);
    if (existingItem) {
      existingItem.y += item.amount;
      existingItem.expenseCount += 1;
    } else {
      acc.push({
        name: item.category,
        y: item.amount,
        expenseCount: 1,
        icon: item.icon,
        desc: item.title,
        color: item.color,
      });
    }
    return acc;
  }, []);

  // Calculate the total expenses
  let totalExpense = chartData.reduce((a, b) => a + (b.y || 0), 0);

  // Calculate percentage and repopulate chart data
  let finalChartData = chartData.map((item) => {
    let percentage = ((item.y / totalExpense) * 100).toFixed(0);
    return {
      label: `${percentage}%`,
      y: Number(item.y),
      expenseCount: item.expenseCount,
      name: item.name,
      icon: item.icon,
      desc: item.desc,
      color: item.color,
    };
  });
  return finalChartData;
}

let screenWidth = Dimensions.get("window").width;

class CategoriesChart extends React.Component {
  state = {
    selectedCategory: null,
    chartData: null,
    totalExpense: 0,
    colorScales: [],
  };

  componentDidMount() {
    if (this.props.data) {
      let chartData = processCategoryDataToDisplay(this.props.data);
      let categoryName = chartData[0].name;
      let totalExpense = chartData[0].y;
      let colorScales = chartData.map((item) => item.color);
      this.setState({
        chartData: chartData,
        selectedCategory: categoryName,
        totalExpense: totalExpense,
        colorScales: colorScales,
      });
    }
  }

  render() {
    return (
      <Container>
        {!this.props.data && <Text>Current, Not have data.</Text>}
        {this.props.data && (
          <VictoryPie
            data={this.state.chartData}
            labels={(datum) => `${datum.y}`}
            colorScale={this.state.colorScales}
            radius={({ datum }) =>
              this.state.selectedCategory &&
              this.state.selectedCategory == datum.name
                ? screenWidth * 0.4
                : screenWidth * 0.4 - 10
            }
            innerRadius={70}
            labelRadius={({ innerRadius }) =>
              (screenWidth * 0.4 + innerRadius) / 2.5
            }
            style={{
              labels: {
                fill: "white",
                fontSize: 16,
                fontWeight: 600,
                fontFamily: "Roboto",
              },
              parent: {
                ...{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 2,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 3,
                },
              },
            }}
            width={screenWidth * 0.8}
            height={screenWidth * 0.8}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onPressIn: () => {
                    return [
                      {
                        target: "labels",
                        mutation: (props) => {
                          let categoryName =
                            this.state.chartData[props.index].name;
                          let totalExpense =
                            this.state.chartData[props.index].y;
                          this.setState({
                            selectedCategory: categoryName,
                            totalExpense: totalExpense,
                          });
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          />
        )}
        <TitleContainer>
          <Text>{this.state.selectedCategory}</Text>
          <Text style={{ fontSize: 20 }}>${this.state.totalExpense}</Text>
        </TitleContainer>

        <CategoriesSummary>
          {this.state.chartData &&
            this.state.chartData.map((item, index) => {
              const isSelected =
                this.state.selectedCategory &&
                this.state.selectedCategory == item.name;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    let categoryName = item.name;
                    this.setState({ selectedCategory: categoryName });
                  }}
                >
                  <SummaryItem
                    style={{
                      backgroundColor: isSelected ? item.color : "transparent",
                    }}
                  >
                    <Checkbox
                      style={{
                        backgroundColor: isSelected ? "white" : item.color,
                      }}
                    ></Checkbox>
                    <Name
                      style={{
                        color: isSelected ? "white" : "#646464",
                      }}
                    >
                      {item.name}
                    </Name>
                    <Desc
                      style={{
                        color: isSelected ? "white" : "#646464",
                      }}
                    >
                      {item.y} USD - {item.label}
                    </Desc>
                  </SummaryItem>
                </TouchableOpacity>
              );
            })}
        </CategoriesSummary>
      </Container>
    );
  }
}

export default CategoriesChart;

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 32px;
`;

const Text = styled.Text`
  font-size: 16px;
  font-weight: 600;
  text-align: center;
`;

const TitleContainer = styled.View`
  position: absolute;
  top: ${(screenWidth * 0.8 - 44) / 2};
  height: 44px;
`;

const CategoriesSummary = styled.View`
  padding-top: 16px;
  padding-bottom: 16px;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  gap: 2;
`;

const SummaryItem = styled.View`
  flex-direction: row;
  padding: 8px 16px;
  height: 48px;
  border-radius: 10px;
  background-color: beige;
  align-items: center;
`;

const Checkbox = styled.View`
  height: 20px;
  width: 20px;
  margin-right: 8px;
  background: white;
  border-radius: 2px;
`;

const Name = styled.Text`
  font-size: 18px;
  font-weight: 600;
  text-transform: capitalize;
  flex: 1;
`;

const Desc = styled.Text`
  font-size: 16px;
`;
