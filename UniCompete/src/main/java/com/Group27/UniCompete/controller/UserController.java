package com.Group27.UniCompete.controller;

import com.Group27.UniCompete.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private JwtUtil jwtUtil;

    @Value("${role.admin}")
    private String ADMIN;

    @Value("${role.user}")
    private String USER;

    //Endpoint to access user protected resources
    @GetMapping("/protected-data")
    public ResponseEntity<String> getProtectedData(@RequestHeader("Authorization") String token){
        if(token != null && token.startsWith("Bearer ")){
            String jwtToken = token.substring(7);

            try{
                if(jwtUtil.isTokenVaild(jwtToken)){
                    String username = jwtUtil.extractUsername(jwtToken);

                    Set<String> roles = jwtUtil.extractRoles(jwtToken);

                    if(roles.contains(ADMIN)){
                        return ResponseEntity.ok("Welcome "+username+" Here is the "+roles+" Specific data");
                    }else if(roles.contains(USER)){
                        return ResponseEntity.ok("Welcome "+username+" Here is the "+roles+" Specific data");
                    }
                    else {
                        return ResponseEntity.status(403).body("Access Denied");
                    }
                }
            }catch (Exception ex){
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invaild Token");
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization Header missing or invalid");
    }

}
