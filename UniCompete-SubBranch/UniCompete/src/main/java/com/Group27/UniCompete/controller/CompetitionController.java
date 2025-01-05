package com.Group27.UniCompete.controller;

import com.Group27.UniCompete.security.SecurityConfig;
import com.Group27.UniCompete.models.Competition;
import com.Group27.UniCompete.service.CompetitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/competitions")
public class CompetitionController {

    @Autowired
    private CompetitionService competitionService;

    // User: Fetch distinct categories
    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/user/categories")
    public ResponseEntity<List<String>> getCategories() {
        return ResponseEntity.ok(competitionService.getCategories());
    }

    // User: View competitions by selected category
    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/user/category/{category}")
    public ResponseEntity<List<Competition>> getCompetitionsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(competitionService.getCompetitionsByCategory(category));
    }

    // User: View all competitions
    @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/user/all")
    public ResponseEntity<List<Competition>> getAllCompetitions() {
        return ResponseEntity.ok(competitionService.getCompetitions());
    }

    // Admin: Add a competition

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/admin/add")
    public ResponseEntity<Competition> createCompetition(@RequestBody Competition competition) {
        return ResponseEntity.ok(competitionService.createCompetition(competition));
    }

    // Admin: Update a competition
    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/admin/update/{id}")
    public ResponseEntity<Competition> updateCompetition(@PathVariable Long id, @RequestBody Competition competition) {
        return ResponseEntity.ok(competitionService.updateCompetition(id, competition));
    }

    // Admin: Delete a competition
    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<Void> deleteCompetition(@PathVariable Long id) {
        competitionService.deleteCompetition(id);
        return ResponseEntity.noContent().build();
    }
}
