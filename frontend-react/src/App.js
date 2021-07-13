import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';

import TokenStorageService from "./services/token-storage.service";

import AddToDo from "./components/add-todo.component";
import ToDoDetails from "./components/details-todo.component";
import ListToDos from "./components/list-todos.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      isLoggedIn: false,
      showAddLink: false,
      showAdminLink: false,
      showEditLink: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = TokenStorageService.getUser();
    const token = TokenStorageService.getToken();
    if (user) {
      this.setState({
        currentUser: user,
        showAddLink: user.roles.includes("ROLE_CREATE"),
        showAdminLink: user.roles.includes("ROLE_ADMIN"),
        showEditLink: user.roles.includes("ROLE_EDIT"),
        isLoggedIn: !!token,
      });
    }
  }

  logOut(){
    TokenStorageService.signOut();
    this.setState({
      isLoggedIn: false,
      showAddLink: false,
      showAdminLink: false,
      showEditLink: false,
      currentUser: undefined,
    });
  }

  render() {
    var addLink = this.state.showAddLink?
                   (<li class="nav-item">
                      <Link to={"/add"} className="nav-link">
                        Add
                      </Link>
                    </li>):(<li></li>);
    var adminLink = this.state.showAdminLink?
                   (<li class="nav-item">
                      <Link to={"/admin"} className="nav-link">
                        Admin
                      </Link>
                    </li>):(<li></li>);

    var LoggedInLink = this.state.isLoggedIn?
                    (
                      <div class="navbar-nav ml-auto">
                        <li class="nav-item">
                          <Link to={"/profile"} className="nav-link">
                            {user.username}
                          </Link>
                        </li>
                        <li class="nav-item">
                          <Link onClick={logOut} className="nav-link">
                            LogOut
                          </Link>
                        </li>
                      </div>
                    ):(
                      <div class="navbar-nav ml-auto">
                        <li class="nav-item">
                          <Link to={"/register"} className="nav-link">
                            Register
                          </Link>
                        </li>
                        <li class="nav-item">
                          <Link to={"/login"} className="nav-link">
                            Login
                          </Link>
                        </li>
                      </div>);
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
                {addLink}
                {adminLink}
              </div>
              {LoggedInLink}
            </nav>
          </header>
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/todos"]} component={ListToDos} />
              <Route exact path="/add" component={AddToDo} />
              <Route path="/todo/:id" component={ToDoDetails} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/admin" component={Admin} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
