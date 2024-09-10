package com.example.movie_project.Configuration;

import com.example.movie_project.Dto.Request.IntrospectRequest;
import com.example.movie_project.Service.AuthenticationService;
import com.nimbusds.jose.JOSEException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.text.ParseException;
import java.util.Objects;

@Component
public class CustomJwtDecoder implements JwtDecoder {

    @Value("${jwt.signerKey}")
    private String SIGNER_KEY;

    @Autowired
    private AuthenticationService authenticationService;

    NimbusJwtDecoder jwtDecoder=null;
    @Override
    public Jwt decode(String token) throws JwtException {
        try {

           var response =authenticationService.introspect(IntrospectRequest.builder()
                            .token(token)
                    .build());


           if(!response.getValid()){
               throw new JwtException("invalid token");
           }

        }catch (JOSEException | ParseException e) {
            throw new JwtException(e.getMessage());
        }
        if(Objects.isNull(jwtDecoder)){
            SecretKeySpec secretKeySpec = new SecretKeySpec(SIGNER_KEY.getBytes(),"HS512");
            jwtDecoder =NimbusJwtDecoder
                    .withSecretKey(secretKeySpec)
                    .macAlgorithm(MacAlgorithm.HS512)
                    .build();
        }
        return jwtDecoder.decode(token);
    }
}
