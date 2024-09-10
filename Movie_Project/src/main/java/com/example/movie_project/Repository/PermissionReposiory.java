package com.example.movie_project.Repository;

import com.example.movie_project.Entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PermissionReposiory extends JpaRepository<Permission, String> {
}
