package com.example.movie_project.Service.comment;


import com.example.movie_project.Entity.Comment;

import java.util.List;

public interface CommentService {
   public void addComment(Comment comment);
   public List<Comment> getComments();
   public Comment getComment(String id);
   public void deleteComment(String id);
}
