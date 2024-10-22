package com.example.movie_project.Service.movie;

import com.example.movie_project.Dto.Request.MovieCreateRequest;
import com.example.movie_project.Dto.Response.MovieResponse;
import com.example.movie_project.Dto.Response.UpdateAvatarResponse;
import com.example.movie_project.Entity.Genre;
import com.example.movie_project.Entity.Movie;
import com.example.movie_project.Entity.User;
import com.example.movie_project.Exception.AppException;
import com.example.movie_project.Exception.ErrorCode;
import com.example.movie_project.Mapper.MovieMapper;
import com.example.movie_project.Repository.GenreRepository;
import com.example.movie_project.Repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieServiceImpl implements MovieService{
    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private MovieMapper movieMapper;

    @Autowired
    private GenreRepository genreRepository;

    @Value("${url-avatar}")
    protected String AVATAR_URL;

    // đường dẫn gốc của thư mục đang chạy
    private static final Path CURRENT_FOLDER = Paths.get(System.getProperty("user.dir"));
    @Override
    public MovieResponse create(MovieCreateRequest request,MultipartFile backdrop_path,MultipartFile poster_path) throws IOException {
        if (movieRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.MOVIE_EXISTED);
        }

        var movie = movieMapper.toMovie(request);
        movie.setGenres(new HashSet<>(genreRepository.findAllByNameIn(request.getGenres())));
        movie.setBackdrop_path(updateAvatar(backdrop_path));
        movie.setPoster_path(updateAvatar(poster_path));
        return movieMapper.toMovieResponse(movieRepository.save(movie));

    }

    @Override
    public MovieResponse getMovieById(String id) {
        Movie movie = movieRepository.findById(id).orElseThrow(()
                -> new AppException(ErrorCode.MOVIE_NOT_FOUND));

        return movieMapper.toMovieResponse(movie);
    }

    @Override
    public Page<Movie> getAllMovies(Pageable pageable) {
        return movieRepository.findAll(pageable);
    }


    @Override
    public void deleteMovieById(String id) {

            var movie = movieRepository.findById(id).orElseThrow(()
                    -> new AppException(ErrorCode.MOVIE_NOT_FOUND));
          if(movie.getGenres() != null){
                movie.getGenres().clear();
                movieRepository.save(movie);
            }
            movieRepository.deleteById(id);

    }

    @Override
    public MovieResponse update(MovieCreateRequest request, String id,MultipartFile backdrop_path, MultipartFile poster_path) throws IOException {
        var movie = movieRepository.findById(id).orElseThrow(()
                -> new AppException(ErrorCode.MOVIE_NOT_FOUND));
        movieMapper.updateMovie(movie,request);
        movie.setGenres(new HashSet<>(genreRepository.findAllByNameIn(request.getGenres())));
        movie.setBackdrop_path(updateAvatar(backdrop_path));
        movie.setPoster_path(updateAvatar(poster_path));
        return movieMapper.toMovieResponse( movieRepository.save(movie));
    }

    @Override
    public Page<MovieResponse> searchMovies(String name,Pageable pageable) {

        return movieRepository.searchByName(name,pageable).map(movieMapper::toMovieResponse);
    }

    public String updateAvatar(MultipartFile image) throws IOException {
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

        return imagePath.resolve(image.getOriginalFilename()).getFileName().toString();
    }

    public List<MovieResponse> getMoviesByCategory(String category) {
        return movieRepository.findMoviesByCategory(category).stream().map(movieMapper::toMovieResponse).toList();
    }

    public List<MovieResponse> getMoviesByType(String category, String type) {
        switch (type) {
            case "top_rated":{
                var movies = movieRepository.findMoviesByCategory(category);
               movies= movies.stream()
                        .sorted((m1, m2) -> Integer.compare(m2.getIbmPoints(), m1.getIbmPoints())) // Sắp xếp giảm dần theo ibmPoints
                        .limit(5) // Giới hạn chỉ lấy 5 phần tử
                        .collect(Collectors.toList()); // Thu thập thành danh sách
                return movies.stream().map(movieMapper::toMovieResponse).toList();
            }

            case "popular":
            {
                var movies = movieRepository.findMoviesByCategory(category);
                movies= movies.stream()
                        .sorted((v1, v2) -> Integer.compare(v2.getViewed(), v1.getViewed())) // Sắp xếp giảm dần theo viewed
                        .limit(5) // Giới hạn chỉ lấy 5 phần tử
                        .collect(Collectors.toList()); // Thu thập thành danh sách
                return movies.stream().map(movieMapper::toMovieResponse).toList();
            }
            case "upcoming":
            {
                var movies = movieRepository.findMoviesByCategory(category);
                movies= movies.stream()
                        .sorted((m1, m2) -> m2.getCreatedAt().compareTo(m1.getCreatedAt())) // Sắp xếp giảm dần theo createdAt
                        .limit(5) // Giới hạn chỉ lấy 5 phần tử
                        .collect(Collectors.toList()); // Thu thập thành danh sách
                return movies.stream().map(movieMapper::toMovieResponse).toList();
            }
            default:
                throw new IllegalArgumentException("Invalid movie type: " + type);
        }
    }
    public List<MovieResponse> getMovieByGenre(String id){
        var movies = movieRepository.findMoviesByGenreId(id);
        return movies.stream().map(movieMapper::toMovieResponse).toList();
    }

    public List<MovieResponse> getAllById(List<String> id){
        return movieRepository.findAllById(id).stream().map(movieMapper::toMovieResponse).toList();
    }
    public List<MovieResponse> searchMovie(String keywork) {
        return movieRepository.searchMovie(keywork).stream().map(movieMapper::toMovieResponse).toList();
    }
}
