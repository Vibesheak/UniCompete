package com.Group27.UniCompete.repository;

import java.util.Optional;

import com.Group27.UniCompete.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.Group27.UniCompete.models.Role;

public interface RoleRepository extends MongoRepository<Role,String> {
    Optional<Role> findByName(String name);
}