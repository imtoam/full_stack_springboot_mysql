import http from "../http-common";

class ToDoDataService {
    getAll() {
      return http.get("/todos/all");
    }
  
    get(id) {
      return http.get(`/todos/${id}`);
    }
  
    create(data) {
      return http.post("/todos/add", data);
    }
  
    update(id, data) {
      return http.put(`/todos/${id}`, data);
    }
  
    delete(id) {
      return http.delete(`/todos/${id}`);
    }
}
  
export default new ToDoDataService();