package com.Group27.UniCompete.service;

import com.Group27.UniCompete.models.Application;

import java.util.List;

public interface ApplicationService {
    Application submitApplication(Application application);
    List<Application> getApplicationsByCompetitionId(String competitionId);
    Application updateApplicationStatus(String competitionId, String username, String status);
    Application getApplicationByCompetitionIdAndUsername(String competitionId, String username); // Add this method
    List<String> getCompetitionIdsByUsername(String username);
    List<Application> getApplicationsByUsername(String username);

}
