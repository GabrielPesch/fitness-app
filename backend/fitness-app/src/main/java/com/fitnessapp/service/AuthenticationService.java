package com.fitnessapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.fitnessapp.entities.AuthenticationRequest;
import com.fitnessapp.entities.CustomResponse;
import com.fitnessapp.entities.User;
import com.fitnessapp.repositories.UserRepository;
import com.fitnessapp.security.JwtUtil;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public CustomResponse authenticateUser(AuthenticationRequest authenticationRequest) {
        User user = userRepository.findByEmail(authenticationRequest.getEmail())
                                  .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(authenticationRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Password incorrect");
        }

        String token = JwtUtil.generateToken(user);
        return new CustomResponse(user, token);
    }
}
