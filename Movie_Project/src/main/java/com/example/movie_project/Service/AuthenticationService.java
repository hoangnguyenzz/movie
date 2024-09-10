package com.example.movie_project.Service;

import com.example.movie_project.Dto.Request.AuthenticationRequest;
import com.example.movie_project.Dto.Request.IntrospectRequest;
import com.example.movie_project.Dto.Request.LogoutRequest;
import com.example.movie_project.Dto.Request.RefreshRequest;
import com.example.movie_project.Dto.Response.AuthenticationResponse;
import com.example.movie_project.Dto.Response.IntrospectResponse;
import com.example.movie_project.Entity.InvalidatedToken;
import com.example.movie_project.Entity.User;
import com.example.movie_project.Exception.AppException;
import com.example.movie_project.Exception.ErrorCode;
import com.example.movie_project.Repository.InvalidatedTokenRepository;
import com.example.movie_project.Repository.UserRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;
import java.util.UUID;

@Service
@Slf4j
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;
    @Value("${jwt.valid-duration}")
    protected Long VALID_DURATION;
    @Value("${jwt.refreshable-duration}")
    protected Long REFRESHABLE_DURATION;
    @Autowired
    private InvalidatedTokenRepository invalidatedTokenRepository;


    public AuthenticationResponse authenticate(AuthenticationRequest request) {
    var user = userRepository.findByUsername(request.getUsername())
            .orElseThrow(()-> new AppException(ErrorCode.USER_NOT_FOUND));
    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

    boolean authentication = passwordEncoder.matches(request.getPassword(), user.getPassword());
    if(!authentication){
        throw new AppException(ErrorCode.UNAUTHENTICATION);
    }
        boolean exists = user.getRoles().stream()
                .anyMatch(role -> "ADMIN".equals(role.getName()));
    var token = generateToken(user);
        log.info("Check role isADMIN : {}", exists);
    return AuthenticationResponse.builder()
            .token(token)
            .result(true)
            .isAdmin(exists)
            .build();
}

    public IntrospectResponse introspect(IntrospectRequest request)
            throws JOSEException, ParseException {
        var token = request.getToken();
        boolean isValid= true;
        try {
            verifyToken(token,false);
        }catch (Exception exception){
            isValid=false;
        }
        return IntrospectResponse.builder()
                .valid(isValid)
                .build();

    }

    public void logout(LogoutRequest request) throws ParseException, JOSEException {

        try{
            var signToken = verifyToken(request.getToken(),true);

            String jit = signToken.getJWTClaimsSet().getJWTID();
            Date expirationDate = signToken.getJWTClaimsSet().getExpirationTime();
            InvalidatedToken invalidatedToken = InvalidatedToken.builder()
                    .id(jit)
                    .expiryTime(expirationDate)
                    .build();
            invalidatedTokenRepository.save(invalidatedToken);
            log.info(jit);
            log.info(expirationDate.toString());
            log.info(signToken.toString());
        }catch (AppException e){
            log.info("Token already expired");
        }




    }

    public AuthenticationResponse refreshToken(RefreshRequest request) throws ParseException, JOSEException {
        var signToken = verifyToken(request.getToken(),true);

        String jit = signToken.getJWTClaimsSet().getJWTID();
        Date expirationDate = signToken.getJWTClaimsSet().getExpirationTime();
        InvalidatedToken invalidatedToken = InvalidatedToken.builder()
                .id(jit)
                .expiryTime(expirationDate)
                .build();
        invalidatedTokenRepository.save(invalidatedToken);
        var username = signToken.getJWTClaimsSet().getSubject();
        var user = userRepository.findByUsername(username)
                .orElseThrow(()->new AppException(ErrorCode.UNAUTHENTICATION));
        var token = generateToken(user);
        boolean exists = user.getRoles().stream()
                .anyMatch(role -> "ADMIN".equals(role.getName()));

        return AuthenticationResponse.builder()
                .token(token)
                .result(true)
                .isAdmin(exists)
                .build();
    }

    //------------------------------------------------------------------------------------------------------

// Tạo ra token

    private String generateToken(User user){
        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUsername())
                .issuer("hoang")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(VALID_DURATION, ChronoUnit.SECONDS).toEpochMilli()
                ))
                .jwtID(UUID.randomUUID().toString())
                .claim("scope",buildScope(user))
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(jwsHeader, payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Cannot create token", e);
            throw new RuntimeException(e);
        }

    }

    private String  buildScope(User user){
        StringJoiner stringJoiner = new StringJoiner(" ");
        if(!CollectionUtils.isEmpty(user.getRoles()))
            user.getRoles().forEach(role -> {
                stringJoiner.add("ROLE_"+role.getName());
                if(!CollectionUtils.isEmpty(role.getPermissions()))
                    role.getPermissions().forEach(permission -> {
                        stringJoiner.add(permission.getName());
                    });
            });
        return stringJoiner.toString();
    }

    //verify token

    private SignedJWT verifyToken(String token, boolean isRefresh) throws JOSEException, ParseException {

        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiryTime = (isRefresh)
                ? new Date(signedJWT.getJWTClaimsSet().getIssueTime().
                    toInstant().plus(REFRESHABLE_DURATION,ChronoUnit.SECONDS).toEpochMilli())
                : signedJWT.getJWTClaimsSet().getExpirationTime();

        var verified = signedJWT.verify(verifier);
        if(!(verified && expiryTime.after(new Date())))
            throw new AppException(ErrorCode.UNAUTHENTICATION);

        if (invalidatedTokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID()))
            throw new AppException(ErrorCode.UNAUTHENTICATION);
        return signedJWT;
    }
}
