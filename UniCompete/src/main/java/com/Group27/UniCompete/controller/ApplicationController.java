package com.Group27.UniCompete.controller;

import com.Group27.UniCompete.models.Application;
import com.Group27.UniCompete.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    // User: Submit Application
    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("/submit")
    public ResponseEntity<?> submitApplication(@RequestBody Application application) {
        try {
            // Attempt to submit the application
            Application submittedApplication = applicationService.submitApplication(application);
            return ResponseEntity.ok(submittedApplication); // Return the submitted application
        } catch (IllegalStateException e) {
            // Handle the case where a user has already applied
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Alerady exists");
        }
    }

    // Admin: Update Application Status
    // Update application status by competitionId and username
    @PutMapping("/update-status/{competitionId}/{username}")
    public ResponseEntity<Application> updateApplicationStatus(
            @PathVariable String competitionId,
            @PathVariable String username,
            @RequestParam String status) {

        Application updatedApplication = applicationService.updateApplicationStatus(competitionId, username, status);
        return ResponseEntity.ok(updatedApplication);
    }
    // Admin: Get Applications by Competition ID

    @GetMapping("/user/applications/{competitionId}")
    public ResponseEntity<List<Application>> getApplicationsByCompetitionId(
            @PathVariable String competitionId) {
        return ResponseEntity.ok(applicationService.getApplicationsByCompetitionId(competitionId));
    }

    // Update application status by username


    //@PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')") // Adjust authority as needed
    @GetMapping("/user/applications/{competitionId}/{username}")
    public ResponseEntity<Application> getApplicationByCompetitionIdAndUsername(
            @PathVariable String competitionId,
            @PathVariable String username) {
        Application application = applicationService.getApplicationByCompetitionIdAndUsername(competitionId, username);
        if (application != null) {
            return ResponseEntity.ok(application);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // User: Get list of competition IDs by username
    @GetMapping("/user/competitions/{username}")
    public ResponseEntity<List<String>> getCompetitionIdsByUsername(@PathVariable String username) {
        List<String> competitionIds = applicationService.getCompetitionIdsByUsername(username);
        return ResponseEntity.ok(competitionIds);
    }


}
