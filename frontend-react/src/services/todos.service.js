import http from "../http-common";

class ToDoDataService {
    getAll() {
      return http.get("/todos");
    }
  
    get(id) {
      return http.get(`/todo/${id}`);
    }
  
    create(data) {
      return http.post("/add", data);
    }
  
    update(id, data) {
      return http.put(`/todo/${id}`, data);
    }
  
    delete(id) {
      return http.delete(`/todo/${id}`);
    }
}
  
export default new ToDoDataService();