import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { retrieveTodos } from "../actions/todos";

class ListTodos extends Component {
  constructor(props) {
    super(props);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveTodo = this.setActiveTodo.bind(this);

    this.state = {
      currentTodo: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.props.retrieveTodos();
  }

  refreshData() {
    this.setState({
      currentTodo: null,
      currentIndex: -1,
    });
  }

  setActiveTodo(todo, index) {

    this.setState({
      currentTodo: todo,
      currentIndex: index,
    });
  }

  render() {
    const { currentTodo, currentIndex } = this.state;
    const { todos } = this.props;

    return (
        <div className="list row">
          <div className="col-md-6">
            <h4>Todos List</h4>
            <ul className="list-group">
              {todos &&
                todos.map((todo, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveTodo(todo, index)}
                    key={index}
                  >
                    {todo.task}
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-md-6">
            {currentTodo ? (
              <div>
                <h4>Todo</h4>
                <div>
                  <label>
                    <strong>Task:</strong>
                  </label>{" "}
                  {currentTodo.task}
                </div>
                <div>
                  <label>
                    <strong>Due Date:</strong>
                  </label>{" "}
                  {currentTodo.due}
                </div>
                <div>
                  <label>
                    <strong>Done:</strong>
                  </label>{" "}
                  {currentTodo.isdone?"YES":"NO"}
                </div>
  
                <Link
                  to={"/todo/" + currentTodo.id}
                  className="btn btn-warning"
                >
                  Details
                </Link>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Todo...</p>
              </div>
            )}
          </div>
        </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};

export default connect(mapStateToProps, { retrieveTodos })(ListTodos);