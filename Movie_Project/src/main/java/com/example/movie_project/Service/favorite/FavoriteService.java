package com.example.movie_project.Service.favorite;

import com.example.movie_project.Entity.Favorite;

import java.util.List;

public interface FavoriteService {
    public void create(Favorite favorite);
    public Favorite findById(String id);
    public List<Favorite> findAll();
    public void delete(String id);
}
