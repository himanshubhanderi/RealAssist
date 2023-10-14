import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import React, { useEffect, useState } from "react";
import { CLIENT_RENEG_LIMIT } from "tls";

const useStyles = makeStyles({
  rootDemo: {
    background: "#dbf5ff",
    borderTopLeftRadius: '25px',
    borderTopRightRadius: '25px',
    padding: '20px',
    position: "relative",
    boxShadow: 'none'
  },
  root1Demo: {
    position: "absolute",
    top: "14%",
    left: "2%",
    fontSize: '17px',
    color: '#1463FF'
  },
  root: {
    background: "#d9e7ed",
    borderBottomLeftRadius: '25px',
    borderBottomRightRadius: '25px',
    padding: '20px',
    position: "relative",
    boxShadow: 'none'
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

type ChartProps = {
  chartOptions: Highcharts.Options;
};

export let lineChartOptions: Highcharts.Options = {
  title: {
    text: ""
  },
  series: [
    {
      type: "line",
      data: [1, 2, 3, 8, 4, 7]
    }
  ]
};


export default function Chart({ chartOptions }: any) {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    setLoader(true)
    const apiUrl = "https://api.usa.gov/crime/fbi/cde/arrest/state/AK/all?from=2015&to=2020&API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv";

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((apiData) => {
        // Handle the API response data
        console.log(apiData);

        // Extract "Burglary" data from the API response
        const burglaryData = apiData.data.map((item: any) => ({
          x: item.data_year,
          y: item.Burglary,
        }));

        // Update the chart options with the actual data
        chartOptions.series[0].data = burglaryData;
        chartOptions.series[0].name = "Burglary";

        // Set the new chart options
        lineChartOptions = chartOptions;
        setLoader(false)
      })
      .catch((err) => {
        // Handle errors
        setError(err);
        setLoader(false)
      });
  }, []);

  return (
    <>
      {!loader && <div className="custom-chart">
        <Card className={classes.rootDemo}>
          <div className={classes.root1Demo}>Burglary</div>
        </Card>
        <Card className={classes.root}>
          <CardContent>
            <HighchartsReact
              highcharts={Highcharts}
              options={lineChartOptions} // Use updated options with dynamic data
              containerProps={{ style: { height: "100%", width: "100%" } }}
            />
          </CardContent>
        </Card>
      </div>}

    </>
  );
}