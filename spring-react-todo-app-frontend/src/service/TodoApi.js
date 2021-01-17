import axios from 'axios'

const BASE_URL = 'http://localhost:8080'

class CourseApi {
    getAllTodos() {
        return axios.get(`${BASE_URL}/todos`)
    }

    getTodoById(id) {
        return axios.get(`${BASE_URL}/todos/${id}`)
    }

    deleteTodo(id) {
        return axios.delete(`${BASE_URL}/todos/${id}`)
    }

    updateTodo(id, todo) {
        return axios.put(`${BASE_URL}/todos/${id}`, todo)
    }

    createTodo(todo) {
        return axios.post(`${BASE_URL}/todos`, todo)
    }
}

export default new CourseApi()