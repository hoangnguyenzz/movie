package com.example.movie_project.Controller;

import com.example.movie_project.Dto.Request.UpdatePasswordandNameRequest;
import com.example.movie_project.Dto.Request.UserCreateRequest;
import com.example.movie_project.Dto.Request.UserUpdateRequest;
import com.example.movie_project.Dto.Response.ApiResponse;
import com.example.movie_project.Dto.Response.UpdateAvatarResponse;
import com.example.movie_project.Dto.Response.UserResponse;
import com.example.movie_project.Entity.User;
import com.example.movie_project.Exception.AppException;
import com.example.movie_project.Exception.ErrorCode;
import com.example.movie_project.Repository.UserRepository;
import com.example.movie_project.Service.user.UserService;
import com.example.movie_project.Service.user.UserServiceImpl;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/users")
@Slf4j
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private UserRepository userRepository;



    @PostMapping
    public ApiResponse<UserResponse> createUser(@RequestBody @Valid UserCreateRequest request) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setResults(userService.create(request));

        return apiResponse;

    }

    @GetMapping
    public ApiResponse<List<UserResponse>> getAllUsers() {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setResults(userService.getAll());

        return apiResponse;
    }

    @GetMapping("/{id}")
    public ApiResponse<UserResponse> getUser(@PathVariable String id) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setResults(userService.getUserById(id));

        return apiResponse;
    }

    @PutMapping("/{id}")
    public ApiResponse<UserResponse> updateUser(@ModelAttribute UserUpdateRequest request,
                                                @PathVariable String id,
                                                @RequestParam("avatar") MultipartFile avatar) {

        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setResults(userService.update(request, id));
        try {
            userService.updateAvatar(id,avatar);
        }catch (Exception e) {
             e.printStackTrace();
        }


        return apiResponse;
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteUser(@PathVariable String id) {
        ApiResponse apiResponse = new ApiResponse();
        userService.delete(id);
        return apiResponse;
    }

    @GetMapping("/info")
    public ApiResponse<UserResponse> getInfo() {
        ApiResponse apiResponse = new ApiResponse();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();


        var userRes = userService.getInfo(authentication.getName());
        apiResponse.setResults(userRes);

        return apiResponse;
    }

    @PutMapping("/updateAvatar/{id}")
    public ApiResponse<UpdateAvatarResponse> updateAvatar(@RequestParam MultipartFile image,
                                                          @PathVariable String id) throws IOException {

        ApiResponse apiResponse = new ApiResponse();

        apiResponse.setResults( userService.updateAvatar(id, image));

        return apiResponse;
    }


    @PutMapping("/update-password-subname/{id}")
    public ApiResponse<User> updatePasswordAndName(@RequestBody UpdatePasswordandNameRequest request,
                                                   @PathVariable String id) {
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(0);

        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            if (request.getPassword() != null) {
                PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
                var check = passwordEncoder.matches(request.getPassword(), user.getPassword());
                if (check) {
                    var passw = passwordEncoder.encode(request.getPasswordNew());
                    user.setPassword(passw);

                }else {
                    throw new AppException(ErrorCode.PASSWORD_WRONG);
                }
            }
            if (request.getSubName() != null) {
                user.setSubName(request.getSubName());
            }
            apiResponse.setResults(userRepository.save(user));
            apiResponse.setCode(1000);
        }
        return apiResponse;
    }
}
