package tft.GameBackend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import tft.GameBackend.security.AuthenticationRequest;
import tft.GameBackend.security.AuthenticationResponse;
import tft.GameBackend.security.AuthenticationService;
import tft.GameBackend.security.RegisterRequest;

@RestController
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    /**
     * @param request - запрос вида {
     *                "username": имя пользователя,
     *                "email": маил пользователя,
     *                "password": пароль пользователя,
     *                "bestScore": рекорд пользователя (int)
     *                }
     * @return JW token вида - {
     * "token": токен
     * }
     */

    @PostMapping("/registration")
    public AuthenticationResponse register(@RequestBody RegisterRequest request) {
        return service.register(request);
    }

    /**
     * @param request - запрос вида {
     *                "email": маил пользователя,
     *                "password": пароль пользователя,
     *                }
     * @return JW token вида - {
     * "token": токен
     * }
     */

    @PostMapping("/login")
    public AuthenticationResponse authenticate(@RequestBody AuthenticationRequest request) {
        return service.authenticate(request);
    }


}
