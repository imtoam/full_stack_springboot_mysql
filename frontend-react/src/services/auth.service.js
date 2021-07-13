import http from "../http-common";
import TokenStorageService from "./token-storage.service";

class AuthService {

    login(data) {
      return http.post("/auth/signin", data)
                  .then(response=>{
                    if(response.data.accessToken){
                      TokenStorageService.saveUser(response.data);
                      TokenStorageService.saveToken(response.data.accessToken);
                    }
                    return response.data;
                  });
    }
  
    register(data) {
      return http.post("/auth/signup", data);
    }
}
  
export default new AuthService();