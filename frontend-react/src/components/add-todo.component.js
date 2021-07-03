import React, { Component } from "react";
import { connect } from "react-redux";
import { createTodo, retrieveByIdTodo } from "../actions/todos";

class AddToDo extends Component {
    constructor(props) {
      super(props);
      this.onChangeTask = this.onChangeTask.bind(this);
      this.onChangeDue = this.onChangeDue.bind(this);
      this.onChangeIsdone = this.onChangeIsdone.bind(this);
      this.saveTodo = this.saveTodo.bind(this);
      this.getTodo = this.getTodo.bind(this);
      this.newTodo = this.newTodo.bind(this);
  
      this.state = {
        id: null,
        task: "",
        due: null,
        isdone: false,
        submitted: false,
      };
    }
  
    onChangeTask(e) {
      this.setState({
        task: e.target.value,
      });
    }
  
    onChangeDue(e) {
        this.setState({
          due: e.target.value,
        });
    }

    onChangeIsdone(e) {
      this.setState({
        isdone: e.target.checked,
      });
    }

    saveTodo() {
      const { task, due, isdone } = this.state;
  
      this.props
        .createTodo(task, due, isdone)
        .then((data) => {
          console.log(data);
          this.setState({
            id: data.id,
            task: data.task,
            due: data.due,
            isdone: data.isdone,
            submitted: true,
          });
          //this.props.history.push("/todos");
        })
        .catch((e) => {
          console.log(e);
        });
    }

    getTodo(_id) {
      console.log(_id);
      this.props.retrieveByIdTodo(_id)
        .then((data)=>{
          this.setState({
            id: data.id,
            task: data.task,
            due: data.due,
            isdone: data.isdone,
            submitted: false,
          });
        }).catch((e) => {
          console.log(e);
        });
    }
  
    newTodo() {
      this.setState({
        id: null,
        task: "",
        due: null,
        isdone: false,
        submitted: false,
      });
    }
  
    render() {
        return (
            <div className="submit-form">
              {this.state.submitted ? (
                <div>
                  <h4>You submitted successfully!</h4>
                  <button className="btn btn-success" onClick={this.newTodo}>
                    Add Again
                  </button>
                </div>
              ) : (
                <div>
                  <div className="form-group">
                    <label htmlFor="task">Task</label>
                    <input
                      type="text"
                      className="form-control"
                      id="task"
                      required
                      value={this.state.task}
                      onChange={this.onChangeTask}
                      name="task"
                    />
                  </div>
      
                  <div className="form-group">
                    <label htmlFor="due">Due</label>
                    <input
                      type="date"
                      className="form-control"
                      id="due"
                      required
                      value={this.state.due}
                      onChange={this.onChangeDue}
                      name="due"
                    />
                  </div>
      
                  <div className="form-group">
                    <label htmlFor="status">Done</label>
                    <input
                      type="checkbox"
                      className="form-control"
                      id="status"
                      required
                      value={this.state.isdone}
                      onChange={this.onChangeIsdone}
                      name="isdone"
                    />
                  </div>

                  <button onClick={this.saveTodo} className="btn btn-success">
                    Submit
                  </button>
                </div>
              )}
            </div>
          );
    }
  }
  
  export default connect(null, { createTodo, retrieveByIdTodo })(AddToDo);