package com.github.pwnmn.todoapp.controller;

import com.github.pwnmn.todoapp.domain.Todo;
import com.github.pwnmn.todoapp.service.CoursesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CourseController {

    private final CoursesService courseService;

    public CourseController(CoursesService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Todo>> getAllCourses() {
        return ResponseEntity.ok(courseService.findAll());
    }

    @GetMapping("/todos/{todoId}")
    public ResponseEntity<Todo> getCourseById(@PathVariable Long todoId) {
        var courseOpt = courseService.findById(todoId);
        if(courseOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.ok(courseOpt.get());
        }
    }

    @DeleteMapping("/todos/{todoId}")
    public ResponseEntity<Void> deleteCourseById(@PathVariable Long todoId) {
        var isDeleted = courseService.deleteById(todoId);
        if(!isDeleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok().build();
    }

    @PutMapping("/todos/{todoId}")
    public ResponseEntity<Todo> updateCourseById(@PathVariable Long todoId, @RequestBody Todo toUpdate) {
        var updated = courseService.updateCourse(todoId, toUpdate);
        if(updated.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return ResponseEntity.ok(updated.get());
    }

    @PostMapping("/todos")
    public ResponseEntity createCourse(@RequestBody Todo todo) {
        return new ResponseEntity(courseService.createCourse(todo), HttpStatus.CREATED);
    }
}
