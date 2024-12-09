package com.Group27.UniCompete.controller;

import com.Group27.UniCompete.models.Competition;
import com.Group27.UniCompete.service.CompetitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/competitions")
public class CompetitionController {

    @Autowired
    private CompetitionService competitionService;

    // For Admin: Add a competition
    @PostMapping("/admin/add")
    public ResponseEntity<Competition> createCompetition(@RequestBody Competition competition) {
        return ResponseEntity.ok(competitionService.createCompetition(competition));
    }

    // For Admin: Update a competition
    @PutMapping("/admin/update/{id}")
    public ResponseEntity<Competition> updateCompetition(@PathVariable Long id, @RequestBody Competition competition) {
        return ResponseEntity.ok(competitionService.updateCompetition(id, competition));
    }

    // For Admin: Delete a competition
    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<Void> deleteCompetition(@PathVariable Long id) {
        competitionService.deleteCompetition(id);
        return ResponseEntity.noContent().build();
    }

    // For Users: Get all competitions
    @GetMapping("/user/view")
    public ResponseEntity<List<Competition>> getCompetitions() {
        return ResponseEntity.ok(competitionService.getCompetitions());
    }

    // For Users: Search competitions
    @GetMapping("/user/search")
    public ResponseEntity<List<Competition>> searchCompetitions(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String university,
            @RequestParam(required = false) String date) {
        return ResponseEntity.ok(competitionService.searchCompetitions(category, university, date));
    }
}
