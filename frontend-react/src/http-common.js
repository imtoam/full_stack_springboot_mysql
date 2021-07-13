import axios from "axios";
import TokenStorageService from "./services/token-storage.service";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: (TokenStorageService.getUser() && TokenStorageService.getToken())?
            {
              "Content-type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Authorization": "Bearer " + TokenStorageService.getToken() // 'x-access-token': toekn
            } : 
            {
              "Content-type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
});