package com.example.movie_project.Service.genre;

import com.example.movie_project.Dto.Request.GenreRequest;
import com.example.movie_project.Dto.Response.GenreResponse;
import com.example.movie_project.Entity.Genre;
import com.example.movie_project.Entity.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface GenreService {
    public Genre createGenre(GenreRequest request);
    public Page<Genre> getAllGenres(Pageable pageable);
    public GenreResponse getGenreById(String id);
    public void deleteGenre(String id);
    public GenreResponse updateGenre(String id, GenreRequest request);
}
