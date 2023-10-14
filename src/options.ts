import Highcharts from "highcharts";

export const lineChartOptions: Highcharts.Options = {
  title: {
    text: ""
  },
  xAxis: {
    title: {
      text: "Year",
    },
    type: "category", // Assuming years are discrete categories
  },
  yAxis: {
    title: {
      text: "Burglary",
    },
  },
  series: [
    {
      type: "line",
      data: [1, 2, 3, 8, 4, 7]
    }
  ]
};
