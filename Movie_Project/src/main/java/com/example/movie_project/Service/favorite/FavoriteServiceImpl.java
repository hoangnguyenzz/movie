package com.example.movie_project.Service.favorite;

import com.example.movie_project.Dto.Request.FavoriteRequest;
import com.example.movie_project.Entity.Favorite;
import com.example.movie_project.Exception.AppException;
import com.example.movie_project.Exception.ErrorCode;
import com.example.movie_project.Mapper.FavoriteMapper;
import com.example.movie_project.Repository.FavoriteRepository;
import com.example.movie_project.Repository.MovieRepository;
import com.example.movie_project.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class FavoriteServiceImpl implements FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private FavoriteMapper  favoriteMapper;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Favorite create(FavoriteRequest request) {
        var movie =movieRepository.findById(request.getMovie()).orElseThrow(
                () -> new AppException(ErrorCode.MOVIE_NOT_FOUND));

//    var check = favoriteRepository.existsByMovie(movie);
//    if(check){
//        throw new AppException(ErrorCode.FAVORITE_EXISTED);
//    }
    var favorite = favoriteMapper.toFavorite(request);
    favorite.setUser(userRepository.findById(request.getUser()).orElseThrow(
            () -> new AppException(ErrorCode.USER_NOT_FOUND)
    ));
    favorite.setMovie(movie);
    try{
       return favoriteRepository.save(favorite);
    }catch (Exception e){
        throw new AppException(ErrorCode.FAVORITE_EXISTED);
    }

    }

    @Override
    public Favorite findById(String id) {
        return null;
    }

    @Override
    public List<Favorite> findAll() {
        return favoriteRepository.findAll();
    }

    @Override
    public void delete(String userId,String movieId) {
        favoriteRepository.deleteByUserIdAndMovieId(userId,movieId);
    }

    public List<String> findMovieByUser(String id) {
        return favoriteRepository.findMovieIdsByUserId(id);
    }


}
