package com.example.movie_project.Repository;

import com.example.movie_project.Entity.HistoryMovie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoryRepository extends JpaRepository<HistoryMovie, String> {
}
