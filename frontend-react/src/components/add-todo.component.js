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
        task: '',
        due: null,
        isdone: false,
        submitted: false,
        task_err: '',
        due_err: '',
      };
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
      this.setState({
        task: e.target.value,
      });
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
      console.log(this.state.task_err);
      console.log(this.state.due_err);
      if(!this.state.task_err && !this.state.due_err) {
        //console.log("no erros!")
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
        task_err: '',
        due_err: '',
      });
    }
  
    render() {
      var task_err_info = this.state.task_err?
                            (<div><p className="err_info">{this.state.task_err}</p></div>)
                            :(<div></div>);
      var due_err_info = this.state.due_err?
                            (<div><p className="err_info">{this.state.due_err}</p></div>)
                            :(<div></div>);
      return (
          <div className="submit-form">
            <h2>Add ToDo</h2>
            <hr/>
            {this.state.submitted ? (
              <div>
                <h4>You submitted successfully!</h4>
                <button className="btn btn-success" onClick={this.newTodo}>
                  Add Again
                </button>
              </div>
            ) : (
              <div class="form-label">
                <div className="form-group">
                  <label htmlFor="task"><b>Task</b></label>
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
                {task_err_info}
                <div className="form-group">
                  <label htmlFor="due"><b>Due</b></label>
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
                {due_err_info}
                <div className="form-group">
                  <label class="form-check-label" htmlFor="status"><b>Done</b></label>
                  <input
                    type="checkbox"
                    className="form-check-input-reverse ml-2"
                    id="status"
                    disabled
                    value={this.state.isdone}
                    onChange={this.onChangeIsdone}
                    name="isdone"
                  />
                </div>

                <button onClick={this.saveTodo} className="btn btn-success">
                  Add Todo
                </button>
              </div>
            )}
          </div>
        );
    }
  }

  export default connect(null, { createTodo, retrieveByIdTodo })(AddToDo);