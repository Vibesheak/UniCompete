package com.Group27.UniCompete.service;

import com.Group27.UniCompete.models.Competition;

import java.util.List;

public interface CompetitionService {
    Competition createCompetition(Competition competition);
    List<Competition> getCompetitions();
    List<Competition> searchCompetitions(String category, String university, String date);
    Competition updateCompetition(Long id, Competition competition);
    void deleteCompetition(Long id);
}
