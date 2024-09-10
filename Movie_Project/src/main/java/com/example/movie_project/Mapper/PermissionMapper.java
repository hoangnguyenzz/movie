package com.example.movie_project.Mapper;

import com.example.movie_project.Dto.Request.PermissionRequest;
import com.example.movie_project.Dto.Response.PermissionResponse;
import com.example.movie_project.Entity.Permission;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    Permission toPermission(PermissionRequest request);

    PermissionResponse toPermissionResponse(Permission permission);


}
