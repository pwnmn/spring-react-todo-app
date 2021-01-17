package com.github.pwnmn.todoapp.repository;

import com.github.pwnmn.todoapp.domain.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
}
