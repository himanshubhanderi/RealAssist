import "./App.css";
import Chart from "./Chart";
import {
  lineChartOptions
} from "./options";
import { exportMultipleChartsToPdf } from "./utils";

function App() {
  return (
    <div className="App">
      <button className="button export_button" onClick={exportMultipleChartsToPdf}>
        Export to PDF
      </button>
      <Chart chartOptions={lineChartOptions} />
    </div>
  );
}

export default App;
