package com.Group27.UniCompete.controller;

import com.Group27.UniCompete.dto.RegisterRequest;
import com.Group27.UniCompete.models.Role;
import com.Group27.UniCompete.models.User;
import com.Group27.UniCompete.repository.RoleRepository;
import com.Group27.UniCompete.repository.UserRepository;
import com.Group27.UniCompete.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Register user API
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest){
        //Check if username already exists
        if(userRepository.findByUsername(registerRequest.getUsername()).isPresent()){
            return ResponseEntity.badRequest().body("Username is already Taken");
        }
        User newUser = new User();
        newUser.setUsername(registerRequest.getUsername());
        newUser.setEmail(registerRequest.getEmail());
        newUser.setAge(registerRequest.getAge());
        newUser.setPhonenumber(registerRequest.getPhonenumber());

        String encodedPassword = passwordEncoder.encode(registerRequest.getPassword());
        newUser.setPassword(encodedPassword);
        System.out.println("EncodedPassword "+encodedPassword);

        // convert role name to role entites and assign to user
        Set<Role> roles = new HashSet<>();
        for(String roleName: registerRequest.getRoles()){
            Role role = roleRepository.findByName(roleName).orElseThrow(() -> new RuntimeException("Role not found "+ roleName));
            roles.add(role);
        }
        newUser.setRoles(roles);
        userRepository.save(newUser);
        return ResponseEntity.ok("User Resgistered Successfully");
    }

    // Login API
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        try {
            // Attempt authentication
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );
        } catch (Exception e) {
            // Handle authentication failure
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }

        // Generate token if authentication is successful
        String token = jwtUtil.generateToken(loginRequest.getUsername());
        return ResponseEntity.ok(token);
    }

}
