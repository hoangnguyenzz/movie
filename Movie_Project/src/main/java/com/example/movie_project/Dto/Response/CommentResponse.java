package com.example.movie_project.Dto.Response;

import com.example.movie_project.Entity.Movie;
import com.example.movie_project.Entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentResponse {
    private String id;
    private String content;
    private User user;
    private Movie movie;
    private LocalDateTime createdAt;
}
