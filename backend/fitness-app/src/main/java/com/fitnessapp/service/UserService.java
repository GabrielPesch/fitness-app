package com.fitnessapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.fitnessapp.entities.CustomResponse;
import com.fitnessapp.entities.User;
import com.fitnessapp.repositories.UserRepository;
import com.fitnessapp.security.JwtUtil;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public CustomResponse createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        String token = JwtUtil.generateToken(savedUser);
        return new CustomResponse(savedUser, token);
    }
}
