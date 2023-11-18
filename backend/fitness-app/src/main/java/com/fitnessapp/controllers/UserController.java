package com.fitnessapp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitnessapp.entities.CustomResponse;
import com.fitnessapp.entities.User;
import com.fitnessapp.repositories.UserRepository;
import com.fitnessapp.service.UserService;

@RestController
@RequestMapping(value = "/users")
public class UserController {

	@Autowired
	private UserRepository repository;
	
	@Autowired
	private UserService userService;
	
	@GetMapping
	public List<User> findAll() {
		List<User> result = repository.findAll();
		return result;
	}
	
	@GetMapping(value = "{id}")
	public User findById(@PathVariable Long id) {
		User result = repository.findById(id).get();
		return result;
	}
	
	@PostMapping
	public ResponseEntity<?> insert(@RequestBody User user) {
	    try {
	    	 CustomResponse response = userService.createUser(user);
	        return new ResponseEntity<>(response, HttpStatus.CREATED);
	    } catch (Exception e) {
	        return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
}
