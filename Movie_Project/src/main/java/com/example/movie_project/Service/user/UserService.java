package com.example.movie_project.Service.user;

import com.example.movie_project.Dto.Request.UserCreateRequest;
import com.example.movie_project.Dto.Request.UserUpdateRequest;
import com.example.movie_project.Dto.Response.UserResponse;

import java.util.List;


public interface UserService {
    UserResponse create(UserCreateRequest request);
    UserResponse getUserById(String id);
    List<UserResponse> getAll();
    UserResponse update(UserUpdateRequest request, String id);
    void delete(String id);
}
