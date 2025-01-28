package com.Group27.UniCompete.service;

import com.Group27.UniCompete.models.Competition;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface CompetitionService {
    Competition createCompetition(Competition competition);
    List<Competition> getCompetitions(); // Fetch all competitions
    List<String> getCategories(); // Fetch all unique categories
    List<Competition> getCompetitionsByCategory(String category); // Fetch competitions by category

    List<Competition> getCompetitionsByuniversity(String university);

    Competition updateCompetition(Long id, Competition competition);
    void deleteCompetition(Long id);

    String uploadCompetitionImage(Long id, MultipartFile file);
    byte[] getCompetitionImage(Long id);

    Competition getCompetitionById(Long id);

}
