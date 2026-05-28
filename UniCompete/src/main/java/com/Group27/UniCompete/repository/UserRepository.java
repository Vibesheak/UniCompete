package com.Group27.UniCompete.repository;

import com.Group27.UniCompete.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findByVerificationCode(String verificationCode);
    Optional<User> findByuniversityName(String universityName);

//    @Query("SELECT u FROM User u JOIN u.roles r WHERE r.name = :role AND u.universityName = :universityName")
//    Optional<User> findAdminByUniversityName(@Param("role") String role, @Param("universityName") String universityName);
@Query("{ 'universityName': :#{#universityName}, 'roles.name': :#{#roles} }")
Optional<User> findAdminByUniversityName(@Param("universityName") String universityName, @Param("roles") String roles);




}
