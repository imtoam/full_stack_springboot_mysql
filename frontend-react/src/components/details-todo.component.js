import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTodo, deleteTodo } from "../actions/todos";
import TodoDataService from "../services/todos.service";
import TokenStorageService from "../services/token-storage.service";

class ToDoDetails extends Component {
  constructor(props) {
    super(props);
    this.onChangeTask = this.onChangeTask.bind(this);
    this.onChangeDue = this.onChangeDue.bind(this);
    this.onChangeIsdone = this.onChangeIsdone.bind(this);

    this.getTodo = this.getTodo.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeTodo = this.removeTodo.bind(this);

    this.state = {
      currentTodo: null,
      message: "",
      task_err: '',
      due_err: '',
      authEdit: TokenStorageService.getUser().roles.includes("ROLE_EDIT"),
    };
  }

  componentDidMount() {
    this.getTodo(this.props.match.params.id);
  }

  onChangeTask(e) {
    if(e.target.value==null){
      this.setState({task_err: 'Task must not be empty', });
    }else{
      var _value = e.target.value;
      //console.log(_value);
      if(_value.length<5){
        this.setState({task_err: 'Task must be at least 5 characters', });
      }else if(_value.length>200){
        this.setState({task_err: 'Task must be at most 200 characters', });
      }else{
        this.setState({task_err: '' });
      }
    } 

    this.setState(function (prevState) {
      return {
        currentTodo: {
          ...prevState.currentTodo,
          task: e.target.value,
        },
      };
    });
    console.log(this.state);
  }

  onChangeDue(e) {
    if(e.target.value==null){
      this.setState({due_err: 'Due Date must not be empty', });
    }else{
      var today = new Date();
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      //console.log(today.valueOf());
      var due = new Date(e.target.value);
      //console.log(due);
      due.setHours(due.getHours()+(due.getTimezoneOffset()/60));
      //console.log(due.valueOf());
      
      if(due.valueOf() < today.valueOf()){
        //console.log('due date is ealier than expectation');
        this.setState({due_err: 'Due Date must be today or later', });//, ()=>console.log(this.state.due_err?this.state.due_err:'no due err'));
      }else{
        //console.log('due date is correct?');
        this.setState({due_err: '', });//, ()=>console.log(this.state.due_err?this.state.due_err:'no due err'));
      }
    }

    this.setState(function (prevState) {
      return {
        currentTodo: {
          ...prevState.currentTodo,
          due: e.target.value,
        },
      };
    });
  }

  onChangeIsdone(e) {
    const isdone = e.target.checked;
    console.log(isdone);
      this.setState(function (prevState) {
        return {
          currentTodo: {
            ...prevState.currentTodo,
            isdone: isdone,
          },
        };
      });
  }

  getTodo(id) {
    TodoDataService.get(id)
      .then((response) => {
        this.setState({
          currentTodo: response.data,
        });
        console.log(this.state.currentTodo);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    console.log(this.state.task_err);
    console.log(this.state.due_err);
    if(!this.state.task_err && !this.state.due_err) {
      console.log(this.state.currentTodo);
      this.props
        .updateTodo(this.state.currentTodo.id, this.state.currentTodo)
        .then((reponse) => {
          console.log(reponse);
          this.setState({ message: "The todo was updated successfully!" });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  removeTodo() {
    this.props
      .deleteTodo(this.state.currentTodo.id) 
      .then(() => {
        this.props.history.push("/todos");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    var task_err_info = this.state.task_err?
        (<div><p className="err_info">{this.state.task_err}</p></div>)
        :(<div></div>);
    var due_err_info = this.state.due_err?
        (<div><p className="err_info">{this.state.due_err}</p></div>)
        :(<div></div>);
    return this.state.authEdit?
      (
        <div>
          <h2>ToDo Details</h2>
          <hr/>
          {this.state.currentTodo ? (
            <div className="edit-form form-label">
              <p><b>ID</b>: {this.state.currentTodo.id}</p>
              <form>
                <div className="form-group">
                  <label htmlFor="task"><b>Task</b></label>
                  <input
                    type="text"
                    className="form-control"
                    id="task"
                    value={this.state.currentTodo.task}
                    onChange={this.onChangeTask}
                  />
                </div>
                {task_err_info}
                <div className="form-group">
                  <label htmlFor="due"><b>Due</b></label>
                  <input
                    type="date"
                    className="form-control"
                    id="due"
                    value={this.state.currentTodo.due}
                    onChange={this.onChangeDue}
                  />
                </div>
                {due_err_info}
                <div className="form-group">
                  <label class="form-check-label" htmlFor="status"><b>Done</b></label>
                  <input
                    type="checkbox"
                    className="form-check-input-reverse ml-2"
                    id="status"
                    value={this.state.currentTodo.isdone}
                    onChange={this.onChangeIsdone}
                  />
                </div> 
              </form>

              <button
                className="btn btn-primary mr-2"
                onClick={this.removeTodo}
              >
                Delete
              </button>
  
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.updateContent}
              >
                Update
              </button>
              <p>{this.state.message}</p>
            </div>
          ) : (
            <div>
              <br />
              {
                this.props.match.params.id?
                  (<p>Loading data ...</p>)
                  :(<p>Please click on a Todo ...</p>)
              }
            </div>
          )}
        </div>
      ):
      (
        <h5>You are not authorized to perform this operation.</h5>
      );
  }
}

export default connect(null, { updateTodo, deleteTodo })(ToDoDetails);