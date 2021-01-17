import React, {useEffect, useState} from 'react'
import TodoApi from '../service/TodoApi'

const ListTodos = (props) => {

    const [courses, setCourses] = useState([])
    const [message, setMessage] = useState(null)

    const refreshCourses = async() => {
        TodoApi.getAllTodos().then(
            response => {
                console.log(response.data)
                setCourses(response.data)
            }
        )
    }

    const deleteCourseClicked = async(id) => {
        TodoApi.deleteTodo(id).then(
            response => {
                console.log(response.data)
                setMessage(`Delete of course ${id} successful`)
                refreshCourses()
            }
        )
    }

    const updateTodoClicked = async(id) => {
        console.log('update ' + id)
        props.history.push(`/courses/${id}`)
    }

    const updateCheckboxClicked = async(course, checkedStatus) => {
        console.log(`Checkbox with id ${course.id} clicked`)
        course.done = checkedStatus;
        TodoApi.updateTodo(course.id, course)
    }
    
    const addTodoClicked = async() => {
        console.log('create')
        props.history.push(`/courses/-1`)
    }

    useEffect(() => {
        refreshCourses()
    }, [])

    return (
        <>
            <div className="container">
                <h3>All TODOs </h3>
                {message && <div class="alert alert-success">{message}</div>}
                {}
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Description</th>
                            <th>Done</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            courses.map(
                                course =>
                                <tr key={course.id}>
                                    <td>{course.id}</td>
                                    <td>{course.description}</td>
                                    <input
                                        type="checkbox"
                                        defaultChecked={course.done}
                                        onChange={() => updateCheckboxClicked(course, !course.done)}
                                    />
                                    <td>
                                        <button className="btn btn-warning"
                                                onClick={() => deleteCourseClicked(course.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-success"
                                                onClick={() => updateTodoClicked(course.id)}>
                                            Update
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-success"
                                                onClick={() => addTodoClicked()}>
                                            Create
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    ) 
}

export default ListTodos