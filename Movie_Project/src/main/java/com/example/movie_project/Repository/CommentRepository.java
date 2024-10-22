package com.example.movie_project.Repository;

import com.example.movie_project.Dto.Response.CommentResponse;
import com.example.movie_project.Entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, String> {

    @Query("SELECT c FROM Comment c WHERE c.movie.id = :movieId")
    List<Comment> findCommentByMovie (String movieId);
}
