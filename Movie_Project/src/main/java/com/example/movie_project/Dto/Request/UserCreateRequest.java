package com.example.movie_project.Dto.Request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserCreateRequest {
    @Size(min = 4,message = "USERNAME_INVALID")
    private String username;
    @NotBlank
    @Size(min = 4,message = "PASSWORD_INVALID")
    private String password;
    private String email;
  //  @DobConstraint(min = 18,message = "INVALID_DOB")
   // private LocalDate dob;
  private String avatar;
}
