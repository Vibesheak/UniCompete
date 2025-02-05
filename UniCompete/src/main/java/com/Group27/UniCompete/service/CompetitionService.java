package com.Group27.UniCompete.service;

import com.Group27.UniCompete.models.Competition;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface CompetitionService {
    Competition createCompetition(Competition competition);
    List<Competition> getCompetitions();
    List<String> getCategories();
    List<Competition> getCompetitionsByCategory(String category);
    List<Competition> getCompetitionsByuniversity(String university);
    Competition updateCompetition(String id, Competition competition);
    void deleteCompetition(String id);
    String uploadCompetitionImage(String id, MultipartFile file);
    byte[] getCompetitionImage(String id);
    Competition getCompetitionById(String id);
}
