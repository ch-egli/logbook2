package ch.egli.training.controller;


import ch.egli.training.exception.BadCredentialsException;
import ch.egli.training.repository.BenutzerRepository;
import ch.egli.training.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    BenutzerRepository benutzerRepository;

    @PostMapping("/token")
    public ResponseEntity loginAndReturnToken(@RequestBody AuthenticationRequest data) {
        try {
            String username = data.getUsername();
            Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, data.getPassword()));

            final Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
            final List<String> roles = authorities.stream().map(a -> a.getAuthority()).collect(Collectors.toList());
            String token = jwtTokenProvider.createToken(username, roles);

            Map<Object, Object> model = new HashMap<>();
            model.put("username", username);
            model.put("token", token);
            model.put("roles", roles.stream().collect(Collectors.joining(",")));
            return ok(model);
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username/password");
        }
    }
}
