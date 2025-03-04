package com.Group27.UniCompete.service;

import com.Group27.UniCompete.models.Feedback;

import java.util.List;

public interface FeedbackService {
    Feedback addFeedback(Feedback feedback);
    List<Feedback> getFeedbacksByCompetition(String competitionId);
    List<Feedback> getFeedbacksByUniversity(String University);
}
