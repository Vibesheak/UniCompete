package com.Group27.UniCompete.service.Impl;

import com.Group27.UniCompete.models.Competition;
import com.Group27.UniCompete.repository.CompetitionRepository;
import com.Group27.UniCompete.service.CompetitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.io.IOException;
import java.util.Optional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompetitionServiceImpl implements CompetitionService {

    @Autowired
    private CompetitionRepository competitionRepository;

    @Override
    public Competition createCompetition(Competition competition) {
        return competitionRepository.save(competition);
    }

    @Override
    public List<Competition> getCompetitions() {
        return competitionRepository.findAll();
    }

    @Override
    public List<String> getCategories() {
        return competitionRepository.findAll().stream()
                .map(Competition::getCategory)
                .distinct()
                .collect(Collectors.toList());
    }

    @Override
    public List<Competition> getCompetitionsByCategory(String category) {
        return competitionRepository.findByCategory(category);
    }


    @Override
    public List<Competition> getCompetitionsByuniversity(String university) {
        return competitionRepository.findByUniversity(university);
    }

    @Override
    public Competition updateCompetition(Long id, Competition competition) {
        competition.setId(id);
        return competitionRepository.save(competition);
    }

    @Override
    public void deleteCompetition(Long id) {
        competitionRepository.deleteById(id);
    }


    @Override
    public String uploadCompetitionImage(Long id, MultipartFile file) {
        String directoryPath = "uploads/images/"; // Ensure this folder exists
        String fileName = id + ".jpg";
        try {
            Files.createDirectories(Paths.get(directoryPath)); // Ensure directory exists
            Files.write(Paths.get(directoryPath + fileName), file.getBytes()); // Save the file
        } catch (IOException e) {
            throw new RuntimeException("Failed to save image", e);
        }

        // Save URL to Competition document
        String imageUrl = "/uploads/images/" + fileName;
        Competition competition = competitionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Competition not found"));
        competition.setImageUrl(imageUrl);
        competitionRepository.save(competition);
        return imageUrl;
    }



    @Override
    public byte[] getCompetitionImage(Long id) {
        String directoryPath = "uploads/images/";
        String fileName = id + ".jpg";
        try {
            return Files.readAllBytes(Paths.get(directoryPath + fileName));
        } catch (IOException e) {
            throw new RuntimeException("Image not found for Competition ID: " + id, e);
        }
    }

    @Override
    public Competition getCompetitionById(Long id) {
        Optional<Competition> competition = competitionRepository.findById(id);
        if (competition.isPresent()) {
            return competition.get();
        } else {
            throw new RuntimeException("Competition with id " + id + " not found");
        }
    }

}
