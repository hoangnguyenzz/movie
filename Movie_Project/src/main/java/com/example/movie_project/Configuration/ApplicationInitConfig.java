package com.example.movie_project.Configuration;

import com.example.movie_project.Entity.Role;
import com.example.movie_project.Entity.User;
import com.example.movie_project.Repository.RoleRepository;
import com.example.movie_project.Repository.UserRepository;
import com.example.movie_project.enums.ROLE;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;

@Slf4j
@Configuration
public class ApplicationInitConfig {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository){
        return args -> {
            if((userRepository.findByUsername("admin")).isEmpty()){
                var role = roleRepository.findByName(ROLE.ADMIN.name());
                var roles = new HashSet<Role>();
                roles.add(role);
                User user = User.builder()
                        .username("admin")
                        .password(passwordEncoder.encode("admin"))
                        .roles(roles)
                        .build();
                userRepository.save(user);

                log.warn("admin user has been created with defautl password : admin , please change it !");

            }
        };
    }
}
