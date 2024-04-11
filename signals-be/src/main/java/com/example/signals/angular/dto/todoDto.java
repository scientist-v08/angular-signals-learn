package com.example.signals.angular.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class todoDto {
    private Long id;
    private String text;
    private boolean completed;
}
