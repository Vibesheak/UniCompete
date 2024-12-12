package com.Group27.UniCompete.repository;

import java.util.Optional;

import com.Group27.UniCompete.models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.Group27.UniCompete.models.User;

public interface UserRepository extends MongoRepository<User,String>{
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findByVerificationCode(String verificationCode);

//    Boolean existsByUsername(String username);
//
//    Boolean existsByEmail(String email);
}