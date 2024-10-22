package com.example.movie_project.Exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized Error", HttpStatus.INTERNAL_SERVER_ERROR),
    USER_EXISTED(1001,"User already existed", HttpStatus.BAD_REQUEST),
    USER_NOT_FOUND(1002,"User not found",HttpStatus.NOT_FOUND),
    USERNAME_INVALID(1003,"Username must be more than {min} characters",HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(1004,"Password must be more than {min} characters",HttpStatus.BAD_REQUEST),
    INVALID_KEY(1005,"Invalid key ",HttpStatus.BAD_REQUEST),
    UNAUTHENTICATION(1006,"Unauthenticated",HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007,"You do not have permission ",HttpStatus.FORBIDDEN),
    INVALID_DOB(1008,"Your age must be at least {min} ",HttpStatus.BAD_REQUEST),
    PASSWORD_WRONG(1009,"Password wrong",HttpStatus.BAD_REQUEST),
    MOVIE_EXISTED(1010,"Movie already existed", HttpStatus.BAD_REQUEST),
    MOVIE_NOT_FOUND(1011,"Movie not found", HttpStatus.BAD_REQUEST),
    FAVORITE_EXISTED(1012,"This movie already is favorite", HttpStatus.BAD_REQUEST),
    FAVORITE_NOT_FOUND(1013,"Favorite not found", HttpStatus.BAD_REQUEST),
    COMMENT_NOT_FOUND(1014,"Comment not found", HttpStatus.BAD_REQUEST),
    ;
private int code;
private String message;
private HttpStatusCode statusCode;
}
