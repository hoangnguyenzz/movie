package com.example.movie_project.Dto.Request;

import com.example.movie_project.Entity.Movie;
import com.example.movie_project.Entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FavoriteRequest {
    private String user;
    private String movie;
}
