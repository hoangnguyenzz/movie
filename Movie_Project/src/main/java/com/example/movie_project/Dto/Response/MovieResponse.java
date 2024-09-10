package com.example.movie_project.Dto.Response;

import com.example.movie_project.Entity.Genre;
import com.example.movie_project.Entity.Role;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MovieResponse {
    private String id;
    private String name;
    private String trailerCode;
    private String idCode;
    private String backdrop_path;
    private String poster_path;
    private String category;
    private int ibmPoints;
    private String country;
    private String overView;
    private int seasons;
    private int viewed;
    private String releaseDate;
    private int episodeCount;
    private String url;
    private Date createdAt ;

    @ManyToMany
    private Set<Genre> genres;
}
