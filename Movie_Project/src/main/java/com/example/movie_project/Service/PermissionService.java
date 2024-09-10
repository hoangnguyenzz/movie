package com.example.movie_project.Service;

import com.example.movie_project.Dto.Request.PermissionRequest;
import com.example.movie_project.Dto.Response.PermissionResponse;
import com.example.movie_project.Entity.Permission;
import com.example.movie_project.Mapper.PermissionMapper;
import com.example.movie_project.Repository.PermissionReposiory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PermissionService {

    @Autowired
    private PermissionReposiory permissionReposiory;

    @Autowired
    private PermissionMapper permissionMapper;

    public PermissionResponse create(PermissionRequest request){

        Permission permission=permissionMapper.toPermission(request);

        return permissionMapper.toPermissionResponse(permissionReposiory.save(permission));

    }

    public List<PermissionResponse> getAll(){
        var list = permissionReposiory.findAll();
       return list.stream().map(permissionMapper::toPermissionResponse).toList();
    }

    public void delete(String  permission){
        permissionReposiory.deleteById(permission);
    }
}
