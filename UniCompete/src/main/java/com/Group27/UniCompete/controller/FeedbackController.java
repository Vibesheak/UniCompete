package com.Group27.UniCompete.controller;

import com.Group27.UniCompete.models.Feedback;
import com.Group27.UniCompete.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedbacks")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    // User: Add feedback for a competition
    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("user/add")
    public ResponseEntity<Feedback> addFeedback(@RequestBody Feedback feedback) {
        return ResponseEntity.ok(feedbackService.addFeedback(feedback));
    }

    // User: View feedbacks for a competition
//    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/competition/id/{competitionId}")
    public ResponseEntity<List<Feedback>> getFeedbacksByCompetition(@PathVariable String competitionId) {
        return ResponseEntity.ok(feedbackService.getFeedbacksByCompetition(competitionId));
    }

    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/competition/university/{University}")
    public ResponseEntity<List<Feedback>> getFeedbacksByUniversity(@PathVariable String University) {
        return ResponseEntity.ok(feedbackService.getFeedbacksByUniversity(University));
    }
}
