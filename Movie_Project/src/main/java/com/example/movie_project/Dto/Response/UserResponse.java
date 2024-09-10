package com.example.movie_project.Dto.Response;

import com.example.movie_project.Entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {
    private String id;
    private String username;
    private String password;
    private String email;
   // private LocalDate dob;
   private String avatar;
    private String subName;
    private Set<Role> roles;
    private boolean checkAdmin;
}
