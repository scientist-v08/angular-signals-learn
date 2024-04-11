package com.example.signals.angular.controller;

import com.example.signals.angular.dto.messageDto;
import com.example.signals.angular.dto.todoDto;
import com.example.signals.angular.dto.todosDto;
import com.example.signals.angular.entity.Todos;
import com.example.signals.angular.services.TodoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodosController {

    private final TodoService todoService;

    public TodosController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public ResponseEntity<todosDto> getTodos(){
        List<Todos> todos = todoService.getAllTodos();
        todosDto allTodos = new todosDto();
        allTodos.setAllTodos(todos);
        return new ResponseEntity<>(allTodos, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<messageDto> addingTodo(@RequestBody todoDto body){
        return new ResponseEntity<>(todoService.addTodo(body),HttpStatus.CREATED);
    }

    @PostMapping("/complete")
    public ResponseEntity<messageDto> completingTodo(@RequestBody todoDto body){
        return new ResponseEntity<>(todoService.completeTodo(body),HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity<messageDto> deletingTodo(@RequestParam Long id){
        return new ResponseEntity<>(todoService.deleteTodo(id),HttpStatus.OK);
    }

}
