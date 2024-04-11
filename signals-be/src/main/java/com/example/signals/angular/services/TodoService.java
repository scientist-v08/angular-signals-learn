package com.example.signals.angular.services;

import com.example.signals.angular.dto.messageDto;
import com.example.signals.angular.dto.todoDto;
import com.example.signals.angular.entity.Todos;

import java.util.List;

public interface TodoService {

    public List<Todos> getAllTodos();
    public messageDto addTodo(todoDto data);
    public messageDto deleteTodo(Long id);
    public messageDto completeTodo(todoDto data);

}
