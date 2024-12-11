package com.Group27.UniCompete.service;

import com.Group27.UniCompete.models.Competition;

import java.util.List;

public interface CompetitionService {
    Competition createCompetition(Competition competition);
    List<Competition> getCompetitions(); // Fetch all competitions
    List<String> getCategories(); // Fetch all unique categories
    List<Competition> getCompetitionsByCategory(String category); // Fetch competitions by category
    Competition updateCompetition(Long id, Competition competition);
    void deleteCompetition(Long id);
}
