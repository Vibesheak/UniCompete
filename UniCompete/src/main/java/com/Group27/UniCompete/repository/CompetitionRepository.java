package com.Group27.UniCompete.repository;

import com.Group27.UniCompete.models.Competition;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CompetitionRepository extends MongoRepository<Competition, String> {
    List<Competition> findByCategory(String category);
    List<Competition> findByUniversity(String university);
    List<Competition> findByDate(String date);

}
