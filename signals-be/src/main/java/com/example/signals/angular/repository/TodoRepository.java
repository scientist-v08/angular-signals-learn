package com.example.signals.angular.repository;

import com.example.signals.angular.entity.Todos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todos,Long> {

    @Query("select tds from Todos tds order by tds.id")
    List<Todos> findAll();

}
