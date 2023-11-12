package com.fitnessapp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.fitnessapp.entities.AuthenticationRequest;
import com.fitnessapp.entities.CustomResponse;
import com.fitnessapp.service.AuthenticationService;

@RestController
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<?> createAuthToken(@RequestBody AuthenticationRequest authenticationRequest) {
        try {
            CustomResponse response = authenticationService.authenticateUser(authenticationRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
