package com.Group27.UniCompete.service.Impl;

import com.Group27.UniCompete.models.Application;
import com.Group27.UniCompete.repository.ApplicationRepository;
import com.Group27.UniCompete.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Override
    public Application submitApplication(Application application) {
        application.setStatus("Pending");
        return applicationRepository.save(application);
    }

    @Override
    public List<Application> getApplicationsByCompetitionId(String competitionId) {
        return applicationRepository.findByCompetitionId(competitionId);
    }
    public List<Application> getApplicationsByUsername(String username) {
        return applicationRepository.findByUsername(username);
    }

    public Application getApplicationByCompetitionIdAndUsername(String competitionId, String username) {
        return applicationRepository.findByCompetitionIdAndUsername(competitionId, username);
    }

    @Override
    public Application updateApplicationStatus(String id, String status) {
        Application application = applicationRepository.findById(id).orElseThrow();
        application.setStatus(status);
        return applicationRepository.save(application);
    }
}
