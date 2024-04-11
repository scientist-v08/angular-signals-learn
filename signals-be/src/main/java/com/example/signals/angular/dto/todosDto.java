package com.example.signals.angular.dto;

import com.example.signals.angular.entity.Todos;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class todosDto {
    private List<Todos> allTodos;
}
