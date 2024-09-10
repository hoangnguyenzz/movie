package com.example.movie_project.Controller;

import com.example.movie_project.Dto.Request.RoleRequest;
import com.example.movie_project.Dto.Response.ApiResponse;
import com.example.movie_project.Dto.Response.RoleResponse;
import com.example.movie_project.Service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping
    ApiResponse<RoleResponse> create(@RequestBody RoleRequest request) {

        ApiResponse<RoleResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResults(roleService.create(request));
        return apiResponse;

    }

    @GetMapping
    ApiResponse<List<RoleResponse>> findAll() {
        var apiResponse = new ApiResponse<List<RoleResponse>>();
        apiResponse.setResults(roleService.findAll());
        return apiResponse;

    }
    @DeleteMapping("/{id}")
    ApiResponse<String> delete(@PathVariable String id) {
        roleService.delete(id);
        ApiResponse<String> apiResponse = new ApiResponse<>();
        apiResponse.setMessage("Permission has been deleted !");
        return apiResponse;

    }
}
