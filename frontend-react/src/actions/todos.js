import {
    CREATE_TODO,
    RETRIEVE_TODOS,
    UPDATE_TODO,
    DELETE_TODO,
    RETRIEVEBYID_TODO,
} from "./types";
import ToDoDataService from "../services/todos.service";
  
export const retrieveTodos = () => async (dispatch) => {
    try {
      const res = await ToDoDataService.getAll();
  
      dispatch({
        type: RETRIEVE_TODOS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
};

export const retrieveByIdTodo = (id) => async (dispatch) => {
  try {
    const res = await ToDoDataService.get(id);

    dispatch({
      type: RETRIEVEBYID_TODO,
      payload: res.data,
    });

    return Promise.resolve(res.data); 
  } catch (err) {
    console.log(err);
  }
};

export const createTodo = (task, due, status) => async (dispatch) => {
    try {
      const res = await ToDoDataService.create({ task, due, status });
  
      dispatch({
        type: CREATE_TODO,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const updateTodo = (id, data) => async (dispatch) => {
    try {
      const res = await ToDoDataService.update(id, data);
  
      dispatch({
        type: UPDATE_TODO,
        payload: res.data,
      });
  
      return Promise.resolve(res.data); // todo updated
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteTodo = (id) => async (dispatch) => {
    try {
      const res = await ToDoDataService.delete(id); 
  
      dispatch({
        type: DELETE_TODO,
        payload: { id },
      });
      
      console.log(res.data); // "record is deleted"
    } catch (err) {
      console.log(err);
    }
  };
  
