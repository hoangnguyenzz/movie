package com.example.movie_project.Service.favorite;

import com.example.movie_project.Dto.Request.FavoriteRequest;
import com.example.movie_project.Entity.Favorite;

import java.util.List;

public interface FavoriteService {
    public Favorite create(FavoriteRequest request);
    public Favorite findById(String id);
    public List<Favorite> findAll();
    public void delete(String userId,String movieId);
}
