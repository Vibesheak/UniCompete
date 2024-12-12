package com.Group27.UniCompete.controller;

import com.Group27.UniCompete.dto.RegisterRequest;
import com.Group27.UniCompete.models.Role;
import com.Group27.UniCompete.models.User;
import com.Group27.UniCompete.repository.RoleRepository;
import com.Group27.UniCompete.repository.UserRepository;
import com.Group27.UniCompete.security.JwtUtil;
import com.Group27.UniCompete.service.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;
import java.util.Random;
import java.util.Set;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserRepository userRepository,
                          RoleRepository roleRepository, PasswordEncoder passwordEncoder, EmailService emailService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest) {
        // Check if username already exists
        if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username is already taken");
        }
        System.out.println("Email to be sent to: " + registerRequest.getEmail());

        User newUser = new User();
        newUser.setEmail(registerRequest.getEmail());
        newUser.setusername(registerRequest.getUsername());
        String encodedPassword = passwordEncoder.encode(registerRequest.getPassword());
        newUser.setpassword(encodedPassword);


        // Add email verification fields
        newUser.setEnabled(false);
        newUser.setVerificationCode(generateVerificationCode());
        newUser.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(15));

        // Convert role names to role entities and assign to user
        Set<Role> roles = new HashSet<>();
        for (String roleName : registerRequest.getRoles()) {
            Role role = roleRepository.findByName(roleName).orElseThrow(() -> new RuntimeException("Role not found: " + roleName));
            roles.add(role);
        }
        newUser.setRoles(roles);

        userRepository.save(newUser);

        try {
            sendVerificationEmail(newUser);
            return ResponseEntity.ok("User registered successfully. Please verify your email.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error :"+newUser.getEmail());
        }


    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyUser(@RequestParam String email, @RequestParam String code) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getVerificationCodeExpiresAt().isBefore(LocalDateTime.now())) {
                return ResponseEntity.badRequest().body("Verification code has expired.");
            }
            if (user.getVerificationCode().equals(code)) {
                user.setEnabled(true);
                user.setVerificationCode(null);
                user.setVerificationCodeExpiresAt(null);
                userRepository.save(user);
                return ResponseEntity.ok("User verified successfully.");
            } else {
                return ResponseEntity.badRequest().body("Invalid verification code.");
            }
        } else {
            return ResponseEntity.badRequest().body("User not found.");
        }
    }

    private void sendVerificationEmail(User user) {
        String subject = "Verify your UniCompete account";
        String text = "Your verification code is: " + user.getVerificationCode();
        try {
            emailService.sendVerificationEmail(user.getEmail(), subject, text);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    private String generateVerificationCode() {
        Random random = new Random();
        return String.valueOf(random.nextInt(900000) + 100000);
    }
}
