package com.example.movie_project.Controller;

import com.example.movie_project.Dto.Request.FavoriteRequest;
import com.example.movie_project.Dto.Response.ApiResponse;
import com.example.movie_project.Entity.Favorite;
import com.example.movie_project.Service.favorite.FavoriteServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favorite")
@Slf4j
public class FavoriteController {
    @Autowired
    private FavoriteServiceImpl favoriteService;

    @PostMapping
   public ApiResponse<Favorite> create(@RequestBody FavoriteRequest request) {

        ApiResponse<Favorite> apiResponse = new ApiResponse<>();
        apiResponse.setResults(favoriteService.create(request));
        return apiResponse;
    }
    @GetMapping
    public ApiResponse<List<Favorite>> getAll() {
        ApiResponse<List<Favorite>> apiResponse = new ApiResponse<>();
        apiResponse.setResults(favoriteService.findAll());
        return apiResponse;
    }

    @DeleteMapping()
    public ApiResponse<Void> delete(@RequestParam String userId,
                                    @RequestParam String movieId) {
        ApiResponse<Void> apiResponse = new ApiResponse<>();
        favoriteService.delete(userId, movieId);
        apiResponse.setMessage("Delete successful");
        return apiResponse;
    }

    @GetMapping("/check/{userId}")
    public ApiResponse<List<String>> getMovieByUserId(@PathVariable String userId) {
        ApiResponse<List<String>> apiResponse = new ApiResponse<>();
        apiResponse.setResults(favoriteService.findMovieByUser(userId));
        return apiResponse;
    }
}
