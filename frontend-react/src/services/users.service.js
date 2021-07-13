import http from "../http-common";

class UserDataService {

    getAll() {
        return http.get("/users/all");
      }
    
      get(id) {
        return http.get(`/users/${id}`);
      }
    
      create(data) {
        return http.post("/users/add", data);
      }
    
      update(id, data) {
        return http.put(`/users/${id}`, data);
      }
}
  
export default new UserDataService();