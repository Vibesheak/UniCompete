package com.Group27.UniCompete.controller;

import com.Group27.UniCompete.models.User;
import com.Group27.UniCompete.repository.UserRepository;
import com.Group27.UniCompete.security.SecurityConfig;
import com.Group27.UniCompete.models.Competition;
import com.Group27.UniCompete.service.CompetitionService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;

@RestController
@RequestMapping("/competitions")
public class CompetitionController {

    @Autowired
    private CompetitionService competitionService;



    // User: Fetch distinct categories
    //@PreAuthorize("hasAuthority('USER')")
    @GetMapping("/user/categories")
    public ResponseEntity<List<String>> getCategories() {
        return ResponseEntity.ok(competitionService.getCategories());
    }

    // User: View competitions by selected category
   // @PreAuthorize("hasAuthority('USER')")
    @GetMapping("/user/category/{category}")
    public ResponseEntity<List<Competition>> getCompetitionsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(competitionService.getCompetitionsByCategory(category));
    }


    @GetMapping("/user/university/{university}")
    public ResponseEntity<List<Competition>> getCompetitionsByuniversity(@PathVariable("university") String universityName) {
        return ResponseEntity.ok(competitionService.getCompetitionsByuniversity(universityName));
    }


    // User: View all competitions
    //@PreAuthorize("hasAuthority('USER')")
    @GetMapping("/user1/all")
    public ResponseEntity<List<Competition>> getAllCompetitions() {
        return ResponseEntity.ok(competitionService.getCompetitions());
    }

  //  @PreAuthorize("hasAuthority('USER')")
    @GetMapping("user/id/{id}")
    public ResponseEntity<Competition> getCompetitionById(@PathVariable Long id) {
        Competition competition = competitionService.getCompetitionById(id);
        return ResponseEntity.ok(competition);
    }

    // Admin: Add a competition

   // @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/admin/add")
    public ResponseEntity<Competition> createCompetition(@RequestBody Competition competition) {
        return ResponseEntity.ok(competitionService.createCompetition(competition));
    }

    // Admin: Update a competition
  //  @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/admin/update/{id}")
    public ResponseEntity<Competition> updateCompetition(@PathVariable Long id, @RequestBody Competition competition) {
        return ResponseEntity.ok(competitionService.updateCompetition(id, competition));
    }

    // Admin: Delete a competition
  //  @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<Void> deleteCompetition(@PathVariable Long id) {
        competitionService.deleteCompetition(id);
        return ResponseEntity.noContent().build();
    }

  //  @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/admin/upload-image/{id}")
    public ResponseEntity<String> uploadCompetitionImage(@PathVariable Long id, @RequestParam("image") MultipartFile file) {
        String imageUrl = competitionService.uploadCompetitionImage(id, file);
        return ResponseEntity.ok(imageUrl);
    }


    @GetMapping("/images/{id}")
    public ResponseEntity<?> getCompetitionImage(@PathVariable("id") Long id) {
        try {
            byte[] image = competitionService.getCompetitionImage((Long) id);
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Image not found");
        }
    }

}
