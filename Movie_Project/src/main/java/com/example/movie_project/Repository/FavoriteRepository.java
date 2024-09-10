package com.example.movie_project.Repository;

import com.example.movie_project.Entity.Favorite;
import com.example.movie_project.Entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteRepository extends JpaRepository<Favorite, String> {
}
