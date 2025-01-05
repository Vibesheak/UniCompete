package com.Group27.UniCompete.service.Impl;

import com.Group27.UniCompete.models.Competition;
import com.Group27.UniCompete.repository.CompetitionRepository;
import com.Group27.UniCompete.service.CompetitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public Competition updateCompetition(Long id, Competition competition) {
        competition.setId(id);
        return competitionRepository.save(competition);
    }

    @Override
    public void deleteCompetition(Long id) {
        competitionRepository.deleteById(id);
    }
}
