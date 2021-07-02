import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';

import AddToDo from "./components/add-todo.component";
import ToDoDetails from "./components/details-todo.component";
import ListToDos from "./components/list-todos.component";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <nav class="container-fluid navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/todos"} className="navbar-brand">
              React ToDo
            </Link>
            <div class="navbar-nav mr-auto">
              <li class="nav-item">
                <Link to={"/todos"} className="nav-link">
                  List All
                </Link>
              </li>
              <li class="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </nav>
        </header>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/todos"]} component={ListToDos} />
            <Route exact path="/add" component={AddToDo} />
            <Route path="/todo/:id" component={ToDoDetails} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
