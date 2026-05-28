package com.Group27.UniCompete.service.Impl;

import com.Group27.UniCompete.models.Feedback;
import com.Group27.UniCompete.repository.FeedbackRepository;
import com.Group27.UniCompete.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Override
    public Feedback addFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    @Override
    public List<Feedback> getFeedbacksByCompetition(String competitionId) {
        return feedbackRepository.findByCompetitionId(competitionId);
    }

    @Override
    public List<Feedback> getFeedbacksByUniversity(String University){
        return feedbackRepository.findByUniversity(University);
    }
}
