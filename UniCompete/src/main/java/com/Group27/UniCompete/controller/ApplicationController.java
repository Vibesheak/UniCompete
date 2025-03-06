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

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping("/submit")
    public ResponseEntity<?> submitApplication(@RequestBody Application application) {
        try {
            Application submittedApplication = applicationService.submitApplication(application);
            return ResponseEntity.ok(submittedApplication);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Alerady exists");
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/update-status/{competitionId}/{username}")
    public ResponseEntity<Application> updateApplicationStatus(
            @PathVariable String competitionId,
            @PathVariable String username,
            @RequestParam String status) {

        Application updatedApplication = applicationService.updateApplicationStatus(competitionId, username, status);
        return ResponseEntity.ok(updatedApplication);
    }

    @GetMapping("/user/applications/{competitionId}")
    public ResponseEntity<List<Application>> getApplicationsByCompetitionId(
            @PathVariable String competitionId) {
        return ResponseEntity.ok(applicationService.getApplicationsByCompetitionId(competitionId));
    }

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

    @GetMapping("/user/competitions/{username}")
    public ResponseEntity<List<String>> getCompetitionIdsByUsername(@PathVariable String username) {
        List<String> competitionIds = applicationService.getCompetitionIdsByUsername(username);
        return ResponseEntity.ok(competitionIds);
    }


}
