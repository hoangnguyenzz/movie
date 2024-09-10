package com.example.movie_project.Service.user;

import com.example.movie_project.Dto.Request.UserCreateRequest;
import com.example.movie_project.Dto.Request.UserUpdateRequest;
import com.example.movie_project.Dto.Response.UpdateAvatarResponse;
import com.example.movie_project.Dto.Response.UserResponse;
import com.example.movie_project.Entity.Role;
import com.example.movie_project.Entity.User;
import com.example.movie_project.Exception.AppException;
import com.example.movie_project.Exception.ErrorCode;
import com.example.movie_project.Mapper.UserMapper;
import com.example.movie_project.Repository.RoleRepository;
import com.example.movie_project.Repository.UserRepository;
import com.example.movie_project.enums.ROLE;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
@Slf4j
@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;


    @Value("${url-avatar}")
    protected String AVATAR_URL;

    // đường dẫn gốc của thư mục đang chạy
    private static final Path CURRENT_FOLDER = Paths.get(System.getProperty("user.dir"));

    @Override
    public UserResponse create(UserCreateRequest request) {
        if(userRepository.existsByUsername(request.getUsername()))
            throw new AppException(ErrorCode.USER_EXISTED);
        User user = userMapper.toUser(request);

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        var role= roleRepository.findByName(ROLE.USER.name());
        HashSet<Role> roles = new HashSet<>();
        roles.add(role);
        user.setRoles(roles);

        return userMapper.toUserResponse(userRepository.save(user));
    }

    @Override
    public UserResponse getUserById(String id) {
        User user= userRepository.findById(id).orElseThrow(()
                -> new RuntimeException("user not found !"));

        boolean exists = user.getRoles().stream()
                .anyMatch(role -> "ADMIN".equals(role.getName()));
       var userRes = userMapper.toUserResponse(user);

            userRes.setCheckAdmin(exists);


        return userRes;
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getAll() {
        var list = userRepository.findAll();

        return list.stream().map(userMapper::toUserResponse).toList();
    }

    @Override
    public UserResponse update(UserUpdateRequest request, String id) {
        User user= userRepository.findById(id).orElseThrow(()
                -> new RuntimeException("user not found !"));

        Set<Role> roles = new HashSet<>();
        log.info("Check box role:"+ request.isCheckAdmin());
       if(request.isCheckAdmin()){
           var role= roleRepository.findByName(ROLE.ADMIN.name());
           roles.add(role);
           user.setRoles(roles);
       }else{
            var role= roleRepository.findByName(ROLE.USER.name());
            roles.add(role);
            user.setRoles(roles);
       }
        userMapper.updateUser(user,request);
log.info("Role ne : "+user.getRoles().toString());
        return userMapper.toUserResponse(userRepository.save(user));
    }

    @Override
    public void delete(String id) {
      userRepository.deleteById(id);
    }
    public UserResponse getInfo(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(()
                -> new RuntimeException("user not found !"));
        UserResponse userResponse = null;
        if (user != null) {
            userResponse = userMapper.toUserResponse(user);
            userResponse.setAvatar(AVATAR_URL+userResponse.getAvatar());
        }
        return userResponse;
    }
    public UpdateAvatarResponse updateAvatar(String id, MultipartFile image) throws IOException {
        UpdateAvatarResponse updateAvatarResponse = new UpdateAvatarResponse();


        //tạo thư mục images trong static nếu chưa tồn tại !
        Path staticPath = Paths.get("static");
        Path imagePath = Paths.get("images");
        if (!Files.exists(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath))) {
            Files.createDirectories(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath));
        }

        // Lưu file ảnh vào thư mục !
        Path file = CURRENT_FOLDER.resolve(staticPath)
                .resolve(imagePath).resolve(image.getOriginalFilename());
        try (OutputStream os = Files.newOutputStream(file)) {
            os.write(image.getBytes());
        }

        // xác thực và update
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {

            user.setAvatar(imagePath.resolve(image.getOriginalFilename()).getFileName().toString());
            updateAvatarResponse.setUrl(AVATAR_URL+imagePath.resolve(image.getOriginalFilename()).getFileName().toString());
            userRepository.save(user);
        }
        return updateAvatarResponse;
    }

}
