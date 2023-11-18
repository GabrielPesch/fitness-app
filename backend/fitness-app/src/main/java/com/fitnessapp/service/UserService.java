package com.fitnessapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.fitnessapp.entities.CustomResponse;
import com.fitnessapp.entities.User;
import com.fitnessapp.exceptions.EmailAlreadyUsedException;
import com.fitnessapp.repositories.UserRepository;
import com.fitnessapp.security.JwtUtil;
import org.springframework.util.StringUtils;
import java.util.regex.Pattern;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public CustomResponse createUser(User user) {
		validateAndPrepareUserCreation(user);

		if (emailExists(user.getEmail())) {
			throw new EmailAlreadyUsedException("Email já registrado");
		}

		user.setPassword(passwordEncoder.encode(user.getPassword()));
		User savedUser = userRepository.save(user);
		String token = JwtUtil.generateToken(savedUser);
		return new CustomResponse(savedUser, token);
	}

	private boolean emailExists(String email) {
		return userRepository.findByEmail(email).isPresent();
	}

	private void validateAndPrepareUserCreation(User user) {
		validateName(user.getName());
		validateEmail(user.getEmail());
		validatePassword(user.getPassword());

		user.setName(user.getName().toLowerCase().trim());
		user.setEmail(user.getEmail().trim());
		user.setPassword(passwordEncoder.encode(user.getPassword().trim()));
	}

	private void validateName(String name) {
		if (!StringUtils.hasText(name)) {
			throw new IllegalArgumentException("Nome: é obrigatório");
		} 
		if (name.length() < 3) {
			throw new IllegalArgumentException("Nome inválido: deve conter ao menos 03 caractéres");
		}
		
		if (name.length() > 100) {
			throw new IllegalArgumentException("Nome inválido: deve conter até 100 caractéres");
		}
	}

	private void validateEmail(String email) {
		if (!StringUtils.hasText(email)) {
			throw new IllegalArgumentException("Email: é obrigatório\"");
		}
		if (email.length() < 5) {
			throw new IllegalArgumentException("Email: deve conter ao menos 05 caractéres");
		}
		
		if (email.length() > 100) {
			throw new IllegalArgumentException("Email: deve conter até 100 caractéres");
		} 
		if (!isValidEmailFormat(email)) {
			throw new IllegalArgumentException("Email: não é de um formato válido");
		}
	}

	private void validatePassword(String password) {
		if (!StringUtils.hasText(password)) {
			throw new IllegalArgumentException("Senha : é obrigatório");
		} else if (password.length() > 100) {
			throw new IllegalArgumentException("Senha: deve conter até 100 caractéres");
		}
	}

	private boolean isValidEmailFormat(String email) {
		String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
		Pattern pattern = Pattern.compile(emailRegex);
		return pattern.matcher(email).matches();
	}
}
