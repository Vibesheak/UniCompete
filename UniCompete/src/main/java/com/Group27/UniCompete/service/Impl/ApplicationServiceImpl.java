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

//    public Application getApplicationByCompetitionIdAndUsername(String competitionId, String username) {
//        return applicationRepository.findByCompetitionIdAndUsername(competitionId, username);
//    }

    @Override
    public Application updateApplicationStatus(String competitionId, String username, String status) {
        Application application = getApplicationByCompetitionIdAndUsername(competitionId, username);

        application.setStatus(status);
        return applicationRepository.save(application);
    }

    @Override
    public Application getApplicationByCompetitionIdAndUsername(String competitionId, String username) {
        List<Application> applications = applicationRepository.findByCompetitionIdAndUsername(competitionId, username);

        if (applications.isEmpty()) {
            throw new RuntimeException("Application not found for username: " + username + " in competition: " + competitionId);
        }

        return applications.get(0); // Assuming only one application per user per competition
    }
}
