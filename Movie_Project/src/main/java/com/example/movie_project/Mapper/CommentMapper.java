package com.example.movie_project.Mapper;

import com.example.movie_project.Dto.Request.CommentRequest;
import com.example.movie_project.Dto.Request.MovieCreateRequest;
import com.example.movie_project.Dto.Response.CommentResponse;
import com.example.movie_project.Dto.Response.MovieResponse;
import com.example.movie_project.Entity.Comment;
import com.example.movie_project.Entity.Movie;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "movie", ignore = true)
    @Mapping(target = "createdAt", expression = "java(java.time.LocalDateTime.now())")
    Comment toComment(CommentRequest request);

    @Mapping(target = "createdAt", source = "createdAt")
    CommentResponse toCommentResponse(Comment comment);

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "movie", ignore = true)
    void updateComment(@MappingTarget Comment comment, CommentRequest request);
}
