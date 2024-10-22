package com.example.movie_project.Controller;

import com.example.movie_project.Dto.Request.MovieCreateRequest;
import com.example.movie_project.Dto.Response.ApiResponse;
import com.example.movie_project.Dto.Response.MovieResponse;
import com.example.movie_project.Entity.Genre;
import com.example.movie_project.Entity.Movie;
import com.example.movie_project.Service.movie.MovieServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/movie")
@Slf4j
public class MovieController {
    @Autowired
    private MovieServiceImpl movieService;

    @PostMapping
    ApiResponse<MovieResponse> create(@ModelAttribute MovieCreateRequest request,
                                      @RequestParam("backdrop_path") MultipartFile backdrop_path,
                                      @RequestParam("poster_path") MultipartFile poster_path) throws IOException {

        log.info("create movie method");
        ApiResponse<MovieResponse> apiResponse = new ApiResponse<>();

        apiResponse.setResults(movieService.create(request,backdrop_path,poster_path));

        return apiResponse;

    }
    @GetMapping
    public ApiResponse<Page<Movie>> getAll(@RequestParam(defaultValue = "1") int page,
                                    @RequestParam(defaultValue = "10") int limit) {
        ApiResponse<Page<Movie>> apiResponse = new ApiResponse<>();
        Pageable pageable = PageRequest.of(page-1, limit);
        apiResponse.setResults(movieService.getAllMovies(pageable));
        return apiResponse;
    }
    @GetMapping("/{id}")
    public ApiResponse<MovieResponse> getOne(@PathVariable String id) {
        ApiResponse<MovieResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResults(movieService.getMovieById(id));
        return apiResponse;
    }
    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable String id) {
        ApiResponse<Void> apiResponse = new ApiResponse<>();
        movieService.deleteMovieById(id);
        apiResponse.setMessage("delete movie success !");
        return apiResponse;
    }
    @PutMapping("/{id}")
    public ApiResponse<MovieResponse> update(@PathVariable String id,
                                             @ModelAttribute MovieCreateRequest request,
                                             @RequestParam("backdrop_path") MultipartFile backdrop_path,
                                             @RequestParam("poster_path") MultipartFile poster_path) throws IOException {

        ApiResponse<MovieResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResults(movieService.update(request,id,backdrop_path,poster_path));
        return apiResponse;
    }

    @GetMapping("/search")
    public ApiResponse<Page<MovieResponse>> search(@RequestParam(defaultValue = "") String keyword,
                                                   @RequestParam(defaultValue = "1") int page,
                                                   @RequestParam(defaultValue = "10") int limit) {
        ApiResponse<Page<MovieResponse>> apiResponse = new ApiResponse<>();
        Pageable pageable = PageRequest.of(page-1, limit);
        apiResponse.setResults(movieService.searchMovies(keyword,pageable));
        return apiResponse;
    }
    @GetMapping("/category/{category}")
    public ApiResponse<List<MovieResponse>> getByCategory(@PathVariable String category) {
        ApiResponse<List<MovieResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setResults(movieService.getMoviesByCategory(category));
        return apiResponse;
    }

    @GetMapping("/type/{category}")
    public ApiResponse<List<MovieResponse>> getByType(@PathVariable String category,
                                                          @RequestParam String type) {
        log.info("Check var getBytype !!");
        ApiResponse<List<MovieResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setResults(movieService.getMoviesByType(category,type));
        return apiResponse;
    }
    @GetMapping("/genre/{id}")
    public ApiResponse<List<MovieResponse>> getByType(@PathVariable String id) {
        ApiResponse<List<MovieResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setResults(movieService.getMovieByGenre(id));
        return apiResponse;
    }

    @GetMapping("getall")
    public ApiResponse<List<MovieResponse>> getAllById( @RequestParam List<String> id) {

        ApiResponse<List<MovieResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setResults(movieService.getAllById(id));
        return apiResponse;
    }
    @GetMapping("/search-movie")
    public ApiResponse<List<MovieResponse>> searchMovie(@RequestParam(defaultValue = "") String keyword
                                                   ) {
        ApiResponse<List<MovieResponse>> apiResponse = new ApiResponse<>();

        apiResponse.setResults(movieService.searchMovie(keyword));
        return apiResponse;
    }
}
