package com.example.signals.angular.services.impl;

import com.example.signals.angular.dto.messageDto;
import com.example.signals.angular.dto.todoDto;
import com.example.signals.angular.entity.Todos;
import com.example.signals.angular.repository.TodoRepository;
import com.example.signals.angular.services.TodoService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;

    public List<Todos> getAllTodos(){
        return todoRepository.findAll();
    }

    public messageDto addTodo(todoDto data){
        Todos todos = new Todos();
        todos.setId(data.getId());
        todos.setText(data.getText());
        todos.setCompleted(data.isCompleted());
        todoRepository.save(todos);
        messageDto message = new messageDto();
        message.setMessage("Data saved");
        return message;
    }

    public messageDto deleteTodo(Long id){
        todoRepository.deleteById(id);
        return new messageDto("Todo deleted");
    }

    public messageDto completeTodo(todoDto data){
        Todos todos = new Todos();
        todos.setId(data.getId());
        todos.setText(data.getText());
        todos.setCompleted(true);
        todoRepository.save(todos);
        messageDto message = new messageDto();
        message.setMessage("Data saved");
        return message;
    }

}
