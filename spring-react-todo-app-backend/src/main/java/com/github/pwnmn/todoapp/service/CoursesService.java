package com.github.pwnmn.todoapp.service;

import com.github.pwnmn.todoapp.domain.Todo;
import com.github.pwnmn.todoapp.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CoursesService {

    private final TodoRepository todoRepository;

    public CoursesService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;

        List todos = new ArrayList<Todo>();
        long idCounter = 0;
        todos.add(new Todo(++idCounter, "Clean room", false));
        todos.add(new Todo(++idCounter,  "Do homework", true));
        todos.add(new Todo(++idCounter,  "Complete fusion reactor schematics", true));
        todos.add(new Todo(++idCounter,  "Cry in the corner", false));

        todoRepository.saveAll(todos);
    }

    public List<Todo> findAll() {
        return todoRepository.findAll();
    }

    public Optional<Todo> findById(Long id) {
        return todoRepository.findById(id);
    }

    public Todo createCourse(Todo todo) {
        return todoRepository.save(todo);
    }

    public boolean deleteById(Long id) {
        boolean exists = todoRepository.existsById(id);
        if(exists) {
            todoRepository.deleteById(id);
        }
        return exists;
    }

    public Optional<Todo> updateCourse(Long id, Todo todo) {
        var foundCourseOpt = todoRepository.findById(id);
        if(foundCourseOpt.isEmpty()) {
            return foundCourseOpt;
        } else {
            var foundCourse = foundCourseOpt.get();
            foundCourse.setDescription(todo.getDescription());
            foundCourse.setDone(todo.getDone());
            return Optional.of(todoRepository.save(foundCourse));
        }
    }
}
