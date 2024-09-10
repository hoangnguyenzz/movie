package com.example.movie_project.Exception;

import com.example.movie_project.Dto.Response.ApiResponse;
import jakarta.validation.ConstraintViolation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;
import java.util.Objects;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    private final static String MIN_ATTRIBUTE="min";


 //    Exception chưa xác định
//    @ExceptionHandler(Exception.class)
//    ResponseEntity<ApiResponse> ExceptionHandler(Exception e) {
//        ApiResponse apiResponse = new ApiResponse();
//        apiResponse.setCode(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode());
//        apiResponse.setMessage(ErrorCode.UNCATEGORIZED_EXCEPTION.getMessage());
//        return ResponseEntity.badRequest().body(apiResponse);
//    }

    //Exception được config
    @ExceptionHandler(AppException.class)
    ResponseEntity<ApiResponse> appExceptionHandler(AppException e) {
        ErrorCode errorCode=e.getErrorCode();
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());
        return ResponseEntity
                .status(errorCode.getStatusCode())
                .body(apiResponse);
    }

    //Exception validate

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse> validationExceptionHandler(MethodArgumentNotValidException e) {
        String enumKey=e.getFieldError().getDefaultMessage();
        ErrorCode errorCode=ErrorCode.INVALID_KEY;
        log.info("Đây là lỗi invalid_key");
        Map<String,Object> attributes =null;
        try{

            errorCode = ErrorCode.valueOf(enumKey);
            var constraintViolations = e.getBindingResult()
                    .getAllErrors()
                    .get(0)
                    .unwrap(ConstraintViolation.class)
                    ;
            attributes = constraintViolations
                    .getConstraintDescriptor()
                    .getAttributes();
            log.info(String.valueOf(attributes.get(MIN_ATTRIBUTE)));
        }catch (Exception exception){

        }

        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(Objects.nonNull(attributes)?
                mapAttributes(errorCode.getMessage(),attributes)
                : errorCode.getMessage());
        return ResponseEntity.badRequest().body(apiResponse);
    }

    public String mapAttributes (String message , Map<String , Object> map){

        String min = String.valueOf(map.get(MIN_ATTRIBUTE));

        return message.replace("{"+MIN_ATTRIBUTE+"}",min);
    }

    @ExceptionHandler(AccessDeniedException.class)
    ResponseEntity<ApiResponse> accessDeniedExceptionHandler(AccessDeniedException e) {
        ErrorCode errorCode=ErrorCode.UNAUTHORIZED;
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());
        return ResponseEntity
                .status(errorCode.getStatusCode())
                .body(apiResponse);
    }
}
