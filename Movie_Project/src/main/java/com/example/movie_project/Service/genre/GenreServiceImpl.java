package com.example.movie_project.Service.genre;

import com.example.movie_project.Dto.Request.GenreRequest;
import com.example.movie_project.Dto.Response.GenreResponse;
import com.example.movie_project.Entity.Genre;
import com.example.movie_project.Exception.AppException;
import com.example.movie_project.Exception.ErrorCode;
import com.example.movie_project.Mapper.GenreMapper;
import com.example.movie_project.Repository.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenreServiceImpl implements GenreService{

    @Autowired
    private GenreRepository genreRepository;

    @Autowired
    private GenreMapper genreMapper;

    @Override
    public Genre createGenre(GenreRequest request) {
        Genre genre = genreMapper.toGenre(request);
        return genreRepository.save(genre);
    }

    @Override
    public Page<Genre> getAllGenres(Pageable pageable) {
        return genreRepository.findAll(pageable);
    }


    @Override
    public GenreResponse getGenreById(String id) {
        Genre genre= genreRepository.findById(id).orElseThrow(
                ()-> new AppException(ErrorCode.USER_NOT_FOUND)
        );
        return genreMapper.toGenreResponse(genre);
    }

    @Override
    public void deleteGenre(String id) {
       genreRepository.deleteById(id);
    }

    @Override
    public GenreResponse updateGenre(String id, GenreRequest request) {
        Genre genre= genreRepository.findById(id).orElseThrow(
                ()-> new AppException(ErrorCode.USER_NOT_FOUND)
        );
        genre.setName(request.getName());
        genreRepository.save(genre);
        return genreMapper.toGenreResponse(genre);
    }


}
