import React from 'react'
import ListTodos from './ListTodos'
import TodoDetails from './TodoDetails'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const TodoApp = () => {

    return(
        <>
            <Router>
                <h1>TODO Application</h1>
                <Switch>
                    <Route path="/" exact component={ListTodos} />
                    <Route path="/courses" exact component={ListTodos} />
                    <Route path="/courses/:id" component={TodoDetails} />
                </Switch>
            </Router>
        </>
    )

}

export default TodoApp