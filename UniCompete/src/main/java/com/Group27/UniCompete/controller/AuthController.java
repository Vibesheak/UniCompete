package com.Group27.UniCompete.controller;

import com.Group27.UniCompete.dto.RegisterRequest;
import com.Group27.UniCompete.dto.VerifyRequest;
import com.Group27.UniCompete.models.Role;
import com.Group27.UniCompete.models.User;
import com.Group27.UniCompete.repository.RoleRepository;
import com.Group27.UniCompete.repository.UserRepository;
import com.Group27.UniCompete.service.EmailService;
import com.Group27.UniCompete.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.Group27.UniCompete.dto.LoginRequest;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, EmailService emailService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest) {
        if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username is already taken");
        }

        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email is already taken");
        }

        boolean isAdmin = registerRequest.getRoles().contains("ADMIN");
        if (isAdmin && userRepository.findByuniversityName(registerRequest.getUniversityName()).isPresent()) {
            return ResponseEntity.badRequest().body("An admin is already registered for this university");
        }

        User newUser = new User();
        newUser.setUsername(registerRequest.getUsername());
        newUser.setUniversityName(registerRequest.getUniversityName());
        newUser.setEmail(registerRequest.getEmail());
        newUser.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        System.out.println(registerRequest.getEmail());

        String verificationCode = generateVerificationCode();
        newUser.setVerificationCode(verificationCode);
        newUser.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(15));
        newUser.setEnabled(false);

        Set<Role> roles = new HashSet<>();
        for (String roleName : registerRequest.getRoles()) {
            Role role = roleRepository.findByName(roleName)
                    .orElseThrow(() -> new RuntimeException("Role not found: " + roleName));
            roles.add(role);
        }
        newUser.setRoles(roles);

        userRepository.save(newUser);
        emailService.sendVerificationEmail(newUser.getEmail(), verificationCode);

        return ResponseEntity.ok("User registered successfully. Please verify your email.");
    }


    @PostMapping("/verify")
    public ResponseEntity<String> verifyUser(@RequestBody VerifyRequest verifyRequest) {
        Optional<User> userOptional = userRepository.findByVerificationCode(verifyRequest.getVerificationCode());

        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid verification code");
        }

        User user = userOptional.get();
        if (user.getVerificationCodeExpiresAt().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Verification code has expired");
        }

        user.setEnabled(true);
        user.setVerificationCode(null);
        user.setVerificationCodeExpiresAt(null);
        userRepository.save(user);

        return ResponseEntity.ok("Account verified successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Attempt authentication
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            User user = userRepository.findByUsername(loginRequest.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (!user.isEnabled()) {
                return ResponseEntity.badRequest().body("Account is not verified. Please verify your email.");
            }

            // Generate token after successful login
            String token = jwtUtil.generateToken(user.getUsername());

            return ResponseEntity.ok(Map.of(
                    "message", "Login successful",
                    "token", token,
                    "expiresIn", jwtUtil.jwtExpirationMs()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }


    @PostMapping("/resend-verification")
    public ResponseEntity<String> resendVerification(@RequestParam String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        User user = userOptional.get();
        if (user.isEnabled()) {
            return ResponseEntity.badRequest().body("Account is already verified");
        }

        String newVerificationCode = generateVerificationCode();
        user.setVerificationCode(newVerificationCode);
        user.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(15));
        userRepository.save(user);
        emailService.sendVerificationEmail(email, newVerificationCode);

        return ResponseEntity.ok("Verification email sent");
    }

    private String generateVerificationCode() {
        Random random = new Random();
        return String.valueOf(random.nextInt(900000) + 100000);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<?> getUserDetails(@PathVariable String username) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        User user = userOptional.get();
        Map<String, Object> userDetails = new HashMap<>();
        userDetails.put("username", user.getUsername());
        userDetails.put("email", user.getEmail());
        userDetails.put("roles", user.getRoles());
        userDetails.put("phonenumber", user.getPhonenumber());
        userDetails.put("universityName", user.getUniversityName());
        userDetails.put("enabled", user.isEnabled());
        return ResponseEntity.ok(userDetails);
    }
}
