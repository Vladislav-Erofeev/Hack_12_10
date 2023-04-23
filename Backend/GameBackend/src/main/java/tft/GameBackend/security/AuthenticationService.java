package tft.GameBackend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tft.GameBackend.entities.Person;
import tft.GameBackend.entities.Role;
import tft.GameBackend.reopsitories.PersonRepository;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final PersonRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request, String url) {
        var user = Person.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .url(url)
                .role(Role.USER)
                .bestScore(0)
                .build();

        var savedUser = repository.save(user);
        var jwtToken = jwtService.generateToken(new PersonDetails(user));
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(new PersonDetails(user));
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }



}
