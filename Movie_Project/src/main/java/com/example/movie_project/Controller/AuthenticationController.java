package com.example.movie_project.Controller;

import com.example.movie_project.Dto.Request.AuthenticationRequest;
import com.example.movie_project.Dto.Request.IntrospectRequest;
import com.example.movie_project.Dto.Request.LogoutRequest;
import com.example.movie_project.Dto.Request.RefreshRequest;
import com.example.movie_project.Dto.Response.ApiResponse;
import com.example.movie_project.Dto.Response.AuthenticationResponse;
import com.example.movie_project.Dto.Response.IntrospectResponse;
import com.example.movie_project.Service.AuthenticationService;
import com.nimbusds.jose.JOSEException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
@Slf4j
public class AuthenticationController {
    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/login")
    ApiResponse<AuthenticationResponse> authentication(@RequestBody AuthenticationRequest request) {
        log.info("dang nhap !");
        ApiResponse apiResponse = new ApiResponse();
        var result = authenticationService.authenticate(request);
        return apiResponse.<AuthenticationResponse>builder()
                .code(apiResponse.getCode())
                .results(result)
                .build();

    }

    @PostMapping("/introspect")
    ApiResponse<IntrospectResponse> introspect(@RequestBody IntrospectRequest request) throws ParseException, JOSEException {
        ApiResponse apiResponse = new ApiResponse();
        var result = authenticationService.introspect(request);
        return apiResponse.<IntrospectResponse>builder()
                .code(apiResponse.getCode())
                .results(result)
                .build();
    }

    @PostMapping("/logout")
    ApiResponse<Void> logout(@RequestBody LogoutRequest request) throws ParseException, JOSEException {
        ApiResponse apiResponse = new ApiResponse();
       authenticationService.logout(request);
        return apiResponse.<Void>builder()
                .code(apiResponse.getCode())
                .build();
    }

    @PostMapping("/refresh")
    ApiResponse<AuthenticationResponse> logout(@RequestBody RefreshRequest request) throws ParseException, JOSEException {
        ApiResponse apiResponse = new ApiResponse();
      var result=  authenticationService.refreshToken(request);
        return apiResponse.<AuthenticationResponse>builder()
                .code(apiResponse.getCode())
                .results(result)
                .build();
    }

}
