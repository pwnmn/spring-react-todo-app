import React, {useState, useEffect, useCallback} from 'react'
import TodoApi from '../service/TodoApi'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const TodoDetails = (props) => {

    const [todoDetails, setTodoDetails] = useState({id: -1})

    const fetchDetails = async() => {
        var id = props.match.params.id;

        if(id == -1) {
            return
        }
        TodoApi.getTodoById(id).then(
            response => {
                let data = response.data
                setTodoDetails({id: data.id, description: data.description, done: data.done})
            }
        )
    }

    const onSubmit = async(values) => {
        console.log(values)
        let todo = {
            description: values.description,
            done: values.done
        }

        if (todoDetails.id == -1) {
            TodoApi.createTodo(todo)
                .then(() => props.history.push('/courses'))
        } else {
            TodoApi.updateTodo(todoDetails.id, todo)
                .then(() => props.history.push('/courses'))
        }
    }

    const validate = (values) => {
        let errors = {}
        if(!values.description) {
            errors.description = 'Enter a description'
        } else if(values.description.length < 3) {
            errors.description = 'Enter at least 3 characters for the description'
        }

        return errors
    }

    useEffect(() => {
        fetchDetails()
    }, []);

    return(
        <>
            <h3>Course Details</h3>
            <div className="container">
                <Formik
                    initialValues={todoDetails}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnBlur={false}
                    validateOnChange={false}
                >
                    {
                        <Form>
                            <ErrorMessage name="description" component="div" className="alert alert-warning" />
                            <fieldset className="form-group">
                                <label>Id</label>
                                <Field className="form-control" type="text" name="id" disabled />
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field className="form-control" type="text" name="description" />
                            </fieldset>
                            <button className="btn btn-success" type="submit">Save</button>
                        </Form>
                    }
                </Formik>
            </div>
        </>
    )
}

export default TodoDetails