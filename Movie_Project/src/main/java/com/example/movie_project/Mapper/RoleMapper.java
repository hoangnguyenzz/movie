package com.example.movie_project.Mapper;

import com.example.movie_project.Dto.Request.RoleRequest;
import com.example.movie_project.Dto.Response.RoleResponse;
import com.example.movie_project.Entity.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    @Mapping(target = "permissions",ignore = true)
    Role toRole(RoleRequest request);

    RoleResponse toRoleResponse(Role role);


}
