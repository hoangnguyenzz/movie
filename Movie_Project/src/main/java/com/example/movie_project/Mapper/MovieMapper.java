package com.example.movie_project.Mapper;

import com.example.movie_project.Dto.Request.MovieCreateRequest;
import com.example.movie_project.Dto.Response.MovieResponse;
import com.example.movie_project.Entity.Movie;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface MovieMapper {
    @Mapping(target = "genres", ignore = true)
    @Mapping(target = "createdAt", expression = "java(java.time.LocalDateTime.now())")
    Movie toMovie(MovieCreateRequest request);

    MovieResponse toMovieResponse(Movie movie);
    
@Mapping(target = "genres" , ignore = true)
    void updateMovie(@MappingTarget Movie movie, MovieCreateRequest request);
}
