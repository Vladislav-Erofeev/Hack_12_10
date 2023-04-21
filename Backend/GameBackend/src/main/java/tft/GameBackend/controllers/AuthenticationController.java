package tft.GameBackend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tft.GameBackend.security.AuthenticationRequest;
import tft.GameBackend.security.AuthenticationResponse;
import tft.GameBackend.security.AuthenticationService;
import tft.GameBackend.security.RegisterRequest;
import tft.GameBackend.utils.ImageNameService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;
    private final ImageNameService imageNameService;
    private final String UPLOAD_DIRECTORY = "C:/images/person";

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
    public AuthenticationResponse register(@RequestPart("request") RegisterRequest request,
                                           @RequestPart(value = "file", required = false) MultipartFile file)
            throws IOException {
        if (file == null) {
            return service.register(request, null);
        }
        String fileName = imageNameService.generate(file.getContentType());
        Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, fileName);
        Files.write(fileNameAndPath, file.getBytes());

        return service.register(request, "/person/" + fileName);
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
