package com.fitnessapp.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

import com.fitnessapp.entities.User;

public class JwtUtil {

	private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

	public static Key getKey() {
		return key;
	}

	public static String generateToken(User user) {
		long now = System.currentTimeMillis();

		return Jwts.builder().setSubject(user.getEmail()).setIssuedAt(new Date(now))
				.setExpiration(new Date(now + 900000)).signWith(key, SignatureAlgorithm.HS256).compact();
	}
}
