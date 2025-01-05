package com.Group27.UniCompete.security;

import com.Group27.UniCompete.service.CustomUserDetailService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailService customUserDetailService;

    public JwtAuthenticationFilter(JwtUtil jwtUtil, CustomUserDetailService customUserDetailService) {
        this.jwtUtil = jwtUtil;
        this.customUserDetailService = customUserDetailService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = request.getHeader("Authorization");

        if(token!=null && token.startsWith("Bearer")){
            token=token.substring(7);
            String username = jwtUtil.extractUsername(token);

            if(username != null && SecurityContextHolder.getContext().getAuthentication()==null){
                UserDetails userDetails=customUserDetailService.loadUserByUsername(username);

                if(jwtUtil.isTokenVaild(token)){
                    UsernamePasswordAuthenticationToken authtoken=new UsernamePasswordAuthenticationToken(userDetails,
                            null,userDetails.getAuthorities());
                    authtoken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authtoken);
                }
            }
        }
        filterChain.doFilter(request,response);
    }
}
