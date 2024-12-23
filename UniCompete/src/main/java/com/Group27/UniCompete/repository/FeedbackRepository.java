package com.Group27.UniCompete.repository;

import com.Group27.UniCompete.models.Feedback;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FeedbackRepository extends MongoRepository<Feedback, Long> {
    List<Feedback> findByCompetitionId(Long competitionId);
    List<Feedback> findByUniversity(String University);
}
