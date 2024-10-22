package com.example.movie_project.Controller;

import com.example.movie_project.Dto.Request.CommentRequest;
import com.example.movie_project.Dto.Response.ApiResponse;
import com.example.movie_project.Dto.Response.CommentResponse;
import com.example.movie_project.Service.comment.CommentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    private CommentServiceImpl commentService;

    @PostMapping
    public ApiResponse<CommentResponse> addComment(@RequestBody CommentRequest commentRequest) {
        ApiResponse<CommentResponse> apiResponse = new ApiResponse<>();
        var comment = commentService.addComment(commentRequest);
        apiResponse.setResults(comment);
        return apiResponse;
    }

    @GetMapping("/getbymovie/{movieId}")
    public ApiResponse<List<CommentResponse>> getAllCommentsByMovie(@PathVariable String movieId) {
        ApiResponse<List<CommentResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setResults(commentService.getCommentsByMovie(movieId));
        return apiResponse;
    }

    @GetMapping("/{id}")
    public ApiResponse<CommentResponse> getCommentById(@PathVariable String id) {
        ApiResponse<CommentResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResults(commentService.getComment(id));
        return apiResponse;
    }
    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteComment(@PathVariable String id) {
        ApiResponse<Void> apiResponse = new ApiResponse<>();
        commentService.deleteComment(id);
        apiResponse.setMessage("This comment is deleted !");
        return apiResponse;
    }
    @PutMapping("/{id}")
    public ApiResponse<CommentResponse> updateComment(@PathVariable String id, @RequestBody CommentRequest request) {
        ApiResponse<CommentResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResults(commentService.updateComment(request, id));
        return apiResponse;
    }
}
