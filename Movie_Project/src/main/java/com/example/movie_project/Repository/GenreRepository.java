package com.example.movie_project.Repository;

import com.example.movie_project.Entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;
@Repository
public interface GenreRepository extends JpaRepository<Genre, String> {
    List<Genre> findAllByNameIn(Set<String> name);
}
