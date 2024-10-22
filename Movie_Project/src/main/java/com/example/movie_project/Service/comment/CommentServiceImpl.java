package com.example.movie_project.Service.comment;

import com.example.movie_project.Dto.Request.CommentRequest;
import com.example.movie_project.Dto.Response.CommentResponse;
import com.example.movie_project.Entity.Comment;
import com.example.movie_project.Entity.User;
import com.example.movie_project.Exception.AppException;
import com.example.movie_project.Exception.ErrorCode;
import com.example.movie_project.Mapper.CommentMapper;
import com.example.movie_project.Repository.CommentRepository;
import com.example.movie_project.Repository.MovieRepository;
import com.example.movie_project.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService{

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private CommentMapper commentMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MovieRepository movieRepository;


    @Override
    public CommentResponse addComment(CommentRequest request) {

        var comment = commentMapper.toComment(request);
        var movie = movieRepository.findById(request.getMovie()).orElseThrow(()
                -> new AppException(ErrorCode.MOVIE_NOT_FOUND));
        var user= userRepository.findById(request.getUser()).orElseThrow(()
                -> new RuntimeException("user not found !"));

        comment.setMovie(movie);
        comment.setUser(user);

        return commentMapper.toCommentResponse(commentRepository.save(comment));
    }

    @Override
    public List<CommentResponse> getCommentsByMovie(String id) {

       var comments = commentRepository.findCommentByMovie(id);

        return comments.stream().map(commentMapper::toCommentResponse).toList();
    }

    @Override
    public CommentResponse getComment(String id) {
        var comment = commentRepository.findById(id).orElseThrow(()
        -> new AppException(ErrorCode.COMMENT_NOT_FOUND));

        return commentMapper.toCommentResponse(comment);
    }

    @Override
    public void deleteComment(String id) {
      commentRepository.deleteById(id);
    }

    @Override
    public CommentResponse updateComment(CommentRequest request,String id) {
        var comment = commentRepository.findById(id).orElseThrow(()
                -> new AppException(ErrorCode.COMMENT_NOT_FOUND));
        commentMapper.updateComment(comment,request);
        var movie = movieRepository.findById(request.getMovie()).orElseThrow(()
                -> new AppException(ErrorCode.MOVIE_NOT_FOUND));
        var user= userRepository.findById(request.getUser()).orElseThrow(()
                -> new RuntimeException("user not found !"));

        comment.setMovie(movie);
        comment.setUser(user);

        return commentMapper.toCommentResponse(commentRepository.save(comment));
    }
}
