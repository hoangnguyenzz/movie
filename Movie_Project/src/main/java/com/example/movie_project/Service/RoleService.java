package com.example.movie_project.Service;

import com.example.movie_project.Dto.Request.RoleRequest;
import com.example.movie_project.Dto.Response.RoleResponse;
import com.example.movie_project.Mapper.RoleMapper;
import com.example.movie_project.Repository.PermissionReposiory;
import com.example.movie_project.Repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private RoleMapper roleMapper;

    @Autowired
    private PermissionReposiory permissionReposiory;

    public RoleResponse create(RoleRequest request) {
        var role = roleMapper.toRole(request);
       var permissions = permissionReposiory.findAllById(request.getPermissions());
        role.setPermissions(new HashSet<>(permissions));

        return roleMapper.toRoleResponse(roleRepository.save(role));
    }

    public List<RoleResponse> findAll() {

        return roleRepository.findAll().stream().map(roleMapper::toRoleResponse).toList();
    }

    public void delete(String name){
        roleRepository.deleteById(name);
    }

}
