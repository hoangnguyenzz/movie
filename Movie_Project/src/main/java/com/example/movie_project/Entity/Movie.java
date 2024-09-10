package com.example.movie_project.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
@Builder
@Entity
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
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
    private LocalDateTime createdAt;

    public Movie(){
        this.createdAt = LocalDateTime.now();
    }

    @ManyToMany
    private Set<Genre> genres;
}
