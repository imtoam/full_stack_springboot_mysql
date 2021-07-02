import axios from "axios";

export default axios.create({
  baseURL: "http://edwin-todos.ipd24.ca/api", /* "http://todo.api/api"; //local */
  headers: {
    "Content-type": "application/json"
  }
});