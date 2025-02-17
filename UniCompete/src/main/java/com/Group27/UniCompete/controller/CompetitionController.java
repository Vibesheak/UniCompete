package com.Group27.UniCompete.controller;

import com.Group27.UniCompete.models.Competition;
import com.Group27.UniCompete.service.CompetitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/competitions")
public class CompetitionController {

    @Autowired
    private CompetitionService competitionService;

    @GetMapping("/user/categories")
    public ResponseEntity<List<String>> getCategories() {
        return ResponseEntity.ok(competitionService.getCategories());
    }

    @GetMapping("/user/category/{category}")
    public ResponseEntity<List<Competition>> getCompetitionsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(competitionService.getCompetitionsByCategory(category));
    }

    @GetMapping("/user/university/{university}")
    public ResponseEntity<List<Competition>> getCompetitionsByuniversity(@PathVariable String university) {
        return ResponseEntity.ok(competitionService.getCompetitionsByuniversity(university));
    }

    @GetMapping("/user1/all")
    public ResponseEntity<List<Competition>> getAllCompetitions() {
        return ResponseEntity.ok(competitionService.getCompetitions());
    }

    @GetMapping("/user/id/{id}")
    public ResponseEntity<Competition> getCompetitionById(@PathVariable String id) {
        return ResponseEntity.ok(competitionService.getCompetitionById(id));
    }

    @PostMapping("/admin/add")
    public ResponseEntity<Competition> createCompetition(@RequestBody Competition competition) {
        return ResponseEntity.ok(competitionService.createCompetition(competition));
    }


    @PostMapping("/admin/upload-image/{id}")
    public ResponseEntity<String> uploadCompetitionImage(@PathVariable String id, @RequestParam("image") MultipartFile file) {
        return ResponseEntity.ok(competitionService.uploadCompetitionImage(id, file));
    }

    @GetMapping("/images/{id}")
    public ResponseEntity<?> getCompetitionImage(@PathVariable String id) {
        try {
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(competitionService.getCompetitionImage(id));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/admin/update/{id}")
    public ResponseEntity<Competition> updateCompetition(@PathVariable String id, @RequestBody Competition competition) {
        return ResponseEntity.ok(competitionService.updateCompetition(id, competition));
    }

}
