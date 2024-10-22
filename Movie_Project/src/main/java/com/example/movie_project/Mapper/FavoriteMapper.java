package com.example.movie_project.Mapper;

import com.example.movie_project.Dto.Request.FavoriteRequest;
import com.example.movie_project.Dto.Request.MovieCreateRequest;
import com.example.movie_project.Dto.Response.MovieResponse;
import com.example.movie_project.Entity.Favorite;
import com.example.movie_project.Entity.Movie;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface FavoriteMapper {
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "movie", ignore = true)
    @Mapping(target = "createdAt", expression = "java(java.time.LocalDateTime.now())")
    Favorite toFavorite(FavoriteRequest request);

//    MovieResponse toMovieResponse(Movie movie);
//
//@Mapping(target = "genres" , ignore = true)
//    void updateMovie(@MappingTarget Movie movie, MovieCreateRequest request);
}
