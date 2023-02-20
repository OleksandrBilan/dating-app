import axios from "axios";
import { API_URL } from "./config";

function App() {
  axios.get(`${API_URL}/test/test`).then((response) => alert("success"));
  return <div className="App">APP</div>;
}

export default App;
