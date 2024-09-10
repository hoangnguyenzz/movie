package com.example.movie_project.Controller;

import com.example.movie_project.Dto.Request.PermissionRequest;
import com.example.movie_project.Dto.Response.ApiResponse;
import com.example.movie_project.Dto.Response.PermissionResponse;
import com.example.movie_project.Service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/permissions")
public class PermissionController {

    @Autowired
    private PermissionService permissionService;

    @PostMapping
    ApiResponse<PermissionResponse> create(@RequestBody PermissionRequest request) {

        ApiResponse<PermissionResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResults(permissionService.create(request));
        return apiResponse;

    }

    @GetMapping
    ApiResponse<List<PermissionResponse>> findAll() {
        var apiResponse = new ApiResponse<List<PermissionResponse>>();
        apiResponse.setResults(permissionService.getAll());
        return apiResponse;

    }
    @DeleteMapping("/{id}")
    ApiResponse<String> delete(@PathVariable String id) {
        permissionService.delete(id);
        ApiResponse<String> apiResponse = new ApiResponse<>();
        apiResponse.setMessage("Permission has been deleted !");
        return apiResponse;

    }
}
