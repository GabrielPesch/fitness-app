package com.fitnessapp.config;

import org.springframework.web.filter.CorsFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
    @Autowired
    private CorsFilter corsFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
        	.csrf(csrf -> csrf.disable())
        	.addFilterBefore(corsFilter, CorsFilter.class)
            .authorizeHttpRequests((authz) -> authz
                .requestMatchers(HttpMethod.POST, "/users").permitAll() 
                .requestMatchers(HttpMethod.GET, "/users").permitAll()  
                .requestMatchers(HttpMethod.POST, "/login").permitAll()
                .anyRequest().authenticated())
            .httpBasic(httpBasic -> {});

        return http.build();
    }
   
}
