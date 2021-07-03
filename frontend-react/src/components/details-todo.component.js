import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTodo, deleteTodo } from "../actions/todos";
import TodoDataService from "../services/todos.service";

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
    };
  }

  componentDidMount() {
    this.getTodo(this.props.match.params.id);
  }

  onChangeTask(e) {
    const task = e.target.value;

    this.setState(function (prevState) {
      return {
        currentTodo: {
          ...prevState.currentTodo,
          task: task,
        },
      };
    });
    console.log(this.state);
  }

  onChangeDue(e) {
    const due = e.target.value;

    this.setState(function (prevState) {
      return {
        currentTodo: {
          ...prevState.currentTodo,
          due: due,
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
    console.log("Rendering...");
    return (
        <div>
          {this.state.currentTodo ? (
            <div className="edit-form">
              <h4>Todo</h4>
              <p>{this.state.currentTodo.id}</p>
              <form>
                <div className="form-group">
                  <label htmlFor="task">Task</label>
                  <input
                    type="text"
                    className="form-control"
                    id="task"
                    value={this.state.currentTodo.task}
                    onChange={this.onChangeTask}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="due">Due</label>
                  <input
                    type="date"
                    className="form-control"
                    id="due"
                    value={this.state.currentTodo.due}
                    onChange={this.onChangeDue}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Done</label>
                  <input
                    type="checkbox"
                    className="form-control"
                    id="status"
                    value={this.state.currentTodo.isdone}
                    onChange={this.onChangeIsdone}
                  />
                </div> 
              </form>

              <button
                className="badge badge-danger mr-2"
                onClick={this.removeTodo}
              >
                Delete
              </button>
  
              <button
                type="submit"
                className="badge badge-success"
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
      );
  }
}

export default connect(null, { updateTodo, deleteTodo })(ToDoDetails);