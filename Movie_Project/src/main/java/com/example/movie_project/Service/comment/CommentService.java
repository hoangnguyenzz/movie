package com.example.movie_project.Service.comment;


import com.example.movie_project.Dto.Request.CommentRequest;
import com.example.movie_project.Dto.Response.CommentResponse;
import com.example.movie_project.Entity.Comment;

import java.util.List;

public interface CommentService {
   public CommentResponse addComment(CommentRequest request);
   public List<CommentResponse> getCommentsByMovie(String id);
   public CommentResponse getComment(String id);
   public void deleteComment(String id);
   public CommentResponse updateComment(CommentRequest request,String id);
}
