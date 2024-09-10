package com.example.movie_project.Controller;

import com.example.movie_project.Dto.Request.GenreRequest;
import com.example.movie_project.Dto.Request.MovieCreateRequest;
import com.example.movie_project.Dto.Response.ApiResponse;
import com.example.movie_project.Dto.Response.GenreResponse;
import com.example.movie_project.Dto.Response.MovieResponse;
import com.example.movie_project.Entity.Genre;
import com.example.movie_project.Service.genre.GenreServiceImpl;
import com.example.movie_project.Service.movie.MovieServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/genre")
@Slf4j
public class GenreController {
    @Autowired
    private GenreServiceImpl genreService;

    @PostMapping
   public ApiResponse<Genre> create(@RequestBody GenreRequest request) {

        ApiResponse<Genre> apiResponse = new ApiResponse<>();
        apiResponse.setResults(genreService.createGenre(request));
        return apiResponse;
    }
    @GetMapping
    public ApiResponse<Page<Genre>> getAll( @RequestParam(defaultValue = "1") int page,
                                            @RequestParam(defaultValue = "10") int limit) {
        ApiResponse<Page<Genre>> apiResponse = new ApiResponse<>();
        Pageable pageable = PageRequest.of(page-1, limit);
        apiResponse.setResults(genreService.getAllGenres(pageable));
        return apiResponse;
    }
    @GetMapping("/{id}")
    public ApiResponse<GenreResponse> getGenre(@PathVariable String id) {
        ApiResponse<GenreResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResults(genreService.getGenreById(id));
        return apiResponse;
    }

    @DeleteMapping("/{id}")
    public ApiResponse<GenreResponse> delete(@PathVariable String id) {
        ApiResponse<GenreResponse> apiResponse = new ApiResponse<>();
        genreService.deleteGenre(id);
        return apiResponse;
    }
    @PutMapping("/{id}")
    public ApiResponse<GenreResponse> update(@PathVariable String id, @RequestBody GenreRequest request) {
        ApiResponse<GenreResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResults(genreService.updateGenre(id, request));
        return apiResponse;
    }


}
