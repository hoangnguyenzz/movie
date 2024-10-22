package com.example.movie_project.Repository;

import com.example.movie_project.Entity.Favorite;
import com.example.movie_project.Entity.Movie;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, String> {
    Boolean existsByMovie(Movie movie);

    @Query("SELECT f.movie.id FROM Favorite f WHERE f.user.id = :userId")
    List<String> findMovieIdsByUserId(String userId);

    @Transactional
    void deleteByUserIdAndMovieId(String userId, String movieId);
}

