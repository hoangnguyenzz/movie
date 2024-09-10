package com.example.movie_project.Mapper;

import com.example.movie_project.Dto.Request.GenreRequest;
import com.example.movie_project.Dto.Request.RoleRequest;
import com.example.movie_project.Dto.Response.GenreResponse;
import com.example.movie_project.Dto.Response.RoleResponse;
import com.example.movie_project.Entity.Genre;
import com.example.movie_project.Entity.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface GenreMapper {

    Genre toGenre(GenreRequest request);
    GenreResponse toGenreResponse(Genre genre);


}
