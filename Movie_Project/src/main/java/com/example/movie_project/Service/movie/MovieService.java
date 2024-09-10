package com.example.movie_project.Service.movie;

import com.example.movie_project.Dto.Request.MovieCreateRequest;
import com.example.movie_project.Dto.Response.MovieResponse;
import com.example.movie_project.Entity.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface MovieService {
    public MovieResponse create(MovieCreateRequest request, MultipartFile backdrop_path, MultipartFile poster_path) throws IOException;
    public MovieResponse getMovieById(String id);
    public Page<Movie> getAllMovies(Pageable pageable);
    public void deleteMovieById(String id);
    public MovieResponse update(MovieCreateRequest request, String id,MultipartFile backdrop_path, MultipartFile poster_path) throws IOException;
    public Page<MovieResponse> searchMovies(String name,Pageable pageable);
}
