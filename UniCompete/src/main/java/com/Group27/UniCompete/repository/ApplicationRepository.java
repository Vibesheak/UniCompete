package com.Group27.UniCompete.repository;

import com.Group27.UniCompete.models.Application;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ApplicationRepository extends MongoRepository<Application, String> {
    List<Application> findByCompetitionId(String competitionId);
    //List<Application> findByUsername(String username);
    List<Application> findByUsername(String username);
    List<Application> findByCompetitionIdAndUsername(String competitionId, String username);
    @Query(value = "{ 'username': ?0 }", fields = "{ 'competitionId' : 1, '_id' : 0 }")
    List<Application> findCompetitionIdsByUsername(String username);







}
