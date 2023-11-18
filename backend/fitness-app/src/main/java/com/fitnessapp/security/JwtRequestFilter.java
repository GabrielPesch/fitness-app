package com.fitnessapp.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.IOException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.filter.OncePerRequestFilter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fitnessapp.service.MyUserDetailsService;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException, java.io.IOException {
        final String requestTokenHeader = request.getHeader("Authorization");
        String username = null;
        String jwtToken = null;
        String requestUri = request.getRequestURI();
        
        if ("/login".equals(requestUri)) {
            chain.doFilter(request, response);
            return;
        }
        
        if ("/users".equals(requestUri)) {
            chain.doFilter(request, response);
            return;
        }

        if (requestTokenHeader == null || !requestTokenHeader.startsWith("Bearer ")) {
            String errorMessage = "JWT Token: ausente";
            responseError(response, errorMessage, HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        jwtToken = requestTokenHeader.substring(7);

        try {
            username = getUsernameFromToken(jwtToken);
        } catch (IllegalArgumentException | MalformedJwtException | UnsupportedJwtException | SignatureException e) {
            String errorMessage = "JWT Token: inválido";
            responseError(response, errorMessage, HttpServletResponse.SC_BAD_REQUEST);
            return;
        } catch (ExpiredJwtException e) {
            String errorMessage = "JWT Token: expirado";
            responseError(response, errorMessage, HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

            if (validateToken(jwtToken, userDetails)) {
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        chain.doFilter(request, response);
    }

    private String getUsernameFromToken(String token) {
        JwtParser parser = Jwts.parserBuilder().setSigningKey(JwtUtil.getKey()).build();
        return parser.parseClaimsJws(token).getBody().getSubject();
    }

    private Boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    private Date getExpirationDateFromToken(String token) {
        JwtParser parser = Jwts.parserBuilder().setSigningKey(JwtUtil.getKey()).build();
        Claims claims = parser.parseClaimsJws(token).getBody();
        return claims.getExpiration();
    }

    private void responseError(HttpServletResponse response, String errorMessage, int status) {
        try {
            response.setStatus(status);
            response.setContentType("application/json");
            ErrorResponse errorResponse = new ErrorResponse(errorMessage);
            ObjectMapper objectMapper = new ObjectMapper();

            String jsonResponse = objectMapper.writeValueAsString(errorResponse);
            response.getWriter().write(jsonResponse);
        } catch (JsonProcessingException e) {
            String genericErrorMessage = "Um erro ocorreu ao processar a resposta";
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            ErrorResponse genericErrorResponse = new ErrorResponse(genericErrorMessage);
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                String genericJsonResponse = objectMapper.writeValueAsString(genericErrorResponse);
                response.getWriter().write(genericJsonResponse);
            } catch (JsonProcessingException jsonProcessingException) {
                jsonProcessingException.printStackTrace();
            } catch (java.io.IOException ioException) {
                ioException.printStackTrace();
            }
        } catch (java.io.IOException e) {
            e.printStackTrace();
        }
    }

}
