import axios from "axios";
import { API_URL } from "../config";

export function Test() {
  axios
    .get(`${API_URL}/test/test`)
    .then((response) => alert("success"))
    .catch((error) => alert(error));
  return <h1>TEST</h1>;
}
