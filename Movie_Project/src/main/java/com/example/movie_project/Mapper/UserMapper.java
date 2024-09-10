package com.example.movie_project.Mapper;

import com.example.movie_project.Dto.Request.UserCreateRequest;
import com.example.movie_project.Dto.Request.UserUpdateRequest;
import com.example.movie_project.Dto.Response.UserResponse;
import com.example.movie_project.Entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toUser(UserCreateRequest request);
    UserResponse toUserResponse(User user);
    @Mapping(target = "roles",ignore = true)
    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}
