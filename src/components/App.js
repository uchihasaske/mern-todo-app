import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import logo from "./logo.png";
import TodosList from "./todos-list.component";
import EditTodo from "./edit-todo.component";
import CreateTodo from "./create-todo.component";


class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="https://codingthesmartway.com" target="_blank">
                            <img src={logo} width="30" height="30" alt="Codingtesmartway.com" />
                        </a>
                        <Link to="/" className="navbar-brand">Mern-Stack Todo App</Link>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link to="/" className="nav-link">Todos</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/create" className="nav-link">Create Todo</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                <Route path="/" exact component={TodosList}/>
                <Route path="/edit/:id" component={EditTodo}/>
                <Route path="/create" component={CreateTodo}/>
                </div>
            </Router>
        )
    }
}

export default App;