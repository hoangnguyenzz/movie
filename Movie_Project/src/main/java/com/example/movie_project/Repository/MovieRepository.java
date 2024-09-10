package com.example.movie_project.Repository;

import com.example.movie_project.Entity.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, String> {
    Boolean existsByName(String name);

    @Query("SELECT m FROM Movie m WHERE LOWER(m.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    Page<Movie> searchByName(@Param("name") String name, Pageable pageable);

    @Query("SELECT m FROM Movie m WHERE m.category = :category")
    List<Movie> findMoviesByCategory(@Param("category") String category);

    // Tìm các bộ phim theo ID của thể loại
    @Query("SELECT m FROM Movie m JOIN m.genres g WHERE g.id = :genreId")
    List<Movie> findMoviesByGenreId(@Param("genreId") String genreId);

}
