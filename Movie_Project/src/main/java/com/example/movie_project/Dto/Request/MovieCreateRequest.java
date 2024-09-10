package com.example.movie_project.Dto.Request;

import com.example.movie_project.Entity.Genre;
import jakarta.persistence.ManyToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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
public class MovieCreateRequest {
    private String name;
    private String trailerCode;
    private String idCode;
    private String category;
    private int ibmPoints;
    private String country;
    private String overView;
    private int seasons;
    private int viewed;
    private String releaseDate;
    private int episodeCount;
    private String url;
    private Set<String> genres;

}
