package com.Group27.UniCompete.service.impl;

import com.Group27.UniCompete.models.Competition;
import com.Group27.UniCompete.repository.CompetitionRepository;
import com.Group27.UniCompete.service.CompetitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public List<Competition> searchCompetitions(String category, String university, String date) {
        if (category != null) return competitionRepository.findByCategory(category);
        if (university != null) return competitionRepository.findByUniversity(university);
        if (date != null) return competitionRepository.findByDate(date);
        return competitionRepository.findAll();
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
}
