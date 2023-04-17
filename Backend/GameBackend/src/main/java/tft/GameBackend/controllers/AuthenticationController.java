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
//@CrossOrigin(origins="http://localhost:3000")
@RequiredArgsConstructor
public class AuthenticationController {

  private final AuthenticationService service;

  @PostMapping("/registration")
  public AuthenticationResponse register(
      @RequestBody RegisterRequest request
  ) {
    return service.register(request);
  }
  @PostMapping("/login")
  public AuthenticationResponse authenticate(
      @RequestBody AuthenticationRequest request
  ) {
    return service.authenticate(request);
  }



}
